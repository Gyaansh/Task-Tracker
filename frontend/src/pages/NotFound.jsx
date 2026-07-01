import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';
import Button from '../components/Button';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="text-center flex flex-col items-center gap-6">
        <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center">
          <AlertCircle size={40} className="text-blue-400" />
        </div>
        <div>
          <h1 className="text-6xl font-bold text-slate-800 mb-2">404</h1>
          <p className="text-slate-500 text-lg">Oops! Page not found.</p>
          <p className="text-slate-400 text-sm mt-1">
            The page you're looking for doesn't exist.
          </p>
        </div>
        <Link to="/">
          <Button size="lg">
            <Home size={18} />
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
