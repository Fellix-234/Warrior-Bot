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
let sock = null;
let isRestarting = false;
let lastPairingAttempt = false;

async function resetSession() {
    if (isRestarting) return;
    isRestarting = true;

    try {
        if (sock?.logout) {
            await sock.logout();
        }
    } catch (err) {
        console.error('Logout failed:', err.message);
    }

    try {
        await fs.remove('auth_info_baileys');
    } catch (err) {
        console.error('Failed to clear auth:', err.message);
    }

    updateStatus({ connected: false, qr: null, pairingCode: null });

    setTimeout(() => {
        isRestarting = false;
        startBot();
    }, 1000);
}

async function startBot() {
    // Start the web server
    startServer();

    const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');
    const { version, isLatest } = await fetchLatestBaileysVersion();

    console.log(`🛡️ WarriorBot v${config.version} starting...`);
    console.log(`Using Baileys v${version.join('.')}${isLatest ? ' (latest)' : ''}`);
    
    // Log deployment mode
    if (config.pairingNumber) {
        console.log(`\n📱 AUTO-PAIRING MODE ENABLED`);
        console.log(`📲 Will pair with: ${config.pairingNumber}\n`);
    } else if (state.creds?.registered) {
        console.log(`\n✅ REGISTERED MODE - Using existing session\n`);
    } else {
        console.log(`\n🎬 FRESH START - QR/Pairing will be generated\n`);
    }

    sock = makeWASocket({
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
        },
        onResetRequest: async () => {
            await resetSession();
        }
    });

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr && !config.pairingNumber) {
            console.log('QR Code generated. Scan it with your WhatsApp!');
            updateStatus({ qr, connected: false, pairingCode: null });
        }

        // Auto-pairing mode: request pairing code immediately if enabled
        if (config.pairingNumber && !state.creds?.registered && !lastPairingAttempt) {
            lastPairingAttempt = true;
            try {
                console.log(`\n🔗 Requesting pairing code for ${config.pairingNumber}...`);
                const code = await sock.requestPairingCode(config.pairingNumber.replace(/[^0-9]/g, ''));
                console.log(`\n✅ PAIRING CODE READY: ${code}`);
                console.log(`📲 Steps to pair:`);
                console.log(`   1. Open WhatsApp on your phone`);
                console.log(`   2. Go to Linked Devices > Link a Device`);
                console.log(`   3. Select 'Link with Phone Number'`);
                console.log(`   4. Enter your phone number: ${config.pairingNumber}`);
                console.log(`   5. When prompted, enter code: ${code}\n`);
                updateStatus({ pairingCode: code, qr: null, connected: false });
            } catch (err) {
                console.error('❌ Failed to request pairing code:', err.message);
                lastPairingAttempt = false;
            }
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

            // Send session ID to owner inbox with security warning
            try {
                const credsPath = './auth_info_baileys/creds.json';
                const credsRaw = await fs.readFile(credsPath, 'utf-8');
                const sessionId = Buffer.from(credsRaw).toString('base64');
                const ownerJid = config.ownerNumber.includes('@') ? config.ownerNumber : `${config.ownerNumber}@s.whatsapp.net`;

                await sock.sendMessage(ownerJid, {
                    text: `🛡️ *WARRIOR BOT — SESSION CONNECTED*\n\n` +
                        `📦 *SESSION ID (COPY THIS FIRST):*\n\`\`\`${sessionId}\`\`\`\n\n` +
                        `⚠️ *DO NOT SHARE THIS SESSION*\n` +
                        `━━━━━━━━━━━━━━━━━━\n` +
                        `🔒 Anyone with this ID can hijack your WhatsApp account.\n` +
                        `🚫 Never send it to friends, groups, or public chats.\n` +
                        `✅ Keep it private and store it securely.\n` +
                        `━━━━━━━━━━━━━━━━━━\n\n` +
                        `Bot is live and running.\n` +
                        `— *Warrior Bot v${config.version}*`
                });
                console.log('✅ Session ID sent to owner inbox.');
            } catch (err) {
                console.error('Could not send session ID:', err.message);
            }
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
