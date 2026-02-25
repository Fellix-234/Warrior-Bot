import axios from 'axios';

export default {
    name: 'translate',
    description: 'Translate text to another language',
    async execute(sock, m, { args, prefix }) {
        if (args.length < 2) return await sock.sendMessage(m.key.remoteJid, { text: `Usage: ${prefix}translate [lang_code] [text]\nExample: ${prefix}translate es Hello world` });

        const to = args[0];
        const text = args.slice(1).join(' ');

        await sock.sendMessage(m.key.remoteJid, { text: '🔄 Translating...' });

        try {
            const response = await axios.get(`https://api.popcat.xyz/translate?to=${to}&text=${encodeURIComponent(text)}`);
            await sock.sendMessage(m.key.remoteJid, {
                text: `🔠 *Translation (${to.toUpperCase()}):*\n\n${response.data.translated}`
            });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: `❌ Error translating: ${e.message}` });
        }
    }
};
