const emojis = ['🍎', '🍊', '🍋', '🍇', '🍓', '🍒', '🍑', '🥝', '🍌', '🍉', '🥭', '🍍'];
const activeGames = new Map();

export default {
    name: 'slots',
    description: 'Play the emoji slot machine',
    category: 'Games',
    async execute(sock, m, { prefix }) {
        const chatId = m.key.remoteJid;
        
        // Prevent spam
        if (activeGames.has(chatId)) {
            return await sock.sendMessage(chatId, { 
                text: '⚠️ Slot machine is spinning! Wait for the current game to finish.' 
            });
        }
        
        activeGames.set(chatId, true);
        
        // Animation frames
        const frames = [
            '[ 🎰 | 🎰 | 🎰 ]',
            '[ 💫 | 💫 | 💫 ]',
            '[ 🎲 | 🎲 | 🎲 ]',
            '[ ⭐ | ⭐ | ⭐ ]'
        ];
        
        let animText = `╔═══════════════════╗\n` +
            `║  🎰 *SLOT MACHINE*  ║\n` +
            `╚═══════════════════╝\n\n` +
            `Spinning...\n\n` +
            `${frames[0]}\n\n` +
            `━━━━━━━━━━━━━━━━━━\n` +
            `_Good luck!_ 🍀`;
        
        const msg = await sock.sendMessage(chatId, { text: animText });
        
        // Animate
        for (let i = 0; i < 4; i++) {
            await new Promise(resolve => setTimeout(resolve, 400));
            animText = animText.replace(/\[ .* \]/, frames[i % frames.length]);
            await sock.sendMessage(chatId, { text: animText, edit: msg.key });
        }
        
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Generate result
        const slot1 = emojis[Math.floor(Math.random() * emojis.length)];
        const slot2 = emojis[Math.floor(Math.random() * emojis.length)];
        const slot3 = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Check win conditions
        let result = '';
        let prize = 0;
        
        if (slot1 === slot2 && slot2 === slot3) {
            result = '🎊 *JACKPOT!* 🎊';
            prize = 1000;
        } else if (slot1 === slot2 || slot2 === slot3 || slot1 === slot3) {
            result = '🎉 *WINNER!* 🎉';
            prize = 100;
        } else {
            result = '💫 *TRY AGAIN!* 💫';
            prize = 0;
        }
        
        const finalText = `╔═══════════════════╗\n` +
            `║  🎰 *SLOT MACHINE*  ║\n` +
            `╚═══════════════════╝\n\n` +
            `Result:\n\n` +
            `[ ${slot1} | ${slot2} | ${slot3} ]\n\n` +
            `━━━━━━━━━━━━━━━━━━\n\n` +
            `${result}\n`;
        
        const finalMsg = prize > 0 ? 
            `${finalText}💰 Prize: ${prize} coins!\n\n_Play again with ${prefix}slots!_` :
            `${finalText}Better luck next time!\n\n_Try again with ${prefix}slots!_`;
        
        await sock.sendMessage(chatId, { text: finalMsg, edit: msg.key });
        
        activeGames.delete(chatId);
    }
};
