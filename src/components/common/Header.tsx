'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
    { name: 'Trang chủ', path: '/' },
    { name: 'Dự án', path: '/du-an' },
    { name: 'Sản phẩm', path: '/san-pham' },
    { name: 'Phân khúc cao cấp', path: '/cao-cap' },
    { name: 'Tin tức', path: '/tin-tuc' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-neutral-900/90 backdrop-blur-md border-b border-white/10 shadow-lg py-3'
          : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent font-serif tracking-wider group-hover:opacity-95 transition-opacity">
              ÁNH DƯƠNG LAND
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-amber-400 ${isActive(item.path)
                    ? 'text-amber-400 font-semibold'
                    : 'text-neutral-200'
                  }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/landing-page/vinhomes-ha-long-xanh"
              className="text-xs uppercase bg-emerald-600/30 text-emerald-400 hover:bg-emerald-600/50 border border-emerald-500/30 px-3 py-1.5 rounded-full font-semibold tracking-wider transition-all"
            >
              Hạ Long Xanh
            </Link>
          </nav>

          {/* Action CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:0919936576"
              className="text-white hover:text-amber-400 flex items-center gap-2 text-sm font-semibold transition-colors"
            >
              <svg
                className="w-4 h-4 text-amber-400 animate-pulse"
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
              0919 936 576
            </a>
            <Link
              href="#contact-form"
              onClick={(e) => {
                if (pathname === '/' || pathname.startsWith('/landing-page/')) {
                  // handle smooth scroll if target exists
                  const target = document.getElementById('contact-form');
                  if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-neutral-900 font-semibold px-5 py-2 rounded-lg text-sm transition-all duration-300 shadow-md shadow-amber-500/10 hover:shadow-amber-500/20"
            >
              Nhận Bảng Giá
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden gap-3">
            <Link
              href="/landing-page/vinhomes-ha-long-xanh"
              className="text-[10px] uppercase bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 px-2 py-1 rounded-full font-semibold tracking-wider"
            >
              Hạ Long Xanh
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-neutral-200 hover:text-white p-2 rounded-md focus:outline-none"
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
        <div className="md:hidden bg-neutral-950/95 border-b border-white/10 animate-fade-in" id="mobile-menu">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2.5 rounded-md text-base font-medium transition-colors ${isActive(item.path)
                    ? 'bg-amber-500/10 text-amber-400 font-semibold'
                    : 'text-neutral-200 hover:bg-neutral-800'
                  }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 pb-2 border-t border-white/10 px-3 flex flex-col gap-3">
              <a
                href="tel:0919936576"
                className="text-amber-400 font-semibold flex items-center gap-2"
              >
                <svg
                  className="w-4 h-4"
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
                0919 936 576
              </a>
              <Link
                href="#contact-form"
                onClick={() => setIsOpen(false)}
                className="bg-amber-500 text-neutral-900 text-center font-bold py-2 rounded-lg text-sm block"
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
