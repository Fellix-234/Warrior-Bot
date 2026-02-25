const jokes = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    "Why did the scarecrow win an award? Because he was outstanding in his field!",
    "Parallel lines have so much in common. It’s a shame they’ll never meet.",
    "What do you call a fake noodle? An Impasta.",
    "Why did the bicycle fall over? Because it was two-tired!",
    "Why don't skeletons fight each other? They don't have the guts.",
    "What's the best thing about Switzerland? I don't know, but the flag is a big plus.",
    "Did you hear about the guy who invented the Lifesaver? They say he made a mint!",
    "I'm on a seafood diet. I see food and I eat it."
];

export default {
    name: 'joke',
    description: 'Get a random joke',
    async execute(sock, m) {
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        await sock.sendMessage(m.key.remoteJid, { text: `😂 ${randomJoke}` });
    }
};
