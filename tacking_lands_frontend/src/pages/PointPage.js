import React, {useState} from 'react';
import MapContainer from '../components/MapContainer';
import AddPointForm from '../components/AddPointForm';

const PointsPage = () => {

  const [points, setPoints] = useState([]);

  const handlePointAdded = (newPoint) => {
    setPoints((prevPoints) => [...prevPoints, newPoint]);
  };


  return (
    <div>
      <h2>Points</h2>
      <div>
      <AddPointForm onPointAdded={handlePointAdded} />
      </div>
      <div style={{marginTop:'150px',padding:'100px'}}>
      <MapContainer display="points" />
      </div>
      
      
    </div>
  );
};

export default PointsPage;
