import dbConnect from "../../utils/dbConnect";
import NumberModel from "../../models/numberModel";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { number } = req.body;

            if (!number) {
                return res.status(400).json({ success: false, message: 'Number is required.' });
            }

            await dbConnect();

            const numberData = await NumberModel.findOne({ number });
            if (!numberData) {
                return res.status(404).json({ success: false, message: 'Number not found.' });
            }

            return res.status(200).json({ success: true, access: numberData.access });

        } catch (error) {
            console.error('Error checking access:', error);
            return res.status(500).json({ success: false, message: 'Server Error' });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}
