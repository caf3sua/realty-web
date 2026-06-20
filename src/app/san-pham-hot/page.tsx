import Image from 'next/image';
import Link from 'next/link';
import { api } from '@/services/api';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/common/MotionWrapper';

export default async function HotProductsPage() {
  // Fetch hot products from the API
  const hotProducts = await api.getProducts({ is_hot: true });

  return (
    <div className="bg-white text-brand-verydark min-h-screen">
      
      {/* 1. Header Banner */}
      <section className="relative py-24 border-b border-brand-gray-light bg-brand-cream">
        <FadeIn className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-brand-taupe text-xs font-bold tracking-[0.3em] uppercase">Hot Products Showcase</span>
          <h1 className="text-4xl sm:text-5xl font-serif text-brand-brown font-extrabold tracking-wide">
            Sản Phẩm Đang Hot
          </h1>
          <p className="text-brand-gray-text text-sm max-w-2xl mx-auto leading-relaxed">
            Danh sách các sản phẩm bất động sản đang được quan tâm nhiều nhất, tiềm năng sinh lời cao và thanh khoản nhanh chóng.
          </p>
        </FadeIn>
      </section>


      {/* 3. Premium Products List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 bg-white">
        <FadeIn>
          <h2 className="text-2xl font-serif text-brand-brown font-semibold border-b border-brand-gray-medium pb-4">
            Danh Sách Sản Phẩm Hot ({hotProducts.length} sản phẩm)
          </h2>
        </FadeIn>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotProducts.map((product) => (
            <StaggerItem key={product.slug}>
              <Link
                href={`/bat-dong-san/${product.slug}`}
                className="group bg-white rounded-none overflow-hidden border border-brand-gray-medium hover:border-brand-taupe transition-all duration-300 flex flex-col h-full hover:shadow-lg"
              >
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 bg-rose-600 text-white text-[10px] font-extrabold px-3 py-1 rounded-none shadow-sm tracking-wider uppercase">
                  HOT
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
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

    </div>
  );
}
