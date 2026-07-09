'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const LenisContext = createContext<Lenis | null>(null);

/** Lenis instance (null khi reduced-motion hoặc chưa mount). Dùng cho scrollTo/lắng nghe scroll. */
export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const rafCallback = useRef<((time: number) => void) | null>(null);

  useEffect(() => {
    // Tôn trọng reduced-motion: không smooth scroll, ScrollTrigger vẫn chạy với native scroll
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const instance = new Lenis({ lerp: 0.1, smoothWheel: true });
    instance.on('scroll', ScrollTrigger.update);

    const onTick = (time: number) => instance.raf(time * 1000);
    rafCallback.current = onTick;
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    setLenis(instance);

    return () => {
      if (rafCallback.current) gsap.ticker.remove(rafCallback.current);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
