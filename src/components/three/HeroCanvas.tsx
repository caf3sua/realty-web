'use client';

import { useEffect, useRef, useState, type RefObject } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import SkylineScene from './SkylineScene';
import GoldParticles from './GoldParticles';
import CameraRig from './CameraRig';

interface HeroCanvasProps {
  scrollProgress: RefObject<number>;
  /** giảm mật độ scene trên mobile */
  lowQuality?: boolean;
}

export default function HeroCanvas({ scrollProgress, lowQuality = false }: HeroCanvasProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  // Pause render loop khi hero ra khỏi viewport
  const [frameloop, setFrameloop] = useState<'always' | 'never'>('always');

  useEffect(() => {
    if (!wrapperRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFrameloop(entry.isIntersecting ? 'always' : 'never'),
      { threshold: 0 }
    );
    observer.observe(wrapperRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className="absolute inset-0">
      <Canvas
        frameloop={frameloop}
        dpr={[1, 1.75]}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 3.2, 14], fov: 42 }}
      >
        <AdaptiveDpr pixelated />
        <SkylineScene buildingCount={lowQuality ? 24 : 60} />
        <GoldParticles count={lowQuality ? 300 : 800} />
        <CameraRig scrollProgress={scrollProgress} mouseEnabled={!lowQuality} />
      </Canvas>
    </div>
  );
}
