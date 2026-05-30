import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mockProducts, mockProjects } from '@/data/mockData';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  // Find project details if any
  const project = mockProjects.find((p) => p.slug === product.projectSlug);

  // Find related products
  const relatedProducts = mockProducts
    .filter((p) => p.productType === product.productType && p.id !== product.id)
    .slice(0, 4);

  const formatPrice = (val: number) => {
    if (val > 100) return 'Liên hệ';
    return `${val} Tỷ`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* 1. Breadcrumbs */}
      <nav className="text-xs text-neutral-500 flex gap-2 items-center">
        <Link href="/" className="hover:text-amber-400">Trang chủ</Link>
        <span>/</span>
        <Link href="/san-pham" className="hover:text-amber-400">Sản phẩm</Link>
        <span>/</span>
        <Link href={`/san-pham/${product.productType}`} className="hover:text-amber-400">{product.productTypeName}</Link>
        <span>/</span>
        <span className="text-neutral-300 truncate max-w-xs">{product.title}</span>
      </nav>

      {/* 2. Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Main image */}
        <div className="md:col-span-2 relative h-[300px] sm:h-[450px] rounded-2xl overflow-hidden border border-neutral-900">
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            priority
            className="object-cover"
          />
        </div>
        {/* Sub image grid */}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
          <div className="relative h-[140px] sm:h-[217px] rounded-2xl overflow-hidden border border-neutral-900">
            <Image
              src={product.images[1] || product.images[0]}
              alt={`${product.title} view 2`}
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-[140px] sm:h-[217px] rounded-2xl overflow-hidden border border-neutral-900 bg-neutral-900/50 flex items-center justify-center">
            {/* Show cover image or overlay */}
            <Image
              src={product.images[0]}
              alt={`${product.title} view 3`}
              fill
              className="object-cover opacity-35 filter blur-xs"
            />
            <span className="relative z-10 text-white font-bold text-sm tracking-wider uppercase">
              + Xem Thêm Ảnh
            </span>
          </div>
        </div>
      </div>

      {/* 3. Main Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left column: specs and description */}
        <div className="lg:col-span-2 space-y-10">
          {/* Header info */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-semibold px-2.5 py-0.5 rounded">
                {product.productTypeName}
              </span>
              {project && (
                <Link
                  href={`/du-an/${project.slug}`}
                  className="bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-amber-400 text-xs font-semibold px-2.5 py-0.5 rounded transition-colors"
                >
                  Dự án: {project.name}
                </Link>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif text-white font-bold leading-snug">
              {product.title}
            </h1>
            <p className="text-neutral-400 text-sm flex items-center gap-1.5">
              <svg className="w-4 h-4 text-neutral-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {product.location}
            </p>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 rounded-2xl bg-neutral-900/30 border border-neutral-900/60 text-center">
            <div>
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider block mb-1">Mức Giá</span>
              <span className="text-amber-400 font-bold text-lg">{formatPrice(product.price)}</span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider block mb-1">Diện Tích</span>
              <span className="text-neutral-200 font-bold text-lg">{product.area} m²</span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider block mb-1">Cơ Cấu PN/WC</span>
              <span className="text-neutral-200 font-semibold text-base">{product.bedrooms} PN / {product.bathrooms} WC</span>
            </div>
            <div>
              <span className="text-[10px] text-neutral-500 uppercase tracking-wider block mb-1">Pháp Lý</span>
              <span className="text-neutral-200 font-semibold text-xs leading-relaxed">{product.legal}</span>
            </div>
          </div>

          {/* Detailed stats */}
          <div className="space-y-4">
            <h2 className="text-xl font-serif text-white font-semibold">Thông Tin Chi Tiết</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm border-y border-neutral-900 py-4">
              <div className="flex justify-between border-b border-neutral-900/50 pb-2 sm:border-0 sm:pb-0">
                <span className="text-neutral-500">Mã sản phẩm:</span>
                <span className="text-neutral-300 font-medium">{product.id.toUpperCase()}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-900/50 pb-2 sm:border-0 sm:pb-0">
                <span className="text-neutral-500">Hướng nhà:</span>
                <span className="text-neutral-300 font-medium">{product.direction}</span>
              </div>
              <div className="flex justify-between border-b border-neutral-900/50 pb-2 sm:border-0 sm:pb-0">
                <span className="text-neutral-500">Đơn giá / m²:</span>
                <span className="text-neutral-300 font-medium">{product.pricePerSqm ? `${product.pricePerSqm} Triệu/m²` : 'Liên hệ'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Trạng thái:</span>
                <span className="text-amber-500 font-semibold">{product.status}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h2 className="text-xl font-serif text-white font-semibold">Mô Tả Sản Phẩm</h2>
            <div className="text-neutral-400 text-sm leading-relaxed space-y-4">
              <p>{product.description}</p>
              <p>Sở hữu bất động sản này đồng nghĩa với việc gia chủ được thừa hưởng toàn bộ hạ tầng dịch vụ cao cấp nhất của khu vực xung quanh. Thiết kế kiến trúc sang trọng tối ưu công năng cùng phong thủy vượng khí mang tài lộc. Đây không chỉ là không gian sống mà còn là tài sản tích lũy an toàn và sinh dòng tiền cho chủ sở hữu tương lai.</p>
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-4">
            <h2 className="text-xl font-serif text-white font-semibold">Tiện Ích Nổi Bật</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {['An ninh 24/7', 'Khuôn viên xanh', 'Bể bơi cao cấp', 'Khu vui chơi trẻ em', 'Hầm đỗ xe thông minh', 'Sảnh lounge tiếp khách'].map((amenity) => (
                <div key={amenity} className="flex items-center gap-2 text-sm text-neutral-300 bg-neutral-900/10 border border-neutral-900 px-4 py-3 rounded-xl">
                  <svg className="w-4 h-4 text-emerald-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column: Sticky Form */}
        <div className="h-fit lg:sticky lg:top-24">
          <div className="bg-neutral-900/30 border border-neutral-900 p-6 rounded-2xl space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-amber-500/20">
                <Image
                  src="/images/hero-bg.png" // agent avatar placeholder using generated image
                  alt="Agent avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">Chuyên viên Ánh Dương</h3>
                <span className="text-[10px] text-neutral-500 uppercase tracking-wider block">Chuyên viên tư vấn Premium</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <a
                href="tel:0919936576"
                className="w-full bg-amber-500 hover:bg-amber-600 text-neutral-900 font-bold py-3 rounded-lg text-center text-sm block transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Gọi Ngay: 0919 936 576
              </a>
              <a
                href="https://zalo.me/0919936576"
                target="_blank"
                rel="noreferrer"
                className="w-full bg-neutral-950 hover:bg-neutral-900 text-neutral-300 hover:text-white font-semibold py-3 rounded-lg text-center text-sm block border border-neutral-800 transition-all cursor-pointer"
              >
                Nhắn Tin Zalo
              </a>
            </div>

            <div className="border-t border-neutral-800/80 pt-6 space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider text-center">Yêu cầu tư vấn chi tiết</h4>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Cảm ơn bạn! Yêu cầu tư vấn của bạn đã được ghi nhận. Chuyên viên sẽ gọi điện tư vấn trong vòng 15 phút.');
                }}
                className="space-y-3"
              >
                <input
                  type="text"
                  placeholder="Họ và tên..."
                  required
                  className="w-full bg-neutral-950 text-xs text-white border border-neutral-800 focus:border-amber-500 rounded-lg px-3 py-2.5 focus:outline-none transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Số điện thoại..."
                  required
                  className="w-full bg-neutral-950 text-xs text-white border border-neutral-800 focus:border-amber-500 rounded-lg px-3 py-2.5 focus:outline-none transition-colors"
                />
                <textarea
                  placeholder="Tôi muốn tìm hiểu thông tin chi tiết về căn này..."
                  rows={3}
                  className="w-full bg-neutral-950 text-xs text-white border border-neutral-800 focus:border-amber-500 rounded-lg px-3 py-2.5 focus:outline-none transition-colors resize-none"
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-neutral-900 font-bold py-2.5 rounded-lg text-xs transition-all shadow-md cursor-pointer"
                >
                  Gửi Yêu Cầu
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Related Products */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-neutral-900 space-y-8">
          <h2 className="text-2xl font-serif text-white font-semibold">Sản Phẩm Tương Tự</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((prod) => (
              <Link
                href={`/bat-dong-san/${prod.id}`}
                key={prod.id}
                className="group bg-neutral-900/40 rounded-xl overflow-hidden border border-neutral-900 hover:border-amber-500/20 transition-all duration-300 flex flex-col h-full hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={prod.images[0]}
                    alt={prod.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-neutral-950/80 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-500/20">
                    {prod.productTypeName}
                  </span>
                </div>
                <div className="p-4 flex flex-col flex-grow justify-between gap-4">
                  <h3 className="text-xs font-semibold text-neutral-200 line-clamp-2 group-hover:text-amber-400 transition-colors leading-snug">
                    {prod.title}
                  </h3>
                  <div className="flex justify-between items-center text-[10px] text-neutral-400 pt-2 border-t border-neutral-800/80">
                    <span>{prod.area} m²</span>
                    <span className="text-amber-400 font-bold text-sm">{formatPrice(prod.price)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
