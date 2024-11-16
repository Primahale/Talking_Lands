import React from 'react';
import { GeoJSON } from 'react-leaflet';

const PolygonLayer = ({ polygons, onFeatureClick }) => {
  return (
    <>
      {polygons.map((polygon) => (
        <GeoJSON
          key={polygon._id}
          data={{
            type: 'Feature',
            geometry: polygon.location,
            properties: { description: polygon.description },
          }}
          style={{
            color: '#3388ff',
            weight: 2,
            fillOpacity: 0.4,
          }}
          eventHandlers={{
            click: () => onFeatureClick(polygon),
          }}
        />
      ))}
    </>
  );
};

export default PolygonLayer;
