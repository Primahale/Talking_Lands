import React, { useState } from 'react';
import axios from 'axios';

const AddpolygonForm = () => {
  const [name, setName] = useState('');
  const [coordinates, setCoordinates] = useState([{ latitude: '', longitude: '' }]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://talking-lands.onrender.com/api/polygons', {
        name,
        coordinates,
      });
      alert('Polygon added successfully!');
      setName('');
      setCoordinates([{ latitude: '', longitude: '' }]);
    } catch (error) {
      console.error('Error adding polygon:', error);
      alert('Failed to add polygon');
    }
  };

   const handleCoordinateChange = (index, field, value) => {
    const updatedCoordinates = [...coordinates];
    updatedCoordinates[index][field] = value;
    setCoordinates(updatedCoordinates);
  };

  const handleAddCoordinate = () => {
    setCoordinates([...coordinates, { latitude: '', longitude: '' }]);
  };


  return (
    <div>
      <h2>Add Polygon</h2>
      <form onSubmit={handleSubmit}>
        <label>Polygon Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <div>
          {coordinates.map((coord, index) => (
            <div key={index}>
              <label>Latitude:</label>
              <input
                type="number"
                value={coord.latitude}
                onChange={(e) => handleCoordinateChange(index, 'latitude', e.target.value)}
                required
              />
              <label>Longitude:</label>
              <input
                type="number"
                value={coord.longitude}
                onChange={(e) => handleCoordinateChange(index, 'longitude', e.target.value)}
                required
              />
            </div>
          ))}
        </div>
        <button type="button" onClick={handleAddCoordinate}>
          Add Coordinate
        </button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddpolygonForm;
