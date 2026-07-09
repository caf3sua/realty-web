'use client';

// Client root trang chi tiết dự án — compose hero/story/stats/products.

import { useEffect } from 'react';
import type { Project, Product } from '@/data/mockData';
import { ScrollTrigger } from '@/lib/gsap';
import ProjectHero from './ProjectHero';
import ProjectStory from './ProjectStory';
import ProjectStats from './ProjectStats';
import ProjectProducts from './ProjectProducts';

interface ProjectExperienceProps {
  project: Project;
  products: Product[];
}

export default function ProjectExperience({ project, products }: ProjectExperienceProps) {
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
    <div className="bg-white pb-12">
      <ProjectHero project={project} />
      <ProjectStats project={project} />
      <ProjectStory project={project} />
      <ProjectProducts products={products} />
    </div>
  );
}
