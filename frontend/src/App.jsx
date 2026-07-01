import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import useTheme from './hooks/useTheme';

const App = () => {
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar
        onAddTask={() => setTaskModalOpen(true)}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              onAddTask={() => setTaskModalOpen(true)}
              taskModalOpen={taskModalOpen}
              onModalClose={() => setTaskModalOpen(false)}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            fontFamily: 'Inter, sans-serif',
            fontSize: '14px',
            borderRadius: '10px',
            background: isDark ? '#1e293b' : '#ffffff',
            color: isDark ? '#f1f5f9' : '#1e293b',
            border: `1px solid ${isDark ? '#334155' : '#e2e8f0'}`,
          },
        }}
      />
    </div>
  );
};

export default App;
