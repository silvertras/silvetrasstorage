const mongoose = require('mongoose');

const numberSchema = new mongoose.Schema({
    number: { type: String, required: true, unique: true },
    access: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Number', numberSchema);
