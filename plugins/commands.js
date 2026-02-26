import { getPlugins } from '../lib/commandHandler.js';

export default {
    name: 'commands',
    description: 'Show total available commands and quick overview',
    category: 'General',
    async execute(sock, m, { botName, prefix }) {
        const plugins = getPlugins();
        
        // Count by category
        const categories = {};
        plugins.forEach(plugin => {
            const cat = plugin.category || 'Uncategorized';
            categories[cat] = (categories[cat] || 0) + 1;
        });

        let text = `╔═══════════════════════╗\n` +
            `║  📚 *COMMANDS LIST*  ║\n` +
            `╚═══════════════════════╝\n\n` +
            `🤖 *Bot:* ${botName}\n` +
            `📦 *Total Commands:* ${plugins.length}\n` +
            `⚡ *Prefix:* ${prefix}\n\n` +
            `━━━━━━━━━━━━━━━━━━━━\n` +
            `📊 *Commands by Category*\n\n`;

        for (const [category, count] of Object.entries(categories).sort((a, b) => b[1] - a[1])) {
            const emoji = {
                'General': '🔹',
                'Download': '📥',
                'Media': '🎨',
                'Games': '🎮',
                'Group': '👥',
                'Utility': '🛠️',
                'Fun': '🎉',
                'NSFW': '🔞',
                'Owner': '👑',
                'Greetings': '👋'
            }[category] || '📌';
            
            text += `${emoji} ${category}: ${count} command${count !== 1 ? 's' : ''}\n`;
        }

        text += `\n━━━━━━━━━━━━━━━━━━━━\n\n`;
        text += `💡 *Quick Tips*\n`;
        text += `• Use ${prefix}menu to see all commands\n`;
        text += `• Use ${prefix}help <command> for details\n`;
        text += `• Use ${prefix}about to learn more\n\n`;
        text += `━━━━━━━━━━━━━━━━━━━━\n`;
        text += `⭐ *Support the Project*\n`;
        text += `github.com/Fellix-234/Warrior-Bot\n\n`;
        text += `_${plugins.length} powerful commands at your service! 🚀_`;

        await sock.sendMessage(m.key.remoteJid, { text });
    }
};
