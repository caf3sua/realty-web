'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-brown text-brand-cream/80 pt-16 pb-8 border-t border-brand-brown">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-brand-taupe/30">

          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-xl font-bold text-white font-serif tracking-wider">
                ANH DUONG PROPERTY
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-brand-cream/60">
              Chuyên trang tư vấn, môi giới và cung cấp các dòng sản phẩm bất động sản cao cấp, biệt thự biển, căn hộ hạng sang tại miền Bắc. Cam kết đồng hành cùng nhà đầu tư.
            </p>
            <div className="flex gap-4 pt-2">
              {/* Social icons */}
              <a href="#" className="w-8 h-8 rounded-none bg-brand-taupe hover:bg-white hover:text-brand-brown flex items-center justify-center text-white transition-colors duration-300 text-sm font-semibold">
                F
              </a>
              <a href="#" className="w-8 h-8 rounded-none bg-brand-taupe hover:bg-white hover:text-brand-brown flex items-center justify-center text-white transition-colors duration-300 text-sm font-semibold">
                Y
              </a>
              <a href="#" className="w-8 h-8 rounded-none bg-brand-taupe hover:bg-white hover:text-brand-brown flex items-center justify-center text-white transition-colors duration-300 text-sm font-semibold">
                L
              </a>
            </div>
          </div>

          {/* Quick links: Projects */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 tracking-wider font-serif">Dự Án Trọng Điểm</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/du-an/ha-long-xanh" className="hover:text-white transition-colors">
                  Vinhomes Hạ Long Xanh
                </Link>
              </li>
              <li>
                <Link href="/du-an/ocean-park-1" className="hover:text-white transition-colors">
                  Vinhomes Ocean Park 1
                </Link>
              </li>
              <li>
                <Link href="/du-an/ocean-park-2" className="hover:text-white transition-colors">
                  Vinhomes Ocean Park 2
                </Link>
              </li>
              <li>
                <Link href="/du-an/masteri-west-heights" className="hover:text-white transition-colors">
                  Masteri West Heights
                </Link>
              </li>
              <li>
                <Link href="/du-an/the-matrix-one" className="hover:text-white transition-colors">
                  The Matrix One
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick links: Categories */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 tracking-wider font-serif">Loại Hình Sản Phẩm</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/san-pham/villa" className="hover:text-white transition-colors">
                  Biệt Thự & Dinh Thự
                </Link>
              </li>
              <li>
                <Link href="/san-pham/townhouse" className="hover:text-white transition-colors">
                  Nhà Phố Liền Kề & Shophouse
                </Link>
              </li>
              <li>
                <Link href="/san-pham/apartment" className="hover:text-white transition-colors">
                  Căn Hộ Chung Cư Cao Cấp
                </Link>
              </li>
              <li>
                <Link href="/san-pham/residential" className="hover:text-white transition-colors">
                  Đất Nền & Nhà Thổ Cư
                </Link>
              </li>
              <li>
                <Link href="/cao-cap" className="hover:text-white transition-colors font-medium text-brand-cream font-semibold">
                  Dòng Sản Phẩm Siêu Sang
                </Link>
              </li>
            </ul>
          </div>

          {/* Registration Section */}
          <div className="space-y-4" id="contact-form">
            <h3 className="text-white font-semibold text-base tracking-wider font-serif">Đăng Ký Tư Vấn</h3>
            <p className="text-sm text-brand-cream/60">
              Đăng ký để nhận báo giá mới nhất, chính sách ưu đãi trực tiếp từ chủ đầu tư.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ sớm nhất.'); }} className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Nhập email của bạn..."
                required
                className="bg-white border border-brand-gray-medium rounded-none px-4 py-2.5 text-sm text-brand-brown focus:outline-none focus:border-brand-brown placeholder-brand-gray-text transition-colors"
              />
              <button
                type="submit"
                className="bg-brand-taupe hover:bg-brand-darkbrown text-white font-bold py-2.5 rounded-none text-sm transition-all cursor-pointer"
              >
                Đăng Ký Ngay
              </button>
            </form>
          </div>
        </div>

        {/* Company Info & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-brand-cream/60">
          <div className="space-y-2 text-center md:text-left">
            <p className="font-semibold text-white">Thông tin liên hệ:</p>
            <p>Cơ sở 1: Khu Sao biển 9A-SP9A-10 Khu đô thị Vinhomes Ocean Park Gia Lâm Hà Nội</p>
            <p>Cơ sở 2: Khu Sao biển không số, số nhà 215 Khu đô thị Vinhomes Ocean Park 2, Hưng Yên.</p>
            <p>Tel: <a href="tel:0938129969" className="text-white font-bold hover:underline">0938 129 969</a> | Mail: <a href="mailto:anhduong.bds@gmail.com" className="hover:text-white hover:underline">anhduong.bds@gmail.com</a> | Website: <a href="https://nhadepvinhome.org" target="_blank" rel="noreferrer" className="hover:text-white hover:underline">nhadepvinhome.org</a></p>
          </div>
          <p className="text-brand-cream/40 shrink-0">
            &copy; {currentYear} ANH DUONG PROPERTY. Bảo lưu mọi quyền.
          </p>
        </div>
      </div>
    </footer>
  );
}
