import os from 'os';

export default {
    name: 'stats',
    description: 'Display comprehensive bot statistics and system info',
    category: 'General',
    async execute(sock, m, { botName }) {
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);
        const uptimeString = `${hours}h ${minutes}m ${seconds}s`;
        
        // System info
        const totalMem = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
        const freeMem = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
        const usedMem = (totalMem - freeMem).toFixed(2);
        const memUsage = ((usedMem / totalMem) * 100).toFixed(1);
        
        const cpus = os.cpus();
        const cpuModel = cpus[0].model;
        const cpuCores = cpus.length;
        
        const platform = os.platform();
        const arch = os.arch();
        const nodeVersion = process.version;
        
        // Bot info
        const groups = Object.keys(await sock.groupFetchAllParticipating());
        
        const text = `╔═══════════════════════════╗\n` +
            `║  📊 *BOT STATISTICS*  ║\n` +
            `╚═══════════════════════════╝\n\n` +
            `🤖 *BOT INFORMATION*\n` +
            `├ Name: ${botName}\n` +
            `├ Version: 1.2.0\n` +
            `├ Uptime: ${uptimeString}\n` +
            `└ Groups: ${groups.length} active\n\n` +
            `💻 *SYSTEM INFORMATION*\n` +
            `├ Platform: ${platform} (${arch})\n` +
            `├ Node.js: ${nodeVersion}\n` +
            `├ CPU: ${cpuModel}\n` +
            `├ Cores: ${cpuCores}\n` +
            `├ RAM: ${usedMem}GB / ${totalMem}GB (${memUsage}%)\n` +
            `└ Free RAM: ${freeMem}GB\n\n` +
            `⚡ *PERFORMANCE*\n` +
            `├ Status: ${ memUsage < 70 ? '✅ Optimal' : memUsage < 85 ? '⚠️ Moderate' : '🔴 High Load'}\n` +
            `├ Response: Active\n` +
            `└ Mode: Multi-Device\n\n` +
            `━━━━━━━━━━━━━━━━━━━━━━━\n` +
            `🔗 *Repository:* github.com/Fellix-234/Warrior-Bot\n` +
            `⭐ *Star the project to support!*\n\n` +
            `_Statistics generated at ${new Date().toLocaleString()}_`;
        
        await sock.sendMessage(m.key.remoteJid, { text });
    }
};
