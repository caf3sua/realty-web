import Image from 'next/image';
import Link from 'next/link';
import { mockProducts } from '@/data/mockData';

export default function LuxurySegmentPage() {
  // Filter only premium products
  const premiumProducts = mockProducts.filter((p) => p.isPremium);

  return (
    <div className="bg-white text-brand-verydark min-h-screen">
      
      {/* 1. Header Banner */}
      <section className="relative py-24 border-b border-brand-gray-light bg-brand-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-brand-taupe text-xs font-bold tracking-[0.3em] uppercase">Premium Showcase</span>
          <h1 className="text-4xl sm:text-5xl font-serif text-brand-brown font-extrabold tracking-wide">
            Bất Động Sản Cao Cấp
          </h1>
          <p className="text-brand-gray-text text-sm max-w-2xl mx-auto leading-relaxed">
            Nơi hội tụ những bộ sưu tập dinh thự độc bản, biệt thự biển thượng lưu và căn hộ hàng hiệu được phát triển bởi các tập đoàn uy tín hàng đầu Việt Nam.
          </p>
        </div>
      </section>

      {/* 2. Luxury Brands Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12 bg-white">
        <h2 className="text-2xl font-serif text-brand-brown font-semibold text-center">Chủ Đầu Tư Danh Giá</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Masterise Homes Card */}
          <div className="bg-white border border-brand-gray-medium rounded-none p-8 flex flex-col justify-between gap-6 hover:border-brand-taupe transition-all duration-300 hover:shadow-sm">
            <div className="space-y-4">
              <div className="h-10 flex items-center justify-start mb-2">
                <img
                  src="/images/logo-Masterise-Homes.png"
                  alt="Masterise Homes Logo"
                  className="h-7 w-auto object-contain"
                />
              </div>
              <span className="text-xs text-brand-taupe font-bold tracking-widest uppercase">Masterise Homes</span>
              <h3 className="text-2xl font-serif text-brand-brown font-medium">Phong Cách Sống Hàng Hiệu</h3>
              <p className="text-brand-gray-text text-sm leading-relaxed">
                Nhà phát triển bất động sản hàng hiệu hàng đầu Việt Nam, hợp tác cùng các đối tác toàn cầu như Elie Saab, Marriott International. Kiến tạo giá trị sống trường tồn và dịch vụ quản lý chất lượng thế giới.
              </p>
            </div>
            <Link
              href="/cao-cap/masterise-homes"
              className="bg-white hover:bg-brand-cream text-brand-brown hover:text-brand-taupe border-2 border-brand-brown hover:border-brand-taupe text-xs font-bold py-3 rounded-none text-center transition-all"
            >
              Xem Các Căn Hộ Masterise Homes
            </Link>
          </div>

          {/* MIK Group Card */}
          <div className="bg-white border border-brand-gray-medium rounded-none p-8 flex flex-col justify-between gap-6 hover:border-brand-taupe transition-all duration-300 hover:shadow-sm">
            <div className="space-y-4">
              <div className="h-10 flex items-center justify-start mb-2">
                <img
                  src="/images/logo-MIK-Group.png"
                  alt="MIK Group Logo"
                  className="h-7 w-auto object-contain"
                />
              </div>
              <span className="text-xs text-brand-taupe font-bold tracking-widest uppercase">MIK Group</span>
              <h3 className="text-2xl font-serif text-brand-brown font-medium">Chuẩn Mực Sống Sang Trọng</h3>
              <p className="text-brand-gray-text text-sm leading-relaxed">
                Nổi tiếng với định vị dòng sản phẩm hạng sang The Matrix One và Imperia, MIK Group kiến tạo các giá trị sống bền vững, thiết kế xanh hài hòa thiên nhiên kết hợp công nghệ thông minh thời thượng.
              </p>
            </div>
            <Link
              href="/cao-cap/mik-group"
              className="bg-white hover:bg-brand-cream text-brand-brown hover:text-brand-taupe border-2 border-brand-brown hover:border-brand-taupe text-xs font-bold py-3 rounded-none text-center transition-all"
            >
              Xem Các Căn Hộ MIK Group
            </Link>
          </div>

          {/* Vinhomes Card */}
          <div className="bg-white border border-brand-gray-medium rounded-none p-8 flex flex-col justify-between gap-6 hover:border-brand-taupe transition-all duration-300 hover:shadow-sm">
            <div className="space-y-4">
              <div className="h-10 flex items-center justify-start mb-2">
                <img
                  src="/images/logo-vinhomes.png"
                  alt="Vinhomes Logo"
                  className="h-7 w-auto object-contain"
                />
              </div>
              <span className="text-xs text-brand-taupe font-bold tracking-widest uppercase">Vinhomes</span>
              <h3 className="text-2xl font-serif text-brand-brown font-medium">Đại Đô Thị Biển Quốc Tế</h3>
              <p className="text-brand-gray-text text-sm leading-relaxed">
                Thương hiệu bất động sản số 1 Việt Nam, nổi bật với các siêu dự án đô thị sinh thái kết hợp biển hồ nhân tạo kỳ vĩ, quy hoạch đồng bộ "Tất cả trong một" kiến tạo chuẩn mực sống văn minh hiện đại hàng đầu.
              </p>
            </div>
            <Link
              href="/cao-cap/vinhomes"
              className="bg-white hover:bg-brand-cream text-brand-brown hover:text-brand-taupe border-2 border-brand-brown hover:border-brand-taupe text-xs font-bold py-3 rounded-none text-center transition-all"
            >
              Xem Các Sản Phẩm Vinhomes
            </Link>
          </div>

          {/* Sun Group Card */}
          <div className="bg-white border border-brand-gray-medium rounded-none p-8 flex flex-col justify-between gap-6 hover:border-brand-taupe transition-all duration-300 hover:shadow-sm">
            <div className="space-y-4">
              <div className="h-10 flex items-center justify-start mb-2">
                <img
                  src="/images/logo-sun-group.png"
                  alt="Sun Group Logo"
                  className="h-9 w-auto object-contain"
                />
              </div>
              <span className="text-xs text-brand-taupe font-bold tracking-widest uppercase">Sun Group</span>
              <h3 className="text-2xl font-serif text-brand-brown font-medium">Kiệt Tác Nghỉ Dưỡng Độc Bản</h3>
              <p className="text-brand-gray-text text-sm leading-relaxed">
                Tập đoàn hàng đầu trong phát triển bất động sản gắn liền với du lịch nghỉ dưỡng cao cấp, shophouse phong cách nghệ thuật Địa Trung Hải và các dinh thự biển tráng lệ hòa mình cùng thiên nhiên kỳ vĩ.
              </p>
            </div>
            <Link
              href="/cao-cap/sun-group"
              className="bg-white hover:bg-brand-cream text-brand-brown hover:text-brand-taupe border-2 border-brand-brown hover:border-brand-taupe text-xs font-bold py-3 rounded-none text-center transition-all"
            >
              Xem Các Sản Phẩm Sun Group
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Premium Products List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 bg-white">
        <h2 className="text-2xl font-serif text-brand-brown font-semibold border-b border-brand-gray-medium pb-4">
          Bộ Sưu Tập Giới Hạn ({premiumProducts.length} sản phẩm)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {premiumProducts.map((product) => (
            <Link
              href={`/bat-dong-san/${product.id}`}
              key={product.id}
              className="group bg-white rounded-none overflow-hidden border border-brand-gray-medium hover:border-brand-taupe transition-all duration-300 flex flex-col h-full hover:shadow-lg"
            >
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 bg-brand-brown text-white text-[10px] font-extrabold px-3 py-1 rounded-none shadow-sm tracking-wider uppercase">
                  {product.developer}
                </span>
                <span className="absolute top-4 right-4 bg-brand-cream text-brand-brown text-[10px] font-bold px-2 py-0.5 rounded-none border border-brand-gray-medium">
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
      </section>

    </div>
  );
}
