import { useState, useEffect } from 'react';

const STORAGE_KEY = 'taskflow-layout';

/**
 * Manages the active layout, persisting to localStorage.
 * Defaults to 'cards' if no saved preference exists.
 */
const useLayout = () => {
  const [layout, setLayout] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || 'cards';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, layout);
  }, [layout]);

  return { layout, setLayout };
};

export default useLayout;
