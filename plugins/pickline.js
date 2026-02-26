export default {
    name: 'pickline',
    description: 'Get a smooth or cheesy pick-up line',
    async execute(sock, m) {
        const lines = [
            'Are you a magician? Because whenever I look at you, everyone else disappears.',
            'Do you have a map? because I just got lost in your eyes.',
            'If you were a triangle, you\'d be acute one.',
            'Are you WiFi? Because I\'m really feeling a connection.',
            'Life without you is like a broken pencil... pointless.',
            'Is your name Google? Because you have everything I\'m searching for.',
            'Are you a keyboard? Because you\'re just my type.'
        ];
        const random = lines[Math.floor(Math.random() * lines.length)];
        await sock.sendMessage(m.key.remoteJid, { text: `😎 *PICKUP LINE*\n\n${random}` });
    }
};
