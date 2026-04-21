export const createTaskService = (apiClient) => ({
  list(queryString) {
    return apiClient.request(`/tasks?${queryString}`);
  },
  create(payload) {
    return apiClient.request('/tasks', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },
  update(taskId, payload) {
    return apiClient.request(`/tasks/${taskId}`, {
      method: 'PATCH',
      body: JSON.stringify(payload)
    });
  },
  remove(taskId) {
    return apiClient.request(`/tasks/${taskId}`, {
      method: 'DELETE'
    });
  }
});
