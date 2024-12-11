import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import type { TimerPhase } from '../types/timer';

interface TimerPhaseIndicatorProps {
  phase: TimerPhase;
  workoutTime: number;
  intervalTime: number;
  onAdjustTime: (amount: number, type: 'workout' | 'interval') => void;
  isDisabled: boolean;
}

export const TimerPhaseIndicator: React.FC<TimerPhaseIndicatorProps> = ({
  phase,
  workoutTime,
  intervalTime,
  onAdjustTime,
  isDisabled,
}) => {
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const TimeAdjuster = ({ 
    label, 
    time, 
    type, 
    isActive 
  }: { 
    label: string; 
    time: number; 
    type: 'workout' | 'interval';
    isActive: boolean;
  }) => (
    <div className="flex flex-col items-center">
      <span className="text-sm font-medium text-gray-600 mb-1">{label}</span>
      <div className={`
        flex items-center space-x-2 p-2 rounded-lg transition-colors
        ${isActive ? 'bg-gray-100' : ''}
      `}>
        <button
          onClick={() => onAdjustTime(-5, type)}
          disabled={isDisabled}
          className="p-1 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronDown className="w-4 h-4 text-gray-600" />
        </button>
        <span className={`text-lg font-semibold ${isActive ? 'text-purple-600' : 'text-gray-600'}`}>
          {formatTime(time)}
        </span>
        <button
          onClick={() => onAdjustTime(5, type)}
          disabled={isDisabled}
          className="p-1 rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronUp className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex items-center space-x-6">
      <TimeAdjuster 
        label="ワークアウト" 
        time={workoutTime} 
        type="workout"
        isActive={phase === 'workout'}
      />
      <TimeAdjuster 
        label="インターバル" 
        time={intervalTime} 
        type="interval"
        isActive={phase === 'interval'}
      />
    </div>
  );
};