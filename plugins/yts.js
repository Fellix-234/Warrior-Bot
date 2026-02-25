import yts from 'yt-search';

export default {
    name: 'yts',
    description: 'Search for YouTube videos',
    async execute(sock, m, { args, botName }) {
        if (args.length === 0) return await sock.sendMessage(m.key.remoteJid, { text: 'Please provide a search term.' });

        const query = args.join(' ');
        await sock.sendMessage(m.key.remoteJid, { text: `🔍 Searching for: *${query}*...` });

        try {
            const results = await yts(query);
            const videos = results.videos.slice(0, 5);

            if (videos.length === 0) return await sock.sendMessage(m.key.remoteJid, { text: 'No results found.' });

            let text = `🎥 *YouTube Search Results*\n\n`;
            videos.forEach((video, i) => {
                text += `*${i + 1}. ${video.title}*\n`;
                text += `👤 *Channel:* ${video.author.name}\n`;
                text += `⏱️ *Duration:* ${video.timestamp}\n`;
                text += `🔗 *Link:* ${video.url}\n\n`;
            });

            const firstVideo = videos[0];
            await sock.sendMessage(m.key.remoteJid, {
                image: { url: firstVideo.thumbnail },
                caption: text
            });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: `❌ Error: ${e.message}` });
        }
    }
};
