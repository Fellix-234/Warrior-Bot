export default {
    name: 'channel',
    description: 'Get the official Warrior Bot channel link',
    category: 'General',
    async execute(sock, m, { botName }) {
        const channelUrl = 'https://whatsapp.com/channel/0029VbC6vR03rZZXWOUdtT1D';
        const channelName = '𝗪𝗔𝗥𝗥𝗜𝗢𝗥 𝗖𝗛𝗔𝗡𝗡𝗘𝗟 🛡️';
        
        const channelImages = [
            './assets/menu.png',
            './assets/dashboard.png',
            './assets/alive.png'
        ];
        
        const imageUrl = channelImages[Math.floor(Math.random() * channelImages.length)];
        
        const text = `╔═══════════════════════════╗\n` +
            `║  📢 *OFFICIAL CHANNEL*  ║\n` +
            `╚═══════════════════════════╝\n\n` +
            `🌟 *${channelName}*\n\n` +
            `Join our official WhatsApp channel for:\n\n` +
            `✨ Latest bot updates & features\n` +
            `🔥 Exclusive tips & tricks\n` +
            `📰 News & announcements\n` +
            `💡 Technical insights\n` +
            `🎁 Special content & giveaways\n` +
            `🤝 Community engagement\n\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `🔗 *Channel Link:*\n` +
            `${channelUrl}\n\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `📱 *How to Join:*\n` +
            `1. Tap the link above\n` +
            `2. Click "Follow" in WhatsApp\n` +
            `3. Enable notifications (recommended)\n` +
            `4. Enjoy exclusive content! 🎉\n\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `👨‍💻 *Developer:* Warrior Felix\n` +
            `🌐 Portfolio: elgringo.netlify.app\n` +
            `📱 Support: wa.me/2547391914\n\n` +
            `⭐ *GitHub:*\n` +
            `github.com/Fellix-234/Warrior-Bot\n\n` +
            `_Join today and stay connected! ${channelName} 💙_`;
        
        await sock.sendMessage(m.key.remoteJid, {
            image: { url: imageUrl },
            caption: text
        });
    }
};
