import { apiClient } from './api';

export const couponService = {
  async validateCoupon(code, subtotal) {
    return apiClient('/coupons/validate', {
      method: 'POST',
      data: { code, subtotal },
    });
  },

  async getAllCouponsAdmin() {
    return apiClient('/coupons');
  },

  async createCouponAdmin(couponData) {
    return apiClient('/coupons', {
      method: 'POST',
      data: couponData,
    });
  },

  async deleteCouponAdmin(id) {
    return apiClient(`/coupons/${id}`, {
      method: 'DELETE',
    });
  },
};
