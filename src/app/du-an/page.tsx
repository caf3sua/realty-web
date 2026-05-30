import Image from 'next/image';
import Link from 'next/link';
import { mockProjects } from '@/data/mockData';

export default function ProjectsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      
      {/* Page Header */}
      <div className="border-b border-neutral-900 pb-8">
        <span className="text-amber-500 text-xs font-bold tracking-widest uppercase">Danh mục đô thị</span>
        <h1 className="text-4xl font-serif text-white font-semibold mt-2">Dự Án Bất Động Sản</h1>
        <p className="text-neutral-400 text-sm mt-3 max-w-2xl leading-relaxed">
          Tổng hợp các đại đô thị thông minh, tổ hợp chung cư cao cấp và khu nghỉ dưỡng sinh thái hàng đầu miền Bắc.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockProjects.map((project) => (
          <div
            key={project.id}
            className="group bg-neutral-900/20 border border-neutral-900 hover:border-amber-500/20 rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/5"
          >
            {/* Project Image */}
            <div className="relative h-60 w-full overflow-hidden">
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded shadow-md border ${
                project.status === 'Đang mở bán'
                  ? 'bg-amber-500 text-neutral-950 border-amber-400'
                  : project.status === 'Sắp mở bán'
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-neutral-800 text-neutral-300 border-neutral-700'
              }`}>
                {project.status}
              </span>
            </div>

            {/* Project Info */}
            <div className="p-6 flex flex-col justify-between flex-grow gap-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs text-neutral-500">
                  <span className="font-semibold text-amber-500/90">{project.developer}</span>
                  <span>Quy mô: {project.scale}</span>
                </div>
                <h2 className="text-xl font-serif font-bold text-white group-hover:text-amber-400 transition-colors">
                  {project.name}
                </h2>
                <p className="text-neutral-400 text-sm line-clamp-3 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[10px] bg-neutral-950 text-neutral-400 border border-neutral-900 px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-900 flex justify-between items-center mt-auto">
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">Khoảng giá bán</span>
                  <span className="text-amber-400 font-bold text-base">{project.priceRange}</span>
                </div>
                <Link
                  href={`/du-an/${project.slug}`}
                  className="bg-amber-500/15 text-amber-400 hover:bg-amber-500 hover:text-neutral-950 px-4 py-2 rounded-lg text-xs font-bold transition-all"
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
