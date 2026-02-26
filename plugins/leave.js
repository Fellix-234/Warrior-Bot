export default {
    name: 'leave',
    description: 'Make the bot leave the current group (Owner only)',
    category: 'Group',
    async execute(sock, m, { isOwner }) {
        if (!m.key.remoteJid.endsWith('@g.us')) {
            return await sock.sendMessage(m.key.remoteJid, { text: '❌ This command can only be used in groups.' });
        }

        if (!isOwner) {
            return await sock.sendMessage(m.key.remoteJid, { text: '❌ Access Denied: Owner only!' });
        }

        await sock.sendMessage(m.key.remoteJid, { text: '👋 Goodbye! Leaving the group...' });
        await sock.groupLeave(m.key.remoteJid);
    }
};
