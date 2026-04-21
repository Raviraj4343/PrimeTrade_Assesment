import { state } from '../store/state.js';

export const createApiClient = ({ onResponse }) => {
  const request = async (path, options = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    };

    if (state.token) {
      headers.Authorization = `Bearer ${state.token}`;
    }

    const response = await fetch(`${state.apiBaseUrl}${path}`, {
      ...options,
      headers,
      credentials: 'include'
    });

    const data = await response.json().catch(() => ({}));

    if (onResponse) {
      onResponse(`${options.method || 'GET'} ${path}`, data);
    }

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  };

  return {
    request
  };
};
