
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default icon issue with Leaflet and React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Placeholder coordinates for Indian cities (approximate)
const cityCoords = {
  "pune": [18.5204, 73.8567],
  "mumbai": [19.0760, 72.8777],
  "delhi": [28.7041, 77.1025],
  "bangalore": [12.9716, 77.5946],
  "chennai": [13.0827, 80.2707],
  "hyderabad": [17.3850, 78.4867],
  "jaipur": [26.9124, 75.7873],
  "kolkata": [22.5726, 88.3639],
};

// Component to adjust map view based on markers
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
     if (center && center.length === 2 && !isNaN(center[0]) && !isNaN(center[1])) {
       map.setView(center, zoom);
     }
  }, [center, zoom, map]);
  return null;
}

const MapPlaceholder = ({ origin, destination }) => {
  const originCoords = cityCoords[origin?.toLowerCase()] || cityCoords["delhi"]; // Default to Delhi
  const destCoords = cityCoords[destination?.toLowerCase()] || cityCoords["mumbai"]; // Default to Mumbai

  // Calculate center (simple average, could be improved)
   const centerLat = (originCoords[0] + destCoords[0]) / 2;
   const centerLng = (originCoords[1] + destCoords[1]) / 2;
   const center = [centerLat, centerLng];

  // Basic zoom calculation based on distance (very rough)
  const latDiff = Math.abs(originCoords[0] - destCoords[0]);
  const lngDiff = Math.abs(originCoords[1] - destCoords[1]);
  const maxDiff = Math.max(latDiff, lngDiff);
  let zoom = 6; // Default zoom
  if (maxDiff < 1) zoom = 10;
  else if (maxDiff < 3) zoom = 8;
  else if (maxDiff < 10) zoom = 6;
  else zoom = 5;


  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} className="leaflet-container">
       <ChangeView center={center} zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {originCoords && (
         <Marker position={originCoords}>
           <Popup>Origin: {origin || "Unknown"}</Popup>
         </Marker>
      )}
       {destCoords && (
         <Marker position={destCoords}>
           <Popup>Destination: {destination || "Unknown"}</Popup>
         </Marker>
       )}
        {/* Placeholder for Polyline - would need actual route coordinates */}
        {/* <Polyline pathOptions={{ color: 'blue' }} positions={[[originCoords], [destCoords]]} /> */}
    </MapContainer>
  );
};

export default MapPlaceholder;
  