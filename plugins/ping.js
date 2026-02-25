export default {
    name: 'ping',
    description: 'Check if the bot is alive',
    async execute(sock, m, args) {
        await sock.sendMessage(m.key.remoteJid, { text: 'Pong! 🏓' });
    }
};
