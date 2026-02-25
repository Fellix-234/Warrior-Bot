export default {
    name: 'groupinfo',
    description: 'Get details about the current group',
    async execute(sock, m) {
        if (!m.key.remoteJid.endsWith('@g.us')) {
            return await sock.sendMessage(m.key.remoteJid, { text: '❌ This command can only be used in groups.' });
        }

        try {
            const metadata = await sock.groupMetadata(m.key.remoteJid);
            const text = `📋 *Group Information*\n\n` +
                `📌 *Name:* ${metadata.subject}\n` +
                `🆔 *ID:* ${metadata.id}\n` +
                `👤 *Owner:* ${metadata.owner || 'Unknown'}\n` +
                `👥 *Participants:* ${metadata.participants.length}\n` +
                `📅 *Created:* ${new Date(metadata.creation * 1000).toLocaleString()}\n\n` +
                `📝 *Description:* \n${metadata.desc || 'No description'}`;

            await sock.sendMessage(m.key.remoteJid, { text });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: `❌ Error fetching group info: ${e.message}` });
        }
    }
};
