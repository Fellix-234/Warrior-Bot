export default {
    name: 'restart',
    description: 'Restart the bot (Owner only)',
    category: 'Owner',
    async execute(sock, m, { isOwner, botName }) {
        if (!isOwner) {
            return await sock.sendMessage(m.key.remoteJid, { 
                text: '🔒 *Access Denied*\n\nOnly the bot owner can restart the bot.' 
            });
        }

        await sock.sendMessage(m.key.remoteJid, { 
            text: `🔄 *Restarting ${botName}...*\n\n` +
                  `⏳ Bot is restarting, please wait...\n` +
                  `⚡ This will take a few seconds\n\n` +
                  `━━━━━━━━━━━━━━━━\n` +
                  `_The bot will be back online shortly!_`
        });

        console.log('\n🔄 Bot restart requested by owner...\n');
        
        // Give time for message to send
        setTimeout(() => {
            process.exit(0); // Exit process - will restart if using PM2/nodemon/systemd
        }, 2000);
    }
};
