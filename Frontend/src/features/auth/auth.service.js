export const createAuthService = (apiClient) => ({
  register(payload) {
    return apiClient.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },
  login(payload) {
    return apiClient.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },
  getCurrentUser() {
    return apiClient.request('/auth/me');
  },
  logout() {
    return apiClient.request('/auth/logout', {
      method: 'POST'
    });
  }
});
