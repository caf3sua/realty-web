import Image from 'next/image';
import Link from 'next/link';
import { mockProducts, mockProjects } from '@/data/mockData';

interface Props {
  searchParams: Promise<{
    project?: string;
    type?: string;
    price?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: Props) {
  const { project, type, price } = await searchParams;

  // Filter products based on search parameters
  let filteredProducts = mockProducts;

  if (project) {
    filteredProducts = filteredProducts.filter((p) => p.projectSlug === project);
  }

  if (type) {
    filteredProducts = filteredProducts.filter((p) => p.productType === type);
  }

  if (price) {
    if (price === 'under-5') {
      filteredProducts = filteredProducts.filter((p) => p.price < 5);
    } else if (price === '5-10') {
      filteredProducts = filteredProducts.filter((p) => p.price >= 5 && p.price <= 10);
    } else if (price === '10-20') {
      filteredProducts = filteredProducts.filter((p) => p.price >= 10 && p.price <= 20);
    } else if (price === 'above-20') {
      filteredProducts = filteredProducts.filter((p) => p.price > 20);
    }
  }

  const getFilterText = () => {
    const parts = [];
    if (project) {
      const projName = mockProjects.find((p) => p.slug === project)?.name;
      parts.push(`Dự án: ${projName || project}`);
    }
    if (type) {
      const typeName =
        type === 'villa'
          ? 'Biệt thự'
          : type === 'townhouse'
          ? 'Liền kề'
          : type === 'apartment'
          ? 'Căn hộ'
          : 'Nhà thổ cư';
      parts.push(`Loại hình: ${typeName}`);
    }
    if (price) {
      const priceText =
        price === 'under-5'
          ? 'Dưới 5 tỷ'
          : price === '5-10'
          ? '5 - 10 tỷ'
          : price === '10-20'
          ? '10 - 20 tỷ'
          : 'Trên 20 tỷ';
      parts.push(`Mức giá: ${priceText}`);
    }
    return parts.length > 0 ? `Đang lọc theo (${parts.join(', ')})` : 'Tất cả sản phẩm';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      
      {/* Header */}
      <div className="border-b border-neutral-900 pb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <span className="text-amber-500 text-xs font-bold tracking-widest uppercase">Giỏ hàng toàn thị trường</span>
          <h1 className="text-4xl font-serif text-white font-semibold mt-2">Danh Sách Bất Động Sản</h1>
          <p className="text-neutral-400 text-sm mt-3">
            {getFilterText()} ({filteredProducts.length} kết quả)
          </p>
        </div>
        
        {/* Quick Clear Filter Option */}
        {(project || type || price) && (
          <Link
            href="/san-pham"
            className="text-xs text-amber-400 hover:text-amber-300 font-bold border border-amber-500/20 bg-amber-500/5 px-4 py-2 rounded-lg text-center cursor-pointer transition-colors"
          >
            Xóa Bộ Lọc
          </Link>
        )}
      </div>

      {/* Grid List */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
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
          <svg className="w-12 h-12 text-neutral-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-lg font-serif text-white font-medium">Không Tìm Thấy Bất Động Sản Phù Hợp</h2>
          <p className="text-neutral-500 text-xs leading-relaxed">
            Rất tiếc, các tiêu chí tìm kiếm hiện tại không có sản phẩm nào phù hợp. Bạn có thể xóa bộ lọc hoặc đăng ký nhận thông tin giỏ hàng mới.
          </p>
          <Link
            href="/san-pham"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-neutral-900 font-bold px-6 py-2 rounded-lg text-xs transition-all"
          >
            Xem Tất Cả Sản Phẩm
          </Link>
        </div>
      )}

    </div>
  );
}
