// spatial-api/index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const pointsRouter = require('./routes/points');
const polygonRoutes = require('./routes/polygonRoutes');

dotenv.config();

const Point = require('./models/Point');
const Polygon = require('./models/Polygon');

const app = express();
app.use(express.json());
app.use(cors());

 app.use((req, res, next) => {

      res.setHeader('Access-Control-Allow-Origin', 'https://talking-lands.vercel.app/');

        next();

    });

const URL = process.env.MONGO_URL;
console.log('MongoDB URI:', URL);
// MongoDB Connection
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.error(error));


// // Routes
app.use('/api', pointsRouter);
app.use('/api',polygonRoutes)

  



// CRUD for Points

// Add Point
app.post('/api/points', async (req, res) => {
    const { name, latitude, longitude } = req.body;
    const newPoint = new Point({ name, latitude, longitude });
    await newPoint.save();
    res.status(201).json(newPoint);
  });

// Get All Points
// app.get('/api/points', async (req, res) => {
//   try {
//     const points = await Point.find();
//     const geoJsonPoints = points.map((point) => ({
//       _id: point._id,
//       location: {
//         type: 'Point',
//         coordinates: [point.longitude, point.latitude],
//       },
//       description: point.name,
//     }));
//     res.json(geoJsonPoints);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Update Point
app.put('/api/points/:id', async (req, res) => {
  const { id } = req.params;
  const { name, longitude, latitude } = req.body;
  try {
    const point = await Point.findByIdAndUpdate(id, {
      name,
      location: { type: 'Point', coordinates: [longitude, latitude] },
    }, { new: true });
    res.json(point);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Point
app.delete('/api/points/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Point.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CRUD for Polygons

// Add Polygon
app.post('/api/polygons', async (req, res) => {
    try {
      const polygon = new Polygon(req.body);
      await polygon.save();
      res.status(201).json(polygon);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create polygon' });
    }
  });

// Get All Polygons

app.get('/api/polygons', async (req, res) => {
  try {
    const polygons = await Polygon.find();
    res.json(polygons);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve polygons' });
  }
});

  // Get a specific polygon by ID
app.get('/api/polygons/:id', async (req, res) => {
    try {
      const polygon = await Polygon.findById(req.params.id);
      if (!polygon) return res.status(404).json({ error: 'Polygon not found' });
      res.json(polygon);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve polygon' });
    }
  });

// Update Polygon

app.put('/api/polygons/:id', async (req, res) => {
    try {
      const polygon = await Polygon.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!polygon) return res.status(404).json({ error: 'Polygon not found' });
      res.json(polygon);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update polygon' });
    }
  });

// Delete Polygon
app.delete('/api/polygons/:id', async (req, res) => {
    try {
      const polygon = await Polygon.findByIdAndDelete(req.params.id);
      if (!polygon) return res.status(404).json({ error: 'Polygon not found' });
      res.json({ message: 'Polygon deleted' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete polygon' });
    }
  });

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
