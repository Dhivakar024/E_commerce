import { apiClient } from './api';

export const cartService = {
  async getCart() {
    return apiClient('/cart');
  },

  async addToCart(productId, quantity = 1, size = '', color = '') {
    return apiClient('/cart', {
      method: 'POST',
      data: { productId, quantity, size, color },
    });
  },

  async updateCartItem(itemId, quantity) {
    return apiClient(`/cart/${itemId}`, {
      method: 'PUT',
      data: { quantity },
    });
  },

  async removeFromCart(itemId) {
    return apiClient(`/cart/${itemId}`, {
      method: 'DELETE',
    });
  },

  async clearCart() {
    return apiClient('/cart', {
      method: 'DELETE',
    });
  },
};
