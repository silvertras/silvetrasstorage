import dbConnect from "../../utils/dbConnect";
import NumberModel from "../../models/numberModel";

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        try {
            const { number, access } = req.body;

            if (!number || access === undefined) {
                return res.status(400).json({ success: false, message: 'Missing required fields.' });
            }

            await dbConnect();

            const updatedNumber = await NumberModel.findOneAndUpdate(
                { number },
                { access },
                { new: true }
            );

            if (!updatedNumber) {
                return res.status(404).json({ success: false, message: 'Number not found.' });
            }

            return res.status(200).json({ success: true, message: 'Access updated successfully' });

        } catch (error) {
            console.error('Error updating access:', error);
            return res.status(500).json({ success: false, message: 'Server Error' });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}
