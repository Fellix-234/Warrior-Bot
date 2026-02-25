import axios from 'axios';

const facebook = {
    name: 'facebook',
    description: 'Download Facebook videos',
    async execute(sock, m, { args, botName }) {
        if (args.length === 0) return await sock.sendMessage(m.key.remoteJid, { text: 'Please provide a Facebook video URL.' });

        const url = args[0];
        await sock.sendMessage(m.key.remoteJid, { text: `🚀 Downloading Facebook video...` });

        try {
            const res = await axios.get(`https://api.vreden.my.id/api/facebook?url=${url}`);
            const data = res.data.result;

            if (!data || !data.hd) throw new Error('Could not fetch video.');

            await sock.sendMessage(m.key.remoteJid, {
                video: { url: data.hd },
                caption: `✅ *Facebook Video Downloaded*`
            });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: `❌ Error: ${e.message}` });
        }
    }
};

export default facebook;

export const fb = {
    ...facebook,
    name: 'fb'
};
