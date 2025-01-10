const Number = require('../models/numberModel');

module.exports = async (req, res) => {
    try {
        const numbers = await Number.find();
        return res.status(200).json({ data: numbers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};
