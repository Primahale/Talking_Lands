// models/Polygon.js
const mongoose = require('mongoose');

const PolygonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  coordinates: [
    {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model('Polygon', PolygonSchema);
