export default {
    name: 'eval',
    description: 'Evaluate JavaScript code (Owner only)',
    category: 'Owner',
    async execute(sock, m, { args, isOwner }) {
        if (!isOwner) return await sock.sendMessage(m.key.remoteJid, { text: '❌ Access Denied: Owner only!' });

        if (args.length === 0) return await sock.sendMessage(m.key.remoteJid, { text: 'Please provide code to evaluate.' });

        const code = args.join(' ');
        try {
            let evaled = eval(code);
            if (typeof evaled !== 'string') evaled = await import('util').then(u => u.inspect(evaled));
            await sock.sendMessage(m.key.remoteJid, { text: evaled });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: `❌ Error: ${e.message}` });
        }
    }
};
