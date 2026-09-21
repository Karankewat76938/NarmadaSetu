import api from './api';

export const servicesAPI = {
  getServices: (params = {}) => api.get('/services', { params }),
  getServiceById: (id) => api.get(`/services/${id}`),
  createService: (serviceData) => api.post('/services', serviceData),
  updateService: (id, serviceData) => api.patch(`/services/${id}`, serviceData),
  deleteService: (id) => api.delete(`/services/${id}`),
  getServiceReviews: (id) => api.get(`/reviews/service/${id}`)
};

