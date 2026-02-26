export default {
    name: 'repo',
    description: 'Get the bot repository link',
    category: 'General',
    async execute(sock, m, { botName }) {
        const repoUrl = 'https://github.com/Fellix-234/Warrior-Bot';
        
        // Rotating images for repo command
        const repoImages = [
            './assets/repo.png',
            './assets/repo2.png',
            './assets/repo3.png',
            './assets/repo4.png',
            './assets/repo5.png'
        ];
        
        const imageUrl = repoImages[Math.floor(Math.random() * repoImages.length)];

        const text = `╔══════════════════╗\n` +
            `║  📚 *REPOSITORY*  ║\n` +
            `╚══════════════════╝\n\n` +
            `🛡️ *${botName}* - Open Source WhatsApp Bot\n\n` +
            `━━━━━━━━━━━━━━━━━━\n` +
            `📦 *Main Repo:*\n${repoUrl}\n\n` +
            `⭐ *Star Us:*\nhttps://github.com/Fellix-234/Warrior-Bot/stargazers\n\n` +
            `🍴 *Fork & Contribute:*\nhttps://github.com/Fellix-234/Warrior-Bot/fork\n` +
            `━━━━━━━━━━━━━━━━━━\n\n` +
            `💡 *Features:*\n` +
            `• Multi-Device Support\n` +
            `• Auto-Pairing Mode\n` +
            `• Modular Plugin System\n` +
            `• Modern UI & Commands\n\n` +
            `👨‍💻 *Developer:* Warrior Felix\n` +
            `🌐 Portfolio: elgringo.netlify.app\n\n` +
            `📢 *Join 𝗪𝗔𝗥𝗥𝗜𝗢𝗥 𝗖𝗛𝗔𝗡𝗡𝗘𝗟 🛡️:*\n` +
            `🔗 https://whatsapp.com/channel/0029VbC6vR03rZZXWOUdtT1D\n\n` +
            `_Star ⭐ the repo to support development!_`;

        await sock.sendMessage(m.key.remoteJid, {
            image: { url: imageUrl },
            caption: text
        });
    }
};
