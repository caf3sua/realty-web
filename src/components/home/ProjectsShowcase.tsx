'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/data/mockData';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';

/** Hồi 3: dự án trọng điểm — horizontal scroll pinned (desktop), scroll-snap (mobile). */
export default function ProjectsShowcase({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current || !trackRef.current) return;

      gsap.matchMedia().add(
        '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
        () => {
          const track = trackRef.current!;
          const getDistance = () => track.scrollWidth - window.innerWidth;

          const tween = gsap.to(track, {
            x: () => -getDistance(),
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: () => `+=${getDistance()}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (progressRef.current) {
                  progressRef.current.style.transform = `scaleX(${self.progress})`;
                }
              },
            },
          });

          // Inner parallax cho ảnh trong từng panel, chạy theo container animation
          gsap.utils.toArray<HTMLElement>('[data-panel-img]').forEach((img) => {
            gsap.fromTo(
              img,
              { xPercent: -8 },
              {
                xPercent: 8,
                ease: 'none',
                scrollTrigger: {
                  trigger: img,
                  containerAnimation: tween,
                  start: 'left right',
                  end: 'right left',
                  scrub: true,
                },
              }
            );
          });
        }
      );
    },
    { scope: sectionRef }
  );

  if (!projects.length) return null;

  return (
    <section ref={sectionRef} className="relative bg-[#0d0805] dark-section overflow-hidden">
      {/* Header đứng yên phía trên track */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-14 px-4 sm:px-6 lg:px-12 flex justify-between items-end pointer-events-none">
        <div>
          <span className="text-brand-taupe text-xs font-bold tracking-[0.3em] uppercase">
            Danh Mục Dự Án
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif !text-brand-cream font-semibold mt-2">
            Dự Án Trọng Điểm
          </h2>
        </div>
        <Link
          href="/du-an"
          className="pointer-events-auto hidden sm:flex text-brand-cream hover:text-white text-sm font-semibold items-center gap-1.5 transition-colors border border-brand-cream/40 hover:border-white px-4 py-2"
        >
          Xem tất cả dự án
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Track: pinned horizontal desktop / scroll-snap mobile */}
      <div className="h-screen flex items-center max-lg:h-auto max-lg:pt-40 max-lg:pb-20">
        <div
          ref={trackRef}
          className="flex gap-6 px-4 sm:px-6 lg:px-12 will-change-transform max-lg:overflow-x-auto max-lg:snap-x max-lg:snap-mandatory no-scrollbar"
        >
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/du-an/${project.slug}`}
              className="group relative shrink-0 w-[85vw] sm:w-[70vw] lg:w-[58vw] h-[58vh] lg:h-[68vh] max-lg:snap-center overflow-hidden"
            >
              <div data-panel-img className="absolute inset-[-10%] will-change-transform">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  sizes="(max-width: 1024px) 85vw, 58vw"
                  loading={i === 0 ? 'eager' : 'lazy'}
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0805]/90 via-transparent to-[#0d0805]/20" />

              <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 space-y-2">
                <span className="text-[10px] text-amber-400/90 font-bold tracking-[0.3em] uppercase">
                  {String(i + 1).padStart(2, '0')} — {project.status}
                </span>
                <h3 className="!text-white font-serif text-2xl lg:text-4xl font-semibold leading-tight">
                  {project.name}
                </h3>
                <p className="text-brand-cream/70 text-sm flex items-center gap-2">
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {project.location}
                </p>
              </div>
            </Link>
          ))}

          {/* Panel cuối: CTA */}
          <div className="shrink-0 w-[60vw] sm:w-[40vw] lg:w-[28vw] h-[58vh] lg:h-[68vh] max-lg:snap-center flex items-center justify-center">
            <Link
              href="/du-an"
              className="group text-center space-y-4 border border-brand-taupe/40 hover:border-brand-cream px-10 py-14 transition-colors"
            >
              <span className="block text-4xl font-serif text-brand-cream group-hover:text-white transition-colors">
                +
              </span>
              <span className="block text-sm tracking-[0.25em] uppercase text-brand-cream/80 group-hover:text-white transition-colors">
                Khám phá tất cả
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Progress bar (desktop pinned) */}
      <div className="hidden lg:block absolute bottom-8 left-12 right-12 h-px bg-brand-taupe/25 z-20">
        <div
          ref={progressRef}
          className="h-full bg-brand-taupe origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>
    </section>
  );
}
