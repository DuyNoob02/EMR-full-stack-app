import { api } from './api';

export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
    
  register: (userData: { name: string; email: string; password: string }) =>
    api.post('/auth/register', userData),
    
  logout: (data: { refreshToken: string }) =>
    api.post('/auth/logout', data),
    
  refreshToken: (data: { refreshToken: string }) =>
    api.post('/auth/refresh', data),
    
  getProfile: () =>
    api.get('/users/profile')
};