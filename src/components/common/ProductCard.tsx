'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/data/mockData';
import { TiltCard } from '@/components/scroll/primitives';

interface ProductCardProps {
  product: Product;
  /** badge góc trái: 'hot' đỏ | 'type' cream (mặc định) */
  badge?: 'hot' | 'type';
}

/** Card sản phẩm chuẩn scroll-telling: 3D tilt + ảnh clip-reveal (do parent điều khiển). */
export default function ProductCard({ product, badge = 'type' }: ProductCardProps) {
  return (
    <TiltCard className="h-full">
      <Link
        href={`/bat-dong-san/${product.slug}`}
        className="group bg-white rounded-none overflow-hidden border border-brand-gray-medium hover:border-brand-taupe transition-colors duration-300 flex flex-col h-full hover:shadow-xl"
      >
        {/* Ảnh — [data-clip-img] để parent batch reveal */}
        <div className="relative h-48 w-full overflow-hidden">
          <div data-clip-img className="absolute inset-0">
            <Image
              src={product.images[0] || '/images/hero-bg.png'}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          {badge === 'hot' ? (
            <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-none border border-red-700 uppercase tracking-widest">
              Hot
            </span>
          ) : (
            <span className="absolute top-3 left-3 bg-brand-cream text-brand-brown text-[10px] font-bold px-2 py-0.5 rounded-none border border-brand-gray-medium">
              {product.productTypeName}
            </span>
          )}
          {product.isPremium && (
            <span className="absolute top-3 right-3 bg-brand-brown text-white text-[9px] font-extrabold px-2 py-1 rounded-none shadow-md tracking-wider uppercase">
              Premium
            </span>
          )}
        </div>

        <div className="p-4 flex flex-col flex-grow justify-between gap-4">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-brand-brown line-clamp-2 group-hover:text-brand-taupe transition-colors">
              {product.title}
            </h3>
            <p className="text-brand-gray-text text-xs flex items-center gap-1">
              <svg className="w-3.5 h-3.5 shrink-0 text-brand-gray-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="truncate">{product.location}</span>
            </p>
          </div>

          <div className="space-y-3 pt-3 border-t border-brand-gray-light">
            <div className="flex justify-between items-center text-xs text-brand-gray-text">
              <span>{product.area} m²</span>
              <span>{product.bedrooms} PN | {product.bathrooms} WC</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-brand-taupe font-bold text-base">
                {product.price > 100 ? 'Liên hệ' : `${product.price} Tỷ`}
              </span>
              <span className="text-[10px] text-brand-gray-text uppercase tracking-widest font-semibold bg-brand-cream px-2 py-0.5 rounded-none border border-brand-gray-medium">
                {product.status}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}
