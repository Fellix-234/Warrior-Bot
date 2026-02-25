export default {
    name: 'speed',
    description: 'Check the bot response speed',
    async execute(sock, m) {
        const start = Date.now();
        await sock.sendMessage(m.key.remoteJid, { text: '🚀 Checking speed...' });
        const latency = Date.now() - start;
        await sock.sendMessage(m.key.remoteJid, { text: `⚡ *Response Latency:* ${latency}ms` });
    }
};
