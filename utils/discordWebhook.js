require('dotenv').config();

const sendDiscordLog = async (message) => {
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
        console.error('Discord webhook URL not configured.');
        return;
    }

    try {
        // Gunakan dynamic import untuk node-fetch
        const fetch = (await import('node-fetch')).default;

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
