export default {
    name: 'owner',
    description: 'Get owner details',
    category: 'General',
    async execute(sock, m, { botName }) {
        const ownerName = process.env.OWNER_NAME || 'Warrior Felix';
        const ownerNum = process.env.OWNER_NUMBER?.split('@')[0] || '2547391914';

        const text = `╔══════════════════╗\n` +
            `║  👑 *BOT OWNER*  ║\n` +
            `╚══════════════════╝\n\n` +
            `👤 *Name:* ${ownerName}\n` +
            `📱 *WhatsApp:* wa.me/${ownerNum}\n` +
            `🛡️ *Bot:* ${botName}\n\n` +
            `━━━━━━━━━━━━━━━━━━\n` +
            `💬 *Need Help?*\n` +
            `Contact the owner for support,\n` +
            `custom features, or collaborations.\n` +
            `━━━━━━━━━━━━━━━━━━\n\n` +
            `⭐ *Star:* https://github.com/Fellix-234/Warrior-Bot/stargazers\n` +
            `🔗 *Channel:* https://whatsapp.com/channel/your_channel_id\n\n` +
            `_Powered by ${ownerName} 🔥_`;

        await sock.sendMessage(m.key.remoteJid, { text });
    }
};
