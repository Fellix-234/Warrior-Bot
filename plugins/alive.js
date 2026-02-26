export default {
    name: 'alive',
    description: 'Check if the bot is active with detail',
    async execute(sock, m, { botName }) {
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);
        const uptimeString = `${hours}h ${minutes}m ${seconds}s`;
        const imageUrl = './assets/alive.png';

        const text = `╔═══════════════════╗\n` +
            `║  🛡️ *${botName.toUpperCase()}*  ║\n` +
            `╚═══════════════════╝\n\n` +
            `✅ *STATUS:* Online & Active\n` +
            `⏰ *UPTIME:* ${uptimeString}\n` +
            `🚀 *VERSION:* 1.2.0\n` +
            `⚡ *MODE:* Multi-Device\n` +
            `🔥 *PERFORMANCE:* Optimal\n\n` +
            `━━━━━━━━━━━━━━━━━━\n` +
            `🔗 *Channel:* https://whatsapp.com/channel/your_channel_id\n` +
            `⭐ *Star:* https://github.com/Fellix-234/Warrior-Bot/stargazers\n` +
            `📚 *Repo:* https://github.com/Fellix-234/Warrior-Bot\n\n` +
            `_Your bot is running smoothly! 🎯_`;

        await sock.sendMessage(m.key.remoteJid, {
            image: { url: imageUrl },
            caption: text
        });
    }
};
