import React, { useState } from 'react';
import axios from 'axios';

const AddPointForm = ({ onPointAdded }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://talking-lands.onrender.com/api/points', {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        name,
      });
      onPointAdded(response.data); 
      setLatitude('');
      setLongitude('');
      setName('');
    } catch (error) {
      console.error("Error adding point:", error);
    }
  };

  return (
    <div style={formContainerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h3>Add New Point</h3>
        <label>
          Latitude:
          <input
            type="number"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
            style={inputStyle}
          />
        </label>
        <label>
          Longitude:
          <input
            type="number"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
            style={inputStyle}
          />
        </label>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={inputStyle}
          />
        </label>
        <button type="submit" style={buttonStyle} >Add Point</button>
      </form>
    </div>
  );
};


const formContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  paddingTop: '20px', 
};


const formStyle = {
  width: '300px',
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


const buttonStyle = {
  padding: '10px',
  color: 'white',
  backgroundColor: '#007BFF',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
};

export default AddPointForm;
