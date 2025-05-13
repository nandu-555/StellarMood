// components/EarthView.jsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture, Sphere } from '@react-three/drei';

function Earth() {
  const [colorMap, bumpMap, specMap] = useTexture([
    '/textures/earthmap1k.jpg',
    '/textures/earthbump1k.jpg',
    '/textures/earthspec1k.jpg',
  ]);

  return (
    <Sphere args={[2.5, 64, 64]}>
      <meshStandardMaterial
        map={colorMap}
        bumpMap={bumpMap}
        bumpScale={0.05}
        metalness={0.4}
        roughness={0.5}
      />
    </Sphere>
  );
}

function EarthView() {
  return (
    <div className="w-full h-[400px] md:h-[500px] mt-6 rounded-lg overflow-hidden shadow-lg bg-black">
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 3, 5]} intensity={1} />
        <Stars radius={300} depth={60} count={5000} factor={7} fade />
        <Suspense fallback={null}>
          <Earth />
        </Suspense>
        <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={0.6} />
      </Canvas>
    </div>
  );
}

export default EarthView;
