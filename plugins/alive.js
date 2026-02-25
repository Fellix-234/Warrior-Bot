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

        const text = `🎨 *${botName} is Alive!*\n\n` +
            `⏱️ *Uptime:* ${uptimeString}\n` +
            `🚀 *Version:* 1.2.0\n` +
            `📂 *Status:* Online & Serving\n\n` +
            `_Build your legacy with WarriorBot_`;

        await sock.sendMessage(m.key.remoteJid, {
            image: { url: imageUrl },
            caption: text
        });
    }
};
