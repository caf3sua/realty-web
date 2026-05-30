import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mockProjects, mockProducts } from '@/data/mockData';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = mockProjects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Filter products for this project
  const projectProducts = mockProducts.filter((prod) => prod.projectSlug === slug);

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. Project Hero Banner */}
      <section className="relative h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={project.image}
            alt={project.name}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-4">
            <span className="text-[10px] bg-amber-500/20 border border-amber-500/30 text-amber-400 px-3 py-1 rounded font-semibold tracking-wider uppercase">
              {project.status}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-bold leading-tight">
              {project.name}
            </h1>
            <p className="text-neutral-300 text-sm sm:text-base flex items-center gap-2">
              <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {project.location}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Project Details & Info */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-serif text-white font-semibold">Tổng Quan Dự Án</h2>
            <div className="text-neutral-400 text-sm leading-relaxed space-y-4">
              <p>{project.description}</p>
              <p>Dự án được quy hoạch với đầy đủ tiện ích nội khu như trường học liên cấp, bệnh viện quốc tế, các trung tâm thương mại sầm uất và không gian thể thao ngoài trời hiện đại. Đây là điểm đến lý tưởng cho các gia đình tìm kiếm chốn an cư cao cấp và giới đầu tư thông thái mong muốn sở hữu tài sản sinh lời bền vững.</p>
            </div>
          </div>

          {/* Quick Specs Box */}
          <div className="bg-neutral-900/40 border border-neutral-900 p-6 rounded-2xl h-fit space-y-6">
            <h3 className="text-lg font-serif text-white font-semibold border-b border-neutral-800 pb-3">Thông Số Kỹ Thuật</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex justify-between">
                <span className="text-neutral-500">Chủ đầu tư:</span>
                <span className="text-neutral-200 font-medium">{project.developer}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-neutral-500">Quy mô diện tích:</span>
                <span className="text-neutral-200 font-medium">{project.scale}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-neutral-500">Khoảng giá bán:</span>
                <span className="text-amber-400 font-bold">{project.priceRange}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-neutral-500">Trạng thái pháp lý:</span>
                <span className="text-neutral-200 font-medium">Quy hoạch 1/500 hoàn chỉnh</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Filtered Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-serif text-white font-semibold mb-8">
          Giỏ Hàng Đang Mở Bán ({projectProducts.length})
        </h2>

        {projectProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {projectProducts.map((product) => (
              <Link
                href={`/bat-dong-san/${product.id}`}
                key={product.id}
                className="group bg-neutral-900/40 rounded-xl overflow-hidden border border-neutral-900 hover:border-amber-500/20 transition-all duration-300 flex flex-col h-full hover:shadow-lg hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-neutral-950/80 text-amber-400 text-[10px] font-bold px-2.5 py-0.5 rounded border border-amber-500/20">
                    {product.productTypeName}
                  </span>
                  {product.isPremium && (
                    <span className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-900 text-[9px] font-extrabold px-2 py-1 rounded shadow-md tracking-wider uppercase">
                      Premium
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-neutral-200 line-clamp-2 group-hover:text-amber-400 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-neutral-500 text-xs flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="truncate">{product.location}</span>
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-neutral-800/80">
                    <div className="flex justify-between items-center text-xs text-neutral-400">
                      <span>{product.area} m²</span>
                      <span>{product.bedrooms} PN | {product.bathrooms} WC</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-amber-400 font-bold text-base">
                        {product.price > 100 ? 'Liên hệ' : `${product.price} Tỷ`}
                      </span>
                      <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold bg-neutral-950 px-2 py-0.5 rounded border border-neutral-900">
                        {product.status}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-neutral-900/20 border border-neutral-900 p-12 rounded-2xl text-center">
            <p className="text-neutral-500 text-sm">Hiện tại chưa có giỏ hàng bất động sản nào đang mở bán trực tuyến cho dự án này.</p>
            <Link
              href="#contact-form"
              className="inline-block mt-4 bg-amber-500 hover:bg-amber-600 text-neutral-900 font-bold px-6 py-2.5 rounded-lg text-xs transition-all"
            >
              Liên Hệ Nhận Giỏ Hàng Ngoại Giao
            </Link>
          </div>
        )}
      </section>

    </div>
  );
}
