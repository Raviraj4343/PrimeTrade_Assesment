import { state } from '../store/state.js';
import { saveApiBaseUrl, persistToken } from '../utils/storage.js';
import { elements } from '../ui/elements.js';
import {
  logResponse,
  renderTasks,
  resetTaskForm,
  setConnectionStatus,
  updateSessionUi
} from '../ui/renderers.js';
import { createApiClient } from '../services/api.js';
import { createAuthService } from '../features/auth/auth.service.js';
import { createTaskService } from '../features/tasks/task.service.js';

const apiClient = createApiClient({ onResponse: logResponse });
const authService = createAuthService(apiClient);
const taskService = createTaskService(apiClient);

const fetchCurrentUser = async () => {
  if (!state.token) {
    state.currentUser = null;
    updateSessionUi();
    renderTasks();
    return;
  }

  try {
    const response = await authService.getCurrentUser();
    state.currentUser = response.data;
    setConnectionStatus(`Authenticated as ${state.currentUser.name}`, 'success');
  } catch (error) {
    state.currentUser = null;
    persistToken('');
    setConnectionStatus(error.message, 'error');
  }

  updateSessionUi();
  renderTasks();
};

const fetchTasks = async () => {
  if (!state.currentUser) {
    renderTasks();
    return;
  }

  const params = new URLSearchParams({
    page: '1',
    limit: '10',
    sort: elements.sortFilter.value || 'latest'
  });

  if (elements.searchInput.value.trim()) {
    params.set('search', elements.searchInput.value.trim());
  }

  if (elements.statusFilter.value) {
    params.set('status', elements.statusFilter.value);
  }

  const response = await taskService.list(params.toString());
  state.tasks = response.data.items;
  state.pagination = response.data.pagination;
  renderTasks();
};

const handleAuthSuccess = async (response, label) => {
  persistToken(response.data.token);
  state.currentUser = response.data.user;
  updateSessionUi();
  setConnectionStatus(`${label} successful`, 'success');
  resetTaskForm();
  await fetchTasks();
};

const bindConfigurationEvents = () => {
  elements.saveApiBaseUrl.addEventListener('click', async () => {
    const apiBaseUrl = elements.apiBaseUrl.value.trim();
    saveApiBaseUrl(apiBaseUrl || state.apiBaseUrl);
    setConnectionStatus(`Saved endpoint: ${state.apiBaseUrl}`);
    await fetchCurrentUser();
  });
};

const bindAuthEvents = () => {
  elements.registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(elements.registerForm);

    try {
      const response = await authService.register(Object.fromEntries(formData.entries()));
      elements.registerForm.reset();
      await handleAuthSuccess(response, 'Registration');
    } catch (error) {
      setConnectionStatus(error.message, 'error');
    }
  });

  elements.loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(elements.loginForm);

    try {
      const response = await authService.login(Object.fromEntries(formData.entries()));
      elements.loginForm.reset();
      await handleAuthSuccess(response, 'Login');
    } catch (error) {
      setConnectionStatus(error.message, 'error');
    }
  });

  elements.logoutButton.addEventListener('click', async () => {
    try {
      await authService.logout();
    } catch (error) {
      logResponse('LOGOUT ERROR', { message: error.message });
    }

    persistToken('');
    state.currentUser = null;
    state.tasks = [];
    state.pagination = null;
    resetTaskForm();
    updateSessionUi();
    renderTasks();
    setConnectionStatus('Logged out', 'neutral');
  });
};

const bindTaskEvents = () => {
  elements.taskForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const payload = {
      title: elements.title.value.trim(),
      description: elements.description.value.trim(),
      status: elements.status.value
    };

    const taskId = elements.taskId.value;

    try {
      if (taskId) {
        await taskService.update(taskId, payload);
      } else {
        await taskService.create(payload);
      }

      resetTaskForm();
      await fetchTasks();
      setConnectionStatus(
        taskId ? 'Task updated successfully' : 'Task created successfully',
        'success'
      );
    } catch (error) {
      setConnectionStatus(error.message, 'error');
    }
  });

  elements.cancelEditButton.addEventListener('click', () => {
    resetTaskForm();
  });

  elements.refreshTasksButton.addEventListener('click', async () => {
    try {
      await fetchTasks();
      setConnectionStatus('Tasks refreshed', 'success');
    } catch (error) {
      setConnectionStatus(error.message, 'error');
    }
  });

  elements.filtersForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    try {
      await fetchTasks();
      setConnectionStatus('Filters applied', 'neutral');
    } catch (error) {
      setConnectionStatus(error.message, 'error');
    }
  });

  elements.tasksList.addEventListener('click', async (event) => {
    const button = event.target.closest('button[data-action]');

    if (!button) {
      return;
    }

    const { action, id } = button.dataset;
    const task = state.tasks.find((item) => item._id === id);

    if (action === 'edit' && task) {
      elements.taskId.value = task._id;
      elements.title.value = task.title;
      elements.description.value = task.description;
      elements.status.value = task.status;
      elements.taskFormTitle.textContent = 'Edit Task';
      elements.cancelEditButton.hidden = false;
      return;
    }

    if (action === 'delete') {
      try {
        await taskService.remove(id);
        await fetchTasks();
        setConnectionStatus('Task deleted successfully', 'success');
      } catch (error) {
        setConnectionStatus(error.message, 'error');
      }
    }
  });
};

const bindUtilityEvents = () => {
  elements.clearLogButton.addEventListener('click', () => {
    elements.responseLog.textContent = 'Ready.';
  });
};

export const bootstrapDashboard = async () => {
  elements.apiBaseUrl.value = state.apiBaseUrl;
  elements.sortFilter.value = 'latest';
  resetTaskForm();
  updateSessionUi();
  renderTasks();

  bindConfigurationEvents();
  bindAuthEvents();
  bindTaskEvents();
  bindUtilityEvents();

  await fetchCurrentUser();
};
