import React from 'react';

interface TimeDisplayProps {
  time: number;
  formatTime: (seconds: number) => string;
}

export const TimeDisplay: React.FC<TimeDisplayProps> = ({ time, formatTime }) => {
  return (
    <div className="text-8xl font-bold text-gray-800 dark:text-gray-100 font-mono tracking-wider">
      {formatTime(time)}
    </div>
  );
};