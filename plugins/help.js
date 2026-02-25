import { getPlugins } from '../lib/commandHandler.js';

export default {
    name: 'help',
    description: 'List all available commands',
    async execute(sock, m, args) {
        const plugins = getPlugins();
        let helpText = '🔍 *Warrior Bot Commands*\n\n';

        plugins.forEach(plugin => {
            helpText += `* .${plugin.name}* - ${plugin.description}\n`;
        });

        await sock.sendMessage(m.key.remoteJid, { text: helpText });
    }
};
