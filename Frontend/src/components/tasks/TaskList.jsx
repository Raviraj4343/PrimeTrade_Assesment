import TaskCard from './TaskCard.jsx';

const TaskList = ({ tasks, isLoading, onEdit, onDelete }) => {
  if (isLoading) {
    return <div className="empty-state">Loading tasks...</div>;
  }

  if (!tasks.length) {
    return <div className="empty-state">No tasks found for the selected filters.</div>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard key={task._id} onDelete={onDelete} onEdit={onEdit} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
