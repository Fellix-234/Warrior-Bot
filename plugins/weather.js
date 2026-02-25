import axios from 'axios';

export default {
    name: 'weather',
    description: 'Get weather information for a city',
    async execute(sock, m, { args }) {
        if (args.length === 0) return await sock.sendMessage(m.key.remoteJid, { text: 'Please provide a city name.' });

        const city = args.join(' ');
        await sock.sendMessage(m.key.remoteJid, { text: `☁️ Fetching weather for *${city}*...` });

        try {
            const response = await axios.get(`https://wttr.in/${encodeURIComponent(city)}?format=3`);
            await sock.sendMessage(m.key.remoteJid, { text: `🌦️ *Weather:* ${response.data.trim()}` });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: `❌ Error fetching weather: ${e.message}` });
        }
    }
};
