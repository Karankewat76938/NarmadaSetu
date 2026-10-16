import { apiRequest } from './api';

export const getAdminDashboardApi = () => apiRequest('GET', '/api/v1/admin/dashboard');
export const getAdminUsersApi = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiRequest('GET', `/api/v1/admin/users${query ? '?' + query : ''}`);
};
export const updateUserStatusApi = (id, data) => apiRequest('PATCH', `/api/v1/admin/users/${id}/status`, data);
export const getPartnerApplicationsApi = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiRequest('GET', `/api/v1/admin/partners${query ? '?' + query : ''}`);
};
export const updatePartnerApplicationStatusApi = (id, data) => apiRequest('PATCH', `/api/v1/admin/partners/${id}/status`, data);
export const getAdminServicesApi = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiRequest('GET', `/api/v1/admin/services${query ? '?' + query : ''}`);
};
export const updateServiceStatusApi = (id, data) => apiRequest('PATCH', `/api/v1/admin/services/${id}/status`, data);
export const getAdminBookingsApi = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiRequest('GET', `/api/v1/bookings${query ? '?' + query : ''}`);
};
