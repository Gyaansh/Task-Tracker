import { Loader2 } from 'lucide-react';

const Loader = ({ message = 'Loading tasks...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <Loader2 size={40} className="text-blue-600 dark:text-blue-400 animate-spin" />
      <p className="text-slate-500 dark:text-slate-400 text-sm">{message}</p>
    </div>
  );
};

export default Loader;
