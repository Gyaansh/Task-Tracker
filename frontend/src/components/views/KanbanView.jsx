import TaskCard from '../TaskCard';
import EmptyState from '../EmptyState';

const COLUMNS = [
  { id: 'Pending',     label: 'Pending',     headerClass: 'border-amber-400 dark:border-amber-500',   countClass: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
  { id: 'In Progress', label: 'In Progress', headerClass: 'border-blue-400 dark:border-blue-500',     countClass: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  { id: 'Completed',   label: 'Completed',   headerClass: 'border-emerald-400 dark:border-emerald-500', countClass: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
];

/**
 * Kanban board grouped by status.
 * Horizontally scrollable on mobile.
 */
const KanbanView = ({ tasks, onEdit, onDelete, onAddTask, hasFilters }) => {
  const allEmpty = tasks.length === 0;

  if (allEmpty) {
    return <EmptyState onAddTask={onAddTask} filtered={!!hasFilters} />;
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 layout-animate">
      {COLUMNS.map(({ id, label, headerClass, countClass }) => {
        const columnTasks = tasks.filter((t) => t.status === id);
        return (
          <div key={id} className="flex-none w-72 sm:flex-1 sm:min-w-0">
            {/* Column header */}
            <div className={`flex items-center justify-between mb-4 pb-2.5 border-b-2 ${headerClass}`}>
              <h3 className="font-semibold text-sm text-slate-700 dark:text-slate-200">
                {label}
              </h3>
              <span className={`text-xs rounded-full px-2 py-0.5 font-semibold ${countClass}`}>
                {columnTasks.length}
              </span>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-3">
              {columnTasks.length === 0 ? (
                <div className="text-xs text-slate-400 dark:text-slate-600 text-center py-10 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
                  No tasks here
                </div>
              ) : (
                columnTasks.map((task) => (
                  <TaskCard key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanView;
