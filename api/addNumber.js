const { sendDiscordLog } = require('../utils/discordWebhook');
const Number = require('../models/numberModel');

module.exports = async (req, res) => {
    const { number } = req.body;

    if (!number) return res.status(400).json({ message: 'Number is required.' });

    try {
        const newNumber = await Number.create({ number });
        sendDiscordLog(`➕ Number added: ${number}`);
        return res.status(201).json({ message: 'Number added successfully.', data: newNumber });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};
