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

    console.log(`\n${'═'.repeat(60)}`);
    console.log(`🛡️  WARRIOR BOT v${config.version} - THE ULTIMATE WHATSAPP BOT`);
    console.log(`${'═'.repeat(60)}`);
    console.log(`⚙️  Baileys v${version.join('.')}${isLatest ? ' (latest)' : ''}`);
    
    // Log deployment mode
    if (config.pairingNumber) {
        console.log(`\n✅ AUTO-PAIRING MODE ENABLED`);
        console.log(`📱 Phone: ${config.pairingNumber}\n`);
    } else if (state.creds?.registered) {
        console.log(`\n✅ REGISTERED MODE - Using existing session\n`);
    } else {
        console.log(`\n⚡ FRESH START MODE`);
        console.log(`\n📌 PLEASE ENTER YOUR WHATSAPP NUMBER:`);
        console.log(`   Format: 254725391914 (country code + number, no +)`);
        console.log(`   Example: 🇰🇪 Kenya = 254...`);
        console.log(`   Example: 🇿🇦 South Africa = 27...\n`);
        console.log(`🔗 Set PAIRING_NUMBER in your .env or config.js and restart\n`);
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
            console.log(`\n${'═'.repeat(60)}`);
            console.log(`✅ 🎉 WARRIOR BOT HAS STARTED SUCCESSFULLY! 🎉`);
            console.log(`${'═'.repeat(60)}\n`);
            updateStatus({ connected: true, qr: null, pairingCode: null });

            // Send welcome message with session ID
            try {
                const credsPath = './auth_info_baileys/creds.json';
                const credsRaw = await fs.readFile(credsPath, 'utf-8');
                const sessionId = Buffer.from(credsRaw).toString('base64');
                const ownerJid = config.ownerNumber.includes('@') ? config.ownerNumber : `${config.ownerNumber}@s.whatsapp.net`;
                
                const welcomeImage = './assets/dashboard.png'; // or use menu.png

                await sock.sendMessage(ownerJid, {
                    image: { url: welcomeImage },
                    caption: `🛡️ *WARRIOR BOT — SUCCESSFULLY STARTED* 🎉\n\n` +
                        `━━━━━━━━━━━━━━━━━━\n` +
                        `✅ Your bot is LIVE and RUNNING!\n` +
                        `━━━━━━━━━━━━━━━━━━\n\n` +
                        `📦 *SESSION ID (BACKUP THIS):*\n\`\`\`${sessionId}\`\`\`\n\n` +
                        `⚠️ *SECURITY WARNING*\n` +
                        `━━━━━━━━━━━━━━━━━━\n` +
                        `🔒 *DO NOT SHARE YOUR SESSION ID*\n` +
                        `🚫 Anyone with this code can control your account\n` +
                        `✅ Save it in a secure location\n` +
                        `━━━━━━━━━━━━━━━━━━\n\n` +
                        `🚀 *QUICK START*\n` +
                        `• Type .menu to see all commands\n` +
                        `• Type .help for more info\n` +
                        `• Type .about to learn more\n\n` +
                        `👨‍💻 *DEVELOPER*\n` +
                        `• Portfolio: https://elgringo.netlify.app\n` +
                        `• WhatsApp: wa.me/${config.ownerNumber.split('@')[0]}\n\n` +
                        `📱 *GITHUB*\n` +
                        `⭐ Star: https://github.com/Fellix-234/Warrior-Bot/stargazers\n` +
                        `🍴 Fork: https://github.com/Fellix-234/Warrior-Bot/fork\n` +
                        `📚 Repo: https://github.com/Fellix-234/Warrior-Bot\n\n` +
                        `📢 *𝗪𝗔𝗥𝗥𝗜𝗢𝗥 𝗖𝗛𝗔𝗡𝗡𝗘𝗟 🛡️*\n` +
                        `https://whatsapp.com/channel/0029VbC6vR03rZZXWOUdtT1D\n\n` +
                        `— *Warrior Bot v${config.version}* 🛡️`
                });
                console.log('✅ Welcome message sent to your inbox!');
            } catch (err) {
                console.error('Could not send welcome message:', err.message);
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
