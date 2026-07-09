'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useLenis } from '@/components/scroll/SmoothScrollProvider';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const lenis = useLenis();

  // Trang có hero full-screen tối → header trong suốt chữ sáng khi ở đỉnh
  const isImmersiveRoute = pathname === '/' || /^\/du-an\/[^/]+$/.test(pathname);

  useEffect(() => {
    const onScroll = (scrollY: number) => {
      setIsScrolled(scrollY > 80);
      // Ẩn khi cuộn xuống, hiện khi cuộn lên (chỉ sau khi qua hero một đoạn)
      const goingDown = scrollY > lastScrollY.current;
      setIsHidden(goingDown && scrollY > 400 && !isOpen);
      lastScrollY.current = scrollY;
    };

    if (lenis) {
      const handler = ({ scroll }: { scroll: number }) => onScroll(scroll);
      lenis.on('scroll', handler);
      return () => lenis.off('scroll', handler);
    }
    // Fallback native scroll (reduced-motion không có Lenis)
    const handler = () => onScroll(window.scrollY);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [lenis, isOpen]);

  const navItems = [
    { name: 'Dự án', path: '/du-an' },
    { name: 'Sản phẩm', path: '/san-pham' },
    { name: 'Sản phẩm hot', path: '/san-pham-hot' },
    { name: 'Tin tức', path: '/tin-tuc' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  // 2 trạng thái màu: "light" (transparent trên hero tối) / "solid"
  const isLight = isImmersiveRoute && !isScrolled && !isOpen;

  const linkBase = isLight
    ? 'text-brand-cream hover:text-white'
    : 'text-brand-brown hover:text-brand-taupe';

  return (
    <header
      data-scrolled={isScrolled}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 will-change-transform ${
        isHidden ? '-translate-y-full' : 'translate-y-0'
      } ${
        isLight
          ? 'bg-transparent border-b border-white/10 py-4'
          : 'bg-brand-cream/85 backdrop-blur-md border-b border-brand-gray-medium shadow-sm py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src={isLight ? '/images/logo-yellow.png' : '/images/logo-blue.png'}
              alt="Anh Duong Property Logo"
              width={36}
              height={36}
              className="object-contain"
            />
            <span
              className={`text-xl lg:text-2xl font-bold font-serif tracking-wider transition-colors ${
                isLight ? 'text-white group-hover:text-brand-cream' : 'text-brand-brown group-hover:text-brand-taupe'
              }`}
            >
              ANH DUONG <span className="text-[0.8em] font-medium tracking-wide">PROPERTY</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-medium tracking-wide transition-colors py-1 border-b-2 ${
                  isActive(item.path)
                    ? `${isLight ? 'text-white border-white' : 'text-brand-taupe border-brand-taupe'} font-semibold`
                    : `${linkBase} border-transparent`
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/landing-page/vinhomes-ha-long-xanh"
              className={`text-xs uppercase px-3 py-1.5 rounded-none font-semibold tracking-wider transition-all border ${
                isLight
                  ? 'bg-white/10 text-white border-white/40 hover:bg-white hover:text-brand-brown'
                  : 'bg-brand-cream text-brand-brown border-brand-brown hover:bg-brand-brown hover:text-white'
              }`}
            >
              Hạ Long Xanh
            </Link>
          </nav>

          {/* Action CTA */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            <a
              href="tel:0919936576"
              className={`flex items-center gap-2 text-sm font-semibold transition-colors ${linkBase}`}
            >
              <svg
                className={`w-4 h-4 animate-pulse ${isLight ? 'text-brand-cream' : 'text-brand-taupe'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              0938 129 969
            </a>
            <Link
              href="#contact-form"
              onClick={(e) => {
                const target = document.getElementById('contact-form');
                if (target) {
                  e.preventDefault();
                  if (lenis) {
                    lenis.scrollTo(target, { offset: -100 });
                  } else {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
              className={`font-medium px-5 py-2 rounded-none text-sm transition-all duration-300 border-2 ${
                isLight
                  ? 'bg-transparent border-white text-white hover:bg-white hover:text-brand-brown'
                  : 'bg-brand-brown border-brand-brown text-white hover:bg-brand-taupe hover:border-brand-taupe'
              }`}
            >
              Nhận Bảng Giá
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden gap-3">
            <Link
              href="/landing-page/vinhomes-ha-long-xanh"
              className={`text-[10px] uppercase px-2 py-1 rounded-none font-semibold tracking-wider border ${
                isLight
                  ? 'bg-white/10 text-white border-white/40'
                  : 'bg-brand-cream text-brand-brown border-brand-brown'
              }`}
            >
              Hạ Long Xanh
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className={`p-2 focus:outline-none transition-colors ${linkBase}`}
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-cream border-b border-brand-gray-medium animate-fade-in" id="mobile-menu">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2.5 rounded-none text-base font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-white text-brand-taupe font-semibold'
                    : 'text-brand-brown hover:bg-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 pb-2 border-t border-brand-gray-light px-3 flex flex-col gap-3">
              <a
                href="tel:0919936576"
                className="text-brand-brown hover:text-brand-taupe font-semibold flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4 text-brand-taupe"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                0938 129 969
              </a>
              <Link
                href="#contact-form"
                onClick={() => setIsOpen(false)}
                className="bg-brand-brown text-white text-center font-bold py-2 rounded-none text-sm block hover:bg-brand-taupe transition-colors"
              >
                Nhận Bảng Giá Dự Án
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
