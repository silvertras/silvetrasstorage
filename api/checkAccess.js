const { sendDiscordLog } = require('../utils/discordWebhook');
const Number = require('../models/numberModel');

module.exports = async (req, res) => {
    const { number } = req.query;

    if (!number) return res.status(400).json({ message: 'Number is required.' });

    try {
        const exists = await Number.findOne({ number });
        if (exists) {
            sendDiscordLog(`❌ Access denied for number: ${number}`);
            return res.status(403).json({ message: 'Access denied.' });
        }
        sendDiscordLog(`✅ Access granted for number: ${number}`);
        return res.status(200).json({ message: 'Access granted.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};
