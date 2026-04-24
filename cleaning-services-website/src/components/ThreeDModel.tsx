'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, MeshDistortMaterial, Sphere, Float, Stars } from '@react-three/drei';

function Drone({ position, color, distort, speed }: any) {
  const meshRef = useRef<any>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={1.5} floatIntensity={2}>
      <Sphere ref={meshRef} position={position} args={[0.5, 32, 32]} scale={1.2}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={3}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>
    </Float>
  );
}

export function ThreeDModel() {
  return (
    <div style={{ height: '400px', width: '100%', borderRadius: '24px', overflow: 'hidden', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', position: 'relative' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <color attach="background" args={['#0a0a0a']} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <pointLight position={[-10, -10, -5]} color="#ff0080" intensity={2} />
        
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        
        {/* Fleet of Drones */}
        <Drone position={[0, 0, 0]} color="#0070f3" distort={0.5} speed={2} />
        <Drone position={[-1.5, 1, -1]} color="#7928ca" distort={0.3} speed={1.5} />
        <Drone position={[1.5, -1, -2]} color="#ff0080" distort={0.6} speed={2.5} />

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
      </Canvas>
    </div>
  );
}
