import {
    makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    fetchLatestBaileysVersion
} from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import pino from 'pino';
import fs from 'fs-extra';
import { handleMessage } from './lib/commandHandler.js';
import { startServer, updateStatus, setPairingCallbacks } from './server.js';
import config from './config.js';

const logger = pino({ level: 'silent' });

async function startBot() {
    // Start the web server
    startServer();

    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
    const { version, isLatest } = await fetchLatestBaileysVersion();

    console.log(`🛡️ WarriorBot v${config.version} starting...`);
    console.log(`Using Baileys v${version.join('.')}${isLatest ? ' (latest)' : ''}`);

    const sock = makeWASocket({
        version,
        logger,
        auth: state,
        getMessage: async () => ({ conversation: 'Warrior Bot' })
    });

    // Register web-to-bot callbacks
    setPairingCallbacks({
        onPairingCodeRequest: async (phoneNumber) => {
            const code = await sock.requestPairingCode(phoneNumber.replace(/[^0-9]/g, ''));
            updateStatus({ pairingCode: code, qr: null });
            return code;
        },
        onQRRequest: async () => {
            // Baileys doesn't have a direct "regen QR" but clearing token/restarting or waiting works
            updateStatus({ qr: null, pairingCode: null });
        }
    });

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            console.log('QR Code generated. Scan it with your WhatsApp!');
            updateStatus({ qr, connected: false, pairingCode: null });
        }

        if (connection === 'close') {
            const shouldReconnect = (lastDisconnect.error instanceof Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log('Connection closed due to ', lastDisconnect.error, ', reconnecting ', shouldReconnect);
            updateStatus({ connected: false, qr: null, pairingCode: null });
            if (shouldReconnect) {
                startBot();
            }
        } else if (connection === 'open') {
            console.log('Warrior Bot connected successfully!');
            updateStatus({ connected: true, qr: null, pairingCode: null });
        }
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('messages.upsert', async (m) => {
        if (m.type === 'notify') {
            for (const msg of m.messages) {
                const jid = msg.key.remoteJid;

                // 1. Auto Status View & React
                if (jid === 'status@broadcast') {
                    if (config.autoStatusView) {
                        try {
                            await sock.readMessages([msg.key]);
                            console.log(`✅ Viewed status from: ${msg.pushName || jid}`);
                        } catch (e) {
                            console.error('Error reading status:', e);
                        }
                    }
                    if (config.autoStatusReact) {
                        try {
                            await sock.sendMessage(jid, {
                                react: { text: '❤️', key: msg.key }
                            }, { statusJidList: [msg.key.participant] });
                        } catch (e) {
                            console.error('Error reacting to status:', e);
                        }
                    }
                    continue; // Don't process status as a command
                }

                if (!msg.key.fromMe) {
                    // 2. Auto Typing/Recording Presence
                    if (config.autoTyping) {
                        await sock.sendPresenceUpdate('composing', jid);
                    } else if (config.autoRecording) {
                        await sock.sendPresenceUpdate('recording', jid);
                    }

                    // 3. Auto React to Messages
                    if (config.autoReactMessages) {
                        const emojis = ['❤️', '🔥', '✨', '🤖', '🛡️', '⚔️'];
                        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                        try {
                            await sock.sendMessage(jid, {
                                react: { text: randomEmoji, key: msg.key }
                            });
                        } catch (e) {
                            console.error('Error reacting to message:', e);
                        }
                    }

                    // 4. Handle Commands
                    await handleMessage(sock, msg);
                }
            }
        }
    });

    return sock;
}

startBot();
