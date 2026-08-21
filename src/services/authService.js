import { apiClient } from './api';

export const authService = {
  async register(userData) {
    return apiClient('/auth/register', {
      method: 'POST',
      data: userData,
    });
  },

  async login(credentials) {
    return apiClient('/auth/login', {
      method: 'POST',
      data: credentials,
    });
  },

  async getCurrentUser() {
    return apiClient('/auth/me');
  },

  async updateProfile(profileData) {
    return apiClient('/auth/profile', {
      method: 'PUT',
      data: profileData,
    });
  },

  async forgotPassword(email) {
    return apiClient('/auth/forgot-password', {
      method: 'POST',
      data: { email },
    });
  },

  async resetPassword(resetToken, newPassword) {
    return apiClient('/auth/reset-password', {
      method: 'POST',
      data: { resetToken, newPassword },
    });
  },
};
