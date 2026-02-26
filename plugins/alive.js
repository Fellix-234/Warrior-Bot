export default {
    name: 'alive',
    description: 'Check if the bot is active with detail',
    category: 'General',
    async execute(sock, m, { botName }) {
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);
        const uptimeString = `${hours}h ${minutes}m ${seconds}s`;
        
        // Rotating images for alive command
        const aliveImages = [
            './assets/alive.png',
            './assets/alive2.png',
            './assets/alive3.png',
            './assets/alive4.png',
            './assets/alive5.png'
        ];
        
        const videoNoteUrl = process.env.VIDEO_NOTE_URL || './assets/alive_note.mp4';
        const imageUrl = aliveImages[Math.floor(Math.random() * aliveImages.length)];
        const useVideoNote = process.env.ENABLE_VIDEO_NOTE === 'true';

        const text = `╔═══════════════════╗\n` +
            `║  🛡️ *${botName.toUpperCase()}*  ║\n` +
            `╚═══════════════════╝\n\n` +
            `✅ *STATUS:* Online & Active\n` +
            `⏰ *UPTIME:* ${uptimeString}\n` +
            `🚀 *VERSION:* 1.2.0\n` +
            `⚡ *MODE:* Multi-Device\n` +
            `🔥 *PERFORMANCE:* Optimal\n\n` +
            `━━━━━━━━━━━━━━━━━━\n` +
            `�‍💻 *Dev:* Warrior Felix | elgringo.netlify.app\n` +
            `�🔗 *Channel:* https://whatsapp.com/channel/your_channel_id\n` +
            `⭐ *Star:* https://github.com/Fellix-234/Warrior-Bot/stargazers\n` +
            `📚 *Repo:* https://github.com/Fellix-234/Warrior-Bot\n\n` +
            `_Your bot is running smoothly! 🎯_`;

        // Send video note if enabled, otherwise send image
        if (useVideoNote) {
            try {
                // Send video note (circular video message)
                await sock.sendMessage(m.key.remoteJid, {
                    video: { url: videoNoteUrl },
                    caption: text,
                    ptv: true, // This makes it a video note (round video)
                    gifPlayback: false
                });
            } catch (error) {
                console.log('Video note failed, sending image instead:', error.message);
                // Fallback to image if video note fails
                await sock.sendMessage(m.key.remoteJid, {
                    image: { url: imageUrl },
                    caption: text
                });
            }
        } else {
            // Default: send image
            await sock.sendMessage(m.key.remoteJid, {
                image: { url: imageUrl },
                caption: text
            });
        }
    }
};
