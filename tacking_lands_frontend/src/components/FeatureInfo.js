
import React from 'react';

const FeatureInfo = ({ feature }) => {
  return (
    <div style={infoCardStyle}>
      <h3>Feature Info</h3>
      <p><strong>Description:</strong> {feature.description}</p>
      <p><strong>Type:</strong> {feature.location.type}</p>
    </div>
  );
};


const infoCardStyle = {
  position: 'absolute',
  bottom: '20px',
  left: '20px',
  padding: '10px',
  backgroundColor: 'white',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
  borderRadius: '5px',
};

export default FeatureInfo;
