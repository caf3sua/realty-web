'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { NewsPost } from '@/data/mockData';
import { formatNewsDate } from '@/lib/formatDate';

interface NewsCardProps {
  post: NewsPost;
  className?: string;
  imageHeight?: string;
}

/**
 * Card tin tức chuẩn: kế thừa phong cách sang trọng từ trang Tin tức,
 * có ảnh tỉ lệ chuẩn, badge chuyên mục, ngày đăng, tiêu đề serif, tóm tắt và nút chi tiết.
 */
export default function NewsCard({
  post,
  className = '',
  imageHeight = 'h-56',
}: NewsCardProps) {
  const formattedDate = formatNewsDate(post.publishedAt);

  return (
    <Link
      href={`/tin-tuc/${post.slug}`}
      className={`group bg-white border border-brand-gray-medium rounded-none overflow-hidden hover:border-brand-taupe transition-all duration-300 flex flex-col h-full hover:shadow-lg ${className}`}
    >
      {/* Image */}
      <div className={`relative ${imageHeight} w-full overflow-hidden bg-brand-cream/40`}>
        <Image
          src={post.image || '/images/hero-bg.png'}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col justify-between flex-grow gap-4">
        <div className="space-y-3">
          {/* Metadata: Category & Published Date */}
          <div className="flex items-center gap-3 text-[10px] font-bold text-brand-taupe uppercase tracking-wider">
            {post.category && <span>{post.category}</span>}
            {post.category && formattedDate && (
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gray-medium" />
            )}
            {formattedDate && (
              <span className="text-brand-gray-text font-medium">{formattedDate}</span>
            )}
          </div>

          {/* Title */}
          <h3 className="text-base font-serif font-bold text-brand-brown group-hover:text-brand-taupe transition-colors line-clamp-2 leading-snug">
            {post.title}
          </h3>

          {/* Summary */}
          {post.summary && (
            <p className="text-brand-gray-text text-xs line-clamp-3 leading-relaxed">
              {post.summary}
            </p>
          )}
        </div>

        {/* Action Link */}
        <span className="text-xs text-brand-brown font-semibold flex items-center gap-1 group-hover:gap-2 group-hover:text-brand-taupe transition-all mt-auto pt-2">
          Chi tiết bài viết
          <svg
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
