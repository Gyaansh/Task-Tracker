import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

const App = () => {
  // Lift modal open state so Navbar's Add Task button can trigger it
  const [taskModalOpen, setTaskModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navbar onAddTask={() => setTaskModalOpen(true)} />

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
          },
        }}
      />
    </div>
  );
};

export default App;
