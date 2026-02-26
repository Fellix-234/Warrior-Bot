import { getPlugins } from '../lib/commandHandler.js';

export default {
    name: 'menu',
    description: 'Show a visual list of commands',
    category: 'General',
    async execute(sock, m, { botName, prefix, isOwner, isGroup }) {
        const plugins = getPlugins();
        const channelUrl = 'https://whatsapp.com/channel/your_channel_id';
        let menuText = `╔══════════════════════════╗\n` +
            `║  *${botName.toUpperCase()} — COMMAND HUB*  ║\n` +
            `╚══════════════════════════╝\n\n` +
            `Prefix: *${prefix}*\n` +
            `Type: *${prefix}menu* or *${prefix}help*\n\n`;

        const categories = {
            'General': ['ping', 'help', 'alive', 'menu', 'owner', 'repo', 'stats', 'about', 'info', 'runtime', 'commands', 'support'],
            'Download': ['song', 'video', 'play', 'yts', 'tiktok', 'fb', 'ig'],
            'Media': ['photocreate', 'sticker'],
            'Games': ['tictactoe', 'rps'],
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
            './assets/menu2.png',
            './assets/menu3.png',
            './assets/menu4.png',
            './assets/menu5.png'
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

        menuText += `──────────────\n`;
        
        if (isOwner) {
            menuText += `🔑 *Owner Mode Active*\n\n`;
        }
        
        menuText += `🔗 *View the Channel:*\n` +
            `${channelUrl}\n\n` +
            `⭐ *Star:* https://github.com/Fellix-234/Warrior-Bot/stargazers\n` +
            `🍴 *Fork:* https://github.com/Fellix-234/Warrior-Bot/fork\n` +
            `📚 *Repo:* https://github.com/Fellix-234/Warrior-Bot\n\n` +
            `_Select a command and enjoy!_`;

        await sock.sendMessage(m.key.remoteJid, {
            image: { url: imageUrl },
            caption: menuText
        });
    }
};
