import React from 'react';
import type { PresetTime } from '../types/timer';

interface PresetButtonProps {
  preset: PresetTime;
  onClick: (seconds: number) => void;
  isDisabled: boolean;
  isActive: boolean;
}

export const PresetButton: React.FC<PresetButtonProps> = ({ 
  preset, 
  onClick, 
  isDisabled,
  isActive
}) => {
  return (
    <button
      onClick={() => onClick(preset.seconds)}
      disabled={isDisabled}
      className={`
        px-4 py-2 rounded-lg text-sm font-medium transition-all
        transform hover:scale-105 active:scale-95
        ${isDisabled 
          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
          : isActive
            ? 'bg-purple-500 text-white shadow-lg'
            : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
        }
      `}
    >
      {preset.label}
    </button>
  );
};