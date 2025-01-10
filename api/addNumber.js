const { sendDiscordLog } = require('../../utils/discordWebhook');
import dbConnect from "../../utils/dbConnect";
import NumberModel from "../../models/numberModel";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { number, access } = req.body;

            if (!number || access === undefined) {
                return res.status(400).json({ success: false, message: 'Missing required fields.' });
            }

            await dbConnect();

            // Check if number exists
            const existingNumber = await NumberModel.findOne({ number });
            if (existingNumber) {
                return res.status(400).json({ success: false, message: 'Number already exists.' });
            }

            const newNumber = new NumberModel({ number, access });
            await newNumber.save();

            sendDiscordLog(`New number added: ${number} with access: ${access}`);
            return res.status(200).json({ success: true, message: 'Number added successfully' });

        } catch (error) {
            console.error('Error adding number:', error);
            sendDiscordLog(`Error adding number: ${error.message}`);
            return res.status(500).json({ success: false, message: 'Server Error' });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}
