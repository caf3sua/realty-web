'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/95 backdrop-blur-md border-b border-brand-gray-medium shadow-sm py-3'
        : 'bg-white border-b border-brand-gray-light py-4'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/logo-blue.png"
              alt="Anh Duong Property Logo"
              width={36}
              height={36}
              className="object-contain"
            />
            <span className="text-xl lg:text-2xl font-bold text-brand-brown font-serif tracking-wider group-hover:text-brand-taupe transition-colors">
              ANH DUONG <span className="text-[0.8em] font-medium tracking-wide">PROPERTY</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-medium tracking-wide transition-colors py-1 border-b-2 ${isActive(item.path)
                  ? 'text-brand-taupe border-brand-taupe font-semibold'
                  : 'text-brand-brown border-transparent hover:text-brand-taupe'
                  }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/landing-page/vinhomes-ha-long-xanh"
              className="text-xs uppercase bg-brand-cream text-brand-brown hover:bg-brand-brown hover:text-white border border-brand-brown px-3 py-1.5 rounded-none font-semibold tracking-wider transition-all"
            >
              Hạ Long Xanh
            </Link>
          </nav>

          {/* Action CTA */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            <a
              href="tel:0919936576"
              className="text-brand-brown hover:text-brand-taupe flex items-center gap-2 text-sm font-semibold transition-colors"
            >
              <svg
                className="w-4 h-4 text-brand-taupe animate-pulse"
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
                if (pathname === '/' || pathname.startsWith('/landing-page/')) {
                  const target = document.getElementById('contact-form');
                  if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
              className="bg-brand-brown border-2 border-brand-brown text-white font-medium px-5 py-2 rounded-none text-sm hover:bg-brand-taupe hover:border-brand-taupe transition-all duration-300"
            >
              Nhận Bảng Giá
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden gap-3">
            <Link
              href="/landing-page/vinhomes-ha-long-xanh"
              className="text-[10px] uppercase bg-brand-cream text-brand-brown border border-brand-brown px-2 py-1 rounded-none font-semibold tracking-wider"
            >
              Hạ Long Xanh
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-brand-brown hover:text-brand-taupe p-2 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
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
        <div className="md:hidden bg-white border-b border-brand-gray-medium animate-fade-in" id="mobile-menu">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2.5 rounded-none text-base font-medium transition-colors ${isActive(item.path)
                  ? 'bg-brand-cream text-brand-taupe font-semibold'
                  : 'text-brand-brown hover:bg-brand-cream'
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
