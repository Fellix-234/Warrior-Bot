import ytdl from '@distube/ytdl-core';
import yts from 'yt-search';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    name: 'play',
    description: 'Play and download YouTube audio',
    async execute(sock, m, { args, botName }) {
        if (args.length === 0) return await sock.sendMessage(m.key.remoteJid, { text: 'Please provide a song name or URL.' });

        const query = args.join(' ');
        await sock.sendMessage(m.key.remoteJid, { text: `🎵 Processing your request: *${query}*...` });

        try {
            const search = await yts(query);
            const video = search.videos[0];

            if (!video) return await sock.sendMessage(m.key.remoteJid, { text: 'Song not found.' });

            const audioPath = path.join(__dirname, '..', `${video.videoId}.mp3`);

            const stream = ytdl(video.url, { filter: 'audioonly', quality: 'highestaudio' });
            const writer = fs.createWriteStream(audioPath);

            stream.pipe(writer);

            writer.on('finish', async () => {
                await sock.sendMessage(m.key.remoteJid, {
                    audio: { url: audioPath },
                    mimetype: 'audio/mpeg',
                    caption: `🎶 *Now Playing:* ${video.title}\n⏱️ *Duration:* ${video.timestamp}`
                });

                // Cleanup
                fs.unlink(audioPath).catch(console.error);
            });

            writer.on('error', async (err) => {
                console.error(err);
                await sock.sendMessage(m.key.remoteJid, { text: '❌ Error downloading audio.' });
            });

        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: `❌ Error: ${e.message}` });
        }
    }
};
