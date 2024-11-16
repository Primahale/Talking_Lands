const mongoose = require('mongoose');

const pointSchema = new mongoose.Schema({
  name: { type: String, required: true },
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
});

module.exports = mongoose.model('Point', pointSchema);
