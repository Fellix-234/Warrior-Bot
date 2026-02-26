export default {
    name: 'truth',
    description: 'Get a random truth question',
    async execute(sock, m) {
        const questions = [
            'What is your biggest fear?',
            'Who is your secret crush?',
            'What is the most embarrassing thing you have ever done?',
            'Have you ever lied to your best friend?',
            'What is your deepest secret?',
            'What is the one thing you would change about yourself?',
            'If you could be invisible for a day, what would you do?'
        ];
        const random = questions[Math.floor(Math.random() * questions.length)];
        await sock.sendMessage(m.key.remoteJid, { text: `❓ *TRUTH*\n\n${random}` });
    }
};
