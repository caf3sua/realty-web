'use client';

import React, { useState } from 'react';
import SuccessModal from './SuccessModal';
import { createAdvisoryAction } from '@/app/actions';

interface ContactFormProps {
  productSlug?: string;
  productName?: string;
}

export default function ContactForm({ productSlug, productName }: ContactFormProps) {
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await createAdvisoryAction({
        name,
        phone,
        details,
        productSlug,
        productName
      });

      if (res.success) {
        setShowModal(true);
        setName('');
        setPhone('');
        setDetails('');
      } else {
        setError(res.error || 'Có lỗi xảy ra khi gửi yêu cầu tư vấn.');
      }
    } catch (err) {
      setError('Lỗi kết nối mạng, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {error && (
        <p className="text-xs text-red-500 font-semibold">{error}</p>
      )}
      <input
        type="text"
        placeholder="Họ và tên..."
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={loading}
        className="w-full bg-white text-xs text-brand-brown border border-brand-gray-medium focus:border-brand-brown rounded-none px-3 py-2.5 focus:outline-none transition-colors disabled:opacity-60"
      />
      <input
        type="tel"
        placeholder="Số điện thoại..."
        required
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        disabled={loading}
        className="w-full bg-white text-xs text-brand-brown border border-brand-gray-medium focus:border-brand-brown rounded-none px-3 py-2.5 focus:outline-none transition-colors disabled:opacity-60"
      />
      <textarea
        placeholder="Tôi muốn tìm hiểu thông tin chi tiết về căn này..."
        rows={3}
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        disabled={loading}
        className="w-full bg-white text-xs text-brand-brown border border-brand-gray-medium focus:border-brand-brown rounded-none px-3 py-2.5 focus:outline-none transition-colors resize-none disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-brand-brown border-2 border-brand-brown text-white hover:bg-brand-taupe hover:border-brand-taupe font-bold py-2.5 rounded-none text-xs transition-all shadow-md cursor-pointer disabled:bg-brand-brown/50 disabled:border-brand-brown/50 disabled:cursor-not-allowed"
      >
        {loading ? 'Đang gửi...' : 'Gửi Yêu Cầu'}
      </button>
      <SuccessModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Gửi yêu cầu thành công"
        message="Cảm ơn quý khách! Yêu cầu tư vấn của quý khách đã được ghi nhận. Chuyên viên sẽ gọi điện tư vấn trong thời gian sớm nhất."
      />
    </form>
  );
}

