import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mockNews } from '@/data/mockData';
import { api } from '@/services/api';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/common/MotionWrapper';

interface Props {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  try {
    return await api.getPost(slug);
  } catch (err) {
    console.error(`Failed to fetch post detail ${slug}:`, err);
    return null;
  }
}

async function getPosts() {
  try {
    const data = await api.getPosts();
    return data.length > 0 ? data : mockNews;
  } catch (err) {
    console.error("Failed to fetch posts:", err);
    return mockNews;
  }
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  
  // Try fetching from live database API, fallback to mockData
  let news = await getPost(slug);
  if (!news) {
    news = mockNews.find((n) => n.slug === slug) || null;
  }

  if (!news) {
    notFound();
  }

  // Find other recent news
  const allNews = await getPosts();
  const otherNews = allNews.filter((n: any) => n.id !== news.id && n.slug !== news.slug).slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 bg-white">
      
      {/* Back link */}
      <Link href="/tin-tuc" className="text-xs text-brand-gray-text hover:text-brand-taupe flex items-center gap-1.5 transition-colors font-semibold">
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
        </svg>
        Quay lại Tin tức
      </Link>

      {/* Article Header */}
      <FadeIn className="space-y-4">
        <div className="flex items-center gap-3 text-xs font-bold text-brand-taupe uppercase tracking-wider">
          <span>{news.category}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gray-medium" />
          <span className="text-brand-gray-text font-medium">{news.publishedAt}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-brand-brown font-bold leading-snug">
          {news.title}
        </h1>
      </FadeIn>

      {/* Featured Image */}
      <FadeIn className="relative h-[250px] sm:h-[400px] rounded-none overflow-hidden border border-brand-gray-medium">
        <Image
          src={news.image}
          alt={news.title}
          fill
          priority
          className="object-cover"
        />
      </FadeIn>

      {/* Article Content */}
      <FadeIn>
        <article
          className="prose prose-neutral max-w-none text-brand-verydark text-sm sm:text-base leading-relaxed space-y-6"
          dangerouslySetInnerHTML={{ __html: news.content }}
        />
      </FadeIn>

      {/* Other suggestions */}
      {otherNews.length > 0 && (
        <section className="pt-12 border-t border-brand-gray-light space-y-6">
          <FadeIn>
            <h3 className="text-xl font-serif text-brand-brown font-semibold">Tin Tức Liên Quan</h3>
          </FadeIn>
          
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {otherNews.map((n: any) => (
              <StaggerItem key={n.id}>
                <Link
                  href={`/tin-tuc/${n.slug}`}
                  className="group space-y-3 block"
                >
                  <div className="relative h-32 w-full rounded-none overflow-hidden border border-brand-gray-medium">
                  <Image
                    src={n.image}
                    alt={n.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h4 className="text-xs font-semibold text-brand-brown line-clamp-2 leading-snug group-hover:text-brand-taupe transition-colors">
                  {n.title}
                </h4>
                <span className="text-[10px] text-brand-gray-text">{n.publishedAt}</span>
              </Link>
            </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      )}

    </div>
  );
}
