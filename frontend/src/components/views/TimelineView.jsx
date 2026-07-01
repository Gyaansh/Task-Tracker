import { CalendarClock } from 'lucide-react';
import TaskCard from '../TaskCard';
import EmptyState from '../EmptyState';

// Determine which time bucket a due date falls into
const getDateGroup = (dueDate) => {
  if (!dueDate) return 'No Due Date';

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);

  const diffDays = Math.round((due - today) / (1000 * 60 * 60 * 24));

  if (diffDays < 0)  return 'Overdue';
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays <= 7)  return 'This Week';
  return 'Later';
};

const GROUP_ORDER = ['Overdue', 'Today', 'Tomorrow', 'This Week', 'Later', 'No Due Date'];

const groupStyles = {
  Overdue:       { label: 'text-red-600 dark:text-red-400',     dot: 'bg-red-500' },
  Today:         { label: 'text-blue-600 dark:text-blue-400',   dot: 'bg-blue-500' },
  Tomorrow:      { label: 'text-amber-600 dark:text-amber-400', dot: 'bg-amber-500' },
  'This Week':   { label: 'text-indigo-600 dark:text-indigo-400', dot: 'bg-indigo-500' },
  Later:         { label: 'text-slate-600 dark:text-slate-400', dot: 'bg-slate-400' },
  'No Due Date': { label: 'text-slate-400 dark:text-slate-500', dot: 'bg-slate-300 dark:bg-slate-600' },
};

/**
 * Timeline view — tasks grouped by due date proximity.
 * No due date tasks appear at the bottom.
 */
const TimelineView = ({ tasks, onEdit, onDelete, onAddTask, hasFilters }) => {
  if (tasks.length === 0) {
    return <EmptyState onAddTask={onAddTask} filtered={!!hasFilters} />;
  }

  // Build grouped map
  const groups = {};
  tasks.forEach((task) => {
    const group = getDateGroup(task.dueDate);
    if (!groups[group]) groups[group] = [];
    groups[group].push(task);
  });

  const activeGroups = GROUP_ORDER.filter((g) => groups[g]);

  return (
    <div className="flex flex-col gap-8 layout-animate">
      {activeGroups.map((groupName) => {
        const { label, dot } = groupStyles[groupName];
        const count = groups[groupName].length;

        return (
          <div key={groupName}>
            {/* Group header */}
            <div className="flex items-center gap-2.5 mb-4">
              <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${dot}`} />
              <CalendarClock size={15} className={label} />
              <h3 className={`font-semibold text-sm ${label}`}>{groupName}</h3>
              <span className="text-xs text-slate-400 dark:text-slate-600">
                — {count} task{count !== 1 ? 's' : ''}
              </span>
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700 ml-1" />
            </div>

            {/* Task cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {groups[groupName].map((task) => (
                <TaskCard key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TimelineView;
