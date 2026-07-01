import { CheckSquare, Plus } from 'lucide-react';

const Navbar = ({ onAddTask }) => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <CheckSquare size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">
              TaskFlow
            </span>
          </div>

          {/* Add Task Button */}
          <button
            onClick={onAddTask}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md active:scale-95"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Add Task</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
