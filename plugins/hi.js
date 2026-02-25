export default {
    name: 'hi',
    description: 'A friendly greeting',
    async execute(sock, m, { botName }) {
        await sock.sendMessage(m.key.remoteJid, { text: `👋 Hi there! I am ${botName}. How can I help you today?` });
    }
};
