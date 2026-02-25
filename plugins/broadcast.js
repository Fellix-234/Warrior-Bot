export default {
    name: 'broadcast',
    description: 'Send a message to all joined groups (Owner only)',
    async execute(sock, m, { args, isOwner }) {
        if (!isOwner) return await sock.sendMessage(m.key.remoteJid, { text: '❌ Owner only command!' });
        if (args.length === 0) return await sock.sendMessage(m.key.remoteJid, { text: 'Please provide a message to broadcast.' });

        const message = args.join(' ');
        const groups = Object.keys(await sock.groupFetchAllParticipating());

        await sock.sendMessage(m.key.remoteJid, { text: `📢 Broadcasting to ${groups.length} groups...` });

        for (const jid of groups) {
            await sock.sendMessage(jid, { text: `⚡ *WARRIOR BOT BROADCAST*\n\n${message}` });
        }

        await sock.sendMessage(m.key.remoteJid, { text: '✅ Broadcast complete!' });
    }
};
