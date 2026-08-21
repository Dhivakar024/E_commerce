import { apiClient } from './api';

export const productService = {
  async getProducts(params = {}) {
    return apiClient('/products', {
      params,
    });
  },

  async getProductBySlug(slug) {
    return apiClient(`/products/slug/${slug}`);
  },

  async getProductById(id) {
    return apiClient(`/products/${id}`);
  },

  async createProduct(productData) {
    return apiClient('/products', {
      method: 'POST',
      data: productData,
    });
  },

  async updateProduct(id, productData) {
    return apiClient(`/products/${id}`, {
      method: 'PUT',
      data: productData,
    });
  },

  async deleteProduct(id) {
    return apiClient(`/products/${id}`, {
      method: 'DELETE',
    });
  },
};
