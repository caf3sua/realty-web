'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Close lightbox on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, activeIndex]);

  const handleOpen = (index: number) => {
    setActiveIndex(index);
    setIsOpen(true);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const mainImage = images[0] || '/images/hero-bg.png';
  const secondImage = images[1] || mainImage;
  const thirdImage = images[2] || mainImage;

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Main image */}
        <div
          onClick={() => handleOpen(0)}
          className="md:col-span-2 relative h-[300px] sm:h-[450px] rounded-none overflow-hidden border border-brand-gray-medium cursor-pointer group"
        >
          <Image
            src={mainImage}
            alt={title}
            fill
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-103"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        {/* Sub image grid */}
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
          <div
            onClick={() => handleOpen(1)}
            className="relative h-[140px] sm:h-[217px] rounded-none overflow-hidden border border-brand-gray-medium cursor-pointer group"
          >
            <Image
              src={secondImage}
              alt={`${title} view 2`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-103"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>

          <div
            onClick={() => handleOpen(2)}
            className="relative h-[140px] sm:h-[217px] rounded-none overflow-hidden border border-brand-gray-medium cursor-pointer group bg-brand-verydark/50 flex items-center justify-center"
          >
            <Image
              src={thirdImage}
              alt={`${title} view 3`}
              fill
              className="object-cover opacity-60 filter blur-[1px] transition-transform duration-500 group-hover:scale-103"
            />
            <div className="absolute inset-0 bg-brand-verydark/30 group-hover:bg-brand-verydark/10 transition-colors duration-300" />
            <span className="relative z-10 text-white font-bold text-sm tracking-wider uppercase bg-brand-brown/85 border border-white/20 px-4 py-2.5 hover:bg-brand-taupe transition-all duration-300">
              + Xem Thêm Ảnh
            </span>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-100 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 md:p-8 animate-fade-in">
          {/* Header */}
          <div className="flex justify-between items-center text-white border-b border-white/10 pb-4">
            <div>
              <h3 className="text-sm font-semibold tracking-wide uppercase text-brand-taupe">{title}</h3>
              <p className="text-xs text-brand-gray-light mt-0.5">Hình ảnh chi tiết bất động sản</p>
            </div>
            <div className="flex items-center gap-6">
              <span className="text-sm font-medium tracking-widest text-brand-gray-light">
                {activeIndex + 1} / {images.length}
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-brand-taupe transition-colors duration-200 focus:outline-none p-1 cursor-pointer"
                aria-label="Close lightbox"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Main Active Image Viewport */}
          <div className="relative flex-grow flex items-center justify-center my-6 group">
            {/* Left navigation arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-2 md:left-4 z-20 bg-black/40 hover:bg-brand-brown text-white p-2.5 md:p-3 transition-all duration-200 focus:outline-none border border-white/10 cursor-pointer"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Main image container */}
            <div className="relative w-full h-full max-h-[60vh] md:max-h-[70vh]">
              <Image
                src={images[activeIndex]}
                alt={`${title} active detail view`}
                fill
                priority
                className="object-contain"
              />
            </div>

            {/* Right navigation arrow */}
            <button
              onClick={handleNext}
              className="absolute right-2 md:right-4 z-20 bg-black/40 hover:bg-brand-brown text-white p-2.5 md:p-3 transition-all duration-200 focus:outline-none border border-white/10 cursor-pointer"
              aria-label="Next image"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Thumbnail list footer */}
          <div className="border-t border-white/10 pt-4 pb-2">
            <div className="flex justify-center gap-3 overflow-x-auto no-scrollbar py-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`relative w-20 h-14 md:w-28 md:h-20 shrink-0 border-2 overflow-hidden transition-all duration-200 ${
                    index === activeIndex ? 'border-brand-taupe scale-103' : 'border-transparent opacity-50 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`Thumbnail view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
