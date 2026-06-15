import type { MetadataRoute } from 'next';
import { api } from '@/services/api';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://anhduongproperty.vn';

  // 1. Static routes
  const staticRoutes = [
    '',
    '/du-an',
    '/san-pham',
    '/cao-cap',
    '/tin-tuc',
    '/landing-page/vinhomes-ha-long-xanh',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 2. Dynamic projects routes
  let projectRoutes: any[] = [];
  try {
    const projects = await api.getProjects();
    projectRoutes = projects.map((p) => ({
      url: `${baseUrl}/du-an/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch (e) {
    console.error('Sitemap: failed to fetch projects', e);
  }

  // 3. Dynamic products routes
  let productRoutes: any[] = [];
  try {
    const products = await api.getProducts();
    productRoutes = products.map((p) => ({
      url: `${baseUrl}/bat-dong-san/${p.slug || p.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));
  } catch (e) {
    console.error('Sitemap: failed to fetch products', e);
  }

  // 4. Dynamic news posts routes
  let newsRoutes: any[] = [];
  try {
    const posts = await api.getPosts();
    newsRoutes = posts.map((n) => ({
      url: `${baseUrl}/tin-tuc/${n.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
  } catch (e) {
    console.error('Sitemap: failed to fetch posts', e);
  }

  return [...staticRoutes, ...projectRoutes, ...productRoutes, ...newsRoutes];
}
