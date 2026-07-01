import { ClipboardList, Plus } from 'lucide-react';
import Button from './Button';

const EmptyState = ({ onAddTask, filtered = false }) => {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-6 text-center px-4">
      <div className="w-20 h-20 bg-blue-50 dark:bg-blue-950 rounded-2xl flex items-center justify-center">
        <ClipboardList size={40} className="text-blue-400 dark:text-blue-500" />
      </div>
      <div>
        <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2">
          {filtered ? 'No tasks match your filters' : "You haven't created any tasks yet."}
        </h3>
        <p className="text-slate-400 dark:text-slate-500 text-sm max-w-xs">
          {filtered
            ? "Try adjusting your search or filters to find what you're looking for."
            : 'Get started by creating your first task. Track your work and stay productive!'}
        </p>
      </div>
      {!filtered && (
        <Button onClick={onAddTask} size="lg">
          <Plus size={18} />
          Create Task
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
