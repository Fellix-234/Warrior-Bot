import os from 'os';
import osUtils from 'os-utils';

export default {
    name: 'system',
    description: 'Show detailed system information',
    async execute(sock, m, { botName }) {
        osUtils.cpuUsage(async (v) => {
            const cpu = (v * 100).toFixed(2);
            const ram = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
            const freeRam = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);
            const usedRam = (ram - freeRam).toFixed(2);
            const platform = os.platform();
            const arch = os.arch();
            const uptime = process.uptime();

            const text = `🖥️ *${botName} System Details*\n\n` +
                `🚀 *CPU:* ${cpu}%\n` +
                `🧠 *RAM:* ${usedRam}GB / ${ram}GB\n` +
                `💻 *OS:* ${platform} (${arch})\n` +
                `⏱️ *Uptime:* ${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m\n` +
                `📂 *Node Version:* ${process.version}`;

            await sock.sendMessage(m.key.remoteJid, { text });
        });
    }
};
