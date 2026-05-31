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
  'vinhomes': {
    name: 'Vinhomes',
    developerName: 'Vinhomes',
    desc: 'Nhà phát triển bất động sản số 1 Việt Nam, kiến tạo những siêu quần thể đô thị biển và khu đô thị sinh thái thông minh mang tầm cỡ quốc tế.',
    cover: '/images/project-op1.png',
  },
  'sun-group': {
    name: 'Sun Group',
    developerName: 'Sun Group',
    desc: 'Người khai mở dẫn đầu phân khúc bất động sản nghỉ dưỡng siêu sang, shophouse nghệ thuật và các kiệt tác kiến trúc bên bờ biển.',
    cover: '/images/project-sun.png',
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
    <div className="space-y-16 pb-20 bg-white">
      
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
          <div className="absolute inset-0 bg-gradient-to-t from-brand-verydark/80 via-brand-verydark/55 to-brand-verydark/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl space-y-4">
            <span className="text-[10px] bg-brand-brown/85 border border-brand-brown text-white px-3 py-1 rounded-none font-semibold tracking-wider uppercase">
              Nhà phát triển hiệu hữu
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-bold leading-tight">
              {brandInfo.name}
            </h1>
            <p className="text-brand-cream/90 text-sm sm:text-base max-w-xl">
              {brandInfo.desc}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Listings Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <h2 className="text-2xl font-serif text-brand-brown font-semibold mb-8">
          Sản Phẩm Đang Phân Phối ({brandProducts.length})
        </h2>

        {brandProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {brandProducts.map((product) => (
              <Link
                href={`/bat-dong-san/${product.id}`}
                key={product.id}
                className="group bg-white rounded-none overflow-hidden border border-brand-gray-medium hover:border-brand-taupe transition-all duration-300 flex flex-col h-full hover:shadow-lg"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 bg-brand-cream text-brand-brown text-[10px] font-bold px-2.5 py-0.5 rounded-none border border-brand-gray-medium">
                    {product.productTypeName}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between gap-6">
                  <div className="space-y-3">
                    <h3 className="text-base font-serif font-bold text-brand-brown line-clamp-2 group-hover:text-brand-taupe transition-colors leading-snug">
                      {product.title}
                    </h3>
                    <p className="text-brand-gray-text text-xs flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 shrink-0 text-brand-gray-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="truncate text-brand-gray-text">{product.location}</span>
                    </p>
                    <p className="text-brand-gray-text text-xs line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-brand-gray-light">
                    <div className="flex justify-between items-center text-xs text-brand-gray-text">
                      <span>{product.area} m²</span>
                      <span>{product.bedrooms} PN | {product.bathrooms} WC</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-brand-taupe font-bold text-lg">
                        {product.price > 100 ? 'Liên hệ' : `${product.price} Tỷ`}
                      </span>
                      <span className="text-[10px] text-brand-gray-text uppercase tracking-widest font-semibold bg-brand-cream border border-brand-gray-medium px-2 py-0.5 rounded-none">
                        {product.status}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-brand-cream border border-brand-gray-medium p-12 rounded-none text-center">
            <p className="text-brand-gray-text text-sm">Hiện tại chưa có giỏ hàng bất động sản nào đang mở bán trực tuyến cho thương hiệu này.</p>
          </div>
        )}
      </section>

    </div>
  );
}
