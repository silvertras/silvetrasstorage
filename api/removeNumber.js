const { sendDiscordLog } = require('../utils/discordWebhook');
const Number = require('../models/numberModel');

module.exports = async (req, res) => {
    const { number } = req.body;

    if (!number) return res.status(400).json({ message: 'Number is required.' });

    try {
        const deletedNumber = await Number.findOneAndDelete({ number });
        if (!deletedNumber) {
            sendDiscordLog(`❌ Failed to remove: ${number} not found.`);
            return res.status(404).json({ message: 'Number not found.' });
        }
        sendDiscordLog(`🗑️ Number removed: ${number}`);
        return res.status(200).json({ message: 'Number removed successfully.' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};
