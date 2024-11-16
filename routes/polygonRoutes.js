// routes/polygonRoutes.js
const express = require('express');
const router = express.Router();
const Polygon = require('../models/Polygon');

// Route to create a new polygon
router.post('/polygons', async (req, res) => {
  try {
    const { name, coordinates } = req.body;
    const newPolygon = new Polygon({ name, coordinates });
    await newPolygon.save();
    res.status(201).json(newPolygon);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create polygon' });
  }
});

module.exports = router;
