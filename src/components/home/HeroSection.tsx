'use client';

import { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import SearchBar from '@/components/common/SearchBar';
import type { Project } from '@/data/mockData';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { splitIntoWords } from '@/lib/splitText';
import { useReducedMotion, useIsMobile, isLowEndDevice } from '@/lib/useMotionPrefs';

/** Fallback tĩnh: gradient hoàng hôn + noise (ssr / reduced-motion / máy yếu). */
function HeroFallback() {
  return (
    <div className="absolute inset-0 noise-overlay bg-[radial-gradient(ellipse_at_bottom,_#5a3a10_0%,_#2a1a0c_45%,_#0d0805_100%)]" />
  );
}

const HeroCanvas = dynamic(() => import('@/components/three/HeroCanvas'), {
  ssr: false,
  loading: () => <HeroFallback />,
});

export default function HeroSection({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);

  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [webglOk, setWebglOk] = useState(false);

  useEffect(() => {
    setWebglOk(!isLowEndDevice());
  }, []);

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
            gsap.set('[data-hero-reveal]', { opacity: 1, y: 0 });
            if (headlineRef.current) gsap.set(headlineRef.current, { opacity: 1 });
            return;
          }

          // 1. Intro timeline khi mount: headline split từng từ trượt lên
          const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
          if (headlineRef.current) {
            const { words, revert } = splitIntoWords(headlineRef.current);
            gsap.set(headlineRef.current, { opacity: 1 });
            intro.from(words, { yPercent: 115, rotateX: -35, duration: 1.3, stagger: 0.07 }, 0.2);
            ctx.add(() => revert);
          }
          intro.fromTo(
            '[data-hero-reveal]',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.15 },
            0.9
          );

          // 2. Scrub theo scroll: cập nhật progress cho camera + parallax content + tối dần
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
            onUpdate: (self) => {
              scrollProgress.current = self.progress;
            },
          });

          gsap.to(contentRef.current, {
            yPercent: -35,
            opacity: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: '55% top',
              scrub: true,
            },
          });

          gsap.fromTo(
            dimRef.current,
            { opacity: 0 },
            {
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: '30% top',
                end: 'bottom top',
                scrub: true,
              },
            }
          );
        }
      );
    },
    { scope: sectionRef }
  );

  const showCanvas = webglOk && !reducedMotion;

  return (
    <section ref={sectionRef} className="relative h-[130vh]">
      {/* Canvas/fallback sticky full-screen */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {showCanvas ? (
          <HeroCanvas scrollProgress={scrollProgress} lowQuality={isMobile} />
        ) : (
          <HeroFallback />
        )}

        {/* Vignette đáy để text nổi */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0d0805]/90 via-transparent to-[#0d0805]/30" />
        {/* Lớp tối dần khi scroll chuyển sang manifesto */}
        <div ref={dimRef} className="absolute inset-0 pointer-events-none bg-[#0d0805] opacity-0" />

        {/* Hero content — HTML thật, SSR được cho SEO */}
        <div
          ref={contentRef}
          className="absolute inset-0 z-10 flex items-center justify-center will-change-transform"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-8">
            <span
              data-hero-reveal
              className="text-amber-400 text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase"
            >
              Phong Cách Sống Đẳng Cấp &amp; Độc Bản
            </span>
            <h1
              ref={headlineRef}
              className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold leading-[1.1] max-w-5xl tracking-wide !text-white opacity-0 perspective-1000"
            >
              Kiến Tạo Không Gian Sống Thượng Lưu
            </h1>
            <p
              data-hero-reveal
              className="text-brand-cream/80 text-sm sm:text-base max-w-2xl leading-relaxed"
            >
              Khám phá các dự án đại đô thị sinh thái, biệt thự nghỉ dưỡng biển và căn hộ hạng sang
              được phân phối bởi những đơn vị uy tín hàng đầu Việt Nam.
            </p>
            <div data-hero-reveal className="w-full flex justify-center">
              <SearchBar projects={projects} />
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          data-hero-reveal
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-brand-cream/60"
        >
          <span className="text-[10px] tracking-[0.35em] uppercase">Cuộn xuống</span>
          <div className="w-px h-10 bg-gradient-to-b from-brand-cream/60 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}
