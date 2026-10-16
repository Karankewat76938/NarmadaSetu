import { apiRequest } from './api';

export const applyPartnerApi = (data) => apiRequest('POST', '/api/v1/partners/apply', data);
export const getPartnerMeApi = () => apiRequest('GET', '/api/v1/partners/me');
export const updatePartnerProfileApi = (data) => apiRequest('PATCH', '/api/v1/partners/me', data);
