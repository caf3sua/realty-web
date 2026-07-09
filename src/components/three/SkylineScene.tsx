'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Instances, Instance } from '@react-three/drei';
import * as THREE from 'three';

// PRNG seeded để skyline ổn định giữa các lần render
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface Building {
  position: [number, number, number];
  scale: [number, number, number];
  color: string;
}

const PALETTE = ['#472D0A', '#5a3a10', '#886D49', '#3A2408'];

function generateBuildings(count: number): Building[] {
  const rand = mulberry32(2026);
  const buildings: Building[] = [];
  for (let i = 0; i < count; i++) {
    // trải trên mặt phẳng, chừa khoảng trống giữa làm "đại lộ"
    const x = (rand() - 0.5) * 40;
    const z = -rand() * 26 - 2;
    if (Math.abs(x) < 2.2) continue; // đại lộ trung tâm
    const h = 1.5 + rand() * rand() * 9; // đa số thấp, vài toà cao
    buildings.push({
      position: [x, h / 2, z],
      scale: [0.9 + rand() * 1.6, h, 0.9 + rand() * 1.6],
      color: PALETTE[Math.floor(rand() * PALETTE.length)],
    });
  }
  return buildings;
}

/** Skyline trừu tượng: instanced boxes + fog + ánh sáng hoàng hôn + god rays. */
export default function SkylineScene({ buildingCount = 60 }: { buildingCount?: number }) {
  const buildings = useMemo(() => generateBuildings(buildingCount), [buildingCount]);
  const keyLight = useRef<THREE.DirectionalLight>(null);

  useFrame(({ clock }) => {
    // ánh sáng "thở" rất chậm cho cảm giác sống động
    if (keyLight.current) {
      keyLight.current.intensity = 2.2 + Math.sin(clock.elapsedTime * 0.3) * 0.25;
    }
  });

  return (
    <group>
      <fog attach="fog" args={['#0d0805', 8, 42]} />
      <color attach="background" args={['#0d0805']} />

      {/* Ánh sáng hoàng hôn vàng ấm từ chân trời */}
      <directionalLight ref={keyLight} position={[-6, 4, -10]} color="#e8b96a" intensity={2.2} />
      <ambientLight color="#2a1a0c" intensity={0.6} />
      <pointLight position={[0, 6, 4]} color="#886D49" intensity={12} distance={30} />

      {/* Skyline instanced */}
      <Instances limit={buildings.length} castShadow={false} receiveShadow={false}>
        <boxGeometry />
        <meshStandardMaterial roughness={0.75} metalness={0.35} />
        {buildings.map((b, i) => (
          <Instance key={i} position={b.position} scale={b.scale} color={b.color} />
        ))}
      </Instances>

      {/* Mặt đất phản chiếu mờ */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -8]}>
        <planeGeometry args={[80, 60]} />
        <meshStandardMaterial color="#160e06" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* God rays giả: planes gradient additive nghiêng từ góc trên trái */}
      {[0, 1, 2].map((i) => (
        <mesh
          key={i}
          position={[-8 + i * 3, 9 - i * 0.8, -12]}
          rotation={[0, 0.3, -0.9 + i * 0.12]}
        >
          <planeGeometry args={[1.6 + i * 0.7, 26]} />
          <meshBasicMaterial
            color="#e8b96a"
            transparent
            opacity={0.05 - i * 0.012}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
