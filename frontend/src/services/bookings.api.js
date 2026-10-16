import { apiRequest } from './api';

export const createBookingApi = (data) => apiRequest('POST', '/api/v1/bookings', data);
export const getBookingsApi = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiRequest('GET', `/api/v1/bookings${query ? '?' + query : ''}`);
};
export const getBookingByIdApi = (id) => apiRequest('GET', `/api/v1/bookings/${id}`);
export const updateBookingStatusApi = (id, data) => apiRequest('PATCH', `/api/v1/bookings/${id}/status`, data);
export const cancelBookingApi = (id, reason) => apiRequest('POST', `/api/v1/bookings/${id}/cancel`, { reason });
