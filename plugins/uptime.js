export default {
    name: 'uptime',
    description: 'Get the exact bot uptime',
    async execute(sock, m, { botName }) {
        const uptime = process.uptime();
        const d = Math.floor(uptime / (3600 * 24));
        const h = Math.floor((uptime % (3600 * 24)) / 3600);
        const m_ = Math.floor((uptime % 3600) / 60);
        const s = Math.floor(uptime % 60);

        const uptimeString = `${d > 0 ? d + 'd ' : ''}${h}h ${m_}m ${s}s`;
        await sock.sendMessage(m.key.remoteJid, { text: `🕒 *${botName} Uptime:* ${uptimeString}` });
    }
};
