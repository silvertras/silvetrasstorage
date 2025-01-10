const dbConnect = require("../utils/dbConnect");
const NumberModel = require("../models/numberModel");

module.exports = async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            await dbConnect();

            const numbers = await NumberModel.find();
            return res.status(200).json({ success: true, data: numbers });

        } catch (error) {
            console.error('Error fetching numbers:', error);
            return res.status(500).json({ success: false, message: 'Server Error' });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
};
