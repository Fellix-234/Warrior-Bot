export default {
    name: 'tagall',
    description: 'Mention all members in the group',
    category: 'Group',
    async execute(sock, m, { args, isOwner }) {
        if (!m.key.remoteJid.endsWith('@g.us')) {
            return await sock.sendMessage(m.key.remoteJid, { text: '❌ This command can only be used in groups.' });
        }

        try {
            const metadata = await sock.groupMetadata(m.key.remoteJid);
            const participants = metadata.participants;
            const isAdmin = participants.find(p => p.id === (m.key.participant || m.key.remoteJid))?.admin;

            if (!isAdmin && !isOwner) {
                return await sock.sendMessage(m.key.remoteJid, { text: '❌ Only admins can use this command.' });
            }

            let message = args.join(' ') || 'Attention everyone!';
            let tagText = `📢 *TAG ALL*\n\n*Message:* ${message}\n\n`;

            for (let mem of participants) {
                tagText += `🔹 @${mem.id.split('@')[0]}\n`;
            }

            await sock.sendMessage(m.key.remoteJid, {
                text: tagText,
                mentions: participants.map(p => p.id)
            });

        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: `❌ Error: ${e.message}` });
        }
    }
};
