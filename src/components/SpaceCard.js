import React from 'react';

function SpaceCard({ title, image, desc }) {
  return (
    <div style={{ marginTop: '20px' }}>
      <h2>{title}</h2>
      <img src={image} alt="NASA" style={{ width: '100%', maxWidth: '600px' }} />
      <p style={{ marginTop: '10px' }}>{desc}</p>
    </div>
  );
}

export default SpaceCard;
