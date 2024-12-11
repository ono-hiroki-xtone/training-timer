import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import type { WorkoutSet } from '../types/timer';

interface SetCounterProps {
  workoutSet: WorkoutSet;
  onAdjustSets: (amount: number) => void;
  isDisabled: boolean;
}

export const SetCounter: React.FC<SetCounterProps> = ({
  workoutSet,
  onAdjustSets,
  isDisabled,
}) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="text-sm font-medium text-gray-600">セット数</div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => onAdjustSets(-1)}
          disabled={isDisabled || workoutSet.totalSets <= 1}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronDown className="w-5 h-5 text-gray-600" />
        </button>
        <div className="flex flex-col items-center min-w-[80px]">
          <div className="text-3xl font-bold text-gray-800">
            {workoutSet.currentSet} / {workoutSet.totalSets}
          </div>
          <div className="text-sm text-gray-500">
            {workoutSet.isCompleted ? '完了！' : 'セット'}
          </div>
        </div>
        <button
          onClick={() => onAdjustSets(1)}
          disabled={isDisabled || workoutSet.totalSets >= 10}
          className="p-2 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronUp className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
};