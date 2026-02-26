import axios from 'axios';

export default {
    name: 'meme',
    description: 'Fetch a random meme',
    async execute(sock, m) {
        try {
            const res = await axios.get('https://meme-api.com/gimme');
            const data = res.data;

            await sock.sendMessage(m.key.remoteJid, {
                image: { url: data.url },
                caption: `🤣 *${data.title}*\n\nFrom: r/${data.subreddit}`
            });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: '❌ Could not fetch a meme right now.' });
        }
    }
};
