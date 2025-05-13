import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SpaceCard from './components/SpaceCard';
import MoodSelector from './components/MoodSelector';
import EarthView from './components/EarthView';
import ISSPassViewer from './components/ISSPassViewer';
import ISSTracker from './components/ISSTracker';

const API_KEY = process.env.REACT_APP_NASA_API_KEY;

function App() {
  const [apod, setApod] = useState(null);
  const [neoData, setNeoData] = useState(null);
  const [solarFlare, setSolarFlare] = useState(null);
  const [mood, setMood] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchAPOD();
    fetchNeo();
    fetchSolarFlare();
  }, []);

  const fetchAPOD = async () => {
    const res = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);
    setApod(res.data);
  };

  const fetchNeo = async () => {
    const today = new Date().toISOString().slice(0, 10);
    const res = await axios.get(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${API_KEY}`);
    const neoList = res.data.near_earth_objects[today];
    setNeoData(neoList?.[0] || null);
  };

  const fetchSolarFlare = async () => {
    const today = new Date().toISOString().slice(0, 10);
    const res = await axios.get(`https://api.nasa.gov/DONKI/FLR?startDate=${today}&endDate=${today}&api_key=${API_KEY}`);
    setSolarFlare(res.data?.[0] || null);
  };

  const handleMoodChange = (selectedMood) => {
    setMood(selectedMood);

    switch (selectedMood) {
      case 'stressed':
        setMessage(solarFlare
          ? 'The Sun had a small flare today. Breathe in peace, exhale the chaos.'
          : 'No solar flares today. The universe is calm—just like you.');
        break;
      case 'curious':
        setMessage(neoData
          ? `An asteroid named ${neoData.name} just passed Earth. Imagine witnessing that!`
          : 'Space is full of mysteries — and you’re part of it.');
        break;
      case 'calm':
        setMessage(apod
          ? `Look at this serene image of the cosmos: ${apod.title}. Let your mind float.`
          : 'The silence of the stars keeps us grounded.');
        break;
      default:
        setMessage('The universe has something new for you every day.');
    }
  };

  return (
    <div className="App" style={{ fontFamily: 'Arial', padding: '2rem', textAlign: 'center' }}>
      <h1>🚀 StellarMood</h1>
       <EarthView />
      <MoodSelector onMoodSelect={handleMoodChange} />
      {mood && <p><strong>Mood Match:</strong> {message}</p>}
      {apod && <SpaceCard title={apod.title} image={apod.url} desc={apod.explanation} />}
      <ISSPassViewer />
      <ISSTracker />

    </div>
  );
}


export default App;
