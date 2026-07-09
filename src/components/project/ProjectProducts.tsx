'use client';

import { useRef } from 'react';
import Link from 'next/link';
import type { Product } from '@/data/mockData';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { Reveal, SplitTextReveal } from '@/components/scroll/primitives';
import ProductCard from '@/components/common/ProductCard';

/** Giỏ hàng đang mở bán — grid stagger reveal + clip-path ảnh, tái dùng ProductCard. */
export default function ProjectProducts({ products }: { products: Product[] }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;
      const cards = Array.from(gridRef.current.children);
      const images = gridRef.current.querySelectorAll('[data-clip-img]');

      gsap.matchMedia().add(
        {
          motion: '(prefers-reduced-motion: no-preference)',
          reduce: '(prefers-reduced-motion: reduce)',
        },
        (ctx) => {
          if (ctx.conditions?.reduce) {
            gsap.set(cards, { opacity: 1, y: 0 });
            return;
          }
          gsap.set(cards, { opacity: 0, y: 60 });
          gsap.set(images, { clipPath: 'inset(100% 0 0 0)', scale: 1.2 });

          ScrollTrigger.batch(cards, {
            start: 'top 88%',
            once: true,
            onEnter: (batch) => {
              gsap.to(batch, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.1 });
              gsap.to(
                batch.map((el) => (el as HTMLElement).querySelector('[data-clip-img]')),
                { clipPath: 'inset(0% 0 0 0)', scale: 1, duration: 1.2, ease: 'expo.out', stagger: 0.1 }
              );
            },
          });
        }
      );
    },
    { scope: gridRef }
  );

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="mb-12">
        <Reveal as="span" y={20} className="block text-brand-taupe text-xs font-bold tracking-[0.3em] uppercase mb-3">
          Giỏ Hàng Đang Mở Bán ({products.length})
        </Reveal>
        <SplitTextReveal as="h2" className="text-3xl sm:text-4xl font-serif text-brand-brown font-semibold">
          Sản Phẩm Tuyển Chọn
        </SplitTextReveal>
      </div>

      {products.length > 0 ? (
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} badge="type" />
          ))}
        </div>
      ) : (
        <Reveal className="bg-brand-cream border border-brand-gray-medium p-12 text-center">
          <p className="text-brand-gray-text text-sm">
            Hiện tại chưa có giỏ hàng bất động sản nào đang mở bán trực tuyến cho dự án này.
          </p>
          <Link
            href="#contact-form"
            className="inline-block mt-4 bg-brand-brown border-2 border-brand-brown hover:bg-brand-taupe hover:border-brand-taupe text-white font-bold px-6 py-2.5 text-xs transition-all"
          >
            Liên Hệ Nhận Giỏ Hàng Ngoại Giao
          </Link>
        </Reveal>
      )}
    </section>
  );
}
