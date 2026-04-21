import axios from 'axios';
import { API_BASE_URL } from '../constants/appConstants.js';
import { storageService } from './storage.service.js';

const httpClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

httpClient.interceptors.request.use((config) => {
  const token = storageService.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      storageService.clearToken();
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default httpClient;
