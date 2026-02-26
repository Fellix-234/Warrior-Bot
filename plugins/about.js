export default {
    name: 'about',
    description: 'Learn more about Warrior Bot',
    category: 'General',
    async execute(sock, m, { botName }) {
        const imageUrl = './assets/menu.png';
        
        const text = `╔═══════════════════════════╗\n` +
            `║  🛡️ *ABOUT ${botName.toUpperCase()}*  ║\n` +
            `╚═══════════════════════════╝\n\n` +
            `*${botName}* is a professional, feature-rich WhatsApp bot built with modern architecture and best practices.\n\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `✨ *KEY FEATURES*\n\n` +
            `🔹 *Multi-Device Support*\n` +
            `   Connect seamlessly across devices\n\n` +
            `🔹 *Modular Architecture*\n` +
            `   Plug-and-play command system\n\n` +
            `🔹 *Advanced Privacy*\n` +
            `   Owner & group-level permissions\n\n` +
            `🔹 *Media Processing*\n` +
            `   Download, convert, and share media\n\n` +
            `🔹 *Group Management*\n` +
            `   Full admin control suite\n\n` +
            `🔹 *Interactive Games*\n` +
            `   Built-in entertainment features\n\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `🏆 *TECHNOLOGY STACK*\n` +
            `• Node.js & ES Modules\n` +
            `• @whiskeysockets/baileys\n` +
            `• Express.js Web Server\n` +
            `• Real-time Connection Handling\n\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `👨‍💻 *DEVELOPERS*\n` +
            `Warrior Felix & Team\n` +
            `📱 Support: wa.me/2547391914\n\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `🌐 *GET INVOLVED*\n` +
            `⭐ Star: github.com/Fellix-234/Warrior-Bot/stargazers\n` +
            `🍴 Fork: github.com/Fellix-234/Warrior-Bot/fork\n` +
            `📚 Docs: github.com/Fellix-234/Warrior-Bot\n\n` +
            `_${botName} - Powering WhatsApp Automation Since 2024 🔥_`;
        
        await sock.sendMessage(m.key.remoteJid, {
            image: { url: imageUrl },
            caption: text
        });
    }
};
