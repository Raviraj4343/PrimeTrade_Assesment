import { useEffect, useState } from 'react';
import Alert from '../components/common/Alert.jsx';
import TaskFilters from '../components/tasks/TaskFilters.jsx';
import TaskForm from '../components/tasks/TaskForm.jsx';
import TaskList from '../components/tasks/TaskList.jsx';
import { API_BASE_URL } from '../constants/appConstants.js';
import { useAuth } from '../context/AuthContext.jsx';
import { taskService } from '../services/task.service.js';

const initialFilters = {
  search: '',
  status: '',
  sort: 'latest'
};

const buildTaskQuery = (filters) => {
  const params = {
    page: 1,
    limit: 10,
    sort: filters.sort || 'latest'
  };

  const trimmedSearch = filters.search.trim();

  if (trimmedSearch) {
    params.search = trimmedSearch;
  }

  if (filters.status) {
    params.status = filters.status;
  }

  return params;
};

const DashboardPage = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filters, setFilters] = useState(initialFilters);
  const [activeTask, setActiveTask] = useState(null);
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiBaseUrl, setApiBaseUrl] = useState(API_BASE_URL);
  const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 1 });

  const loadTasks = async () => {
    setIsLoading(true);

    try {
      const response = await taskService.list(buildTaskQuery(filters));

      setTasks(response.data.data.items);
      setPagination(response.data.data.pagination);
      setFeedback({ type: '', message: '' });
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error.response?.data?.message || 'Unable to fetch tasks'
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleTaskSave = async (payload) => {
    if (!payload.title.trim()) {
      setFeedback({ type: 'error', message: 'Task title is required' });
      return;
    }

    setIsSubmitting(true);

    try {
      if (activeTask) {
        await taskService.update(activeTask._id, payload);
        setFeedback({ type: 'success', message: 'Task updated successfully' });
      } else {
        await taskService.create(payload);
        setFeedback({ type: 'success', message: 'Task created successfully' });
      }

      setActiveTask(null);
      await loadTasks();
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error.response?.data?.message || 'Unable to save task'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (taskId) => {
    try {
      await taskService.remove(taskId);
      setFeedback({ type: 'success', message: 'Task deleted successfully' });
      if (activeTask?._id === taskId) {
        setActiveTask(null);
      }
      await loadTasks();
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error.response?.data?.message || 'Unable to delete task'
      });
    }
  };

  return (
    <section className="dashboard-shell">
      <section className="hero-card compact-hero">
        <div className="dashboard-top">
          <div>
            <p className="eyebrow">Dashboard</p>
            <h1 className="dashboard-title">Welcome, {user?.name}</h1>
            <p className="hero-copy">Manage your tasks with a simple authenticated workflow.</p>
          </div>

          <div className="profile-card compact-profile">
            <div className="profile-header">
              <div>
                <p className="profile-label">Email</p>
                <p className="profile-value">{user?.email || '-'}</p>
              </div>
              <span className="role-badge">{user?.role || 'user'}</span>
            </div>
          </div>
        </div>

        <div className="dashboard-toolbar">
          <div className="api-config compact-config static-config">
            <label>API Base URL</label>
            <input
              disabled
              type="text"
              value={apiBaseUrl}
              onChange={(event) => setApiBaseUrl(event.target.value)}
            />
          </div>
          <div className="status-panel" data-tone="success">
            <span className="status-dot" />
            <div>
              <p className="status-label">Session</p>
              <p>Authenticated</p>
            </div>
          </div>
        </div>
      </section>

      <section className="content-grid">
        <article className="panel">
          <div className="panel-header">
            <div>
              <p className="section-kicker">Task Management</p>
              <h2>Workbench</h2>
            </div>
            <button className="ghost-button" onClick={loadTasks} type="button">
              Refresh
            </button>
          </div>

          <Alert message={feedback.message} type={feedback.type} />

          <div className="task-workspace">
            <TaskForm
              activeTask={activeTask}
              isSubmitting={isSubmitting}
              onCancelEdit={() => setActiveTask(null)}
              onSave={handleTaskSave}
            />

            <div className="task-board">
              <TaskFilters filters={filters} onApply={loadTasks} onChange={setFilters} />
              <div className="task-board-header">
                <div>
                  <p className="section-kicker">Task Feed</p>
                  <p className="tasks-meta">
                    Showing {tasks.length} of {pagination.total} task(s)
                  </p>
                </div>
                <p className="task-total">{pagination.total} tasks</p>
              </div>
              <TaskList
                isLoading={isLoading}
                onDelete={handleDelete}
                onEdit={setActiveTask}
                tasks={tasks}
              />
            </div>
          </div>
        </article>
      </section>
    </section>
  );
};

export default DashboardPage;
