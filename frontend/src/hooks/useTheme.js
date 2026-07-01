import { useState, useEffect } from 'react';

const STORAGE_KEY = 'taskflow-theme';

/**
 * Custom hook for managing light/dark theme.
 * - Persists preference in localStorage.
 * - Falls back to OS preference (prefers-color-scheme) on first visit.
 * - Applies/removes the `dark` class on <html> for Tailwind class strategy.
 */
const useTheme = () => {
  const getInitialTheme = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    // Fallback: OS preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return { theme, toggleTheme, isDark: theme === 'dark' };
};

export default useTheme;
