import { Pencil, Trash2, Calendar } from 'lucide-react';
import { format } from '../utils/dateUtils';

// Badge color maps
const priorityColors = {
  High: 'bg-red-100 text-red-700',
  Medium: 'bg-amber-100 text-amber-700',
  Low: 'bg-green-100 text-green-700',
};

const statusColors = {
  Pending: 'bg-slate-100 text-slate-600',
  'In Progress': 'bg-blue-100 text-blue-700',
  Completed: 'bg-emerald-100 text-emerald-700',
};

const TaskCard = ({ task, onEdit, onDelete }) => {
  const { title, description, status, priority, dueDate } = task;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
      {/* Priority + Status */}
      <div className="flex items-center justify-between gap-2">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${priorityColors[priority]}`}>
          {priority}
        </span>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[status]}`}>
          {status}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-slate-800 text-base leading-snug line-clamp-2">
        {title}
      </h3>

      {/* Description preview */}
      {description && (
        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
          {description}
        </p>
      )}

      {/* Due date */}
      {dueDate && (
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Calendar size={13} />
          <span>Due {format(dueDate)}</span>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1 mt-auto">
        <button
          onClick={() => onEdit(task)}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 px-2.5 py-1.5 rounded-lg hover:bg-blue-50 transition-all duration-150 font-medium"
          aria-label="Edit task"
        >
          <Pencil size={13} />
          Edit
        </button>
        <button
          onClick={() => onDelete(task)}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-red-600 px-2.5 py-1.5 rounded-lg hover:bg-red-50 transition-all duration-150 font-medium"
          aria-label="Delete task"
        >
          <Trash2 size={13} />
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
