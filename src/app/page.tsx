import Image from 'next/image';
import Link from 'next/link';
import SearchBar from '@/components/common/SearchBar';
import { mockNews } from '@/data/mockData';
import { api } from '@/services/api';

export default async function Home() {
  // Fetch projects and products from the service
  const [projects, products] = await Promise.all([
    api.getProjects(),
    api.getProducts()
  ]);
  async function getPosts() {
    try {
      const data = await api.getPosts();
      return data.length > 0 ? data : mockNews;
    } catch (err) {
      console.error("Failed to fetch posts, using mockNews fallback:", err);
      return mockNews;
    }
  }
  // Get featured projects
    const featuredProjects = projects.slice(0, 3);

    // Get featured products
    const featuredProducts = products.slice(0, 4);

    // Get premium products (Masterise, MIK Group)
    const premiumProducts = products.filter(p => p.isPremium).slice(0, 3);

    // Get latest news
    const allNews = await getPosts();
    const latestNews = allNews.slice(0, 3);

    return (
      <div className="space-y-24 pb-20 bg-white">

        {/* 1. Hero Section */}
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
          {/* Background Video with overlay */}
          <div className="absolute inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover object-center scale-105"
            >
              <source src="/video/vinhome_haivanbay.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-verydark via-brand-verydark/70 to-brand-verydark/40" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-8">
            <span className="text-amber-400 text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase animate-fade-in">
              Phong Cách Sống Đẳng Cấp & Độc Bản
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold leading-tight max-w-4xl tracking-wide">
              <span className="text-white">Kiến Tạo Không Gian </span><br />
              <span className="bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent">
                Sống Thượng Lưu
              </span>
            </h1>
            <p className="text-brand-cream/80 text-sm sm:text-base max-w-2xl leading-relaxed">
              Khám phá các dự án đại đô thị sinh thái, biệt thự nghỉ dưỡng biển và căn hộ hạng sang được phân phối bởi những đơn vị uy tín hàng đầu Việt Nam.
            </p>

            {/* Search Bar Component */}
            <SearchBar projects={projects} />
          </div>
        </section>

        {/* 2. Highlight Projects Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
            <div>
              <span className="text-brand-brown text-xs font-bold tracking-widest uppercase">Danh Mục Dự Án</span>
              <h2 className="text-3xl font-serif text-brand-brown font-semibold mt-2">Dự Án Trọng Điểm</h2>
            </div>
            <Link
              href="/du-an"
              className="text-brand-brown hover:text-brand-taupe text-sm font-semibold flex items-center gap-1.5 transition-colors"
            >
              Xem tất cả dự án
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <Link
                href={`/du-an/${project.slug}`}
                key={project.id}
                className="group relative h-[420px] rounded-none overflow-hidden border border-brand-gray-light flex flex-col justify-end p-6 transition-all duration-500 hover:border-brand-taupe/30 hover:shadow-2xl"
              >
                {/* Background image */}
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover object-center z-0 transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-verydark via-brand-verydark/50 to-transparent z-10" />

                {/* Card info */}
                <div className="relative z-20 space-y-3">
                  <span className="text-[10px] bg-brand-brown/85 border border-brand-brown text-white px-2 py-0.5 rounded-none font-semibold tracking-wider uppercase">
                    {project.status}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-white group-hover:text-brand-cream transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-brand-cream/80 text-xs line-clamp-2">
                    {project.shortDescription}
                  </p>
                  <div className="flex justify-between items-center text-xs text-brand-cream/90 pt-2 border-t border-white/10">
                    <span>Quy mô: {project.scale}</span>
                    <span className="font-semibold text-brand-cream">{project.priceRange}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 3. Hot Products Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
            <div>
              <span className="text-brand-brown text-xs font-bold tracking-widest uppercase">Giỏ Hàng Mới Nhất</span>
              <h2 className="text-3xl font-serif text-brand-brown font-semibold mt-2">Bất Động Sản Nổi Bật</h2>
            </div>
            <Link
              href="/san-pham"
              className="text-brand-brown hover:text-brand-taupe text-sm font-semibold flex items-center gap-1.5 transition-colors"
            >
              Xem tất cả sản phẩm
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link
                href={`/bat-dong-san/${product.slug}`}
                key={product.slug}
                className="group bg-white rounded-none overflow-hidden border border-brand-gray-medium hover:border-brand-taupe transition-all duration-300 flex flex-col h-full hover:shadow-lg hover:-translate-y-1"
              >
                {/* Product Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-brand-cream text-brand-brown text-[10px] font-bold px-2 py-0.5 rounded-none border border-brand-gray-medium">
                    {product.productTypeName}
                  </span>
                  {product.isPremium && (
                    <span className="absolute top-3 right-3 bg-brand-brown text-white text-[9px] font-extrabold px-2 py-1 rounded-none shadow-md tracking-wider uppercase">
                      Premium
                    </span>
                  )}
                </div>

                {/* Product Content */}
                <div className="p-4 flex flex-col flex-grow justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-brand-brown line-clamp-2 group-hover:text-brand-taupe transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-brand-gray-text text-xs flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 shrink-0 text-brand-gray-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="truncate">{product.location}</span>
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-brand-gray-light">
                    <div className="flex justify-between items-center text-xs text-brand-gray-text">
                      <span>{product.area} m²</span>
                      <span>{product.bedrooms} PN | {product.bathrooms} WC</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-brand-taupe font-bold text-base">
                        {product.price > 100 ? 'Liên hệ' : `${product.price} Tỷ`}
                      </span>
                      <span className="text-[10px] text-brand-gray-text uppercase tracking-widest font-semibold bg-brand-cream px-2 py-0.5 rounded-none border border-brand-gray-medium">
                        {product.status}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. Premium Segment Section (Masterise, MIK) */}
        <section className="bg-brand-cream py-24 border-y border-brand-gray-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-brand-taupe text-xs font-bold tracking-[0.2em] uppercase">Phân Khúc Bất Động Sản Siêu Sang</span>
              <h2 className="text-3xl sm:text-4xl font-serif text-brand-brown font-semibold">Thương Hiệu Danh Giá</h2>
              <p className="text-brand-gray-text text-sm">
                Khám phá các tổ hợp căn hộ, biệt thự mang thương hiệu cao cấp từ Masterise Homes và MIK Group, khẳng định vị thế chủ nhân sở hữu.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Masterise Brand Spotlight */}
              <div className="bg-white border border-brand-gray-medium p-8 rounded-none flex flex-col justify-between gap-8 hover:border-brand-taupe transition-all duration-300 hover:shadow-sm">
                <div className="space-y-4">
                  <span className="text-xs text-brand-taupe font-bold tracking-widest uppercase">Masterise Homes</span>
                  <h3 className="text-2xl font-serif text-brand-brown font-medium">Bất Động Sản Hàng Hiệu</h3>
                  <p className="text-brand-gray-text text-sm leading-relaxed">
                    Thiết kế hiện đại chuẩn quốc tế kết hợp đơn vị vận hành hàng đầu thế giới Marriott & Ritz-Carlton. Kiến tạo biểu tượng sống duy mỹ cho giới thượng lưu.
                  </p>
                </div>
                <Link
                  href="/cao-cap/masterise-homes"
                  className="bg-white text-brand-brown border-2 border-brand-brown hover:bg-brand-cream hover:text-brand-taupe hover:border-brand-taupe text-xs font-bold py-2.5 rounded-none text-center transition-all"
                >
                  Khám Phá Giỏ Hàng Masterise
                </Link>
              </div>

              {/* MIK Group Spotlight */}
              <div className="bg-white border border-brand-gray-medium p-8 rounded-none flex flex-col justify-between gap-8 hover:border-brand-taupe transition-all duration-300 hover:shadow-sm">
                <div className="space-y-4">
                  <span className="text-xs text-brand-taupe font-bold tracking-widest uppercase">MIK Group</span>
                  <h3 className="text-2xl font-serif text-brand-brown font-medium">Không Gian Sống Độc Bản</h3>
                  <p className="text-brand-gray-text text-sm leading-relaxed">
                    Sở hữu chuỗi dự án đắc địa cùng kiến trúc tinh tế như The Matrix One. Tập trung vào không gian xanh yên bình bên hồ điều hòa quy mô lớn.
                  </p>
                </div>
                <Link
                  href="/cao-cap/mik-group"
                  className="bg-white text-brand-brown border-2 border-brand-brown hover:bg-brand-cream hover:text-brand-taupe hover:border-brand-taupe text-xs font-bold py-2.5 rounded-none text-center transition-all"
                >
                  Khám Phá Giỏ Hàng MIK
                </Link>
              </div>

              {/* Premium product showcase card */}
              <div className="bg-white rounded-none border border-brand-gray-medium overflow-hidden flex flex-col hover:border-brand-taupe transition-all duration-300">
                <div className="relative h-48 w-full">
                  <Image
                    src={premiumProducts[0]?.images[0] || '/images/hero-bg.png'}
                    alt="Premium real estate product"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-verydark/60 to-transparent" />
                  <span className="absolute bottom-4 left-4 bg-brand-brown text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-none tracking-wider uppercase">
                    Nổi bật nhất
                  </span>
                </div>
                <div className="p-6 flex-grow flex flex-col justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] text-brand-taupe font-semibold">{premiumProducts[0]?.developer}</span>
                    <h4 className="text-sm font-semibold text-brand-brown line-clamp-1">{premiumProducts[0]?.title}</h4>
                    <p className="text-brand-gray-text text-xs line-clamp-2">{premiumProducts[0]?.description}</p>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-brand-gray-light text-xs">
                    <span className="text-brand-taupe font-bold">{premiumProducts[0]?.price} Tỷ ({premiumProducts[0]?.area} m²)</span>
                    <Link href={`/bat-dong-san/${premiumProducts[0]?.slug}`} className="text-brand-brown hover:text-brand-taupe transition-colors font-semibold">
                      Chi tiết &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. News & Market Insights */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
            <div>
              <span className="text-brand-brown text-xs font-bold tracking-widest uppercase">Tin Tức Địa Ốc</span>
              <h2 className="text-3xl font-serif text-brand-brown font-semibold mt-2">Thị Trường & Xu Hướng</h2>
            </div>
            <Link
              href="/tin-tuc"
              className="text-brand-brown hover:text-brand-taupe text-sm font-semibold flex items-center gap-1.5 transition-colors"
            >
              Xem tất cả tin tức
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestNews.map((news: any) => (
              <Link
                href={`/tin-tuc/${news.slug}`}
                key={news.id}
                className="group bg-white border border-brand-gray-medium rounded-none overflow-hidden hover:border-brand-taupe transition-all duration-300 flex flex-col h-full hover:shadow-sm"
              >
                {/* News Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* News Content */}
                <div className="p-5 flex flex-col justify-between flex-grow gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-[10px] font-bold text-brand-taupe uppercase tracking-wider">
                      <span>{news.category}</span>
                      <span className="w-1 h-1 rounded-full bg-brand-gray-medium" />
                      <span className="text-brand-gray-text font-medium">{news.publishedAt}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-brand-brown group-hover:text-brand-taupe transition-colors line-clamp-2 leading-snug font-serif font-bold">
                      {news.title}
                    </h3>
                    <p className="text-brand-gray-text text-xs line-clamp-3 leading-relaxed">
                      {news.summary}
                    </p>
                  </div>
                  <span className="text-xs text-brand-brown font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Đọc thêm
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    );
  }
