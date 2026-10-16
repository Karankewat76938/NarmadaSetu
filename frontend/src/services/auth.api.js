import { apiRequest } from './api';

export const loginApi = (email, password) => apiRequest('POST', '/api/v1/auth/login', { email, password });
export const registerApi = (name, email, password, role) => apiRequest('POST', '/api/v1/auth/register', { name, email, password, role });
export const getMeApi = () => apiRequest('GET', '/api/v1/auth/me');
export const updateProfileApi = (data) => apiRequest('PATCH', '/api/v1/auth/profile', data);
