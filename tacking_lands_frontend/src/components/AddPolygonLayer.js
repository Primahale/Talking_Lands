import React, { useState } from 'react';
import axios from 'axios';

const AddPolygonForm = ({ onPolygonAdded }) => {
  const [name, setName] = useState('');
  const [coordinates, setCoordinates] = useState([{ latitude: '', longitude: '' }]);

  const handleCoordinateChange = (index, field, value) => {
    const updatedCoordinates = [...coordinates];
    updatedCoordinates[index][field] = value;
    setCoordinates(updatedCoordinates);
  };

  const addCoordinateField = () => {
    setCoordinates([...coordinates, { latitude: '', longitude: '' }]);
  };

  const removeCoordinateField = (index) => {
    const updatedCoordinates = coordinates.filter((_, i) => i !== index);
    setCoordinates(updatedCoordinates);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const parsedCoordinates = coordinates.map((coord) => ({
        latitude: parseFloat(coord.latitude),
        longitude: parseFloat(coord.longitude),
      }));

      const response = await axios.post('https://talking-lands.onrender.com/api/polygons', {
        name,
        coordinates: parsedCoordinates,
      });

      onPolygonAdded(response.data);
      setName('');
      setCoordinates([{ latitude: '', longitude: '' }]);
    } catch (error) {
      console.error('Error adding polygon:', error);
    }
  };

  return (
    <div style={formContainerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h3>Add New Polygon</h3>

        <label>
          Polygon Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={inputStyle}
          />
        </label>

        <h4>Coordinates</h4>
        {coordinates.map((coord, index) => (
          <div key={index} style={coordinateFieldStyle}>
            <input
              type="number"
              placeholder="Latitude"
              value={coord.latitude}
              onChange={(e) => handleCoordinateChange(index, 'latitude', e.target.value)}
              required
              style={inputStyle}
            />
            <input
              type="number"
              placeholder="Longitude"
              value={coord.longitude}
              onChange={(e) => handleCoordinateChange(index, 'longitude', e.target.value)}
              required
              style={inputStyle}
            />
            {coordinates.length > 1 && (
              <button
                type="button"
                onClick={() => removeCoordinateField(index)}
                style={removeButtonStyle}
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button type="button" onClick={addCoordinateField} style={addButtonStyle}>
          Add Coordinate
        </button>
        <button type="submit" style={submitButtonStyle}>
          Add Polygon
        </button>
      </form>
    </div>
  );
};

// Styles
const formContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  paddingTop: '20px',
};

const formStyle = {
  width: '400px',
  padding: '20px',
  backgroundColor: 'white',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  margin: '5px 0',
  borderRadius: '4px',
  border: '1px solid #ddd',
  fontSize: '14px',
};

const coordinateFieldStyle = {
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
};

const addButtonStyle = {
  padding: '8px',
  color: 'white',
  backgroundColor: '#28a745',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
};

const removeButtonStyle = {
  padding: '6px 10px',
  color: 'white',
  backgroundColor: '#dc3545',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '12px',
};

const submitButtonStyle = {
  padding: '10px',
  color: 'white',
  backgroundColor: '#007BFF',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
};

export default AddPolygonForm;
