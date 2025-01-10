const { sendDiscordLog } = require("../../utils/discordWebhook");
const dbConnect = require("../../utils/dbConnect");
const NumberModel = require("../../models/numberModel");

module.exports = async function handler(req, res) {
    if (req.method === 'PUT') {
        try {
            const { number, access } = req.body;

            if (!number || access === undefined) {
                return res.status(400).json({ success: false, message: 'Missing required fields.' });
            }

            await dbConnect();

            // Check if number exists
            const existingNumber = await NumberModel.findOne({ number });
            if (!existingNumber) {
                return res.status(400).json({ success: false, message: 'Number not found.' });
            }

            existingNumber.access = access;
            await existingNumber.save();

            sendDiscordLog(`Access updated for number: ${number} to: ${access}`);
            return res.status(200).json({ success: true, message: 'Access updated successfully' });

        } catch (error) {
            console.error('Error updating access:', error);
            sendDiscordLog(`Error updating access: ${error.message}`);
            return res.status(500).json({ success: false, message: 'Server Error' });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
};
