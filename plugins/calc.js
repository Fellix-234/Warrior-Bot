export default {
    name: 'calc',
    description: 'Perform basic math calculations',
    async execute(sock, m, { args }) {
        if (args.length === 0) return await sock.sendMessage(m.key.remoteJid, { text: 'Please provide an expression (e.g., .calc 5*10)' });

        const expression = args.join('');
        try {
            // Basic sanitization: only allow numbers and math operators
            if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
                throw new Error('Invalid characters in expression.');
            }

            const result = eval(expression);
            await sock.sendMessage(m.key.remoteJid, { text: `📊 *Calculation*\n\nExpression: ${expression}\nResult: *${result}*` });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: `❌ Error: ${e.message}` });
        }
    }
};
