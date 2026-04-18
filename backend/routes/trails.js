const express = require('express');
const router = express.Router();
const Trail = require('../models/Trail');

// get all saved trails
router.get('/', async (req, res) => {
    try {
        const trails = await Trail.find().sort({ savedAt: -1 });
        res.json(trails);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// get one trail
router.get('/:id', async (req, res) => {
    try {
        const trail = await Trail.findById(req.params.id);
        if (!trail) return res.status(404).json({ error: 'Not found' });
        res.json(trail);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// save trail
router.post('/', async (req, res) => {
    try {
        const trail = new Trail(req.body);
        await trail.save();
        res.status(201).json(trail);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// delete trail
router.delete('/:id', async (req, res) => {
    try {
        const result = await Trail.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ error: 'Not found' });
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
