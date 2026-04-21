const TaskFilters = ({ filters, onChange, onApply }) => (
  <form
    className="filters-row"
    onSubmit={(event) => {
      event.preventDefault();
      onApply();
    }}
  >
    <input
      placeholder="Search tasks"
      value={filters.search}
      onChange={(event) => onChange({ ...filters, search: event.target.value })}
    />
    <select
      value={filters.status}
      onChange={(event) => onChange({ ...filters, status: event.target.value })}
    >
      <option value="">All statuses</option>
      <option value="todo">Todo</option>
      <option value="in-progress">In Progress</option>
      <option value="completed">Completed</option>
    </select>
    <select
      value={filters.sort}
      onChange={(event) => onChange({ ...filters, sort: event.target.value })}
    >
      <option value="latest">Latest</option>
      <option value="oldest">Oldest</option>
    </select>
    <button className="secondary-button" type="submit">
      Apply
    </button>
  </form>
);

export default TaskFilters;
