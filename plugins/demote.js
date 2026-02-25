export default {
    name: 'demote',
    description: 'Demote an admin to member',
    async execute(sock, m, { args, isOwner, prefix }) {
        if (!m.key.remoteJid.endsWith('@g.us')) {
            return await sock.sendMessage(m.key.remoteJid, { text: '❌ This command can only be used in groups.' });
        }

        const metadata = await sock.groupMetadata(m.key.remoteJid);
        const participants = metadata.participants;
        const isAdmin = participants.find(p => p.id === (m.key.participant || m.key.remoteJid))?.admin;
        const botIsAdmin = participants.find(p => p.id === sock.user.id.split(':')[0] + '@s.whatsapp.net')?.admin;

        if (!isAdmin && !isOwner) return await sock.sendMessage(m.key.remoteJid, { text: '❌ Only admins can use this command.' });
        if (!botIsAdmin) return await sock.sendMessage(m.key.remoteJid, { text: '❌ I need to be an admin to demote members.' });

        let users = m.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
        if (m.message?.extendedTextMessage?.contextInfo?.quotedMessage) {
            users.push(m.message.extendedTextMessage.contextInfo.participant);
        }

        if (users.length === 0 && args.length > 0) {
            users.push(args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net');
        }

        if (users.length === 0) return await sock.sendMessage(m.key.remoteJid, { text: `❌ Please mention a user or reply to their message. Usage: ${prefix}demote @user` });

        for (let user of users) {
            await sock.groupParticipantsUpdate(m.key.remoteJid, [user], 'demote');
        }

        await sock.sendMessage(m.key.remoteJid, { text: '✅ Member(s) demoted successfully.' });
    }
};
