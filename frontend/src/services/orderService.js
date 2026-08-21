import { apiClient } from './api';

export const orderService = {
  async createOrder(orderPayload) {
    return apiClient('/orders', {
      method: 'POST',
      data: orderPayload,
    });
  },

  async getUserOrders() {
    return apiClient('/orders');
  },

  async getOrderById(id) {
    return apiClient(`/orders/${id}`);
  },

  async cancelOrder(id) {
    return apiClient(`/orders/${id}/cancel`, {
      method: 'PUT',
    });
  },

  async getAllOrdersAdmin(params = {}) {
    return apiClient('/admin/orders', {
      params,
    });
  },

  async updateOrderStatusAdmin(id, status) {
    return apiClient(`/admin/orders/${id}/status`, {
      method: 'PUT',
      data: { status },
    });
  },
};
