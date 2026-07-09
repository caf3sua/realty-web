'use client';

import { useSyncExternalStore } from 'react';

function subscribeMedia(query: string) {
  return (callback: () => void) => {
    const mql = window.matchMedia(query);
    mql.addEventListener('change', callback);
    return () => mql.removeEventListener('change', callback);
  };
}

function useMediaQuery(query: string, serverFallback = false): boolean {
  return useSyncExternalStore(
    subscribeMedia(query),
    () => window.matchMedia(query).matches,
    () => serverFallback
  );
}

/** true khi user bật "reduce motion" trong OS — mọi animation nặng phải tắt. */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

/** true trên thiết bị cảm ứng (không có hover chuột chính xác). */
export function useIsCoarsePointer(): boolean {
  return useMediaQuery('(pointer: coarse)');
}

/** true khi viewport < 768px. */
export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 767px)');
}

/** Máy yếu → dùng fallback tĩnh thay vì WebGL. Chỉ gọi phía client. */
export function isLowEndDevice(): boolean {
  if (typeof navigator === 'undefined') return true;
  return (navigator.hardwareConcurrency ?? 8) <= 4;
}
