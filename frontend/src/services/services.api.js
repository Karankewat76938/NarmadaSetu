import { apiRequest } from './api';

export const getServicesApi = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return apiRequest('GET', `/api/v1/services${query ? '?' + query : ''}`);
};
export const getServiceByIdApi = (id) => apiRequest('GET', `/api/v1/services/${id}`);
export const createServiceApi = (data) => apiRequest('POST', '/api/v1/services', data);
export const updateServiceApi = (id, data) => apiRequest('PATCH', `/api/v1/services/${id}`, data);
export const deleteServiceApi = (id) => apiRequest('DELETE', `/api/v1/services/${id}`);
