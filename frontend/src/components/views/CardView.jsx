import TaskCard from '../TaskCard';
import EmptyState from '../EmptyState';

/**
 * Default card grid layout — 1 col mobile, 2 tablet, 3 desktop.
 */
const CardView = ({ tasks, onEdit, onDelete, onAddTask, hasFilters }) => {
  if (tasks.length === 0) {
    return <EmptyState onAddTask={onAddTask} filtered={!!hasFilters} />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 layout-animate">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default CardView;
