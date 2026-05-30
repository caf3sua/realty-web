import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mockProducts } from '@/data/mockData';

interface Props {
  params: Promise<{ slug: string }>;
}

const typeMap: Record<
  string,
  { type: 'villa' | 'townhouse' | 'apartment' | 'residential'; name: string; desc: string }
> = {
  villa: {
    type: 'villa',
    name: 'Biệt Thự & Dinh Thự',
    desc: 'Các dòng sản phẩm biệt thự đơn lập, song lập, dinh thự ven hồ, sát biển siêu sang đẳng cấp thượng lưu.',
  },
  townhouse: {
    type: 'townhouse',
    name: 'Liền Kề & Shophouse',
    desc: 'Nhà phố thương mại kinh doanh đắc địa, liền kề phố cổ và đô thị hiện đại phục vụ nhu cầu sống và sinh lời.',
  },
  apartment: {
    type: 'apartment',
    name: 'Căn Hộ Chung Cư Cao Cấp',
    desc: 'Căn hộ chung cư hạng sang, sở hữu tầm nhìn panorama triệu đô, tiện ích chuẩn resort 5 sao.',
  },
  residential: {
    type: 'residential',
    name: 'Đất Nền & Nhà Thổ Cư',
    desc: 'Nhà riêng thổ cư trung tâm thành phố, đất nền pháp lý rõ ràng, tiềm năng tăng giá trị lâu dài.',
  },
};

export default async function ProductCategoryPage({ params }: Props) {
  const { slug } = await params;
  const categoryInfo = typeMap[slug];

  if (!categoryInfo) {
    notFound();
  }

  // Filter products by type
  const categoryProducts = mockProducts.filter((p) => p.productType === categoryInfo.type);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      
      {/* Header */}
      <div className="border-b border-neutral-900 pb-8">
        <span className="text-amber-500 text-xs font-bold tracking-widest uppercase">Phân loại sản phẩm</span>
        <h1 className="text-4xl font-serif text-white font-semibold mt-2">{categoryInfo.name}</h1>
        <p className="text-neutral-400 text-sm mt-3 max-w-2xl leading-relaxed">
          {categoryInfo.desc} ({categoryProducts.length} kết quả đang mở bán)
        </p>
      </div>

      {/* Grid List */}
      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryProducts.map((product) => (
            <Link
              href={`/bat-dong-san/${product.id}`}
              key={product.id}
              className="group bg-neutral-900/40 rounded-xl overflow-hidden border border-neutral-900 hover:border-amber-500/20 transition-all duration-300 flex flex-col h-full hover:shadow-lg hover:-translate-y-1"
            >
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
        <div className="bg-neutral-900/20 border border-neutral-900 p-16 rounded-2xl text-center space-y-4 max-w-xl mx-auto">
          <p className="text-neutral-500 text-sm">Hiện tại chưa có giỏ hàng bất động sản nào đang mở bán trực tuyến cho phân loại này.</p>
          <Link
            href="/san-pham"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-neutral-900 font-bold px-6 py-2.5 rounded-lg text-xs transition-all"
          >
            Xem Tất Cả Sản Phẩm
          </Link>
        </div>
      )}

    </div>
  );
}
