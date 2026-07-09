'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/data/mockData';
import { gsap, useGSAP } from '@/lib/gsap';
import { Reveal, RevealStagger } from '@/components/scroll/primitives';

/** Hồi 5a: thương hiệu siêu sang — section dark, chữ outline fill dần theo scrub. */
export default function BrandsSection({ premiumProduct }: { premiumProduct?: Product }) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
        // Chữ lớn outline → fill khi scroll qua
        gsap.fromTo(
          '[data-brand-word]',
          { backgroundSize: '0% 100%' },
          {
            backgroundSize: '100% 100%',
            ease: 'none',
            stagger: 0.3,
            scrollTrigger: {
              trigger: '[data-brand-words]',
              start: 'top 80%',
              end: 'bottom 45%',
              scrub: 1,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="dark-section noise-overlay relative bg-brand-verydark py-28"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-20">
        {/* Kicker + chữ lớn fill theo scroll */}
        <div className="space-y-8">
          <Reveal as="span" y={20} className="block text-brand-taupe text-xs font-bold tracking-[0.35em] uppercase">
            Phân Khúc Bất Động Sản Siêu Sang
          </Reveal>
          <div data-brand-words className="space-y-2">
            {['Masterise Homes', 'MIK Group'].map((name) => (
              <h2
                key={name}
                data-brand-word
                className="text-5xl sm:text-7xl lg:text-8xl font-serif font-bold uppercase leading-[1.05] text-transparent bg-clip-text bg-no-repeat"
                style={{
                  WebkitTextStroke: '1px rgba(252,252,249,0.35)',
                  backgroundImage: 'linear-gradient(90deg, #FCFCF9, #e8b96a)',
                  backgroundSize: '0% 100%',
                }}
              >
                {name}
              </h2>
            ))}
          </div>
          <Reveal as="p" y={24} className="text-brand-cream/60 text-sm max-w-2xl leading-relaxed">
            Khám phá các tổ hợp căn hộ, biệt thự mang thương hiệu cao cấp từ Masterise Homes và MIK
            Group, khẳng định vị thế chủ nhân sở hữu.
          </Reveal>
        </div>

        <RevealStagger className="grid grid-cols-1 lg:grid-cols-3 gap-8" stagger={0.15}>
          {/* Masterise */}
          <div className="border border-brand-taupe/30 hover:border-brand-taupe p-8 flex flex-col justify-between gap-8 transition-colors duration-500 bg-white/[0.03]">
            <div className="space-y-4">
              <span className="text-xs text-brand-taupe font-bold tracking-widest uppercase">Masterise Homes</span>
              <h3 className="text-2xl font-serif !text-brand-cream font-medium">Bất Động Sản Hàng Hiệu</h3>
              <p className="text-brand-cream/60 text-sm leading-relaxed">
                Thiết kế hiện đại chuẩn quốc tế kết hợp đơn vị vận hành hàng đầu thế giới Marriott &amp;
                Ritz-Carlton. Kiến tạo biểu tượng sống duy mỹ cho giới thượng lưu.
              </p>
            </div>
            <Link
              href="/cao-cap/masterise-homes"
              className="border border-brand-cream/50 text-brand-cream hover:bg-brand-cream hover:text-brand-brown text-xs font-bold py-2.5 text-center transition-all tracking-widest uppercase"
            >
              Khám Phá Giỏ Hàng Masterise
            </Link>
          </div>

          {/* MIK */}
          <div className="border border-brand-taupe/30 hover:border-brand-taupe p-8 flex flex-col justify-between gap-8 transition-colors duration-500 bg-white/[0.03]">
            <div className="space-y-4">
              <span className="text-xs text-brand-taupe font-bold tracking-widest uppercase">MIK Group</span>
              <h3 className="text-2xl font-serif !text-brand-cream font-medium">Không Gian Sống Độc Bản</h3>
              <p className="text-brand-cream/60 text-sm leading-relaxed">
                Sở hữu chuỗi dự án đắc địa cùng kiến trúc tinh tế như The Matrix One. Tập trung vào
                không gian xanh yên bình bên hồ điều hòa quy mô lớn.
              </p>
            </div>
            <Link
              href="/cao-cap/mik-group"
              className="border border-brand-cream/50 text-brand-cream hover:bg-brand-cream hover:text-brand-brown text-xs font-bold py-2.5 text-center transition-all tracking-widest uppercase"
            >
              Khám Phá Giỏ Hàng MIK
            </Link>
          </div>

          {/* Sản phẩm premium nổi bật */}
          {premiumProduct && (
            <div className="border border-brand-taupe/30 hover:border-brand-taupe overflow-hidden flex flex-col transition-colors duration-500 bg-white/[0.03]">
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={premiumProduct.images[0] || '/images/hero-bg.png'}
                  alt={premiumProduct.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-verydark/70 to-transparent" />
                <span className="absolute bottom-4 left-4 bg-brand-brown text-white text-[10px] font-extrabold px-2.5 py-0.5 tracking-wider uppercase">
                  Nổi bật nhất
                </span>
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-brand-taupe font-semibold">{premiumProduct.developer}</span>
                  <h4 className="text-sm font-semibold !text-brand-cream line-clamp-1">{premiumProduct.title}</h4>
                  <p className="text-brand-cream/50 text-xs line-clamp-2">{premiumProduct.description}</p>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-brand-taupe/25 text-xs">
                  <span className="text-amber-400/90 font-bold">
                    {premiumProduct.price} Tỷ ({premiumProduct.area} m²)
                  </span>
                  <Link
                    href={`/bat-dong-san/${premiumProduct.slug}`}
                    className="text-brand-cream hover:text-white transition-colors font-semibold"
                  >
                    Chi tiết &rarr;
                  </Link>
                </div>
              </div>
            </div>
          )}
        </RevealStagger>
      </div>
    </section>
  );
}
