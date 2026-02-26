import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

import config from '../config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pluginsDir = path.join(__dirname, '..', 'plugins');
const plugins = new Map();
const prefix = config.prefix;

export async function loadPlugins() {
    if (!fs.existsSync(pluginsDir)) {
        fs.mkdirSync(pluginsDir);
    }

    const files = fs.readdirSync(pluginsDir).filter(file => file.endsWith('.js'));
    for (const file of files) {
        try {
            const plugin = await import(`../plugins/${file}`);
            // Handle default export
            if (plugin.default && plugin.default.name) {
                plugins.set(plugin.default.name.toLowerCase(), plugin.default);
                console.log(`Loaded plugin: ${plugin.default.name}`);
            }
            // Handle named exports
            Object.keys(plugin).forEach(key => {
                if (key !== 'default' && plugin[key] && plugin[key].name) {
                    plugins.set(plugin[key].name.toLowerCase(), plugin[key]);
                    console.log(`Loaded plugin: ${plugin[key].name} (named)`);
                }
            });
        } catch (error) {
            console.error(`Error loading plugin ${file}:`, error);
        }
    }
}

// Initial load
loadPlugins();

export async function handleMessage(sock, m) {
    const sender = m.key.participant || m.key.remoteJid;
    const isOwner = sender === config.ownerNumber;
    const isGroup = m.key.remoteJid.endsWith('@g.us');
    const botName = config.botName;

    const messageContent = m.message?.conversation ||
        m.message?.extendedTextMessage?.text ||
        m.message?.imageMessage?.caption ||
        '';

    if (!messageContent.startsWith(prefix)) return;

    const [cmdName, ...args] = messageContent.slice(prefix.length).trim().split(/\s+/);
    const command = plugins.get(cmdName.toLowerCase());

    if (command) {
        // Privacy checks
        if (command.category === 'Owner' && !isOwner) {
            return await sock.sendMessage(m.key.remoteJid, { 
                text: '🔒 *Access Denied*\n\nThis command is restricted to the bot owner only.' 
            });
        }
        
        if (command.category === 'Group' && !isGroup) {
            return await sock.sendMessage(m.key.remoteJid, { 
                text: '👥 *Group Only*\n\nThis command can only be used in groups.' 
            });
        }

        try {
            await command.execute(sock, m, { args, isOwner, isGroup, botName, prefix });
        } catch (error) {
            console.error(`Error executing command ${cmdName}:`, error);
            await sock.sendMessage(m.key.remoteJid, { text: '❌ An error occurred while executing the command.' });
        }
    }
}

export function getPlugins() {
    return Array.from(plugins.values());
}
