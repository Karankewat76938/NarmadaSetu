import api from './api';

export const adminAPI = {
  getDashboardStats: () => api.get('/admin/dashboard'),
  getUsers: (params = {}) => api.get('/admin/users', { params }),
  updateUserStatus: (id, statusData) => api.patch(`/admin/users/${id}/status`, statusData),
  getPartnerApplications: (params = {}) => api.get('/admin/partners', { params }),
  updatePartnerApplicationStatus: (id, data) => api.patch(`/admin/partners/${id}/status`, data),
  getServices: (params = {}) => api.get('/admin/services', { params }),
  updateServiceStatus: (id, data) => api.patch(`/admin/services/${id}/status`, data)
};

