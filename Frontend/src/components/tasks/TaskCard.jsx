const TaskCard = ({ task, onEdit, onDelete }) => (
  <article className={`task-card status-${task.status}`}>
    <div className="task-card-top">
      <span className="task-badge">{task.status}</span>
      <span className="task-date">{new Date(task.updatedAt).toLocaleDateString()}</span>
    </div>
    <h3>{task.title}</h3>
    <p className="task-meta">
      Owner: {task.user?.name || 'Unknown'} | Updated: {new Date(task.updatedAt).toLocaleString()}
    </p>
    <p className="task-description">{task.description || 'No description provided.'}</p>
    <div className="task-actions">
      <button onClick={() => onEdit(task)} type="button">
        Edit
      </button>
      <button className="secondary-button" onClick={() => onDelete(task._id)} type="button">
        Delete
      </button>
    </div>
  </article>
);

export default TaskCard;
