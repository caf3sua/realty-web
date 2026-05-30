import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mockNews } from '@/data/mockData';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const news = mockNews.find((n) => n.slug === slug);

  if (!news) {
    notFound();
  }

  // Find other recent news
  const otherNews = mockNews.filter((n) => n.id !== news.id).slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Back link */}
      <Link href="/tin-tuc" className="text-xs text-neutral-400 hover:text-amber-400 flex items-center gap-1.5 transition-colors">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
        </svg>
        Quay lại Tin tức
      </Link>

      {/* Article Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-xs font-bold text-amber-500 uppercase tracking-wider">
          <span>{news.category}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
          <span className="text-neutral-500 font-medium">{news.publishedAt}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-white font-bold leading-snug">
          {news.title}
        </h1>
      </div>

      {/* Featured Image */}
      <div className="relative h-[250px] sm:h-[400px] rounded-2xl overflow-hidden border border-neutral-900">
        <Image
          src={news.image}
          alt={news.title}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Article Content */}
      <article
        className="prose prose-invert max-w-none text-neutral-300 text-sm sm:text-base leading-relaxed space-y-6"
        dangerouslySetInnerHTML={{ __html: news.content }}
      />

      {/* Other suggestions */}
      {otherNews.length > 0 && (
        <section className="pt-12 border-t border-neutral-900 space-y-6">
          <h3 className="text-xl font-serif text-white font-semibold">Tin Tức Liên Quan</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherNews.map((n) => (
              <Link
                href={`/tin-tuc/${n.slug}`}
                key={n.id}
                className="group space-y-3 block"
              >
                <div className="relative h-32 w-full rounded-lg overflow-hidden border border-neutral-900">
                  <Image
                    src={n.image}
                    alt={n.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h4 className="text-xs font-semibold text-neutral-200 line-clamp-2 leading-snug group-hover:text-amber-400 transition-colors">
                  {n.title}
                </h4>
                <span className="text-[10px] text-neutral-500">{n.publishedAt}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
