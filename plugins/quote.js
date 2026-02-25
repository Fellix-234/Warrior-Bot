const quotes = [
    "Your limitation—it's only your imagination.",
    "Push yourself, because no one else is going to do it for you.",
    "Sometimes later becomes never. Do it now.",
    "Great things never come from comfort zones.",
    "Dream it. Wish it. Do it.",
    "Success doesn’t just find you. You have to go out and get it.",
    "The harder you work for something, the greater you’ll feel when you achieve it.",
    "Dream bigger. Do bigger.",
    "Don’t stop when you’re tired. Stop when you’re done.",
    "Wake up with determination. Go to bed with satisfaction."
];

export default {
    name: 'quote',
    description: 'Get a random inspirational quote',
    async execute(sock, m) {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        await sock.sendMessage(m.key.remoteJid, { text: `💬 "${randomQuote}"` });
    }
};
