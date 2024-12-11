import React from 'react';
import { Play, Pause, RotateCcw, ChevronUp, ChevronDown } from 'lucide-react';

interface ControlsProps {
  isRunning: boolean;
  onToggle: () => void;
  onReset: () => void;
  onAdjustTime: (amount: number) => void;
}

export const Controls: React.FC<ControlsProps> = ({
  isRunning,
  onToggle,
  onReset,
  onAdjustTime,
}) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onAdjustTime(-5)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isRunning}
        >
          <ChevronDown className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
        <button
          onClick={() => onAdjustTime(5)}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isRunning}
        >
          <ChevronUp className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={onToggle}
          className={`p-4 rounded-full ${
            isRunning
              ? 'bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700'
              : 'bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700'
          } text-white transition-colors`}
        >
          {isRunning ? (
            <Pause className="w-8 h-8" />
          ) : (
            <Play className="w-8 h-8" />
          )}
        </button>
        <button
          onClick={onReset}
          disabled={isRunning}
          className="p-4 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RotateCcw className="w-8 h-8 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </div>
  );
};