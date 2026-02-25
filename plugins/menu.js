import { getPlugins } from '../lib/commandHandler.js';

export default {
    name: 'menu',
    description: 'Show a visual list of commands',
    async execute(sock, m, { botName, prefix }) {
        const plugins = getPlugins();
        let menuText = `🌟 *${botName.toUpperCase()} MENU* 🌟\n\n` +
            `Prefix: [ *${prefix}* ]\n\n`;

        const categories = {
            'General': ['ping', 'help', 'alive', 'menu', 'owner', 'repo'],
            'Download': ['song', 'video', 'play', 'yts', 'tiktok', 'fb', 'ig'],
            'Media': ['photocreate', 'sticker'],
            'Games': ['tictactoe', 'rps'],
            'Group': ['groupinfo', 'leave', 'tagall', 'kick', 'add', 'promote', 'demote'],
            'Utility': ['speed', 'uptime', 'system', 'calc', 'settings', 'weather', 'shorten', 'translate'],
            'Fun': ['meme', 'pickline', 'truth', 'dare', 'quote', 'joke', 'fact', 'trivia'],
            'NSFW': ['nsfw'],
            'Owner': ['eval', 'broadcast'],
            'Greetings': ['hi', 'hello']
        };

        const imageUrl = './assets/menu.png';

        for (const [category, cmds] of Object.entries(categories)) {
            menuText += `┏━━━〔 *${category}* 〕━━━┓\n`;
            cmds.forEach(cmdName => {
                const plugin = plugins.find(p => p.name === cmdName);
                if (plugin) {
                    menuText += `┃ 🔹 ${prefix}${plugin.name}\n`;
                }
            });
            menuText += `┗━━━━━━━━━━━━━━┛\n\n`;
        }

        menuText += `_Select a command and enjoy!_`;

        await sock.sendMessage(m.key.remoteJid, {
            image: { url: imageUrl },
            caption: menuText
        });
    }
};
