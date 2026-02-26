export default {
    name: 'ping',
    description: 'Check bot response time',
    async execute(sock, m, args) {
        const start = Date.now();
        const sent = await sock.sendMessage(m.key.remoteJid, { text: '⚡ Pinging...' });
        const latency = Date.now() - start;
        
        await sock.sendMessage(m.key.remoteJid, {
            text: `╔══════════════════╗\n` +
                  `║  🏓 *PONG!*  ║\n` +
                  `╚══════════════════╝\n\n` +
                  `⚡ *Response Time:* ${latency}ms\n` +
                  `✅ *Status:* Active\n` +
                  `🚀 *Performance:* ${latency < 100 ? 'Excellent' : latency < 300 ? 'Good' : 'Fair'}\n\n` +
                  `_Bot is responding normally!_`,
            edit: sent.key
        });
    }
};
