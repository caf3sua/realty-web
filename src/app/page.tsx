import { mockNews } from '@/data/mockData';
import { api } from '@/services/api';
import HomeExperience from '@/components/home/HomeExperience';

export default async function Home() {
  // Fetch projects and products from the service
  const [projects, products, hotProducts] = await Promise.all([
    api.getProjects(),
    api.getProducts(),
    api.getProducts({ is_hot: true }).catch(() => []),
  ]);

  async function getPosts() {
    try {
      const data = await api.getPosts();
      return data.length > 0 ? data : mockNews;
    } catch (err) {
      console.error('Failed to fetch posts, using mockNews fallback:', err);
      return mockNews;
    }
  }

  const allNews = await getPosts();
  const premiumProducts = products.filter((p) => p.isPremium);

  return (
    <HomeExperience
      projects={projects}
      hotProducts={hotProducts.slice(0, 4)}
      featuredProducts={products.slice(0, 4)}
      premiumProduct={premiumProducts[0]}
      news={allNews.slice(0, 3)}
    />
  );
}
