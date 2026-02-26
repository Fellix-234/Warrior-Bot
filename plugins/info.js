import os from 'os';

export default {
    name: 'info',
    description: 'Get detailed bot information',
    category: 'General',
    async execute(sock, m, { botName }) {
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        
        const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
        const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
        const usedMem = (totalMem - freeMem).toFixed(2);
        
        const groups = Object.keys(await sock.groupFetchAllParticipating());
        
        const text = `╔═══════════════════════════╗\n` +
            `║  ℹ️ *BOT INFORMATION*  ║\n` +
            `╚═══════════════════════════╝\n\n` +
            `🤖 *${botName}*\n` +
            `_The Ultimate WhatsApp Bot_\n\n` +
            `━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `📊 *Statistics*\n` +
            `├ Version: 1.2.0\n` +
            `├ Uptime: ${hours}h ${minutes}m\n` +
            `├ Groups: ${groups.length} active\n` +
            `└ Platform: ${os.platform()}\n\n` +
            `💻 *System*\n` +
            `├ Node.js: ${process.version}\n` +
            `├ RAM Usage: ${usedMem}GB / ${totalMem}GB\n` +
            `├ CPU: ${os.cpus()[0].model}\n` +
            `└ Cores: ${os.cpus().length}\n\n` +
            `⚡ *Features*\n` +
            `├ Multi-Device Support ✅\n` +
            `├ Auto-Pairing Mode ✅\n` +
            `├ Privacy Controls ✅\n` +
            `├ Video Note Support ✅\n` +
            `├ Auto-Reactions ✅\n` +
            `├ Typing Indicators ✅\n` +
            `└ Rotating Images ✅\n\n` +
            `━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `🛠️ *Technology Stack*\n` +
            `• @whiskeysockets/baileys\n` +
            `• Node.js & ES Modules\n` +
            `• Express.js Web Server\n` +
            `• Real-time Processing\n\n` +
            `━━━━━━━━━━━━━━━━━━━━━\n\n` +
            `👨‍💻 *Developers*\n` +
            `Warrior Felix & Team\n\n` +
            `📱 Support: wa.me/${process.env.OWNER_NUMBER?.split('@')[0] || '2547391914'}\n` +
            `⭐ GitHub: github.com/Fellix-234/Warrior-Bot\n\n` +
            `_Powered by cutting-edge technology! 🚀_`;

        await sock.sendMessage(m.key.remoteJid, { text });
    }
};
