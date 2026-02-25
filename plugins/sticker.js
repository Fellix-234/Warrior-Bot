import { downloadMediaMessage } from '@whiskeysockets/baileys';
import config from '../config.js';

export default {
    name: 'sticker',
    description: 'Convert an image to a sticker',
    async execute(sock, m) {
        const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        const isImage = m.message?.imageMessage || quoted?.imageMessage;

        if (!isImage) return await sock.sendMessage(m.key.remoteJid, { text: '❌ Please send or reply to an image with .sticker' });

        await sock.sendMessage(m.key.remoteJid, { text: '🎨 Creating your sticker...' });

        try {
            const buffer = await downloadMediaMessage(
                m.message.imageMessage ? m : { message: quoted },
                'buffer',
                {},
                {
                    logger: console,
                    reuploadRequest: sock.updateMediaMessage
                }
            );

            await sock.sendMessage(m.key.remoteJid, {
                sticker: buffer,
                packname: config.stickerPackName,
                author: config.stickerAuthor
            });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: `❌ Error creating sticker: ${e.message}` });
        }
    }
};
