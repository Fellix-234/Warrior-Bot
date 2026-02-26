import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import config from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = config.port;

let pairingStatus = {
    connected: false,
    qr: null,
    pairingCode: null
};

export function updateStatus(status) {
    pairingStatus = { ...pairingStatus, ...status };
}

export function startServer() {
    // Serve static files from the 'public' directory
    app.use(express.static(path.join(__dirname, 'public')));

    // Status API for the web frontend
    app.get('/api/status', (req, res) => {
        res.json(pairingStatus);
    });

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    app.listen(PORT, () => {
        console.log(`📡 WarriorBot Web Server running on port ${PORT}`);
    });
}

export default startServer;
