export default {
    name: 'hello',
    description: 'Another friendly greeting',
    async execute(sock, m, { botName }) {
        await sock.sendMessage(m.key.remoteJid, { text: `👋 Hello! I'm ${botName}. Type .menu to see what I can do!` });
    }
};
