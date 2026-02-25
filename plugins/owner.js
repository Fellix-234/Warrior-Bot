export default {
    name: 'owner',
    description: 'Get owner details',
    async execute(sock, m, { botName }) {
        const ownerName = process.env.OWNER_NAME || 'Unknown';
        const ownerNum = process.env.OWNER_NUMBER?.split('@')[0] || 'Unknown';

        const text = `👑 *Owner Information*\n\n` +
            `👤 *Name:* ${ownerName}\n` +
            `📱 *WhatsApp:* wa.me/${ownerNum}\n\n` +
            `_Created with love by ${ownerName}_`;

        await sock.sendMessage(m.key.remoteJid, { text });
    }
};
