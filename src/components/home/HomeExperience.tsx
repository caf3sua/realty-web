'use client';

// Client root của homepage — compose 5 hồi scroll-telling.
// Nhận data từ server component (src/app/page.tsx).

import { useEffect } from 'react';
import type { Project, Product, NewsPost } from '@/data/mockData';
import { ScrollTrigger } from '@/lib/gsap';
import HeroSection from './HeroSection';
import ManifestoSection from './ManifestoSection';
import ProjectsShowcase from './ProjectsShowcase';
import ProductsShowcase from './ProductsShowcase';
import BrandsSection from './BrandsSection';
import NewsSection from './NewsSection';

interface HomeExperienceProps {
  projects: Project[];
  hotProducts: Product[];
  featuredProducts: Product[];
  premiumProduct?: Product;
  news: NewsPost[];
}

export default function HomeExperience({
  projects,
  hotProducts,
  featuredProducts,
  premiumProduct,
  news,
}: HomeExperienceProps) {
  // Pin spacing phụ thuộc kích thước ảnh/font — refresh sau khi trang load xong
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === 'complete') {
      const id = requestAnimationFrame(refresh);
      return () => cancelAnimationFrame(id);
    }
    window.addEventListener('load', refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);

  return (
    <div className="bg-[#0d0805]">
      <HeroSection projects={projects} />
      <ManifestoSection />
      <ProjectsShowcase projects={projects.slice(0, 6)} />
      <ProductsShowcase hotProducts={hotProducts} featuredProducts={featuredProducts} />
      <BrandsSection premiumProduct={premiumProduct} />
      <NewsSection news={news} />
    </div>
  );
}
