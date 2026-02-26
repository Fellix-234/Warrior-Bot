export default {
    name: 'support',
    description: 'Get help and support from the developers',
    category: 'General',
    async execute(sock, m, { botName }) {
        const ownerNum = process.env.OWNER_NUMBER?.split('@')[0] || '2547391914';
        const imageUrl = './assets/menu.png';
        
        const text = `╔═══════════════════════════╗\n` +
            `║  🆘 *SUPPORT CENTER*  ║\n` +
            `╚═══════════════════════════╝\n\n` +
            `Need help with ${botName}? We're here for you!\n\n` +
            `━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `📞 *Contact Options*\n\n` +
            `💬 *WhatsApp Support*\n` +
            `├ Owner: wa.me/${ownerNum}\n` +
            `└ Response Time: Usually < 24h\n\n` +
            `🐛 *Report Issues*\n` +
            `├ GitHub Issues\n` +
            `└ github.com/Fellix-234/Warrior-Bot/issues\n\n` +
            `📖 *Documentation*\n` +
            `├ README: github.com/Fellix-234/Warrior-Bot\n` +
            `└ Images Guide: View IMAGES_GUIDE.md\n\n` +
            `💡 *Community*\n` +
            `├ Discussions\n` +
            `└ github.com/Fellix-234/Warrior-Bot/discussions\n\n` +
            `━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `🔧 *Common Issues*\n\n` +
            `1️⃣ *Bot Not Responding?*\n` +
            `   • Check if bot is online\n` +
            `   • Verify prefix (${process.env.PREFIX || '.'})\n` +
            `   • Ensure you're using correct command\n\n` +
            `2️⃣ *Connection Problems?*\n` +
            `   • Check internet connection\n` +
            `   • Try ${process.env.PREFIX || '.'}restart (owner only)\n` +
            `   • Review session files\n\n` +
            `3️⃣ *Command Not Working?*\n` +
            `   • Check ${process.env.PREFIX || '.'}commands for full list\n` +
            `   • Some commands need permissions\n` +
            `   • Owner/Group commands are restricted\n\n` +
            `━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `⭐ *Support the Project*\n` +
            `Star our repository: github.com/Fellix-234/Warrior-Bot/stargazers\n\n` +
            `_We appreciate your support! 💙_`;

        await sock.sendMessage(m.key.remoteJid, {
            image: { url: imageUrl },
            caption: text
        });
    }
};
