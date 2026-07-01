import { Pencil, Trash2, Calendar } from 'lucide-react';
import { format } from '../../utils/dateUtils';
import EmptyState from '../EmptyState';

const priorityColors = {
  High:   'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
  Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400',
  Low:    'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
};

const statusColors = {
  Pending:      'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300',
  'In Progress':'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400',
  Completed:   'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400',
};

/**
 * Compact list view — one task per row, ideal for high-density task lists.
 */
const ListView = ({ tasks, onEdit, onDelete, onAddTask, hasFilters }) => {
  if (tasks.length === 0) {
    return <EmptyState onAddTask={onAddTask} filtered={!!hasFilters} />;
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm layout-animate divide-y divide-slate-100 dark:divide-slate-800">
      {tasks.map((task) => (
        <div
          key={task._id}
          className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors duration-150 group"
        >
          {/* Title + Description */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
              {task.title}
            </p>
            {task.description && (
              <p className="text-xs text-slate-400 dark:text-slate-500 truncate mt-0.5">
                {task.description}
              </p>
            )}
          </div>

          {/* Priority badge */}
          <span className={`hidden sm:inline-flex text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>

          {/* Status badge */}
          <span className={`hidden md:inline-flex text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${statusColors[task.status]}`}>
            {task.status}
          </span>

          {/* Due date */}
          {task.dueDate ? (
            <span className="hidden lg:flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap">
              <Calendar size={12} />
              {format(task.dueDate)}
            </span>
          ) : (
            <span className="hidden lg:block w-20" /> // maintain alignment
          )}

          {/* Actions — visible on hover */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            <button
              onClick={() => onEdit(task)}
              aria-label="Edit task"
              className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-150"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => onDelete(task)}
              aria-label="Delete task"
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all duration-150"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListView;
