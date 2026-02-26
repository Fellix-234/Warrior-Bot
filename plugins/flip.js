export default {
    name: 'flip',
    description: 'Flip a coin - heads or tails',
    category: 'Games',
    async execute(sock, m, { args, prefix }) {
        const userChoice = args[0]?.toLowerCase();
        
        if (!userChoice || !['heads', 'tails', 'h', 't'].includes(userChoice)) {
            return await sock.sendMessage(m.key.remoteJid, { 
                text: `🪙 *Coin Flip Game*\n\n` +
                      `Usage: ${prefix}flip <heads/tails>\n` +
                      `Short: ${prefix}flip h or ${prefix}flip t\n\n` +
                      `Example:\n` +
                      `${prefix}flip heads\n` +
                      `${prefix}flip h\n\n` +
                      `_Choose your side and test your luck!_ 🍀`
            });
        }
        
        const choice = userChoice === 'h' ? 'heads' : userChoice === 't' ? 'tails' : userChoice;
        
        // Animation
        const animMsg = await sock.sendMessage(m.key.remoteJid, { 
            text: `🪙 *Flipping the coin...*\n\n` +
                  `╔═══════════════════╗\n` +
                  `║      🌀 ↻ 🌀      ║\n` +
                  `╚═══════════════════╝\n\n` +
                  `_The coin is spinning..._`
        });
        
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Result
        const result = Math.random() < 0.5 ? 'heads' : 'tails';
        const won = result === choice;
        
        const coinImages = {
            heads: '🟡',
            tails: '⚪'
        };
        
        let finalText = `╔═══════════════════╗\n` +
            `║  🪙 *COIN FLIP*  ║\n` +
            `╚═══════════════════╝\n\n` +
            `${coinImages[result]} The coin landed on:\n` +
            `✨ *${result.toUpperCase()}* ✨\n\n` +
            `━━━━━━━━━━━━━━━━━━\n` +
            `Your choice: ${choice.toUpperCase()}\n` +
            `Result: ${result.toUpperCase()}\n` +
            `━━━━━━━━━━━━━━━━━━\n\n`;
        
        if (won) {
            finalText += `🎉 *YOU WIN!*\n` +
                `💰 You guessed correctly!\n` +
                `🏆 Perfect prediction!\n\n` +
                `_Congratulations! 🎊_`;
        } else {
            finalText += `💫 *YOU LOSE!*\n` +
                `😅 Better luck next time!\n` +
                `🔄 Try again!\n\n` +
                `_Don't give up! 💪_`;
        }
        
        await sock.sendMessage(m.key.remoteJid, { text: finalText, edit: animMsg.key });
    }
};
