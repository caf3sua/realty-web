'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockProjects } from '@/data/mockData';

export default function SearchBar() {
  const router = useRouter();
  const [project, setProject] = useState('');
  const [type, setType] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (project) params.set('project', project);
    if (type) params.set('type', type);
    if (priceRange) params.set('price', priceRange);
    
    router.push(`/san-pham?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full max-w-4xl bg-neutral-900/80 backdrop-blur-md p-4 sm:p-6 rounded-2xl border border-white/10 shadow-2xl flex flex-col md:flex-row gap-4 items-end animate-fade-in"
    >
      {/* Project Selector */}
      <div className="w-full md:w-1/3 flex flex-col gap-2">
        <label className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Dự án</label>
        <select
          value={project}
          onChange={(e) => setProject(e.target.value)}
          className="w-full bg-neutral-950/80 text-white border border-neutral-800 focus:border-amber-500 rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors appearance-none cursor-pointer"
        >
          <option value="">Tất cả dự án</option>
          {mockProjects.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {/* Product Type Selector */}
      <div className="w-full md:w-1/3 flex flex-col gap-2">
        <label className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Loại hình</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full bg-neutral-950/80 text-white border border-neutral-800 focus:border-amber-500 rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors appearance-none cursor-pointer"
        >
          <option value="">Tất cả loại hình</option>
          <option value="villa">Biệt thự & Dinh thự</option>
          <option value="townhouse">Liền kề & Shophouse</option>
          <option value="apartment">Căn hộ chung cư</option>
          <option value="residential">Đất nền & Nhà thổ cư</option>
        </select>
      </div>

      {/* Price Selector */}
      <div className="w-full md:w-1/3 flex flex-col gap-2">
        <label className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Khoảng giá</label>
        <select
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          className="w-full bg-neutral-950/80 text-white border border-neutral-800 focus:border-amber-500 rounded-lg px-3 py-2.5 text-sm focus:outline-none transition-colors appearance-none cursor-pointer"
        >
          <option value="">Tất cả mức giá</option>
          <option value="under-5">Dưới 5 tỷ</option>
          <option value="5-10">5 tỷ - 10 tỷ</option>
          <option value="10-20">10 tỷ - 20 tỷ</option>
          <option value="above-20">Trên 20 tỷ</option>
        </select>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full md:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-neutral-900 font-bold px-8 py-3 rounded-lg text-sm transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 flex items-center justify-center gap-2 cursor-pointer h-10 md:h-auto"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        Tìm Kiếm
      </button>
    </form>
  );
}
