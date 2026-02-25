export default {
    name: 'repo',
    description: 'Get the bot repository link',
    async execute(sock, m, { botName }) {
        const repoUrl = 'https://github.com/Antigravity/WarriorBot'; // Update with actual repo URL
        const imageUrl = 'https://premium-wallpapers.com/wp-content/uploads/2023/11/futuristic-robot-warrior.jpg'; // Placeholder

        const text = `📂 *${botName} Repository*\n\n` +
            `⭐ *Star the repo to support!*\n` +
            `🔗 *Link:* ${repoUrl}\n\n` +
            `_Join our community and contribute!_`;

        await sock.sendMessage(m.key.remoteJid, {
            image: { url: imageUrl },
            caption: text
        });
    }
};
