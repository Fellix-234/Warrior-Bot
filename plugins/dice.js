export default {
    name: 'dice',
    description: 'Roll a dice or multiple dice',
    category: 'Games',
    async execute(sock, m, { args, prefix }) {
        const diceEmojis = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
        const animationFrames = ['🎲', '🎯', '🎲', '🎯', '🎲'];
        
        // Parse number of dice (default 1, max 5)
        const numDice = Math.min(parseInt(args[0]) || 1, 5);
        
        if (numDice < 1) {
            return await sock.sendMessage(m.key.remoteJid, { 
                text: `🎲 *Dice Game*\n\nUsage: ${prefix}dice [number]\n\nExample: ${prefix}dice 2\n\nRoll 1-5 dice at once!` 
            });
        }
        
        // Animation
        const animMsg = await sock.sendMessage(m.key.remoteJid, { 
            text: `🎲 Rolling ${numDice} dice...\n\n${animationFrames.join(' ')}` 
        });
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Roll dice
        const rolls = [];
        let total = 0;
        
        for (let i = 0; i < numDice; i++) {
            const roll = Math.floor(Math.random() * 6) + 1;
            rolls.push(roll);
            total += roll;
        }
        
        const diceDisplay = rolls.map(r => diceEmojis[r - 1]).join(' ');
        
        let result = `╔═══════════════════╗\n` +
            `║  🎲 *DICE ROLL*  ║\n` +
            `╚═══════════════════╝\n\n` +
            `🎯 *Result:* ${diceDisplay}\n` +
            `📊 *Numbers:* ${rolls.join(', ')}\n`;
        
        if (numDice > 1) {
            result += `➕ *Total:* ${total}\n` +
                `📈 *Average:* ${(total / numDice).toFixed(1)}\n`;
        }
        
        result += `\n━━━━━━━━━━━━━━━━━━\n`;
        
        // Add fun messages based on result
        if (numDice === 1) {
            if (rolls[0] === 6) result += `🎉 *Perfect roll!*\n`;
            else if (rolls[0] === 1) result += `😅 *Better luck next time!*\n`;
            else result += `✨ *Nice roll!*\n`;
        } else {
            const allSame = rolls.every(r => r === rolls[0]);
            if (allSame && rolls[0] === 6) result += `🏆 *JACKPOT! All 6s!*\n`;
            else if (allSame) result += `🎯 *All same! Impressive!*\n`;
            else if (total === numDice * 6) result += `🎊 *Maximum score!*\n`;
            else if (total === numDice) result += `💫 *Minimum score!*\n`;
            else result += `✨ *Good roll!*\n`;
        }
        
        result += `\n_Roll again anytime!_`;
        
        await sock.sendMessage(m.key.remoteJid, { text: result, edit: animMsg.key });
    }
};
