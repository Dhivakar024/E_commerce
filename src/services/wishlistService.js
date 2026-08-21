import { apiClient } from './api';

export const wishlistService = {
  async getWishlist() {
    return apiClient('/wishlist');
  },

  async toggleWishlist(productId) {
    return apiClient('/wishlist/toggle', {
      method: 'POST',
      data: { productId },
    });
  },

  async removeFromWishlist(productId) {
    return apiClient(`/wishlist/${productId}`, {
      method: 'DELETE',
    });
  },
};
