import { useEffect, useState } from 'react';
import { TASK_STATUSES } from '../../constants/appConstants.js';

const initialState = {
  title: '',
  description: '',
  status: 'todo'
};

const TaskForm = ({ activeTask, onCancelEdit, onSave, isSubmitting }) => {
  const [formState, setFormState] = useState(initialState);

  useEffect(() => {
    if (activeTask) {
      setFormState({
        title: activeTask.title,
        description: activeTask.description || '',
        status: activeTask.status
      });
      return;
    }

    setFormState(initialState);
  }, [activeTask]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSave(formState);

    if (!activeTask) {
      setFormState(initialState);
    }
  };

  return (
    <form className="stack-form task-form-card" onSubmit={handleSubmit}>
      <div className="task-form-heading">
        <div>
          <p className="section-kicker">Task Editor</p>
          <h3>{activeTask ? 'Edit Task' : 'Create Task'}</h3>
        </div>
      </div>

      <label className="task-field" htmlFor="task-title">
        <span className="task-field-label">Title</span>
        <input
          id="task-title"
          name="title"
          placeholder="Task title"
          value={formState.title}
          onChange={(event) => setFormState({ ...formState, title: event.target.value })}
        />
      </label>
      <label className="task-field" htmlFor="task-description">
        <span className="task-field-label">Description</span>
        <textarea
          id="task-description"
          name="description"
          placeholder="Task description"
          rows="6"
          value={formState.description}
          onChange={(event) => setFormState({ ...formState, description: event.target.value })}
        />
      </label>
      <label className="task-field" htmlFor="task-status">
        <span className="task-field-label">Status</span>
        <select
          id="task-status"
          name="status"
          value={formState.status}
          onChange={(event) => setFormState({ ...formState, status: event.target.value })}
        >
          {TASK_STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </label>

      <div className="inline-actions">
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Saving...' : activeTask ? 'Update Task' : 'Create Task'}
        </button>
        {activeTask ? (
          <button className="secondary-button" onClick={onCancelEdit} type="button">
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
};

export default TaskForm;
