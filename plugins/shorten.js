import axios from 'axios';

export default {
    name: 'shorten',
    description: 'Shorten a long URL using TinyURL',
    async execute(sock, m, { args }) {
        if (args.length === 0) return await sock.sendMessage(m.key.remoteJid, { text: 'Please provide a URL to shorten.' });

        const url = args[0];
        try {
            const response = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
            await sock.sendMessage(m.key.remoteJid, { text: `🔗 *Shortened URL:* ${response.data}` });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: `❌ Error shortening URL: ${e.message}` });
        }
    }
};
