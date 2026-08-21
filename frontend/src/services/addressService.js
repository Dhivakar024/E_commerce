import { apiClient } from './api';

export const addressService = {
  async getAddresses() {
    return apiClient('/addresses');
  },

  async createAddress(addressData) {
    return apiClient('/addresses', {
      method: 'POST',
      data: addressData,
    });
  },

  async updateAddress(id, addressData) {
    return apiClient(`/addresses/${id}`, {
      method: 'PUT',
      data: addressData,
    });
  },

  async deleteAddress(id) {
    return apiClient(`/addresses/${id}`, {
      method: 'DELETE',
    });
  },

  async setDefaultAddress(id) {
    return apiClient(`/addresses/${id}/default`, {
      method: 'PUT',
    });
  },
};
