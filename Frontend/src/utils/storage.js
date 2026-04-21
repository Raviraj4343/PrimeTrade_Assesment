import { storageKeys } from '../config/constants.js';
import { state } from '../store/state.js';

export const saveApiBaseUrl = (apiBaseUrl) => {
  state.apiBaseUrl = apiBaseUrl;
  localStorage.setItem(storageKeys.apiBaseUrl, apiBaseUrl);
};

export const persistToken = (token) => {
  state.token = token || '';

  if (state.token) {
    localStorage.setItem(storageKeys.token, state.token);
    return;
  }

  localStorage.removeItem(storageKeys.token);
};
