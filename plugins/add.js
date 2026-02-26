export default {
    name: 'add',
    description: 'Add a member to the group',
    category: 'Group',
    async execute(sock, m, { args, isOwner, prefix }) {
        if (!m.key.remoteJid.endsWith('@g.us')) {
            return await sock.sendMessage(m.key.remoteJid, { text: '❌ This command can only be used in groups.' });
        }

        const metadata = await sock.groupMetadata(m.key.remoteJid);
        const participants = metadata.participants;
        const isAdmin = participants.find(p => p.id === (m.key.participant || m.key.remoteJid))?.admin;
        const botIsAdmin = participants.find(p => p.id === sock.user.id.split(':')[0] + '@s.whatsapp.net')?.admin;

        if (!isAdmin && !isOwner) return await sock.sendMessage(m.key.remoteJid, { text: '❌ Only admins can use this command.' });
        if (!botIsAdmin) return await sock.sendMessage(m.key.remoteJid, { text: '❌ I need to be an admin to add members.' });

        if (args.length === 0) return await sock.sendMessage(m.key.remoteJid, { text: `❌ Please provide a phone number. Usage: ${prefix}add 1234567890` });

        const user = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';

        try {
            await sock.groupParticipantsUpdate(m.key.remoteJid, [user], 'add');
            await sock.sendMessage(m.key.remoteJid, { text: `✅ User added successfully.` });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: `❌ Error adding user: ${e.message}` });
        }
    }
};
