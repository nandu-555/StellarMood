// components/StarsBackground.jsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

function StarsBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars
          radius={300}
          depth={100}
          count={10000}
          factor={5}
          saturation={0}
          fade
          speed={1}
        />
      </Canvas>
    </div>
  );
}

export default StarsBackground;
