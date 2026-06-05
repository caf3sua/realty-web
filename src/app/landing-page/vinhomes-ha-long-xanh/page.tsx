'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SuccessModal from '@/components/common/SuccessModal';

export default function HaLongXanhLandingPage() {
  const [showModal, setShowModal] = useState(false);
  const specs = [
    { title: 'Tổng Diện Tích', value: '4.109 Hécta', desc: 'Một trong những siêu dự án lớn nhất miền Bắc' },
    { title: 'Tổng Vốn Đầu Tư', value: '10 Tỷ USD', desc: 'Đại đô thị sinh thái kết hợp nghỉ dưỡng' },
    { title: 'Sản Phẩm Đa Dạng', value: 'Biệt Thự | Liền Kề | Shophouse', desc: 'Đáp ứng nhu cầu ở và đầu tư' },
    { title: 'Hệ Tiện Ích VIP', value: 'Sân Golf | Safari | Marina', desc: 'Tiện ích kỳ quan độc bản' },
  ];

  const subdivisions = [
    {
      name: 'Vịnh Hoàng Gia (Royal Bay)',
      desc: 'Phân khu compound khép kín vip nhất dự án. Nơi hội tụ các căn biệt thự đơn lập, dinh thự trực diện biển hồ nước mặn nhân tạo và bến du thuyền quốc tế.',
      highlight: 'Sát biển, bến du thuyền',
    },
    {
      name: 'Phân Khu Cát Tường',
      desc: 'Nằm tại vị trí giao thương huyết mạch dọc đại lộ Hạ Long Xanh. Phù hợp cho các căn shophouse kinh doanh, nhà phố liền kề năng động.',
      highlight: 'Kinh doanh đắc địa',
    },
    {
      name: 'Phân Khu Hoàng Long',
      desc: 'Phân khu sinh thái sở hữu hệ thống kênh đào uốn lượn xung quanh các dãy nhà biệt thự song lập mang phong cách Tân cổ điển lịch lãm.',
      highlight: 'Sinh thái sông nước',
    },
  ];

  return (
    <div className="bg-white text-brand-verydark min-h-screen space-y-24 pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/ha-long-xanh-hero.png"
            alt="Vinhomes Ha Long Xanh Project View"
            fill
            priority
            className="object-cover object-center scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-verydark/80 via-brand-verydark/55 to-brand-verydark/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6">
          <span className="text-brand-cream text-xs sm:text-sm font-bold tracking-[0.3em] uppercase">
            Siêu Dự Án Phức Hợp Kỳ Quan
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif text-white font-extrabold leading-tight max-w-4xl tracking-wide">
            Vinhomes Hạ Long Xanh
          </h1>
          <p className="text-brand-cream/90 text-sm sm:text-base max-w-2xl leading-relaxed">
            Biểu tượng đô thị sinh thái thông minh đẳng cấp quốc tế tọa lạc bên bờ vịnh biển kỳ quan thế giới Hạ Long - Quảng Ninh.
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <a
              href="#register-section"
              className="bg-brand-brown border-2 border-brand-brown hover:bg-brand-taupe hover:border-brand-taupe text-white font-bold px-8 py-3.5 rounded-none text-sm transition-all shadow-md cursor-pointer"
            >
              Nhận Báo Giá Đợt 1
            </a>
            <a
              href="#overview-section"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-none text-sm border border-white/30 transition-all cursor-pointer"
            >
              Tìm Hiểu Thêm
            </a>
          </div>
        </div>
      </section>

      {/* 2. Key Specs (Floating Grid) */}
      <section id="overview-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specs.map((s, idx) => (
            <div
              key={idx}
              className="bg-white border border-brand-gray-medium p-6 rounded-none shadow-md flex flex-col justify-between gap-3 text-center sm:text-left"
            >
              <span className="text-brand-gray-text text-[10px] uppercase font-bold tracking-widest block">{s.title}</span>
              <span className="text-brand-taupe font-serif font-bold text-lg sm:text-xl block">{s.value}</span>
              <p className="text-brand-gray-text text-xs leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Diamond Location */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-brand-taupe text-xs font-bold tracking-widest uppercase">Tâm Điểm Kết Nối</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-brand-brown font-semibold">Tọa Độ Vàng Đắc Địa</h2>
            <div className="text-brand-gray-text text-sm leading-relaxed space-y-4">
              <p>
                Vinhomes Hạ Long Xanh nằm tại thị xã Quảng Yên và thành phố Hạ Long, tỉnh Quảng Ninh. Đây là vị trí chiến lược kết nối trực tiếp với tuyến cao tốc Hải Phòng - Hạ Long - Vân Đồn.
              </p>
              <p>
                Dự án đóng vai trò là cửa ngõ kinh tế, kết nối hành lang kinh tế ven biển Việt Nam - Trung Quốc. Khoảng cách kết nối lý tưởng giúp cư dân di chuyển nhanh chóng:
              </p>
              <ul className="space-y-2 pl-4 list-disc border-l-2 border-brand-taupe/30">
                <li>Cách thủ đô Hà Nội chỉ 1.5 giờ di chuyển cao tốc.</li>
                <li>Cách thành phố cảng Hải Phòng chỉ 15 phút lái xe.</li>
                <li>Cách trung tâm du lịch Bãi Cháy - Hạ Long chỉ 20 phút.</li>
              </ul>
            </div>
          </div>
          <div className="relative h-[300px] sm:h-[400px] rounded-none overflow-hidden border border-brand-gray-medium">
            <Image
              src="/images/ha-long-xanh-hero.png"
              alt="Ha Long Xanh Location Map"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-brand-verydark/10" />
            <span className="absolute bottom-4 right-4 bg-brand-cream border border-brand-gray-medium text-brand-brown text-[10px] px-3 py-1 rounded-none">
              Sơ đồ vị trí kết nối liên vùng
            </span>
          </div>
        </div>
      </section>

      {/* 4. Subdivisions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 bg-white">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-brand-taupe text-xs font-bold tracking-widest uppercase">Mặt Bằng Quy Hoạch</span>
          <h2 className="text-3xl font-serif text-brand-brown font-semibold">Các Phân Khu Trọng Điểm</h2>
          <p className="text-brand-gray-text text-sm">
            Quy hoạch đại đô thị sinh thái thông minh chia làm nhiều phân khu với nét kiến trúc đặc sắc và định vị riêng biệt.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subdivisions.map((sub, idx) => (
            <div
              key={idx}
              className="bg-white border border-brand-gray-medium p-6 rounded-none flex flex-col justify-between gap-6 hover:border-brand-taupe transition-all duration-300 hover:shadow-sm"
            >
              <div className="space-y-3">
                <span className="text-[10px] text-brand-brown font-bold bg-brand-cream border border-brand-gray-medium px-2 py-0.5 rounded-none">
                  {sub.highlight}
                </span>
                <h3 className="text-lg font-serif font-bold text-brand-brown pt-2">{sub.name}</h3>
                <p className="text-brand-gray-text text-xs leading-relaxed">{sub.desc}</p>
              </div>
              <a
                href="#register-section"
                className="text-xs text-brand-brown hover:text-brand-taupe font-bold flex items-center gap-1"
              >
                Nhận thông tin phân khu &rarr;
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 5. World-class Amenities */}
      <section className="bg-brand-cream border-y border-brand-gray-light py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-[300px] sm:h-[400px] rounded-none overflow-hidden border border-brand-gray-medium order-last lg:order-first">
            <Image
              src="/images/hero-bg.png"
              alt="Ha Long Xanh Luxury Amenities"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-brand-verydark/10" />
          </div>
          <div className="space-y-6">
            <span className="text-brand-taupe text-xs font-bold tracking-widest uppercase">Trải Nghiệm Độc Quyền</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-brand-brown font-semibold">Tiện Ích Kỳ Quan Đột Phá</h2>
            <p className="text-brand-gray-text text-sm leading-relaxed">
              Vinhomes Hạ Long Xanh thiết lập hệ giá trị sống nghỉ dưỡng 365 ngày mỗi năm với các siêu tiện ích đẳng cấp quốc tế:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {[
                'Sân Golf 18 hố tiêu chuẩn quốc tế',
                'Bến du thuyền quốc tế sang trọng',
                'Công viên chủ đề và công viên Safari',
                'Hồ nước mặn cát trắng nhân tạo lớn',
                'Hệ thống trường học Vinschool',
                'Bệnh viện đa khoa quốc tế Vinmec',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-brand-brown">
                  <svg className="w-4 h-4 text-brand-taupe shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Lead Capture Form */}
      <section id="register-section" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-brand-gray-medium p-8 sm:p-12 rounded-none text-center space-y-8 relative overflow-hidden shadow-lg">
          <div className="space-y-3 relative z-10">
            <span className="text-brand-taupe text-xs font-bold tracking-widest uppercase">Đăng Ký Đợt 1</span>
            <h2 className="text-3xl font-serif text-brand-brown font-semibold">Tải Trọn Bộ Tài Liệu Dự Án</h2>
            <p className="text-brand-gray-text text-sm max-w-lg mx-auto">
              Đăng ký để nhận sớm nhất thông tin thiết kế phân khu, bảng giá chi tiết, chính sách bán hàng ưu đãi đợt 1 của chủ đầu tư Vinhomes.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShowModal(true);
            }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10 max-w-xl mx-auto"
          >
            <input
              type="text"
              placeholder="Họ và tên..."
              required
              className="bg-white border border-brand-gray-medium text-xs rounded-none px-4 py-3 text-brand-brown focus:outline-none focus:border-brand-brown transition-colors w-full"
            />
            <input
              type="tel"
              placeholder="Số điện thoại..."
              required
              className="bg-white border border-brand-gray-medium text-xs rounded-none px-4 py-3 text-brand-brown focus:outline-none focus:border-brand-brown transition-colors w-full"
            />
            <input
              type="email"
              placeholder="Địa chỉ Email..."
              required
              className="bg-white border border-brand-gray-medium text-xs rounded-none px-4 py-3 text-brand-brown focus:outline-none focus:border-brand-brown transition-colors w-full sm:col-span-2"
            />
            <button
              type="submit"
              className="bg-brand-brown border-2 border-brand-brown text-white hover:bg-brand-taupe hover:border-brand-taupe font-bold py-3.5 rounded-none text-xs transition-all w-full sm:col-span-2 shadow-md cursor-pointer"
            >
              Nhận Tài Liệu & Bảng Giá QUA ZALO
            </button>
          </form>
        </div>
      </section>

      <SuccessModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Đăng ký nhận tài liệu thành công"
        message="Cảm ơn quý khách! Chuyên viên kinh doanh Vinhomes sẽ liên hệ hỗ trợ gửi tài liệu qua Zalo/Email ngay."
      />
    </div>
  );
}
