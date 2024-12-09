const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');
const express = require('express');

// Initialize WhatsApp Client
const client = new Client();
const app = express();
const PORT = 3000;

// Middleware for parsing JSON
app.use(express.json());

// Temporary storage for OTPs
const otps = {};

// Generate and scan the QR code
client.on('qr', (qr) => {
    console.log('Scan this QR code to log in:');
    qrcode.generate(qr, { small: true });
});

// Log successful authentication
client.on('ready', () => {
    console.log('WhatsApp client is ready!');
});

// Start the WhatsApp client
client.initialize();

/**
 * Generate a 6-digit OTP
 * @returns {string} OTP
 */
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Send OTP via WhatsApp
 */
app.post('/send-otp', async (req, res) => {
    const { phoneNumber } = req.body;

    // Validate the input
    if (!phoneNumber || phoneNumber.length !== 10) {
        return res.status(400).json({ success: false, message: 'Invalid phone number. It must be 10 digits.' });
    }

    const fullPhoneNumber = `91${phoneNumber}`; // Add India's country code
    const otp = generateOTP();
    otps[fullPhoneNumber] = otp; // Store OTP against the full phone number

    try {
        await client.sendMessage(`${fullPhoneNumber}@c.us`, `Your OTP is: ${otp}. This code is valid for 5 minutes.`);
        console.log(`OTP sent successfully to ${fullPhoneNumber}`);
        return res.status(200).json({ success: true, message: 'OTP sent successfully!' });
    } catch (err) {
        console.error('Error sending OTP:', err);
        return res.status(500).json({ success: false, message: 'Failed to send OTP. Try again later.' });
    }
});

/**
 * Verify OTP
 */
app.post('/verify-otp', (req, res) => {
    const { phoneNumber, otp } = req.body;

    // Validate input
    if (!phoneNumber || phoneNumber.length !== 10 || !otp) {
        return res.status(400).json({ success: false, message: 'Invalid phone number or OTP.' });
    }

    const fullPhoneNumber = `91${phoneNumber}`; // Add India's country code
    const storedOTP = otps[fullPhoneNumber];

    if (storedOTP && storedOTP === otp) {
        delete otps[fullPhoneNumber]; // Remove OTP after successful verification
        console.log(`OTP verified for ${fullPhoneNumber}`);
        return res.status(200).json({ success: true, message: 'OTP verified successfully!' });
    } else {
        console.log(`OTP verification failed for ${fullPhoneNumber}`);
        return res.status(400).json({ success: false, message: 'Invalid OTP or OTP expired.' });
    }
});

// Start the API server
app.listen(PORT, () => {
    console.log(`OTP API service is running on http://localhost:${PORT}`);
});
