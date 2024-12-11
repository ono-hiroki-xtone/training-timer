import React from 'react';
import { Dumbbell, Timer, Pause } from 'lucide-react';
import type { TimerPhase } from '../types/timer';

interface PhaseStatusProps {
  phase: TimerPhase;
  isRunning: boolean;
}

export const PhaseStatus: React.FC<PhaseStatusProps> = ({ phase, isRunning }) => {
  if (phase === 'completed') return null;

  const isWorkout = phase === 'workout';
  
  // スタンバイ状態の場合
  if (!isRunning) {
    return (
      <div className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-600 px-4 py-2 rounded-full border-2 flex items-center space-x-2">
        <Pause className="w-5 h-5" />
        <span className="font-medium">スタンバイ</span>
      </div>
    );
  }

  // 実行中の状態
  const backgroundColor = isWorkout ? 'bg-purple-100 dark:bg-purple-900/50' : 'bg-blue-100 dark:bg-blue-900/50';
  const textColor = isWorkout ? 'text-purple-700 dark:text-purple-300' : 'text-blue-700 dark:text-blue-300';
  const borderColor = isWorkout ? 'border-purple-200 dark:border-purple-700' : 'border-blue-200 dark:border-blue-700';
  const Icon = isWorkout ? Dumbbell : Timer;
  const label = isWorkout ? 'ワークアウト中' : 'インターバル中';

  return (
    <div className={`
      ${backgroundColor} ${textColor} ${borderColor}
      px-4 py-2 rounded-full border-2
      flex items-center space-x-2
      animate-pulse
    `}>
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </div>
  );
};