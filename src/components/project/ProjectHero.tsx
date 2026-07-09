'use client';

import { useRef } from 'react';
import Image from 'next/image';
import type { Project } from '@/data/mockData';
import { gsap, useGSAP } from '@/lib/gsap';
import { splitIntoWords } from '@/lib/splitText';

/** Hero điện ảnh full-screen: ảnh scale 1.3→1 khi load, parallax khi scroll. */
export default function ProjectHero({ project }: { project: Project }) {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.matchMedia().add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          reduce: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          if (ctx.conditions?.reduce) {
            gsap.set([titleRef.current, '[data-hero-meta]'], { opacity: 1, y: 0 });
            gsap.set(imgRef.current, { scale: 1 });
            return;
          }

          // Intro: ảnh zoom-out + title split reveal
          const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
          intro.fromTo(imgRef.current, { scale: 1.3 }, { scale: 1, duration: 1.8 }, 0);
          if (titleRef.current) {
            const { words, revert } = splitIntoWords(titleRef.current);
            gsap.set(titleRef.current, { opacity: 1 });
            intro.from(words, { yPercent: 115, duration: 1.2, stagger: 0.06 }, 0.4);
            ctx.add(() => revert);
          }
          intro.fromTo(
            '[data-hero-meta]',
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 },
            0.9
          );

          // Parallax ảnh khi scroll ra
          gsap.to(imgRef.current, {
            yPercent: 18,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} className="relative h-screen flex items-end overflow-hidden">
      <div ref={imgRef} className="absolute inset-0 will-change-transform">
        <Image
          src={project.banner || project.image}
          alt={project.name}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0805] via-brand-verydark/40 to-brand-verydark/30" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-24">
        <div className="max-w-4xl space-y-5">
          <span
            data-hero-meta
            className="inline-block text-[10px] bg-brand-brown/85 border border-brand-brown text-white px-3 py-1 font-semibold tracking-[0.25em] uppercase"
          >
            {project.status}
          </span>
          <h1
            ref={titleRef}
            className="text-4xl sm:text-6xl md:text-7xl font-serif !text-white font-bold leading-[1.08] opacity-0"
          >
            {project.name}
          </h1>
          <p data-hero-meta className="text-brand-cream/85 text-sm sm:text-base flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {project.location}
          </p>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 right-8 z-10 hidden sm:flex flex-col items-center gap-2 text-brand-cream/50">
        <div className="w-px h-10 bg-gradient-to-b from-brand-cream/50 to-transparent animate-pulse" />
      </div>
    </section>
  );
}
