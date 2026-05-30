'use client';

import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-neutral-400 pt-16 pb-8 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-neutral-900">

          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <span className="text-xl font-bold bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent font-serif tracking-wider">
                ÁNH DƯƠNG LAND
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-neutral-500">
              Chuyên trang tư vấn, môi giới và cung cấp các dòng sản phẩm bất động sản cao cấp, biệt thự biển, căn hộ hạng sang tại miền Bắc. Cam kết đồng hành cùng nhà đầu tư.
            </p>
            <div className="flex gap-4 pt-2">
              {/* Fake social icons */}
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-amber-500 hover:text-neutral-950 flex items-center justify-center text-white transition-colors duration-300">
                F
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-amber-500 hover:text-neutral-950 flex items-center justify-center text-white transition-colors duration-300">
                Y
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-amber-500 hover:text-neutral-950 flex items-center justify-center text-white transition-colors duration-300">
                L
              </a>
            </div>
          </div>

          {/* Quick links: Projects */}
          <div>
            <h3 className="text-white font-semibold text-base mb-4 tracking-wider font-serif">Dự Án Trọng Điểm</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/du-an/ha-long-xanh" className="hover:text-amber-400 transition-colors">
                  Vinhomes Hạ Long Xanh
                </Link>
              </li>
              <li>
                <Link href="/du-an/ocean-park-1" className="hover:text-amber-400 transition-colors">
                  Vinhomes Ocean Park 1
                </Link>
              </li>
              <li>
                <Link href="/du-an/ocean-park-2" className="hover:text-amber-400 transition-colors">
                  Vinhomes Ocean Park 2
                </Link>
              </li>
              <li>
                <Link href="/du-an/masteri-west-heights" className="hover:text-amber-400 transition-colors">
                  Masteri West Heights
                </Link>
              </li>
              <li>
                <Link href="/du-an/the-matrix-one" className="hover:text-amber-400 transition-colors">
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
                <Link href="/san-pham/villa" className="hover:text-amber-400 transition-colors">
                  Biệt Thự & Dinh Thự
                </Link>
              </li>
              <li>
                <Link href="/san-pham/townhouse" className="hover:text-amber-400 transition-colors">
                  Nhà Phố Liền Kề & Shophouse
                </Link>
              </li>
              <li>
                <Link href="/san-pham/apartment" className="hover:text-amber-400 transition-colors">
                  Căn Hộ Chung Cư Cao Cấp
                </Link>
              </li>
              <li>
                <Link href="/san-pham/residential" className="hover:text-amber-400 transition-colors">
                  Đất Nền & Nhà Thổ Cư
                </Link>
              </li>
              <li>
                <Link href="/cao-cap" className="hover:text-amber-400 transition-colors font-medium text-amber-500">
                  Dòng Sản Phẩm Siêu Sang
                </Link>
              </li>
            </ul>
          </div>

          {/* Registration Section */}
          <div className="space-y-4" id="contact-form">
            <h3 className="text-white font-semibold text-base tracking-wider font-serif">Đăng Ký Tư Vấn</h3>
            <p className="text-sm text-neutral-500">
              Đăng ký để nhận báo giá mới nhất, chính sách ưu đãi trực tiếp từ chủ đầu tư.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ sớm nhất.'); }} className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Nhập email của bạn..."
                required
                className="bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-amber-500 placeholder-neutral-600 transition-colors"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-neutral-900 font-bold py-2 rounded-lg text-sm transition-all"
              >
                Đăng Ký Ngay
              </button>
            </form>
          </div>
        </div>

        {/* Company Info & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-neutral-600">
          <div className="space-y-2 text-center md:text-left">
            <p className="font-semibold text-neutral-400">Thông tin liên hệ:</p>
            <p>Cơ sở 1: Khu Sao biển 9A-SP9A-10 Khu đô thị Vinhomes Ocean Park Gia Lâm Hà Nội</p>
            <p>Cơ sở 2: Khu Sao biển không số, số nhà 215 Khu đô thị Vinhomes Ocean Park 2, Hưng Yên.</p>
            <p>Tel: <a href="tel:0919936576" className="text-amber-400 font-bold hover:underline">0919 936 576</a> | Mail: <a href="mailto:anhduong.bds@gmail.com" className="hover:text-white hover:underline">anhduong.bds@gmail.com</a> | Website: <a href="https://nhadepvinhome.org" target="_blank" rel="noreferrer" className="hover:text-white hover:underline">nhadepvinhome.org</a></p>
          </div>
          <p className="text-neutral-500 shrink-0">
            &copy; {currentYear} ÁNH DƯƠNG REALTY. Bảo lưu mọi quyền.
          </p>
        </div>
      </div>
    </footer>
  );
}
