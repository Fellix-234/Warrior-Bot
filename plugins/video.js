import ytdl from '@distube/ytdl-core';
import yts from 'yt-search';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    name: 'video',
    description: 'Download YouTube videos in MP4 format',
    async execute(sock, m, { args, prefix }) {
        if (args.length === 0) return await sock.sendMessage(m.key.remoteJid, { text: `Usage: ${prefix}video [video name/url]` });

        const query = args.join(' ');
        await sock.sendMessage(m.key.remoteJid, { text: `🎬 Searching and processing video: *${query}*...` });

        try {
            const search = await yts(query);
            const video = search.videos[0];

            if (!video) return await sock.sendMessage(m.key.remoteJid, { text: 'Video not found.' });

            const videoPath = path.join(__dirname, '..', `${video.videoId}.mp4`);

            const stream = ytdl(video.url, { filter: 'bitrate', quality: 'lowest' });
            const writer = fs.createWriteStream(videoPath);

            stream.pipe(writer);

            writer.on('finish', async () => {
                await sock.sendMessage(m.key.remoteJid, {
                    video: { url: videoPath },
                    caption: `� *Warrior Bot Video Downloader*\n\n📌 *Title:* ${video.title}\n⏳ *Duration:* ${video.timestamp}\n🔗 *Link:* ${video.url}`
                }, { quoted: m });

                // Cleanup
                fs.unlink(videoPath).catch(console.error);
            });

            writer.on('error', async (err) => {
                console.error(err);
                await sock.sendMessage(m.key.remoteJid, { text: '❌ Error downloading video file.' });
            });

        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: `❌ Error: ${e.message}` });
        }
    }
};
