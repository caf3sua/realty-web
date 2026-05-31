'use client';

import React from 'react';

export default function ContactForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Cảm ơn quý khách! Yêu cầu tư vấn của quý khách đã được ghi nhận. Chuyên viên sẽ gọi điện tư vấn trong vòng 15 phút.');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Họ và tên..."
        required
        className="w-full bg-white text-xs text-brand-brown border border-brand-gray-medium focus:border-brand-brown rounded-none px-3 py-2.5 focus:outline-none transition-colors"
      />
      <input
        type="tel"
        placeholder="Số điện thoại..."
        required
        className="w-full bg-white text-xs text-brand-brown border border-brand-gray-medium focus:border-brand-brown rounded-none px-3 py-2.5 focus:outline-none transition-colors"
      />
      <textarea
        placeholder="Tôi muốn tìm hiểu thông tin chi tiết về căn này..."
        rows={3}
        className="w-full bg-white text-xs text-brand-brown border border-brand-gray-medium focus:border-brand-brown rounded-none px-3 py-2.5 focus:outline-none transition-colors resize-none"
      />
      <button
        type="submit"
        className="w-full bg-brand-brown border-2 border-brand-brown text-white hover:bg-brand-taupe hover:border-brand-taupe font-bold py-2.5 rounded-none text-xs transition-all shadow-md cursor-pointer"
      >
        Gửi Yêu Cầu
      </button>
    </form>
  );
}
