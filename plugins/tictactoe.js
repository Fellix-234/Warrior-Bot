export default {
    name: 'tictactoe',
    description: 'Play TicTacToe with another user',
    async execute(sock, m, { args, prefix }) {
        const jid = m.key.remoteJid;
        if (!global.ttt) global.ttt = {};

        if (args[0] === 'reset') {
            delete global.ttt[jid];
            return await sock.sendMessage(jid, { text: '🔄 TicTacToe board has been reset.' });
        }

        if (!global.ttt[jid]) {
            global.ttt[jid] = {
                board: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
                turn: 'X',
                players: [m.key.participant],
                active: true
            };
            return await sock.sendMessage(jid, { text: `🎮 *TicTacToe Started!*\n\nYou are *X*. Waiting for a second player to type *${prefix}ttt join*` });
        }

        const game = global.ttt[jid];

        if (args[0] === 'join' && game.players.length === 1) {
            game.players.push(m.key.participant);
            return await sock.sendMessage(jid, { text: `🎮 *Player 2 Joined!*\n\n${game.board.slice(0, 3).join(' | ')}\n${game.board.slice(3, 6).join(' | ')}\n${game.board.slice(6, 9).join(' | ')}\n\nIt is *X*'s turn!` });
        }

        const move = parseInt(args[0]);
        if (isNaN(move) || move < 1 || move > 9 || game.board[move - 1] === 'X' || game.board[move - 1] === 'O') {
            return await sock.sendMessage(jid, { text: '❌ Invalid move. Choose a number from 1-9.' });
        }

        const currentPlayer = game.turn === 'X' ? game.players[0] : game.players[1];
        if (m.key.participant !== currentPlayer) {
            return await sock.sendMessage(jid, { text: '⏳ Wait for your turn!' });
        }

        game.board[move - 1] = game.turn;

        // Winner Check
        const winPatterns = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        let winner = null;
        for (const p of winPatterns) {
            if (game.board[p[0]] === game.board[p[1]] && game.board[p[1]] === game.board[p[2]]) {
                winner = game.turn;
            }
        }

        if (winner) {
            const result = `🏆 *Player ${winner} Wins!*\n\n${game.board.slice(0, 3).join(' | ')}\n${game.board.slice(3, 6).join(' | ')}\n${game.board.slice(6, 9).join(' | ')}`;
            delete global.ttt[jid];
            return await sock.sendMessage(jid, { text: result });
        }

        if (game.board.every(cell => cell === 'X' || cell === 'O')) {
            delete global.ttt[jid];
            return await sock.sendMessage(jid, { text: '🤝 It\'s a Draw!' });
        }

        game.turn = game.turn === 'X' ? 'O' : 'X';
        const display = `🎮 *TicTacToe*\n\n${game.board.slice(0, 3).join(' | ')}\n${game.board.slice(3, 6).join(' | ')}\n${game.board.slice(6, 9).join(' | ')}\n\nNext Turn: *${game.turn}*`;
        await sock.sendMessage(jid, { text: display });
    }
};
