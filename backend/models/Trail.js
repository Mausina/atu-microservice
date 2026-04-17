const mongoose = require('mongoose');

const trailSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
    difficulty: { type: String, enum: ['Easy', 'Moderate', 'Hard'], default: 'Moderate' },
    distance: Number,
    duration: String,
    elevation: Number,
    description: String,
    savedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trail', trailSchema);
