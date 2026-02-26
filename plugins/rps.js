export default {
    name: 'rps',
    description: 'Play Rock-Paper-Scissors with the bot',
    async execute(sock, m, { args }) {
        const choices = ['rock', 'paper', 'scissors'];
        const userChoice = args[0]?.toLowerCase();

        if (!choices.includes(userChoice)) {
            return await sock.sendMessage(m.key.remoteJid, { text: '❌ Please choose: *rock*, *paper*, or *scissors*' });
        }

        const botChoice = choices[Math.floor(Math.random() * choices.length)];
        let result = '';

        if (userChoice === botChoice) {
            result = '🤝 It\'s a *Tie*!';
        } else if (
            (userChoice === 'rock' && botChoice === 'scissors') ||
            (userChoice === 'paper' && botChoice === 'rock') ||
            (userChoice === 'scissors' && botChoice === 'paper')
        ) {
            result = '🎉 *You Win!*';
        } else {
            result = '💀 *Bot Wins!*';
        }

        await sock.sendMessage(m.key.remoteJid, {
            text: `🎮 *RPS Game*\n\n👤 You: *${userChoice.toUpperCase()}*\n🤖 Bot: *${botChoice.toUpperCase()}*\n\nResult: ${result}`
        });
    }
};
