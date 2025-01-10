import dbConnect from "../../utils/dbConnect";
import NumberModel from "../../models/numberModel";

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            await dbConnect();
            const numbers = await NumberModel.find().limit(100); // Batasi jumlah data yang diambil

            return res.status(200).json({ success: true, data: numbers });

        } catch (error) {
            console.error('Error listing numbers:', error);
            return res.status(500).json({ success: false, message: 'Server Error' });
        }
    } else {
        res.status(405).json({ success: false, message: 'Method Not Allowed' });
    }
}
