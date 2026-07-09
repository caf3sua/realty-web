'use client';

import { useRef } from 'react';
import Image from 'next/image';
import type { Project } from '@/data/mockData';
import { gsap, useGSAP } from '@/lib/gsap';
import { Reveal, SplitTextReveal, ParallaxImage } from '@/components/scroll/primitives';

const EXTRA_PARAGRAPH =
  'Dự án được quy hoạch với đầy đủ tiện ích nội khu như trường học liên cấp, bệnh viện quốc tế, các trung tâm thương mại sầm uất và không gian thể thao ngoài trời hiện đại. Đây là điểm đến lý tưởng cho các gia đình tìm kiếm chốn an cư cao cấp và giới đầu tư thông thái mong muốn sở hữu tài sản sinh lời bền vững.';

/** Story: mô tả dự án chia đoạn reveal + ảnh clip-path reveal với parallax. */
export default function ProjectStory({ project }: { project: Project }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.matchMedia().add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          reduce: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          const img = ref.current!.querySelector('[data-story-img]');
          if (!img) return;
          if (ctx.conditions?.reduce) {
            gsap.set(img, { clipPath: 'inset(0% 0 0 0)' });
            return;
          }
          gsap.fromTo(
            img,
            { clipPath: 'inset(12% 8% 12% 8%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              ease: 'none',
              scrollTrigger: {
                trigger: img,
                start: 'top 90%',
                end: 'top 35%',
                scrub: true,
              },
            }
          );
        }
      );
    },
    { scope: ref }
  );

  const paragraphs = [project.description, EXTRA_PARAGRAPH].filter(Boolean);

  return (
    <section ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div className="space-y-8">
          <div>
            <Reveal as="span" y={20} className="block text-brand-taupe text-xs font-bold tracking-[0.3em] uppercase mb-3">
              Tổng Quan Dự Án
            </Reveal>
            <SplitTextReveal as="h2" className="text-3xl sm:text-4xl font-serif text-brand-brown font-semibold">
              Câu Chuyện Kiến Tạo
            </SplitTextReveal>
          </div>
          <div className="space-y-5">
            {paragraphs.map((p, i) => (
              <Reveal key={i} as="p" y={30} delay={i * 0.08} className="text-brand-gray-text text-sm sm:text-base leading-relaxed">
                {p}
              </Reveal>
            ))}
          </div>
        </div>

        <div data-story-img className="will-change-[clip-path]">
          <ParallaxImage className="relative h-[55vh] lg:h-[70vh]" speed={10}>
            <Image
              src={project.image}
              alt={project.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </ParallaxImage>
        </div>
      </div>
    </section>
  );
}
