import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import config from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json()); // For parsing application/json
const PORT = config.port;

let pairingStatus = {
    connected: false,
    qr: null,
    pairingCode: null
};

let onPairingCodeRequest = null;
let onQRRequest = null;

export function setPairingCallbacks(callbacks) {
    if (callbacks.onPairingCodeRequest) onPairingCodeRequest = callbacks.onPairingCodeRequest;
    if (callbacks.onQRRequest) onQRRequest = callbacks.onQRRequest;
}

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

    // Endpoint to trigger a new pairing code request
    app.post('/api/request-code', async (req, res) => {
        const { phoneNumber } = req.body;
        if (!phoneNumber) return res.status(400).json({ error: 'Phone number is required' });

        if (onPairingCodeRequest) {
            try {
                const code = await onPairingCodeRequest(phoneNumber);
                res.json({ success: true, code });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        } else {
            res.status(503).json({ error: 'Bot is not ready to receive requests' });
        }
    });

    // Endpoint to trigger a fresh QR request
    app.post('/api/request-qr', async (req, res) => {
        if (onQRRequest) {
            try {
                await onQRRequest();
                res.json({ success: true });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        } else {
            res.status(503).json({ error: 'Bot is not ready to receive requests' });
        }
    });

    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

    app.listen(PORT, () => {
        console.log(`📡 WarriorBot Web Server running on port ${PORT}`);
    });
}

export default startServer;
