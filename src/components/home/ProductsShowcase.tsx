'use client';

import { useRef } from 'react';
import Link from 'next/link';
import type { Product } from '@/data/mockData';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { SplitTextReveal, Reveal } from '@/components/scroll/primitives';
import ProductCard from '@/components/common/ProductCard';

interface ProductsShowcaseProps {
  hotProducts: Product[];
  featuredProducts: Product[];
}

function ProductGrid({ products, badge }: { products: Product[]; badge: 'hot' | 'type' }) {
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
                {
                  clipPath: 'inset(0% 0 0 0)',
                  scale: 1,
                  duration: 1.2,
                  ease: 'expo.out',
                  stagger: 0.1,
                }
              );
            },
          });
        }
      );
    },
    { scope: gridRef }
  );

  return (
    <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.slug} product={product} badge={badge} />
      ))}
    </div>
  );
}

function SectionHeader({
  kicker,
  title,
  href,
  linkLabel,
}: {
  kicker: string;
  title: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
      <div>
        <Reveal as="span" y={20} className="block text-brand-taupe text-xs font-bold tracking-[0.25em] uppercase">
          {kicker}
        </Reveal>
        <SplitTextReveal
          as="h2"
          className="text-3xl sm:text-4xl font-serif text-brand-brown font-semibold mt-2"
        >
          {title}
        </SplitTextReveal>
      </div>
      <Reveal y={20}>
        <Link
          href={href}
          className="text-brand-brown hover:text-brand-taupe text-sm font-semibold flex items-center gap-1.5 transition-colors border border-brand-brown/40 hover:border-brand-taupe px-4 py-2"
        >
          {linkLabel}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </Reveal>
    </div>
  );
}

/** Hồi 4: sản phẩm hot + nổi bật — nền cream, clip-path reveal + 3D tilt. */
export default function ProductsShowcase({ hotProducts, featuredProducts }: ProductsShowcaseProps) {
  return (
    <section className="relative bg-[#FDFAF5] rounded-t-[3rem] -mt-12 z-10 pt-24 pb-28 space-y-28">
      {hotProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            kicker="Tuyển Chọn Đặc Biệt"
            title="Bất Động Sản Hot"
            href="/san-pham-hot"
            linkLabel="Xem tất cả sản phẩm hot"
          />
          <ProductGrid products={hotProducts} badge="hot" />
        </div>
      )}

      {featuredProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            kicker="Giỏ Hàng Mới Nhất"
            title="Bất Động Sản Nổi Bật"
            href="/san-pham"
            linkLabel="Xem tất cả sản phẩm"
          />
          <ProductGrid products={featuredProducts} badge="type" />
        </div>
      )}
    </section>
  );
}
