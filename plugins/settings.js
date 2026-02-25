import config from '../config.js';

export default {
    name: 'settings',
    description: 'View bot settings and configuration',
    async execute(sock, m, { isOwner }) {
        if (!isOwner) return await sock.sendMessage(m.key.remoteJid, { text: '❌ Owner only command.' });

        const settingsText = `⚙️ *BOT SETTINGS*\n\n` +
            `🤖 *Name:* ${config.botName}\n` +
            `🏷️ *Prefix:* ${config.prefix}\n` +
            `👑 *Owner:* ${config.ownerName}\n` +
            `🚀 *Version:* ${config.version}\n` +
            `🌐 *Mode:* ${config.mode.toUpperCase()}\n\n` +
            `📌 *AUTOMATION*\n` +
            `⌨️ *Typing:* ${config.autoTyping ? '✅' : '❌'}\n` +
            `🎤 *Recording:* ${config.autoRecording ? '✅' : '❌'}\n` +
            `👁️ *Status View:* ${config.autoStatusView ? '✅' : '❌'}\n` +
            `❤️ *Status React:* ${config.autoStatusReact ? '✅' : '❌'}\n` +
            `💬 *Msg React:* ${config.autoReactMessages ? '✅' : '❌'}\n\n` +
            `🕒 *Uptime:* ${Math.floor(process.uptime() / 3600)}h ${Math.floor((process.uptime() % 3600) / 60)}m\n\n` +
            `_Configure these in your .env file_`;

        await sock.sendMessage(m.key.remoteJid, { text: settingsText });
    }
};
