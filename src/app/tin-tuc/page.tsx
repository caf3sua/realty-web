import { mockNews } from '@/data/mockData';
import { api } from '@/services/api';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/common/MotionWrapper';
import NewsCard from '@/components/common/NewsCard';

async function getPosts() {
  try {
    const data = await api.getPosts();
    return data.length > 0 ? data : mockNews;
  } catch (err) {
    console.error("Failed to fetch posts, using mockNews fallback:", err);
    return mockNews;
  }
}

export default async function NewsPage() {
  const posts = await getPosts();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-16 space-y-12 bg-white">
      
      {/* Header */}
      <FadeIn className="border-b border-brand-gray-medium pb-8">
        <span className="text-brand-taupe text-xs font-bold tracking-widest uppercase">Tin tức & phân tích</span>
        <h1 className="text-4xl font-serif text-brand-brown font-semibold mt-2">Tin Tức Bất Động Sản</h1>
        <p className="text-brand-gray-text text-sm mt-3 max-w-2xl leading-relaxed">
          Cập nhật nhanh chóng, chính xác về tiến độ các dự án, xu hướng thị trường và cẩm nang pháp lý hữu ích cho nhà đầu tư.
        </p>
      </FadeIn>

      {/* News Grid */}
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((news: any) => (
          <StaggerItem key={news.id}>
            <NewsCard post={news} />
          </StaggerItem>
        ))}
      </StaggerContainer>

    </div>
  );
}
