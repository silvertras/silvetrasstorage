const Number = require('../models/numberModel');

module.exports = async (req, res) => {
    try {
        const count = await Number.countDocuments();
        return res.status(200).json({ totalNumbers: count });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
};
