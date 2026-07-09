'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { NewsPost } from '@/data/mockData';
import { Reveal, RevealStagger, SplitTextReveal } from '@/components/scroll/primitives';

/** Hồi 5b: tin tức — nền cream, cards reveal stagger. */
export default function NewsSection({ news }: { news: NewsPost[] }) {
  if (!news.length) return null;

  return (
    <section className="relative bg-brand-cream py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 space-y-2">
          <Reveal as="span" y={20} className="block text-brand-taupe text-xs font-bold tracking-[0.3em] uppercase">
            Tin Tức Địa Ốc
          </Reveal>
          <SplitTextReveal
            as="h2"
            className="text-3xl sm:text-4xl font-serif text-brand-brown font-bold uppercase tracking-wide"
          >
            Thị Trường & Xu Hướng
          </SplitTextReveal>
        </div>

        <RevealStagger className="grid grid-cols-1 md:grid-cols-3 gap-8" stagger={0.15}>
          {news.map((post) => (
            <Link key={post.id} href={`/tin-tuc/${post.slug}`} className="group block">
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
              </div>
              <div className="bg-white group-hover:bg-brand-brown p-5 transition-colors duration-350 ease-in-out">
                <h3 className="text-left font-bold text-brand-brown group-hover:text-white text-base leading-snug line-clamp-2 transition-colors duration-350 ease-in-out">
                  {post.title}
                </h3>
              </div>
            </Link>
          ))}
        </RevealStagger>

        <Reveal className="flex justify-center mt-14">
          <Link
            href="/tin-tuc"
            className="border border-brand-brown text-brand-brown text-xs font-bold tracking-[0.2em] uppercase px-6 py-3 flex items-center gap-2 hover:bg-brand-brown hover:text-white transition-colors"
          >
            Xem tất cả tin tức
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
