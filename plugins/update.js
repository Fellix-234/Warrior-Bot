import { exec } from 'child_process';
import { promisify } from 'util';

const execPromise = promisify(exec);

export default {
    name: 'update',
    description: 'Check for bot updates or update to latest version',
    category: 'Owner',
    async execute(sock, m, { args, isOwner }) {
        if (!isOwner) {
            return await sock.sendMessage(m.key.remoteJid, { 
                text: '🔒 *Access Denied*\n\nOnly the bot owner can check for updates.' 
            });
        }

        const action = args[0]?.toLowerCase() || 'check';

        try {
            if (action === 'check') {
                // Check for updates
                await sock.sendMessage(m.key.remoteJid, { 
                    text: '🔍 *Checking for updates...*\n\nPlease wait...' 
                });

                // Fetch latest from remote
                await execPromise('git fetch origin');
                
                // Check if behind
                const { stdout: status } = await execPromise('git status -uno');
                const { stdout: commits } = await execPromise('git rev-list HEAD...origin/main --count');
                
                const behindCount = parseInt(commits.trim()) || 0;

                if (behindCount === 0) {
                    await sock.sendMessage(m.key.remoteJid, { 
                        text: `✅ *Up to Date!*\n\n` +
                              `🎯 Your bot is running the latest version.\n` +
                              `🚀 No updates available.\n\n` +
                              `━━━━━━━━━━━━━━━━\n` +
                              `Current Branch: main\n` +
                              `Status: ${status.includes('up to date') || status.includes('up-to-date') ? '✅ Latest' : '⚠️ Check Required'}\n\n` +
                              `_Use .update install to force reinstall_`
                    });
                } else {
                    await sock.sendMessage(m.key.remoteJid, { 
                        text: `🆕 *Updates Available!*\n\n` +
                              `📦 ${behindCount} new commit(s) available\n` +
                              `🔔 Updates include new features and improvements\n\n` +
                              `━━━━━━━━━━━━━━━━\n` +
                              `To update, use:\n` +
                              `\`\`\`.update install\`\`\`\n\n` +
                              `⚠️ *Warning:* This will update your bot to the latest version.\n` +
                              `Make sure you have backed up any custom changes!`
                    });
                }
            } else if (action === 'install' || action === 'now') {
                // Install updates
                await sock.sendMessage(m.key.remoteJid, { 
                    text: '⏳ *Installing Updates...*\n\n' +
                          '🔄 Pulling latest changes\n' +
                          '📦 Installing dependencies\n\n' +
                          '_This may take a moment..._'
                });

                // Pull latest changes
                const { stdout: pullOutput } = await execPromise('git pull origin main');
                
                // Install dependencies
                await execPromise('npm install');

                await sock.sendMessage(m.key.remoteJid, { 
                    text: `✅ *Update Complete!*\n\n` +
                          `🎉 Bot updated successfully!\n` +
                          `📦 Dependencies installed\n\n` +
                          `━━━━━━━━━━━━━━━━\n` +
                          `${pullOutput.includes('Already up to date') ? '✅ Was already up to date' : '🔄 Updates applied'}\n\n` +
                          `⚠️ *Restart Required*\n` +
                          `Please restart the bot for changes to take effect.\n\n` +
                          `_Use .restart command to reboot_`
                });
            } else if (action === 'changelog' || action === 'log') {
                // Show recent commits
                const { stdout: log } = await execPromise('git log origin/main --oneline -5');
                
                await sock.sendMessage(m.key.remoteJid, { 
                    text: `📜 *Recent Changes*\n\n` +
                          `━━━━━━━━━━━━━━━━\n` +
                          `${log}\n` +
                          `━━━━━━━━━━━━━━━━\n\n` +
                          `🌐 View full changelog:\n` +
                          `github.com/Fellix-234/Warrior-Bot/commits`
                });
            } else {
                await sock.sendMessage(m.key.remoteJid, { 
                    text: `📋 *Update Command Usage*\n\n` +
                          `• .update check - Check for updates\n` +
                          `• .update install - Install updates\n` +
                          `• .update changelog - View recent changes\n\n` +
                          `_Default: checks for updates_`
                });
            }
        } catch (error) {
            console.error('Update error:', error);
            await sock.sendMessage(m.key.remoteJid, { 
                text: `❌ *Update Failed*\n\n` +
                      `Error: ${error.message}\n\n` +
                      `This might happen if:\n` +
                      `• Git is not installed\n` +
                      `• Not in a git repository\n` +
                      `• Network issues\n` +
                      `• Permission errors\n\n` +
                      `Please update manually or contact support.`
            });
        }
    }
};
