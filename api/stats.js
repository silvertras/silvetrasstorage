import dbConnect from "../../utils/dbConnect";
import NumberModel from "../../models/numberModel";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            await dbConnect();

            const totalNumbers = await NumberModel.countDocuments();
            const activeNumbers = await NumberModel.countDocuments({ access: true });

            return res.status(200).json({ success: true, stats: { totalNumbers, activeNumbers } });

        } catch (error) {
            console.error('Error fetching stats:', error);
            return res.status(500).json({ success: false, message: 'Server Error' });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}
