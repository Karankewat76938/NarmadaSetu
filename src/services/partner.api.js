import api from './api';

export const partnerAPI = {
  apply: (applicationData) => api.post('/partners/apply', applicationData),
  getMe: () => api.get('/partners/me'),
  updateProfile: (profileData) => api.patch('/partners/me', profileData)
};

