'use client';

import { useEffect, useRef } from 'react';
import SearchBar from '@/components/common/SearchBar';
import type { Project } from '@/data/mockData';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { splitIntoWords } from '@/lib/splitText';

export default function HeroSection({ projects }: { projects: Project[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);
  const videoElRef = useRef<HTMLVideoElement>(null);

  // Một số trình duyệt chặn autoplay dù đã muted — kick play chủ động
  useEffect(() => {
    videoElRef.current?.play().catch(() => {});
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

          // 1. Intro khi mount: video zoom-out nhẹ + headline split từng từ trượt lên
          const intro = gsap.timeline({ defaults: { ease: 'expo.out' } });
          intro.fromTo(videoRef.current, { scale: 1.15 }, { scale: 1.05, duration: 2 }, 0);
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

          // 2. Scrub theo scroll: video parallax chậm, content trôi nhanh + fade, tối dần
          gsap.to(videoRef.current, {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
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

  return (
    <section ref={sectionRef} className="relative h-[130vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Video nền parallax */}
        <div ref={videoRef} className="absolute inset-0 will-change-transform">
          <video
            ref={videoElRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center"
          >
            <source src="/video/vinhome_haivanbay.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-verydark via-brand-verydark/60 to-brand-verydark/30" />

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
              className="text-brand-cream/85 text-sm sm:text-base max-w-2xl leading-relaxed"
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
