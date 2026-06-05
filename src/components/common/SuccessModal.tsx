'use client';

import React from 'react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
}

export default function SuccessModal({ isOpen, onClose, title = "Đăng ký thành công", message }: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop with smooth blur */}
      <div 
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal card styled with brand aesthetics */}
      <div className="relative bg-white text-slate-800 p-6 sm:p-8 rounded-none border border-brand-brown/10 w-full max-w-md shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
        
        {/* Close Icon Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 hover:bg-slate-100 text-slate-450 hover:text-slate-700 transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {/* Premium Success Green Check Circle */}
        <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-5 shrink-0">
          <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>

        {/* Title and Message */}
        <div className="space-y-2.5">
          <h3 className="font-serif text-base font-bold text-brand-brown tracking-wider uppercase">
            {title}
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed font-sans max-w-xs mx-auto">
            {message}
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="mt-6 w-full bg-brand-brown border-2 border-brand-brown text-white hover:bg-brand-taupe hover:border-brand-taupe font-bold py-3 rounded-none text-[11px] tracking-widest transition-all cursor-pointer shadow-md shadow-brand-brown/10 uppercase"
        >
          Đồng ý
        </button>
      </div>
    </div>
  );
}
