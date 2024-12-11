import React from 'react';
import { Timer } from './components/Timer';
import { Dumbbell } from 'lucide-react';
import { ThemeToggle } from './components/ThemeToggle';
import { useTheme } from './hooks/useTheme';
import type { PresetTime } from './types/timer';

const presetTimes: PresetTime[] = [
  { label: '30秒', seconds: 30 },
  { label: '45秒', seconds: 45 },
  { label: '1分', seconds: 60 },
  { label: '90秒', seconds: 90 },
  { label: '2分', seconds: 120 },
  { label: '3分', seconds: 180 },
];

function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-purple-900 flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>
      
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-center space-x-2 mb-8">
          <Dumbbell className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">ワークアウトタイマー</h1>
        </div>
        <Timer presetTimes={presetTimes} />
      </div>
    </div>
  );
}

export default App;