// src/components/ISSPassViewer.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ISSPassViewer() {
  const [location, setLocation] = useState(null);
  const [passes, setPasses] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });

        try {
          const res = await axios.get(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`);
          setPasses(res.data.response || []);
        } catch (err) {
          setError('Failed to fetch ISS pass data');
        }
      },
      () => setError('Unable to retrieve your location')
    );
  }, []);

  return (
    <div style={{ marginTop: '3rem' }}>
      <h2>🛰️ ISS Overhead Pass Times</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!location && !error && <p>Fetching location...</p>}

      {passes.length > 0 && (
        <ul>
          {passes.slice(0, 5).map((pass, index) => (
            <li key={index}>
              📍 Visible at: <strong>{new Date(pass.risetime * 1000).toLocaleString()}</strong> for <strong>{pass.duration}</strong> seconds
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ISSPassViewer;
