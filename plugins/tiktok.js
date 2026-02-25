import axios from 'axios';

export default {
    name: 'tiktok',
    description: 'Download TikTok videos without watermark',
    async execute(sock, m, { args, botName }) {
        if (args.length === 0) return await sock.sendMessage(m.key.remoteJid, { text: 'Please provide a TikTok URL.' });

        const url = args[0];
        await sock.sendMessage(m.key.remoteJid, { text: `🚀 Downloading TikTok video...` });

        try {
            // Using a common public API for TikTok downloading
            const res = await axios.get(`https://api.vreden.my.id/api/tiktok?url=${url}`);
            const data = res.data.result;

            if (!data || !data.video) throw new Error('Could not fetch video.');

            await sock.sendMessage(m.key.remoteJid, {
                video: { url: data.video },
                caption: `✅ *TikTok Downloaded*\n\n👤 *Author:* ${data.author}\n📝 *Description:* ${data.description || 'N/A'}`
            });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: `❌ Error: ${e.message}` });
        }
    }
};
