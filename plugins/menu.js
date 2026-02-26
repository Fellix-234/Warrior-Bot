import { getPlugins } from '../lib/commandHandler.js';

export default {
    name: 'menu',
    description: 'Show a visual list of commands',
    category: 'General',
    async execute(sock, m, { botName, prefix, isOwner, isGroup }) {
        const plugins = getPlugins();
        const channelUrl = 'https://whatsapp.com/channel/0029VbC6vR03rZZXWOUdtT1D';
        const channelName = '𝗪𝗔𝗥𝗥𝗜𝗢𝗥 𝗖𝗛𝗔𝗡𝗡𝗘𝗟 🛡️';
        let menuText = `╔══════════════════════════╗\n` +
            `║  *${botName.toUpperCase()} — COMMAND HUB*  ║\n` +
            `╚══════════════════════════╝\n\n` +
            `Prefix: *${prefix}*\n` +
            `Type: *${prefix}menu* or *${prefix}help*\n\n` +
            `👨‍💻 *DEVELOPER INFO*\n` +
            `━━━━━━━━━━━━━━━━━━\n` +
            `👤 Warrior Felix\n` +
            `🌐 Portfolio: elgringo.netlify.app\n` +
            `📱 WhatsApp: wa.me/${process.env.OWNER_NUMBER?.split('@')[0] || '2547391914'}\n` +
            `💼 Professional Bot Developer\n\n` +
            `📢 *${channelName}*\n` +
            `${channelUrl}\n\n` +
            `⭐ *Support the Project:*\n` +
            `Star: github.com/Fellix-234/Warrior-Bot/stargazers\n` +
            `Fork: github.com/Fellix-234/Warrior-Bot/fork\n` +
            `Repo: github.com/Fellix-234/Warrior-Bot\n\n` +
            `──────────────\n\n`;

        const categories = {
            'General': ['ping', 'help', 'alive', 'menu', 'owner', 'repo', 'stats', 'about', 'info', 'runtime', 'commands', 'support', 'channel'],
            'Download': ['song', 'video', 'play', 'yts', 'tiktok', 'fb', 'ig'],
            'Media': ['photocreate', 'sticker'],
            'Games': ['tictactoe', 'rps', 'dice', 'slots', 'quiz', 'flip', 'guess'],
            'Group': ['groupinfo', 'leave', 'tagall', 'kick', 'add', 'promote', 'demote'],
            'Utility': ['speed', 'uptime', 'system', 'calc', 'settings', 'weather', 'shorten', 'translate', 'style'],
            'Fun': ['meme', 'pickline', 'truth', 'dare', 'quote', 'joke', 'fact', 'trivia', 'style'],
            'NSFW': ['nsfw'],
            'Owner': ['eval', 'broadcast', 'update', 'restart'],
            'Greetings': ['hi', 'hello']
        };

        // Rotating images for menu command
        const menuImages = [
            './assets/menu.png',
            './assets/dashboard.png',
            './assets/alive.png'
        ];
        
        const imageUrl = menuImages[Math.floor(Math.random() * menuImages.length)];

        for (const [category, cmds] of Object.entries(categories)) {
            // Hide owner commands from non-owners
            if (category === 'Owner' && !isOwner) continue;
            
            // Hide group commands in DM and add group indicator
            const categoryDisplay = category === 'Group' && !isGroup ? 
                `${category} 👥 (Group Only)` : category;
            
            menuText += `◆ *${categoryDisplay}*\n`;
            cmds.forEach(cmdName => {
                const plugin = plugins.find(p => p.name === cmdName);
                if (plugin) {
                    menuText += `  • ${prefix}${plugin.name}\n`;
                }
            });
            menuText += `\n`;
        }

        if (isOwner) {
            menuText += `🔑 *Owner Mode Active*\n\n`;
        }

        menuText += `_Built with 💙 by Warrior Felix | v1.2.0_`;

        await sock.sendMessage(m.key.remoteJid, {
            image: { url: imageUrl },
            caption: menuText
        });
    }
};
