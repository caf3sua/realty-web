// Singleton GSAP setup — mọi nơi trong app import gsap/ScrollTrigger/useGSAP từ file này.
// Quy ước phân công animation:
//  - GSAP + ScrollTrigger: mọi animation gắn với scroll (pin, scrub, parallax, reveal, counter)
//  - Framer Motion: hover/tap/modal micro-interactions
//  - React Three Fiber: chỉ trong src/components/three/
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export { gsap, ScrollTrigger, useGSAP };
