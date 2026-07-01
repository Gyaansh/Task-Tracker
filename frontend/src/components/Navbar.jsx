import { CheckSquare, Plus, Sun, Moon } from 'lucide-react';

const Navbar = ({ onAddTask, isDark, onToggleTheme }) => {
  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <CheckSquare size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">
              TaskFlow
            </span>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={onToggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 dark:text-slate-400
                hover:text-slate-700 dark:hover:text-slate-200
                hover:bg-slate-100 dark:hover:bg-slate-800
                focus-visible:outline-2 focus-visible:outline-blue-600
                transition-all duration-150"
            >
              {isDark ? (
                <Sun size={18} className="rotate-0 transition-transform duration-300" />
              ) : (
                <Moon size={18} className="rotate-0 transition-transform duration-300" />
              )}
            </button>

            {/* Add Task Button */}
            <button
              onClick={onAddTask}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium
                transition-all duration-150 hover:shadow-md active:scale-95 focus-visible:outline-2 focus-visible:outline-blue-600"
            >
              <Plus size={16} />
              <span className="hidden sm:inline">Add Task</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
