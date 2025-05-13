// src/components/ISSTracker.js

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const issIcon = new L.Icon({
  iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/International_Space_Station.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 20]
});

function ISSTracker() {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const fetchISSLocation = async () => {
      try {
        const res = await axios.get('http://api.open-notify.org/iss-now.json');
        const { latitude, longitude } = res.data.iss_position;
        setPosition([parseFloat(latitude), parseFloat(longitude)]);
      } catch (error) {
        console.error('Failed to fetch ISS position:', error);
      }
    };

    fetchISSLocation();
    const interval = setInterval(fetchISSLocation, 5000); // update every 5s

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ marginTop: '3rem' }}>
      <h2>🌐 Real-Time ISS Location</h2>
      {position ? (
        <MapContainer center={position} zoom={2} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />
          <Marker position={position} icon={issIcon}>
            <Popup>
              🛰️ ISS is here! <br /> Lat: {position[0].toFixed(2)}, Lon: {position[1].toFixed(2)}
            </Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>Loading ISS position...</p>
      )}
    </div>
  );
}

export default ISSTracker;
