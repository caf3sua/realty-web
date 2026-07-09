'use client';

// Animation primitives dùng chung cho scroll-telling.
// Thay thế dần FadeIn/StaggerContainer/StaggerItem trong MotionWrapper (deprecated).

import { useRef, useState, type ElementType, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { splitIntoWords } from '@/lib/splitText';

/* ---------------------------------- Reveal --------------------------------- */

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** khoảng cách trượt lên, px */
  y?: number;
  delay?: number;
  as?: ElementType;
}

/** Fade-up khi element vào viewport (chạy 1 lần). */
export function Reveal({ children, className, y = 40, delay = 0, as = 'div' }: RevealProps) {
  const ref = useRef<any>(null);
  // ElementType union làm TS collapse props về never — nới kiểu cho JSX động
  const Tag = as as 'div';

  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.matchMedia().add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          reduce: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          const el = ref.current!;
          if (ctx.conditions?.reduce) {
            gsap.set(el, { opacity: 1, y: 0 });
            return;
          }
          gsap.fromTo(
            el,
            { opacity: 0, y },
            {
              opacity: 1,
              y: 0,
              duration: 1.1,
              delay,
              ease: 'expo.out',
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            }
          );
        }
      );
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </Tag>
  );
}

/* ------------------------------- RevealStagger ------------------------------ */

interface RevealStaggerProps {
  children: ReactNode;
  className?: string;
  /** selector các item con cần stagger; mặc định con trực tiếp */
  itemSelector?: string;
  stagger?: number;
  y?: number;
}

/** Stagger fade-up các phần tử con khi container vào viewport. */
export function RevealStagger({
  children,
  className,
  itemSelector = ':scope > *',
  stagger = 0.12,
  y = 48,
}: RevealStaggerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const items = Array.from(ref.current.querySelectorAll(itemSelector));
      if (!items.length) return;

      gsap.matchMedia().add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          reduce: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          if (ctx.conditions?.reduce) {
            gsap.set(items, { opacity: 1, y: 0 });
            return;
          }
          gsap.set(items, { opacity: 0, y });
          ScrollTrigger.batch(items, {
            start: 'top 88%',
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: 'expo.out',
                stagger,
              }),
          });
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ------------------------------- ParallaxImage ------------------------------ */

interface ParallaxImageProps {
  children: ReactNode;
  className?: string;
  /** cường độ parallax theo %, dương = ảnh trôi xuống chậm hơn scroll */
  speed?: number;
}

/**
 * Wrapper parallax: bọc <Image fill> bên trong. Ảnh được scale dư để không hở mép.
 * <ParallaxImage className="relative h-[60vh]"><Image fill .../></ParallaxImage>
 */
export function ParallaxImage({ children, className, speed = 12 }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current || !innerRef.current) return;
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          innerRef.current,
          { yPercent: -speed },
          {
            yPercent: speed,
            ease: 'none',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={`overflow-hidden ${className ?? ''}`}>
      <div
        ref={innerRef}
        className="absolute inset-0 will-change-transform"
        style={{ scale: 1 + (Math.abs(speed) * 2) / 100 }}
      >
        {children}
      </div>
    </div>
  );
}

/* ------------------------------ SplitTextReveal ----------------------------- */

interface SplitTextRevealProps {
  children: string;
  className?: string;
  as?: ElementType;
  /** 'mount' chạy ngay khi xuất hiện; 'scroll' chạy khi vào viewport */
  trigger?: 'mount' | 'scroll';
  delay?: number;
  stagger?: number;
}

/** Heading reveal từng từ trượt lên từ mask. */
export function SplitTextReveal({
  children,
  className,
  as = 'h2',
  trigger = 'scroll',
  delay = 0,
  stagger = 0.06,
}: SplitTextRevealProps) {
  const ref = useRef<any>(null);
  const Tag = as as 'h2';

  useGSAP(
    () => {
      if (!ref.current) return;
      gsap.matchMedia().add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          reduce: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          const el = ref.current!;
          if (ctx.conditions?.reduce) {
            gsap.set(el, { opacity: 1 });
            return;
          }
          const { words, revert } = splitIntoWords(el);
          gsap.set(el, { opacity: 1 });
          gsap.from(words, {
            yPercent: 110,
            rotateX: -40,
            duration: 1.2,
            delay,
            ease: 'expo.out',
            stagger,
            ...(trigger === 'scroll'
              ? { scrollTrigger: { trigger: el, start: 'top 85%', once: true } }
              : {}),
          });
          return revert;
        }
      );
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </Tag>
  );
}

/* ---------------------------------- Counter --------------------------------- */

interface CounterProps {
  to: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
}

/** Số đếm tăng dần khi vào viewport. */
export function Counter({ to, className, prefix = '', suffix = '', decimals = 0, duration = 1.8 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;
      const el = ref.current;
      const format = (v: number) =>
        `${prefix}${v.toLocaleString('vi-VN', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}${suffix}`;

      gsap.matchMedia().add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          reduce: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          if (ctx.conditions?.reduce) {
            el.textContent = format(to);
            return;
          }
          const state = { value: 0 };
          gsap.to(state, {
            value: to,
            duration,
            ease: 'power2.out',
            scrollTrigger: { trigger: el, start: 'top 90%', once: true },
            onUpdate: () => {
              el.textContent = format(state.value);
            },
          });
        }
      );
    },
    { scope: ref }
  );

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}

/* ---------------------------------- TiltCard -------------------------------- */

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** độ nghiêng tối đa (deg) */
  max?: number;
}

/** Card nghiêng 3D theo vị trí chuột (Framer Motion). Tự tắt trên touch. */
export function TiltCard({ children, className, max = 7 }: TiltCardProps) {
  const [enabled] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
  );
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(y, [0, 1], [max, -max]), { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-max, max]), { stiffness: 220, damping: 22 });

  if (!enabled) return <div className={className}>{children}</div>;

  return (
    <div className="perspective-1000">
      <motion.div
        className={`${className ?? ''} preserve-3d`}
        style={{ rotateX, rotateY }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          x.set((e.clientX - rect.left) / rect.width);
          y.set((e.clientY - rect.top) / rect.height);
        }}
        onMouseLeave={() => {
          x.set(0.5);
          y.set(0.5);
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
