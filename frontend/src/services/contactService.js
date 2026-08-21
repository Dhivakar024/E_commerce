import { apiClient } from './api';

export const contactService = {
  async submitInquiry(formData) {
    return apiClient('/contact', {
      method: 'POST',
      data: formData,
    });
  },
};
