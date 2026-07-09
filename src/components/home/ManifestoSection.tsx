'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { splitIntoWords } from '@/lib/splitText';
import { Counter } from '@/components/scroll/primitives';

const LINES = [
  'Chúng tôi không chỉ bán bất động sản.',
  'Chúng tôi kiến tạo di sản sống cho những chủ nhân xứng tầm.',
];

/** Hồi 2: tuyên ngôn thương hiệu — pinned, từng từ sáng dần theo scroll. */
export default function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.matchMedia().add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          reduce: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          const lines = gsap.utils.toArray<HTMLElement>('[data-manifesto-line]');
          if (ctx.conditions?.reduce) {
            gsap.set(lines, { opacity: 1 });
            return;
          }

          const allWords: HTMLElement[] = [];
          const reverts: (() => void)[] = [];
          for (const line of lines) {
            const { words, revert } = splitIntoWords(line);
            gsap.set(line, { opacity: 1 });
            allWords.push(...words);
            reverts.push(revert);
          }
          ctx.add(() => () => reverts.forEach((r) => r()));

          gsap.fromTo(
            allWords,
            { opacity: 0.13 },
            {
              opacity: 1,
              stagger: 0.35,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: '+=150%',
                pin: true,
                scrub: 1,
                anticipatePin: 1,
              },
            }
          );
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="dark-section noise-overlay relative bg-[#0d0805] text-brand-cream flex items-center min-h-screen"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-32 space-y-16 relative z-10">
        <span className="block text-brand-taupe text-xs font-bold tracking-[0.35em] uppercase">
          Anh Duong Property
        </span>

        <div className="space-y-6">
          {LINES.map((line, i) => (
            <p
              key={i}
              data-manifesto-line
              className="text-3xl sm:text-4xl md:text-5xl font-serif leading-snug text-brand-cream opacity-0"
            >
              {line}
            </p>
          ))}
        </div>

        {/* Số liệu uy tín */}
        <div className="grid grid-cols-3 gap-8 pt-8 border-t border-brand-taupe/25">
          <div className="space-y-1">
            <div className="text-3xl sm:text-5xl font-serif text-white">
              <Counter to={10} suffix="+" />
            </div>
            <p className="text-xs sm:text-sm text-brand-cream/60 tracking-wide">Năm kinh nghiệm</p>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-5xl font-serif text-white">
              <Counter to={20} suffix="+" />
            </div>
            <p className="text-xs sm:text-sm text-brand-cream/60 tracking-wide">Dự án phân phối</p>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-5xl font-serif text-white">
              <Counter to={1000} suffix="+" />
            </div>
            <p className="text-xs sm:text-sm text-brand-cream/60 tracking-wide">Khách hàng đồng hành</p>
          </div>
        </div>
      </div>
    </section>
  );
}
