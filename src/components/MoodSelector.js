import React from 'react';

function MoodSelector({ onMoodSelect }) {
  const moods = ['stressed', 'calm', 'curious'];

  return (
    <div style={{ marginBottom: '20px' }}>
      <h3>Select Your Mood:</h3>
      {moods.map((m) => (
        <button key={m} onClick={() => onMoodSelect(m)} style={{ margin: '5px', padding: '10px' }}>
          {m}
        </button>
      ))}
    </div>
  );
}

export default MoodSelector;
