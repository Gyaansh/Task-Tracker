const StatsCard = ({ label, count, icon: Icon, colorClass, bgClass }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700
      p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-all duration-200">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${bgClass}`}>
        <Icon size={20} className={colorClass} />
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-800 dark:text-white">{count}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{label}</p>
      </div>
    </div>
  );
};

export default StatsCard;
