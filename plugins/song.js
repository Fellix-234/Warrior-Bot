import ytdl from '@distube/ytdl-core';
import yts from 'yt-search';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    name: 'song',
    description: 'Download YouTube songs as Audio or Video',
    async execute(sock, m, { args, prefix }) {
        if (args.length === 0) return await sock.sendMessage(m.key.remoteJid, { text: `Usage: ${prefix}song [name/url] --video (for mp4)` });

        const isVideo = args.includes('--video');
        const query = args.filter(a => a !== '--video').join(' ');

        await sock.sendMessage(m.key.remoteJid, { text: `🎵 Searching for: *${query}*...` });

        try {
            const search = await yts(query);
            const video = search.videos[0];

            if (!video) return await sock.sendMessage(m.key.remoteJid, { text: 'Song not found.' });

            const ext = isVideo ? 'mp4' : 'mp3';
            const filePath = path.join(__dirname, '..', `${video.videoId}.${ext}`);
            const options = isVideo ? { filter: 'bitrate', quality: 'lowest' } : { filter: 'audioonly', quality: 'highestaudio' };

            const stream = ytdl(video.url, options);
            const writer = fs.createWriteStream(filePath);

            stream.pipe(writer);

            writer.on('finish', async () => {
                if (isVideo) {
                    await sock.sendMessage(m.key.remoteJid, {
                        video: { url: filePath },
                        caption: `🎬 *Title:* ${video.title}\n⏱️ *Duration:* ${video.timestamp}\n🔗 *Link:* ${video.url}`
                    });
                } else {
                    await sock.sendMessage(m.key.remoteJid, {
                        audio: { url: filePath },
                        mimetype: 'audio/mpeg',
                        caption: `🎶 *Title:* ${video.title}\n⏱️ *Duration:* ${video.timestamp}`
                    });
                }

                // Cleanup
                fs.unlink(filePath).catch(console.error);
            });

            writer.on('error', async (err) => {
                console.error(err);
                await sock.sendMessage(m.key.remoteJid, { text: `❌ Error downloading ${ext === 'mp4' ? 'video' : 'audio'}.` });
            });

        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: `❌ Error: ${e.message}` });
        }
    }
};
