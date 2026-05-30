import Image from 'next/image';
import Link from 'next/link';
import { mockProducts } from '@/data/mockData';

export default function LuxurySegmentPage() {
  // Filter only premium products
  const premiumProducts = mockProducts.filter((p) => p.isPremium);

  return (
    <div className="bg-neutral-950 text-neutral-100 min-h-screen">
      
      {/* 1. Header Banner */}
      <section className="relative py-24 border-b border-neutral-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/20 via-neutral-950 to-neutral-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-amber-500 text-xs font-bold tracking-[0.3em] uppercase">Premium Showcase</span>
          <h1 className="text-4xl sm:text-5xl font-serif text-white font-extrabold tracking-wide">
            Bất Động Sản Cao Cấp
          </h1>
          <p className="text-neutral-400 text-sm max-w-2xl mx-auto leading-relaxed">
            Nơi hội tụ những bộ sưu tập dinh thự độc bản, biệt thự biển thượng lưu và căn hộ hàng hiệu được phát triển bởi các tập đoàn uy tín hàng đầu Việt Nam.
          </p>
        </div>
      </section>

      {/* 2. Luxury Brands Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
        <h2 className="text-2xl font-serif text-white font-semibold text-center">Chủ Đầu Tư Danh Giá</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Masterise Homes Card */}
          <div className="bg-neutral-900/30 border border-neutral-900 rounded-2xl p-8 flex flex-col justify-between gap-6 hover:border-amber-500/20 transition-all duration-300">
            <div className="space-y-4">
              <span className="text-xs text-amber-500 font-bold tracking-widest uppercase">Masterise Homes</span>
              <h3 className="text-2xl font-serif text-white font-medium">Phong Cách Sống Hàng Hiệu</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Nhà phát triển bất động sản hàng hiệu hàng đầu Việt Nam, hợp tác cùng các đối tác toàn cầu như Elie Saab, Marriott International. Kiến tạo giá trị sống trường tồn và dịch vụ quản lý chất lượng thế giới.
              </p>
            </div>
            <Link
              href="/cao-cap/masterise-homes"
              className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 hover:from-amber-500 hover:to-amber-600 text-amber-400 hover:text-neutral-950 text-xs font-bold py-3 rounded-lg text-center border border-amber-500/30 hover:border-transparent transition-all"
            >
              Xem Các Căn Hộ Masterise Homes
            </Link>
          </div>

          {/* MIK Group Card */}
          <div className="bg-neutral-900/30 border border-neutral-900 rounded-2xl p-8 flex flex-col justify-between gap-6 hover:border-amber-500/20 transition-all duration-300">
            <div className="space-y-4">
              <span className="text-xs text-amber-500 font-bold tracking-widest uppercase">MIK Group</span>
              <h3 className="text-2xl font-serif text-white font-medium">Chuẩn Mực Sống Sang Trọng</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Nổi tiếng với định vị dòng sản phẩm hạng sang The Matrix One và Imperia, MIK Group kiến tạo các giá trị sống bền vững, thiết kế xanh hài hòa thiên nhiên kết hợp công nghệ thông minh thời thượng.
              </p>
            </div>
            <Link
              href="/cao-cap/mik-group"
              className="bg-gradient-to-r from-amber-500/10 to-amber-600/10 hover:from-amber-500 hover:to-amber-600 text-amber-400 hover:text-neutral-950 text-xs font-bold py-3 rounded-lg text-center border border-amber-500/30 hover:border-transparent transition-all"
            >
              Xem Các Căn Hộ MIK Group
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Premium Products List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        <h2 className="text-2xl font-serif text-white font-semibold border-b border-neutral-900 pb-4">
          Bộ Sưu Tập Giới Hạn ({premiumProducts.length} sản phẩm)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {premiumProducts.map((product) => (
            <Link
              href={`/bat-dong-san/${product.id}`}
              key={product.id}
              className="group bg-neutral-900/20 rounded-xl overflow-hidden border border-neutral-900 hover:border-amber-500/20 transition-all duration-300 flex flex-col h-full hover:shadow-lg"
            >
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 text-[10px] font-extrabold px-3 py-1 rounded shadow-md tracking-wider uppercase">
                  {product.developer}
                </span>
                <span className="absolute top-4 right-4 bg-neutral-950/80 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/20">
                  {product.productTypeName}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-grow justify-between gap-6">
                <div className="space-y-3">
                  <h3 className="text-base font-serif font-bold text-neutral-200 line-clamp-2 group-hover:text-amber-400 transition-colors leading-snug">
                    {product.title}
                  </h3>
                  <p className="text-neutral-500 text-xs flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 shrink-0 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      </section>

    </div>
  );
}
