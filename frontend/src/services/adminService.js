import { apiClient } from './api';

export const adminService = {
  async getDashboardStats() {
    return apiClient('/admin/dashboard');
  },

  async getCustomers() {
    return apiClient('/admin/customers');
  },

  async getInventory() {
    return apiClient('/admin/inventory');
  },

  async updateStock(productId, stock) {
    return apiClient(`/admin/inventory/${productId}`, {
      method: 'PUT',
      data: { stock },
    });
  },
};
