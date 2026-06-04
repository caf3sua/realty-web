import Image from 'next/image';
import Link from 'next/link';
import { api } from '@/services/api';

export default async function ProjectsPage() {
  const projects = await api.getProjects();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 bg-white">
      
      {/* Page Header */}
      <div className="border-b border-brand-gray-medium pb-8">
        <span className="text-brand-taupe text-xs font-bold tracking-widest uppercase">Danh mục đô thị</span>
        <h1 className="text-4xl font-serif text-brand-brown font-semibold mt-2">Dự Án Bất Động Sản</h1>
        <p className="text-brand-gray-text text-sm mt-3 max-w-2xl leading-relaxed">
          Tổng hợp các đại đô thị thông minh, tổ hợp chung cư cao cấp và khu nghỉ dưỡng sinh thái hàng đầu miền Bắc.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group bg-white border border-brand-gray-medium hover:border-brand-taupe rounded-none overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-lg"
          >
            {/* Project Image */}
            <div className="relative h-60 w-full overflow-hidden">
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-none border ${
                project.status === 'Đang mở bán'
                  ? 'bg-brand-brown text-white border-brand-brown'
                  : project.status === 'Sắp mở bán'
                  ? 'bg-brand-taupe text-white border-brand-taupe'
                  : 'bg-brand-gray-light text-brand-gray-text border-brand-gray-medium'
              }`}>
                {project.status}
              </span>
            </div>

            {/* Project Info */}
            <div className="p-6 flex flex-col justify-between flex-grow gap-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs text-brand-gray-text">
                  <span className="font-semibold text-brand-taupe">{project.developer}</span>
                  <span>Quy mô: {project.scale}</span>
                </div>
                <h2 className="text-xl font-serif font-bold text-brand-brown group-hover:text-brand-taupe transition-colors">
                  {project.name}
                </h2>
                <p className="text-brand-gray-text text-sm line-clamp-3 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[10px] bg-brand-cream text-brand-gray-text border border-brand-gray-medium px-2 py-0.5 rounded-none">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-brand-gray-light flex justify-between items-center mt-auto">
                <div>
                  <span className="text-[10px] text-brand-gray-text uppercase tracking-wider block">Khoảng giá bán</span>
                  <span className="text-brand-taupe font-bold text-base">{project.priceRange}</span>
                </div>
                <Link
                  href={`/du-an/${project.slug}`}
                  className="bg-brand-brown border-2 border-brand-brown text-white hover:bg-brand-taupe hover:border-brand-taupe px-4 py-2 rounded-none text-xs font-bold transition-all"
                >
                  Khám Phá Chi Tiết
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
