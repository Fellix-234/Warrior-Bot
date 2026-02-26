import dotenv from 'dotenv';
dotenv.config();

export const config = {
    prefix: process.env.PREFIX || '.',
    botName: process.env.BOT_NAME || 'Warrior Bot',
    ownerNumber: process.env.OWNER_NUMBER || '1234567890@s.whatsapp.net',
    ownerName: process.env.OWNER_NAME || 'Antigravity',
    sessionId: process.env.SESSION_ID || 'warrior-session',
    pairingNumber: process.env.PAIRING_NUMBER || null,
    port: process.env.PORT || 3000,
    mode: process.env.MODE || 'public',
    stickerPackName: process.env.STICKER_PACK_NAME || 'Warrior Bot',
    stickerAuthor: process.env.STICKER_AUTHOR || 'Antigravity',
    autoTyping: process.env.AUTO_TYPING === 'true',
    autoRecording: process.env.AUTO_RECORDING === 'true',
    autoStatusView: process.env.AUTO_STATUS_VIEW === 'true',
    autoStatusReact: process.env.AUTO_STATUS_REACT === 'true',
    autoReactMessages: process.env.AUTO_REACT_MESSAGES === 'true',
    version: '1.2.0'
};

export default config;
