export default {
    name: 'runtime',
    description: 'Check how long the bot has been running',
    category: 'General',
    async execute(sock, m, { botName }) {
        const uptime = process.uptime();
        
        const days = Math.floor(uptime / 86400);
        const hours = Math.floor((uptime % 86400) / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);
        
        let uptimeText = '';
        if (days > 0) uptimeText += `${days}d `;
        if (hours > 0) uptimeText += `${hours}h `;
        if (minutes > 0) uptimeText += `${minutes}m `;
        uptimeText += `${seconds}s`;
        
        const startTime = new Date(Date.now() - uptime * 1000);
        
        const text = `╔═══════════════════╗\n` +
            `║  ⏰ *RUNTIME*  ║\n` +
            `╚═══════════════════╝\n\n` +
            `🤖 *Bot:* ${botName}\n` +
            `⏱️ *Uptime:* ${uptimeText}\n` +
            `🚀 *Started:* ${startTime.toLocaleString()}\n` +
            `✅ *Status:* Online & Stable\n\n` +
            `━━━━━━━━━━━━━━━━━━\n` +
            `📊 *Performance Stats*\n` +
            `├ Memory: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\n` +
            `├ CPU Time: ${(process.cpuUsage().user / 1000000).toFixed(2)}s\n` +
            `└ Platform: ${process.platform}\n\n` +
            `_${botName} has been running smoothly! 🎯_`;
        
        await sock.sendMessage(m.key.remoteJid, { text });
    }
};
