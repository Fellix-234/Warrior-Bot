import axios from 'axios';

export default {
    name: 'instagram',
    description: 'Download Instagram Reels or Posts',
    async execute(sock, m, { args, botName }) {
        if (args.length === 0) return await sock.sendMessage(m.key.remoteJid, { text: 'Please provide an Instagram URL.' });

        const url = args[0];
        await sock.sendMessage(m.key.remoteJid, { text: `🚀 Downloading Instagram media...` });

        try {
            // Using a public API for IG downloading
            const res = await axios.get(`https://api.vreden.my.id/api/igdl?url=${url}`);
            const data = res.data.result;

            if (!data || data.length === 0) throw new Error('Could not fetch media.');

            for (const item of data) {
                if (item.url.includes('.mp4')) {
                    await sock.sendMessage(m.key.remoteJid, { video: { url: item.url } });
                } else {
                    await sock.sendMessage(m.key.remoteJid, { image: { url: item.url } });
                }
            }
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: `❌ Error: ${e.message}` });
        }
    }
};
