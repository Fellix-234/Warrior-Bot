import axios from 'axios';

export default {
    name: 'fact',
    description: 'Get a random useless fact',
    async execute(sock, m) {
        await sock.sendMessage(m.key.remoteJid, { text: '🤔 Fetching a useless fact...' });

        try {
            const response = await axios.get('https://uselessfacts.jsph.pl/random.json?language=en');
            await sock.sendMessage(m.key.remoteJid, { text: `🧐 *Did you know?*\n\n${response.data.text}` });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: `❌ Error fetching fact: ${e.message}` });
        }
    }
};
