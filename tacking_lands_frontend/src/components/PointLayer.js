import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const customIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const PointLayer = ({ points, onFeatureClick }) => {
  return (
    <>
      {points.map((point) => {
        
        return (
          <Marker
            key={point._id}
            position={[point.latitude, point.longitude]} 
            icon={customIcon}
            eventHandlers={{
              click: () => onFeatureClick(point),
            }}
          >
            <Popup>{point.name}</Popup>
          </Marker>
        );
      })}
    </>
  );
};

export default PointLayer;
