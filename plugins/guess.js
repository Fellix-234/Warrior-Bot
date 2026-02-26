const activeGames = new Map();

export default {
    name: 'guess',
    description: 'Guess the number game (1-100)',
    category: 'Games',
    async execute(sock, m, { args, prefix }) {
        const chatId = m.key.remoteJid;
        
        // Check if game already active
        if (activeGames.has(chatId)) {
            const game = activeGames.get(chatId);
            const guess = parseInt(args[0]);
            
            if (isNaN(guess) || guess < 1 || guess > 100) {
                return await sock.sendMessage(chatId, { 
                    text: `⚠️ Please guess a number between 1-100!\n\nExample: ${prefix}guess 50` 
                });
            }
            
            game.attempts++;
            
            if (guess === game.number) {
                const time = ((Date.now() - game.startTime) / 1000).toFixed(1);
                const points = Math.max(150 - (game.attempts * 10), 20);
                
                activeGames.delete(chatId);
                
                return await sock.sendMessage(chatId, {
                    text: `╔═══════════════════╗\n` +
                          `║  🎯 *YOU WIN!*  ║\n` +
                          `╚═══════════════════╝\n\n` +
                          `🎉 Correct! The number was *${game.number}*\n\n` +
                          `📊 *Stats:*\n` +
                          `├ Attempts: ${game.attempts}\n` +
                          `├ Time: ${time}s\n` +
                          `└ Points: ${points}\n\n` +
                          `━━━━━━━━━━━━━━━━━━\n` +
                          `${game.attempts <= 5 ? '🏆 Amazing!' : game.attempts <= 10 ? '✨ Great job!' : '💫 Well done!'}\n\n` +
                          `_Play again with ${prefix}guess!_`
                });
            } else {
                const hint = guess < game.number ? '📈 Higher!' : '📉 Lower!';
                const remaining = 15 - game.attempts;
                
                if (game.attempts >= 15) {
                    activeGames.delete(chatId);
                    return await sock.sendMessage(chatId, {
                        text: `💫 *Game Over!*\n\n` +
                              `You've used all 15 attempts!\n` +
                              `The number was: *${game.number}*\n\n` +
                              `Try again with ${prefix}guess!`
                    });
                }
                
                return await sock.sendMessage(chatId, {
                    text: `${hint}\n\n` +
                          `Your guess: *${guess}*\n` +
                          `Attempts: ${game.attempts}/15\n` +
                          `Remaining: ${remaining}\n\n` +
                          `_Keep guessing!_ 🎯`
                });
            }
        }
        
        // Start new game
        const number = Math.floor(Math.random() * 100) + 1;
        activeGames.set(chatId, {
            number,
            attempts: 0,
            startTime: Date.now()
        });
        
        await sock.sendMessage(chatId, {
            text: `╔═══════════════════════╗\n` +
                  `║  🎲 *NUMBER GUESS*  ║\n` +
                  `╚═══════════════════════╝\n\n` +
                  `🎯 I'm thinking of a number between *1-100*\n\n` +
                  `━━━━━━━━━━━━━━━━━━━━\n` +
                  `📋 *Rules:*\n` +
                  `• You have 15 attempts\n` +
                  `• I'll give you hints (higher/lower)\n` +
                  `• Fewer attempts = more points\n\n` +
                  `━━━━━━━━━━━━━━━━━━━━\n` +
                  `💡 *How to play:*\n` +
                  `Type: ${prefix}guess <number>\n` +
                  `Example: ${prefix}guess 50\n\n` +
                  `_Good luck! 🍀_`
        });
        
        // Auto-timeout after 3 minutes
        setTimeout(() => {
            if (activeGames.has(chatId)) {
                const game = activeGames.get(chatId);
                activeGames.delete(chatId);
                sock.sendMessage(chatId, {
                    text: `⏰ Game timed out!\n\nThe number was: *${game.number}*\n\nStart a new game with ${prefix}guess!`
                });
            }
        }, 180000);
    }
};
