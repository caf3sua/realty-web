import Image from 'next/image';
import Link from 'next/link';
import { mockNews } from '@/data/mockData';

export default function NewsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 bg-white">
      
      {/* Header */}
      <div className="border-b border-brand-gray-medium pb-8">
        <span className="text-brand-taupe text-xs font-bold tracking-widest uppercase">Tin tức & phân tích</span>
        <h1 className="text-4xl font-serif text-brand-brown font-semibold mt-2">Tin Tức Bất Động Sản</h1>
        <p className="text-brand-gray-text text-sm mt-3 max-w-2xl leading-relaxed">
          Cập nhật nhanh chóng, chính xác về tiến độ các dự án, xu hướng thị trường và cẩm nang pháp lý hữu ích cho nhà đầu tư.
        </p>
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockNews.map((news) => (
          <Link
            href={`/tin-tuc/${news.slug}`}
            key={news.id}
            className="group bg-white border border-brand-gray-medium rounded-none overflow-hidden hover:border-brand-taupe transition-all duration-300 flex flex-col h-full hover:shadow-sm"
          >
            {/* Image */}
            <div className="relative h-56 w-full overflow-hidden">
              <Image
                src={news.image}
                alt={news.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col justify-between flex-grow gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-[10px] font-bold text-brand-taupe uppercase tracking-wider">
                  <span>{news.category}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gray-medium" />
                  <span className="text-brand-gray-text font-medium">{news.publishedAt}</span>
                </div>
                <h2 className="text-base font-serif font-bold text-brand-brown group-hover:text-brand-taupe transition-colors line-clamp-2 leading-snug">
                  {news.title}
                </h2>
                <p className="text-brand-gray-text text-xs line-clamp-3 leading-relaxed">
                  {news.summary}
                </p>
              </div>
              
              <span className="text-xs text-brand-brown font-semibold flex items-center gap-1 group-hover:gap-2 transition-all mt-auto">
                Chi tiết bài viết
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
