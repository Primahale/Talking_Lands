import React, { useState, useEffect } from 'react';
import { MapContainer as LeafletMap, TileLayer } from 'react-leaflet';
import axios from 'axios';
import PointLayer from './PointLayer';
import PolygonLayer from './PolygonLayer';

const MapContainer = ({ display }) => {
  const [points, setPoints] = useState([]);
  const [polygons, setPolygons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (display === 'points') {
          const pointResponse = await axios.get('https://talking-lands.onrender.com/api/points');
          setPoints(pointResponse.data);
        } else if (display === 'polygons') {
          const polygonResponse = await axios.get('https://talking-lands.onrender.com/api/polygons');
          setPolygons(polygonResponse.data);
        }
      } catch (error) {
        console.error(`Error fetching ${display} data:`, error);
      }
    };
    fetchData();
  }, [display]);

  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <LeafletMap center={[37.7749, -122.4194]} zoom={10} style={{ height: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {display === 'points' && <PointLayer points={points} />}
        {display === 'polygons' && <PolygonLayer polygons={polygons} />}
      </LeafletMap>
    </div>
  );
};

export default MapContainer;
