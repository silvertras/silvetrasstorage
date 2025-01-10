const { sendDiscordLog } = require('../utils/discordWebhook');
const Number = require('../models/numberModel');

module.exports = async (req, res) => {
    const { number, newAccess } = req.body;

    if (!number || newAccess === undefined) return res.status(400).json({ message: 'Number and newAccess are required.' });

    try {
        const updatedNumber = await Number.findOneAndUpdate({ number }, { access: newAccess }, { new: true });
        if (!updatedNumber) {
            sendDiscordLog(`❌ Update failed: ${number} not found.`);
            return res.status(404).json({ message: 'Number not found.' });
        }
        sendDiscordLog(`🔄 Access updated for number: ${number} -> ${newAccess}`);
        return res.status(200).json({ message: 'Access updated successfully.', data: updatedNumber });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};
