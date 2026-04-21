import { state } from '../store/state.js';
import { elements } from './elements.js';

export const logResponse = (label, payload) => {
  const stamp = new Date().toLocaleTimeString();
  elements.responseLog.textContent = `[${stamp}] ${label}\n${JSON.stringify(payload, null, 2)}\n\n${elements.responseLog.textContent}`;
};

export const setConnectionStatus = (message) => {
  elements.connectionStatus.textContent = message;
};

export const updateSessionUi = () => {
  const isAuthenticated = Boolean(state.token && state.currentUser);
  elements.logoutButton.disabled = !isAuthenticated;
  elements.refreshTasksButton.disabled = !isAuthenticated;
  elements.currentUser.textContent = isAuthenticated
    ? JSON.stringify(state.currentUser, null, 2)
    : 'No active session';
};

export const resetTaskForm = () => {
  elements.taskId.value = '';
  elements.taskForm.reset();
  elements.status.value = 'todo';
  elements.taskFormTitle.textContent = 'Create Task';
  elements.cancelEditButton.hidden = true;
};

export const renderTasks = () => {
  if (!state.currentUser) {
    elements.tasksList.innerHTML = '<div class="empty-state">Sign in to manage tasks.</div>';
    elements.tasksMeta.textContent = 'Sign in to view tasks.';
    return;
  }

  if (!state.tasks.length) {
    elements.tasksList.innerHTML = '<div class="empty-state">No tasks found for the current filters.</div>';
    elements.tasksMeta.textContent = '0 tasks returned';
    return;
  }

  const { page, limit, total, totalPages } = state.pagination;
  elements.tasksMeta.textContent = `Showing ${state.tasks.length} of ${total} task(s). Page ${page} of ${totalPages} with limit ${limit}.`;

  elements.tasksList.innerHTML = state.tasks
    .map(
      (task) => `
        <article class="task-card">
          <span class="task-badge">${task.status}</span>
          <h3>${task.title}</h3>
          <p class="task-meta">Owner: ${task.user?.name || 'Unknown'} | Updated: ${new Date(task.updatedAt).toLocaleString()}</p>
          <p>${task.description || 'No description provided.'}</p>
          <div class="task-actions">
            <button type="button" data-action="edit" data-id="${task._id}">Edit</button>
            <button type="button" class="secondary-button" data-action="delete" data-id="${task._id}">Delete</button>
          </div>
        </article>
      `
    )
    .join('');
};
