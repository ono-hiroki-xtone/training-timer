export interface PresetTime {
  label: string;
  seconds: number;
}

export interface TimerProps {
  presetTimes: PresetTime[];
}

export interface WorkoutSet {
  currentSet: number;
  totalSets: number;
  isCompleted: boolean;
}

export type TimerPhase = 'workout' | 'interval' | 'completed';

export interface TimerState {
  phase: TimerPhase;
  time: number;
  workoutTime: number;
  intervalTime: number;
}

export interface CustomPreset {
  id: string;
  name: string;
  workoutTime: number;
  intervalTime: number;
  totalSets: number;
}

export type Theme = 'light' | 'dark';