import React from 'react';
import { Sun, Moon } from 'lucide-react';
import type { Theme } from '../types/timer';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="テーマ切り替え"
    >
      {theme === 'light' ? (
        <Moon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
      ) : (
        <Sun className="w-6 h-6 text-gray-600 dark:text-gray-300" />
      )}
    </button>
  );
};