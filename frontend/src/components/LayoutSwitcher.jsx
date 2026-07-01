import { LayoutGrid, Columns2, List, CalendarClock } from 'lucide-react';

const LAYOUTS = [
  { id: 'cards',    label: 'Cards',    icon: LayoutGrid },
  { id: 'kanban',   label: 'Board',    icon: Columns2 },
  { id: 'list',     label: 'List',     icon: List },
  { id: 'timeline', label: 'Timeline', icon: CalendarClock },
];

/**
 * Segmented control for switching between task views.
 * Keyboard accessible — active layout is indicated via aria-pressed.
 */
const LayoutSwitcher = ({ layout, onLayoutChange }) => {
  return (
    <div
      role="group"
      aria-label="Task view layout"
      className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1 gap-0.5 flex-shrink-0"
    >
      {LAYOUTS.map(({ id, label, icon: Icon }) => {
        const isActive = layout === id;
        return (
          <button
            key={id}
            onClick={() => onLayoutChange(id)}
            aria-label={`${label} view`}
            aria-pressed={isActive}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-blue-600
              ${isActive
                ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200 dark:border-slate-600 scale-[0.98]'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white/60 dark:hover:bg-slate-700/50'
              }`}
          >
            <Icon size={14} />
            <span className="hidden sm:inline">{label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default LayoutSwitcher;
