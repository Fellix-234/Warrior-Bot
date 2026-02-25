import axios from 'axios';
import { decode } from 'html-entities';

export default {
    name: 'trivia',
    description: 'Get a random trivia question',
    async execute(sock, m) {
        await sock.sendMessage(m.key.remoteJid, { text: '🧠 Fetching a trivia question...' });

        try {
            const response = await axios.get('https://opentdb.com/api.php?amount=1&type=multiple');
            const data = response.data.results[0];

            const question = decode(data.question);
            const correctAnswer = decode(data.correct_answer);
            const incorrectAnswers = data.incorrect_answers.map(a => decode(a));
            const options = [...incorrectAnswers, correctAnswer].sort(() => Math.random() - 0.5);

            let text = `💡 *TRIVIA*\n\n*Category:* ${data.category}\n*Difficulty:* ${data.difficulty.toUpperCase()}\n\n*Question:* ${question}\n\n`;
            options.forEach((opt, i) => {
                text += `${i + 1}. ${opt}\n`;
            });
            text += `\n_Reply with the number to check (Coming soon!)_\n*Answer:* ||${correctAnswer}||`;

            await sock.sendMessage(m.key.remoteJid, { text });
        } catch (e) {
            await sock.sendMessage(m.key.remoteJid, { text: `❌ Error fetching trivia: ${e.message}` });
        }
    }
};
