'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import SuccessModal from '@/components/common/SuccessModal';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};
const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};
const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};
const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

export default function HaLongXanhLandingPage() {
  const [showModal, setShowModal] = useState(false);
  const { scrollY } = useScroll();
  
  const c1x = useTransform(scrollY, [0, 500], ["0vw", "40vw"]);
  const c1y = useTransform(scrollY, [0, 500], ["0vh", "40vh"]);
  const c2x = useTransform(scrollY, [0, 500], ["0vw", "-40vw"]);
  const c2y = useTransform(scrollY, [0, 500], ["0vh", "40vh"]);
  const c3x = useTransform(scrollY, [0, 500], ["0vw", "40vw"]);
  const c3y = useTransform(scrollY, [0, 500], ["0vh", "-40vh"]);
  const c4x = useTransform(scrollY, [0, 500], ["0vw", "-40vw"]);
  const c4y = useTransform(scrollY, [0, 500], ["0vh", "-40vh"]);
  const c5x = useTransform(scrollY, [0, 500], ["0vw", "0vw"]);
  const c5y = useTransform(scrollY, [0, 500], ["0vh", "40vh"]);
  const c6x = useTransform(scrollY, [0, 500], ["0vw", "0vw"]);
  const c6y = useTransform(scrollY, [0, 500], ["0vh", "-40vh"]);
  const c7x = useTransform(scrollY, [0, 500], ["0vw", "40vw"]);
  const c7y = useTransform(scrollY, [0, 500], ["0vh", "0vh"]);
  const c8x = useTransform(scrollY, [0, 500], ["0vw", "-40vw"]);
  const c8y = useTransform(scrollY, [0, 500], ["0vh", "0vh"]);
  const cloudScale = useTransform(scrollY, [0, 500], [1, 3]);
  const cloudOpacity = useTransform(scrollY, [0, 200, 500], [0.5, 0.8, 1]);

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
          <motion.div
            initial={{ scale: 1.1 }}
            animate={{ scale: 1.05 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="w-full h-full relative"
          >
            <Image
              src="/images/vinhomes-ha-long-xanh-hero-new.webp"
              alt="Vinhomes Ha Long Xanh Project View"
              fill
              priority
              className="object-cover object-center"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-verydark/80 via-brand-verydark/55 to-brand-verydark/20" />
        </div>

        {/* 3D Cinematic Clouds */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden flex items-center justify-center">
          {/* Cloud 1 - Top Left */}
          <motion.div style={{ x: c1x, y: c1y, scale: cloudScale, opacity: cloudOpacity }} className="absolute">
            <motion.img 
              src="/images/cloud-transparent.png"
              alt="Cloud"
              initial={{ x: 0, y: 0, scale: 0 }} 
              animate={{ x: "-40vw", y: "-40vh", scale: 1 }} 
              transition={{ duration: 2.5, ease: "easeOut" }}
              className="w-[50vw] object-contain opacity-80 will-change-transform"
            />
          </motion.div>
          {/* Cloud 2 - Top Right */}
          <motion.div style={{ x: c2x, y: c2y, scale: cloudScale, opacity: cloudOpacity }} className="absolute">
            <motion.img 
              src="/images/cloud-transparent.png"
              alt="Cloud"
              initial={{ x: 0, y: 0, scale: 0 }} 
              animate={{ x: "40vw", y: "-40vh", scale: 1 }} 
              transition={{ duration: 2.8, ease: "easeOut" }}
              className="w-[60vw] object-contain opacity-70 will-change-transform"
            />
          </motion.div>
          {/* Cloud 3 - Bottom Left */}
          <motion.div style={{ x: c3x, y: c3y, scale: cloudScale, opacity: cloudOpacity }} className="absolute">
            <motion.img 
              src="/images/cloud-transparent.png"
              alt="Cloud"
              initial={{ x: 0, y: 0, scale: 0 }} 
              animate={{ x: "-40vw", y: "40vh", scale: 1 }} 
              transition={{ duration: 2.2, ease: "easeOut" }}
              className="w-[45vw] object-contain opacity-80 will-change-transform"
            />
          </motion.div>
          {/* Cloud 4 - Bottom Right */}
          <motion.div style={{ x: c4x, y: c4y, scale: cloudScale, opacity: cloudOpacity }} className="absolute">
            <motion.img 
              src="/images/cloud-transparent.png"
              alt="Cloud"
              initial={{ x: 0, y: 0, scale: 0 }} 
              animate={{ x: "40vw", y: "40vh", scale: 1 }} 
              transition={{ duration: 2.6, ease: "easeOut" }}
              className="w-[55vw] object-contain opacity-70 will-change-transform"
            />
          </motion.div>
          {/* Cloud 5 - Top Middle */}
          <motion.div style={{ x: c5x, y: c5y, scale: cloudScale, opacity: cloudOpacity }} className="absolute">
            <motion.img 
              src="/images/cloud-transparent.png"
              alt="Cloud"
              initial={{ x: 0, y: 0, scale: 0 }} 
              animate={{ x: "0vw", y: "-40vh", scale: 1 }} 
              transition={{ duration: 2.7, ease: "easeOut" }}
              className="w-[65vw] object-contain opacity-60 will-change-transform"
            />
          </motion.div>
          {/* Cloud 6 - Bottom Middle */}
          <motion.div style={{ x: c6x, y: c6y, scale: cloudScale, opacity: cloudOpacity }} className="absolute">
            <motion.img 
              src="/images/cloud-transparent.png"
              alt="Cloud"
              initial={{ x: 0, y: 0, scale: 0 }} 
              animate={{ x: "0vw", y: "40vh", scale: 1 }} 
              transition={{ duration: 2.4, ease: "easeOut" }}
              className="w-[60vw] object-contain opacity-75 will-change-transform"
            />
          </motion.div>
          {/* Cloud 7 - Left Middle */}
          <motion.div style={{ x: c7x, y: c7y, scale: cloudScale, opacity: cloudOpacity }} className="absolute">
            <motion.img 
              src="/images/cloud-transparent.png"
              alt="Cloud"
              initial={{ x: 0, y: 0, scale: 0 }} 
              animate={{ x: "-40vw", y: "0vh", scale: 1 }} 
              transition={{ duration: 2.3, ease: "easeOut" }}
              className="w-[50vw] object-contain opacity-65 will-change-transform"
            />
          </motion.div>
          {/* Cloud 8 - Right Middle */}
          <motion.div style={{ x: c8x, y: c8y, scale: cloudScale, opacity: cloudOpacity }} className="absolute">
            <motion.img 
              src="/images/cloud-transparent.png"
              alt="Cloud"
              initial={{ x: 0, y: 0, scale: 0 }} 
              animate={{ x: "40vw", y: "0vh", scale: 1 }} 
              transition={{ duration: 2.9, ease: "easeOut" }}
              className="w-[55vw] object-contain opacity-70 will-change-transform"
            />
          </motion.div>
        </div>

        <motion.div 
          className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.span variants={fadeInUp} className="text-brand-cream text-xs sm:text-sm font-bold tracking-[0.3em] uppercase">
            Siêu Dự Án Phức Hợp Kỳ Quan
          </motion.span>
          <motion.h1 variants={fadeInUp} className="text-4xl sm:text-6xl font-serif font-extrabold leading-tight max-w-4xl tracking-wide">
            <span className="bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent">
              Vinhomes Hạ Long Xanh
            </span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-brand-cream/90 text-sm sm:text-base max-w-2xl leading-relaxed">
            Biểu tượng đô thị sinh thái thông minh đẳng cấp quốc tế tọa lạc bên bờ vịnh biển kỳ quan thế giới Hạ Long - Quảng Ninh.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 justify-center pt-4">
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
          </motion.div>
        </motion.div>
      </section>

      {/* 2. Key Specs (Floating Grid) */}
      <section id="overview-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-20">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: "-50px" }}
          variants={staggerContainer}
        >
          {specs.map((s, idx) => (
            <motion.div
              variants={fadeInUp}
              key={idx}
              className="bg-white border border-brand-gray-medium p-6 rounded-none shadow-md flex flex-col justify-between gap-3 text-center sm:text-left"
            >
              <span className="text-brand-gray-text text-[10px] uppercase font-bold tracking-widest block">{s.title}</span>
              <span className="text-brand-taupe font-serif font-bold text-lg sm:text-xl block">{s.value}</span>
              <p className="text-brand-gray-text text-xs leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3. Diamond Location */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={slideInLeft}
          >
            <span className="text-brand-taupe text-xs font-bold tracking-widest uppercase">Hạ Tầng Giao Thông</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-brand-brown font-semibold uppercase">Giao Thông & Hạ Tầng Siêu Tốc</h2>
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
          </motion.div>
          <motion.div 
            className="relative h-[300px] sm:h-[400px] rounded-none overflow-hidden border border-brand-gray-medium"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={slideInRight}
          >
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
          </motion.div>
        </div>
      </section>

      {/* 4. Subdivisions */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 bg-white">
        <motion.div 
          className="text-center max-w-3xl mx-auto space-y-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={fadeInUp}
        >
          <span className="text-brand-taupe text-xs font-bold tracking-widest uppercase">Tổng Quan Dự Án</span>
          <h2 className="text-3xl font-serif text-brand-brown font-semibold uppercase">Mặt Bằng & Phân Khu</h2>
          <p className="text-brand-gray-text text-sm">
            Quy hoạch đại đô thị sinh thái thông minh chia làm nhiều phân khu với nét kiến trúc đặc sắc và định vị riêng biệt.
          </p>
        </motion.div>

        <motion.div 
          className="relative w-full aspect-video md:aspect-[2.5/1] rounded-none overflow-hidden border border-brand-gray-medium mb-12 shadow-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src="/images/ha-long-xanh-hero.png"
            alt="Mặt Bằng Tổng Thể Vinhomes Hạ Long Xanh"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand-verydark/5" />
          <span className="absolute bottom-4 right-4 bg-brand-cream border border-brand-gray-medium text-brand-brown text-[10px] px-3 py-1 rounded-none shadow-sm font-semibold tracking-wider uppercase">
            Mặt Bằng Tổng Thể Dự Án
          </span>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={staggerContainer}
        >
          {subdivisions.map((sub, idx) => (
            <motion.div
              variants={fadeInUp}
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
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 5. World-class Amenities */}
      <section className="bg-brand-cream border-y border-brand-gray-light py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            className="relative h-[300px] sm:h-[400px] rounded-none overflow-hidden border border-brand-gray-medium order-last lg:order-first"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={slideInLeft}
          >
            <Image
              src="/images/hero-bg.png"
              alt="Ha Long Xanh Luxury Amenities"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-brand-verydark/10" />
          </motion.div>
          <motion.div 
            className="space-y-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-100px" }}
            variants={slideInRight}
          >
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
          </motion.div>
        </div>
      </section>

      {/* 6. Lead Capture Form */}
      <section id="register-section" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="bg-white border border-brand-gray-medium p-8 sm:p-12 rounded-none text-center space-y-8 relative overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8 }}
        >
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
        </motion.div>
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
