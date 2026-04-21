import { defaultApiBaseUrl, storageKeys } from '../config/constants.js';

export const state = {
  apiBaseUrl: localStorage.getItem(storageKeys.apiBaseUrl) || defaultApiBaseUrl,
  token: localStorage.getItem(storageKeys.token) || '',
  currentUser: null,
  tasks: [],
  pagination: null
};
