import type { Project, Product, Developer, Amenity } from '@/data/mockData';

const API_BASE_URL = process.env.API_URL || 'http://localhost:8000/api';

export const api = {
  // Projects
  async getProjects(): Promise<Project[]> {
    const res = await fetch(`${API_BASE_URL}/projects`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch projects');
    return res.json();
  },

  async getProject(slug: string): Promise<Project> {
    const res = await fetch(`${API_BASE_URL}/projects/${slug}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to fetch project with slug: ${slug}`);
    return res.json();
  },

  // Products
  async getProducts(params?: {
    product_type?: string;
    developer?: string;
    is_premium?: boolean;
    is_hot?: boolean;
    project_slug?: string;
  }): Promise<Product[]> {
    const query = new URLSearchParams();
    if (params) {
      if (params.product_type) query.append('product_type', params.product_type);
      if (params.developer) query.append('developer', params.developer);
      if (params.is_premium !== undefined) query.append('is_premium', String(params.is_premium));
      if (params.is_hot !== undefined) query.append('is_hot', String(params.is_hot));
      if (params.project_slug) query.append('project_slug', params.project_slug);
    }
    const queryString = query.toString() ? `?${query.toString()}` : '';
    const res = await fetch(`${API_BASE_URL}/products${queryString}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  async getProduct(idOrSlug: string): Promise<Product> {
    const res = await fetch(`${API_BASE_URL}/products/${idOrSlug}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to fetch product with id/slug: ${idOrSlug}`);
    return res.json();
  },

  // Developers
  async getDevelopers(): Promise<Developer[]> {
    const res = await fetch(`${API_BASE_URL}/developers`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch developers');
    return res.json();
  },

  async getDeveloper(slug: string): Promise<Developer> {
    const res = await fetch(`${API_BASE_URL}/developers/${slug}`, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to fetch developer with slug: ${slug}`);
    return res.json();
  },

  // Posts
  async getPosts(): Promise<any[]> {
    const res = await fetch(`${API_BASE_URL}/posts`, { next: { revalidate: 60 } } as any);
    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json();
  },

  async getPost(slug: string): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/posts/${slug}`, { next: { revalidate: 60 } } as any);
    if (!res.ok) throw new Error(`Failed to fetch post with slug: ${slug}`);
    return res.json();
  },

  async subscribeNewsletter(email: string): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/crm/newsletters`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.detail || 'Đăng ký nhận tin tức thất bại.');
    }
    return res.json();
  },

  async createAdvisory(data: {
    name: string;
    phone: string;
    details: string;
    productSlug?: string;
    productName?: string;
  }): Promise<any> {
    const res = await fetch(`${API_BASE_URL}/crm/advisories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.detail || 'Gửi yêu cầu tư vấn thất bại.');
    }
    return res.json();
  },

  // Amenities
  async getAmenities(): Promise<Amenity[]> {
    const res = await fetch(`${API_BASE_URL}/amenities`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch amenities');
    return res.json();
  }
};
