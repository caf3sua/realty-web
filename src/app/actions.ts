'use server';

import { api } from '@/services/api';

export async function subscribeNewsletterAction(email: string) {
  try {
    await api.subscribeNewsletter(email);
    return { success: true };
  } catch (err: any) {
    return { 
      success: false, 
      error: err.message || 'Có lỗi xảy ra khi đăng ký nhận tin.' 
    };
  }
}

export async function createAdvisoryAction(data: {
  name: string;
  phone: string;
  details: string;
  productSlug?: string;
  productName?: string;
}) {
  try {
    await api.createAdvisory(data);
    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || 'Gửi yêu cầu tư vấn thất bại.'
    };
  }
}

