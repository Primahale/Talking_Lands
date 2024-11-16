const express = require('express');
const Point = require('../models/Point');
const router = express.Router();

// POST /api/points - Add a new point
router.post('/points', async (req, res) => {
  const { name, longitude, latitude } = req.body;
  try {
    const newPoint = new Point({ name, longitude, latitude });
    const savedPoint = await newPoint.save();
    res.status(201).json(savedPoint);
  } catch (error) {
    res.status(500).json({ message: 'Error adding point', error });
  }
});

// GET /api/points - Fetch all points
router.get('/points', async (req, res) => {
  try {
    const points = await Point.find();
    res.json(points);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching points', error });
  }
});

module.exports = router;
