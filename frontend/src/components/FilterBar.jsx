const STATUS_OPTIONS = ['All', 'Pending', 'In Progress', 'Completed'];
const PRIORITY_OPTIONS = ['All', 'Low', 'Medium', 'High'];

const FilterBar = ({ statusFilter, priorityFilter, onStatusChange, onPriorityChange }) => {
  const selectClass =
    'text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer';

  return (
    <div className="flex items-center gap-3 flex-wrap">
      {/* Status filter */}
      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        className={selectClass}
        aria-label="Filter by status"
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt} value={opt === 'All' ? '' : opt}>
            {opt === 'All' ? 'All Statuses' : opt}
          </option>
        ))}
      </select>

      {/* Priority filter */}
      <select
        value={priorityFilter}
        onChange={(e) => onPriorityChange(e.target.value)}
        className={selectClass}
        aria-label="Filter by priority"
      >
        {PRIORITY_OPTIONS.map((opt) => (
          <option key={opt} value={opt === 'All' ? '' : opt}>
            {opt === 'All' ? 'All Priorities' : opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
