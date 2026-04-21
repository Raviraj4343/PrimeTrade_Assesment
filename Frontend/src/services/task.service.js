import httpClient from './http.service.js';

export const taskService = {
  list(params) {
    return httpClient.get('/tasks', { params });
  },
  create(payload) {
    return httpClient.post('/tasks', payload);
  },
  update(taskId, payload) {
    return httpClient.patch(`/tasks/${taskId}`, payload);
  },
  remove(taskId) {
    return httpClient.delete(`/tasks/${taskId}`);
  }
};
