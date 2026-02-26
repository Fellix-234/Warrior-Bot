export default {
    name: 'dare',
    description: 'Get a random dare challenge',
    async execute(sock, m) {
        const challenges = [
            'Send a voice note singing a song.',
            'Change your profile picture to a potato for 1 hour.',
            'Text your crush "I like you" and send a screenshot.',
            'Do 20 pushups and send a video.',
            'Tell a joke that makes everyone laugh.',
            'Eat a spoonful of hot sauce.'
        ];
        const random = challenges[Math.floor(Math.random() * challenges.length)];
        await sock.sendMessage(m.key.remoteJid, { text: `🔥 *DARE*\n\n${random}` });
    }
};
