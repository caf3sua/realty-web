'use client';

import { useRef } from 'react';
import type { Project } from '@/data/mockData';
import { gsap, useGSAP } from '@/lib/gsap';
import { Counter, Reveal } from '@/components/scroll/primitives';

/** Tách số đầu tiên khỏi chuỗi để đếm counter; phần còn lại giữ nguyên text. */
function parseStat(value: string): { num: number; decimals: number; suffix: string } | null {
  const match = value.match(/(\d+(?:[.,]\d+)?)/);
  if (!match) return null;
  const raw = match[1].replace(',', '.');
  const num = parseFloat(raw);
  if (Number.isNaN(num)) return null;
  const decimals = raw.includes('.') ? Math.min(raw.split('.')[1].length, 1) : 0;
  return { num, decimals, suffix: value.slice((match.index ?? 0) + match[1].length) };
}

function StatItem({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  const parsed = parseStat(value);
  const valueClass = `text-2xl sm:text-4xl font-serif leading-tight ${
    highlight ? 'text-brand-taupe' : 'text-brand-brown'
  }`;

  return (
    <div className="space-y-2">
      <p className="text-[11px] text-brand-gray-text tracking-[0.2em] uppercase">{label}</p>
      {parsed ? (
        <div className={valueClass}>
          <Counter to={parsed.num} decimals={parsed.decimals} suffix={parsed.suffix} />
        </div>
      ) : (
        <Reveal as="div" y={16} className={valueClass}>
          {value}
        </Reveal>
      )}
    </div>
  );
}

/** Dải stats lớn thay specs box: counters + đường kẻ taupe vẽ ngang theo scroll. */
export default function ProjectStats({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '[data-stat-line]',
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 85%',
              end: 'top 40%',
              scrub: true,
            },
          }
        );
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div data-stat-line className="h-px bg-brand-taupe/50 origin-left mb-10" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
        <StatItem label="Chủ đầu tư" value={project.developer} />
        <StatItem label="Quy mô diện tích" value={project.scale} />
        <StatItem label="Khoảng giá bán" value={project.priceRange} highlight />
        <StatItem label="Pháp lý" value="Quy hoạch 1/500 hoàn chỉnh" />
      </div>
      <div data-stat-line className="h-px bg-brand-taupe/50 origin-left mt-10" />
    </div>
  );
}
