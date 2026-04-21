import httpClient from './http.service.js';

export const authService = {
  register(payload) {
    return httpClient.post('/auth/register', payload);
  },
  login(payload) {
    return httpClient.post('/auth/login', payload);
  },
  logout() {
    return httpClient.post('/auth/logout');
  },
  getCurrentUser() {
    return httpClient.get('/auth/me');
  }
};
