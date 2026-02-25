import axios from 'axios';

export default {
    name: 'nsfw',
    description: 'Get random NSFW anime images',
    async execute(sock, m, { args }) {
        const types = ['waifu', 'neko', 'trap', 'blowjob'];
        const type = args[0] || 'waifu';

        if (!types.includes(type)) {
            return await sock.sendMessage(m.key.remoteJid, { text: `❌ Invalid type. Available: ${types.join(', ')}` });
        }

        await sock.sendMessage(m.key.remoteJid, { text: `🔞 Fetching ${type}... (Ensure NSFW is enabled in group)` });

        try {
            const response = await axios.get(`https://api.waifu.pics/nsfw/${type}`);
            const imageUrl = response.data.url;

            await sock.sendMessage(m.key.remoteJid, {
                image: { url: imageUrl },
                caption: `🔞 *NSFW:* ${type}`
            });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: `❌ Error fetching content: ${e.message}` });
        }
    }
};
