// /utils/discordWebhook.js

const fetch = require('node-fetch'); // jika menggunakan CommonJS, pastikan menggunakan require
require('dotenv').config();  // Pastikan .env sudah ada di root folder

const sendDiscordLog = async (message) => {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) return console.error('Discord webhook URL not configured.');

    try {
        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: message }),
        });
    } catch (error) {
        console.error('Failed to send log to Discord:', error);
    }
};

module.exports = { sendDiscordLog };
