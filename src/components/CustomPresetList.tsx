import React from 'react';
import { Trash2 } from 'lucide-react';
import type { CustomPreset } from '../types/timer';

interface CustomPresetListProps {
  presets: CustomPreset[];
  onSelect: (preset: CustomPreset) => void;
  onDelete: (id: string) => void;
}

export const CustomPresetList: React.FC<CustomPresetListProps> = ({
  presets,
  onSelect,
  onDelete,
}) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-2">
      {presets.map(preset => (
        <div
          key={preset.id}
          className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow"
        >
          <button
            onClick={() => onSelect(preset)}
            className="flex-1 text-left"
          >
            <h3 className="font-medium text-gray-900 dark:text-gray-100">
              {preset.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              ワークアウト: {formatTime(preset.workoutTime)} / 
              インターバル: {formatTime(preset.intervalTime)} / 
              {preset.totalSets}セット
            </p>
          </button>
          <button
            onClick={() => onDelete(preset.id)}
            className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
};