import { notFound } from 'next/navigation';
import { api } from '@/services/api';
import type { Project, Product } from '@/data/mockData';
import ProjectExperience from '@/components/project/ProjectExperience';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const project = await api.getProject(slug);
    return {
      title: `${project.name} - Anh Duong Property`,
      description: project.shortDescription || project.description,
    };
  } catch {
    return { title: 'Dự án - Anh Duong Property' };
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;

  let project: Project | null = null;
  let projectProducts: Product[] = [];

  try {
    project = await api.getProject(slug);
    projectProducts = await api.getProducts({ project_slug: slug });
  } catch (error) {
    console.error('Error loading project details:', error);
  }

  if (!project) {
    notFound();
  }

  return <ProjectExperience project={project} products={projectProducts} />;
}
