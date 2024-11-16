// src/pages/PolygonsPage.js
import React, {useState} from 'react';
import MapContainer from '../components/MapContainer';
import AddPolygonForm from '../components/AddPolygonLayer';

const PolygonsPage = () => {

  const [polygons, setPolygons] = useState([]);

  const handlePolygonAdded = (newPolygon) => {
    setPolygons((prevPolygons) => [...prevPolygons, newPolygon]);
  };


  return (
    <div>
      <h2>Polygons</h2>
      <AddPolygonForm onPolygonAdded={handlePolygonAdded} />
      <MapContainer display="polygons"  polygons={polygons}  />
      
    </div>
  );
};

export default PolygonsPage;
