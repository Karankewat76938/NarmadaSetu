import { apiRequest } from './api';

export const createReviewApi = (data) => apiRequest('POST', '/api/v1/reviews', data);
export const getServiceReviewsApi = (serviceId, params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiRequest('GET', `/api/v1/services/${serviceId}/reviews${query ? '?' + query : ''}`);
};
export const deleteReviewApi = (id) => apiRequest('DELETE', `/api/v1/reviews/${id}`);
