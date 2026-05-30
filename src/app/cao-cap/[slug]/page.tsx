import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mockProducts } from '@/data/mockData';

interface Props {
  params: Promise<{ slug: string }>;
}

const brandMap: Record<
  string,
  { name: string; desc: string; developerName: string; cover: string }
> = {
  'masterise-homes': {
    name: 'Masterise Homes',
    developerName: 'Masterise Homes',
    desc: 'Được thiết kế theo tiêu chuẩn đẳng cấp thế giới, mang đến phong cách sống thượng lưu trọn vẹn tại Hà Nội và TP.HCM.',
    cover: '/images/project-masteri.png',
  },
  'mik-group': {
    name: 'MIK Group',
    developerName: 'MIK Group',
    desc: 'Các dự án sở hữu không gian sống yên bình bên hồ điều hòa rộng lớn và trung tâm kinh tế Mỹ Đình năng động.',
    cover: '/images/project-mik.png',
  },
};

export default async function LuxuryBrandPage({ params }: Props) {
  const { slug } = await params;
  const brandInfo = brandMap[slug];

  if (!brandInfo) {
    notFound();
  }

  // Filter products by developer name
  const brandProducts = mockProducts.filter(
    (p) => p.developer?.toLowerCase() === brandInfo.developerName.toLowerCase()
  );

  return (
    <div className="space-y-16 pb-20">
      
      {/* 1. Brand Hero Banner */}
      <section className="relative h-[45vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={brandInfo.cover}
            alt={brandInfo.name}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-4">
            <span className="text-[10px] bg-amber-500/20 border border-amber-500/30 text-amber-400 px-3 py-1 rounded font-semibold tracking-wider uppercase">
              Nhà phát triển hiệu hữu
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-bold leading-tight">
              {brandInfo.name}
            </h1>
            <p className="text-neutral-300 text-sm sm:text-base max-w-xl">
              {brandInfo.desc}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Listings Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-serif text-white font-semibold mb-8">
          Sản Phẩm Đang Phân Phối ({brandProducts.length})
        </h2>

        {brandProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {brandProducts.map((product) => (
              <Link
                href={`/bat-dong-san/${product.id}`}
                key={product.id}
                className="group bg-neutral-900/20 rounded-xl overflow-hidden border border-neutral-900 hover:border-amber-500/20 transition-all duration-300 flex flex-col h-full hover:shadow-lg"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 bg-neutral-950/85 text-amber-400 text-[10px] font-bold px-2.5 py-0.5 rounded border border-amber-500/20">
                    {product.productTypeName}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between gap-6">
                  <div className="space-y-3">
                    <h3 className="text-base font-serif font-bold text-neutral-200 line-clamp-2 group-hover:text-amber-400 transition-colors leading-snug">
                      {product.title}
                    </h3>
                    <p className="text-neutral-500 text-xs flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="truncate">{product.location}</span>
                    </p>
                    <p className="text-neutral-400 text-xs line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-neutral-900">
                    <div className="flex justify-between items-center text-xs text-neutral-400">
                      <span>{product.area} m²</span>
                      <span>{product.bedrooms} PN | {product.bathrooms} WC</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-amber-400 font-bold text-lg">
                        {product.price > 100 ? 'Liên hệ' : `${product.price} Tỷ`}
                      </span>
                      <span className="text-[10px] text-amber-500 uppercase tracking-widest font-semibold bg-neutral-900 border border-amber-500/20 px-2 py-0.5 rounded">
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
            <p className="text-neutral-500 text-sm">Hiện tại chưa có giỏ hàng bất động sản nào đang mở bán trực tuyến cho thương hiệu này.</p>
          </div>
        )}
      </section>

    </div>
  );
}
