const { sendDiscordLog } = require("../utils/discordWebhook");
const dbConnect = require("../utils/dbConnect");
const NumberModel = require("../models/numberModel");

module.exports = async function handler(req, res) {
    if (req.method === 'DELETE') {
        try {
            const { number } = req.body;

            if (!number) {
                return res.status(400).json({ success: false, message: 'Missing required fields.' });
            }

            await dbConnect();

            // Check if number exists
            const existingNumber = await NumberModel.findOne({ number });
            if (!existingNumber) {
                return res.status(400).json({ success: false, message: 'Number not found.' });
            }

            await NumberModel.deleteOne({ number });
            sendDiscordLog(`Number removed: ${number}`);
            return res.status(200).json({ success: true, message: 'Number removed successfully' });

        } catch (error) {
            console.error('Error removing number:', error);
            sendDiscordLog(`Error removing number: ${error.message}`);
            return res.status(500).json({ success: false, message: 'Server Error' });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
};
