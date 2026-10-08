import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { api } from '@/services/api';
import type { Product, Project } from '@/data/mockData';
import ContactForm from '@/components/common/ContactForm';
import ProductGallery from '@/components/common/ProductGallery';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/common/MotionWrapper';
import { formatProductDate } from '@/lib/formatDate';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  let product: Product | null = null;
  let project: Project | null = null;
  let relatedProducts: Product[] = [];
  let productAmenities: any[] = [];

  try {
    product = await api.getProduct(slug);
    if (product) {
      const [projectRes, productsRes] = await Promise.all([
        product.projectSlug && product.projectSlug !== 'ngoai-du-an' 
          ? api.getProject(product.projectSlug).catch(() => null)
          : Promise.resolve(null),
        api.getProducts({ product_type: product.productType })
      ]);
      project = projectRes;
      productAmenities = product.amenities || [];
      relatedProducts = productsRes
        .filter((p) => p.slug !== product!.slug)
        .slice(0, 4);
    }
  } catch (error) {
    console.error("Error loading product details by slug:", error);
  }

  if (!product) {
    notFound();
  }

  const formatPrice = (item: { expectedPrice?: string; price?: number }) => {
    if (item.expectedPrice) return item.expectedPrice;
    if (!item.price || item.price <= 0 || item.price > 100) return 'Liên hệ';
    return `${item.price} Tỷ`;
  };

  const updatedDateStr = formatProductDate(product.updatedAt || product.createdAt, product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 space-y-12 bg-white">

      {/* 1. Breadcrumbs */}
      <nav className="text-xs text-brand-gray-text flex gap-2 items-center">
        <Link href="/" className="hover:text-brand-taupe">Trang chủ</Link>
        <span>/</span>
        <Link href="/san-pham" className="hover:text-brand-taupe">Sản phẩm</Link>
        <span>/</span>
        <Link href={`/san-pham/${product.productType}`} className="hover:text-brand-taupe">{product.productTypeName}</Link>
        <span>/</span>
        <span className="text-brand-brown truncate max-w-xs">{product.title}</span>
      </nav>

      {/* 2. Image Gallery */}
      <FadeIn>
        <ProductGallery images={product.images} title={product.title} updatedDate={updatedDateStr} />
      </FadeIn>

      {/* 3. Main Info Section */}
      <FadeIn className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left column: specs and description */}
        <div className="lg:col-span-2 space-y-10">
          {/* Header info */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 items-center justify-between">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="bg-brand-cream border border-brand-gray-medium text-brand-brown text-xs font-semibold px-2.5 py-0.5 rounded-none">
                  {product.productTypeName}
                </span>
                {project && (
                  <Link
                    href={`/du-an/${project.slug}`}
                    className="bg-brand-cream border border-brand-gray-medium text-brand-brown hover:text-brand-taupe text-xs font-semibold px-2.5 py-0.5 rounded-none transition-colors"
                  >
                    Dự án: {project.name}
                  </Link>
                )}
              </div>
              {updatedDateStr && (
                <span className="text-xs text-brand-gray-text font-normal">
                  Cập nhật: <span className="font-semibold text-brand-brown">{updatedDateStr}</span>
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif text-brand-brown font-bold leading-snug">
              {product.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-brand-gray-text text-sm">
              <p className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-brand-gray-text shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {product.location}
              </p>
              {updatedDateStr && (
                <>
                  <span className="text-brand-gray-medium">•</span>
                  <span>Cập nhật: {updatedDateStr}</span>
                </>
              )}
            </div>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 rounded-none bg-brand-cream border border-brand-gray-medium text-center">
            <div>
              <span className="text-[10px] text-brand-gray-text uppercase tracking-wider block mb-1">Mức Giá</span>
              <span className="text-brand-taupe font-bold text-lg">{formatPrice(product)}</span>
            </div>
            <div>
              <span className="text-[10px] text-brand-gray-text uppercase tracking-wider block mb-1">Diện Tích</span>
              <span className="text-brand-brown font-bold text-lg">{product.area && product.area > 0 ? `${product.area} m²` : 'Đang cập nhật'}</span>
            </div>
            <div>
              <span className="text-[10px] text-brand-gray-text uppercase tracking-wider block mb-1">Cơ Cấu PN/WC</span>
              <span className="text-brand-brown font-semibold text-base">{product.bedrooms} PN / {product.bathrooms} WC</span>
            </div>
            <div>
              <span className="text-[10px] text-brand-gray-text uppercase tracking-wider block mb-1">Pháp Lý</span>
              <span className="text-brand-brown font-semibold text-xs leading-relaxed">{product.legal}</span>
            </div>
          </div>

          {/* Detailed stats */}
          <div className="space-y-4">
            <h2 className="text-xl font-serif text-brand-brown font-semibold">Thông Tin Chi Tiết</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm border-y border-brand-gray-light py-4">
              <div className="flex justify-between border-b border-brand-gray-light pb-2 sm:border-0 sm:pb-0">
                <span className="text-brand-gray-text">Mã sản phẩm:</span>
                <span className="text-brand-brown font-medium">{product.id ? product.id.toUpperCase() : ''}</span>
              </div>
              <div className="flex justify-between border-b border-brand-gray-light pb-2 sm:border-0 sm:pb-0">
                <span className="text-brand-gray-text">Hướng nhà:</span>
                <span className="text-brand-brown font-medium">{product.direction}</span>
              </div>
              <div className="flex justify-between border-b border-brand-gray-light pb-2 sm:border-0 sm:pb-0">
                <span className="text-brand-gray-text">Đơn giá / m²:</span>
                <span className="text-brand-brown font-medium">{product.pricePerSqm ? `${product.pricePerSqm} Triệu/m²` : 'Liên hệ'}</span>
              </div>
              <div className="flex justify-between border-b border-brand-gray-light pb-2 sm:border-0 sm:pb-0">
                <span className="text-brand-gray-text">Trạng thái:</span>
                <span className="text-brand-taupe font-semibold">{product.status}</span>
              </div>
              {updatedDateStr && (
                <div className="flex justify-between">
                  <span className="text-brand-gray-text">Ngày cập nhật:</span>
                  <span className="text-brand-brown font-medium">{updatedDateStr}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h2 className="text-xl font-serif text-brand-brown font-semibold">Mô Tả Sản Phẩm</h2>
            <div className="text-brand-gray-text text-sm leading-relaxed whitespace-pre-line">
              {product.description || 'Đang cập nhật thông tin mô tả chi tiết cho sản phẩm này.'}
            </div>
          </div>

          {/* Amenities */}
          {productAmenities.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-serif text-brand-brown font-semibold">Tiện Ích Nổi Bật</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {productAmenities.map((amenity) => (
                  <div key={amenity.id} className="flex items-center gap-2 text-sm text-brand-brown bg-brand-cream border border-brand-gray-medium px-4 py-3 rounded-none">
                    {amenity.icon ? (
                      <img src={amenity.icon} alt={amenity.name} className="w-4 h-4 object-contain shrink-0 opacity-70" />
                    ) : (
                      <svg className="w-4 h-4 text-brand-taupe shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    <span>{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right column: Sticky Form */}
        <div className="h-fit lg:sticky lg:top-24">
          <div className="bg-white border border-brand-gray-medium p-6 rounded-none space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-none overflow-hidden border border-brand-gray-medium">
                <Image
                  src="/images/hero-bg.png"
                  alt="Agent avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-brand-brown">Chuyên viên Ánh Dương</h3>
                <span className="text-[10px] text-brand-gray-text uppercase tracking-wider block">Chuyên viên tư vấn Premium</span>
              </div>
            </div>

            <div className="space-y-2.5">
              <a
                href="tel:0938129969"
                className="w-full bg-brand-brown border-2 border-brand-brown hover:bg-brand-taupe hover:border-brand-taupe text-white font-bold py-3 rounded-none text-center text-sm block transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Gọi Ngay: 0938 129 969
              </a>
              <a
                href="https://zalo.me/0919936576"
                target="_blank"
                rel="noreferrer"
                className="w-full bg-white text-brand-brown border-2 border-brand-brown hover:bg-brand-cream hover:text-brand-taupe hover:border-brand-taupe font-semibold py-3 rounded-none text-center text-sm block transition-all cursor-pointer"
              >
                Nhắn Tin Zalo
              </a>
            </div>

            <div className="border-t border-brand-gray-light pt-6 space-y-4">
              <h4 className="text-xs font-bold text-brand-brown uppercase tracking-wider text-center">Yêu cầu tư vấn chi tiết</h4>
              <ContactForm productSlug={product.slug} productName={product.title} />
            </div>
          </div>
        </div>
      </FadeIn>

      {/* 4. Related Products */}
      {relatedProducts.length > 0 && (
        <section className="pt-12 border-t border-brand-gray-light space-y-8">
          <h2 className="text-2xl font-serif text-brand-brown font-semibold">Sản Phẩm Tương Tự</h2>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((prod) => (
              <StaggerItem key={prod.slug}>
                <Link
                  href={`/bat-dong-san/${prod.slug}`}
                key={prod.slug}
                className="group bg-white rounded-none overflow-hidden border border-brand-gray-medium hover:border-brand-taupe transition-all duration-300 flex flex-col h-full hover:shadow-lg hover:-translate-y-1"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={prod.images[0]}
                    alt={prod.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-brand-cream text-brand-brown text-[10px] font-bold px-2 py-0.5 rounded-none border border-brand-gray-medium z-10">
                    {prod.productTypeName}
                  </span>
                  {formatProductDate(prod.updatedAt || prod.createdAt, prod.id) && (
                    <span className="absolute top-3 right-3 bg-brand-cream/95 backdrop-blur-xs text-brand-brown text-[10px] font-semibold px-2 py-0.5 rounded-none border border-brand-gray-medium shadow-xs z-10">
                      {formatProductDate(prod.updatedAt || prod.createdAt, prod.id)}
                    </span>
                  )}
                </div>
                <div className="p-4 flex flex-col flex-grow justify-between gap-4">
                  <h3 className="text-xs font-semibold text-brand-brown line-clamp-2 group-hover:text-brand-taupe transition-colors leading-snug">
                    {prod.title}
                  </h3>
                  <div className="flex justify-between items-center text-[10px] text-brand-gray-text pt-2 border-t border-brand-gray-light">
                    <span>{prod.area && prod.area > 0 ? `${prod.area} m²` : 'Đang cập nhật'}</span>
                    <span className="text-brand-taupe font-bold text-sm">{formatPrice(prod)}</span>
                  </div>
                </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </section>
      )}

    </div>
  );
}
