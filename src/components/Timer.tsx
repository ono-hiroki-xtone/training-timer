import React, { useState, useEffect } from 'react';
import { PresetButton } from './PresetButton';
import { TimeDisplay } from './TimeDisplay';
import { Controls } from './Controls';
import { SetCounter } from './SetCounter';
import { TimerPhaseIndicator } from './TimerPhaseIndicator';
import { PhaseStatus } from './PhaseStatus';
import { CustomPresetForm } from './CustomPresetForm';
import { CustomPresetList } from './CustomPresetList';
import { useCustomPresets } from '../hooks/useCustomPresets';
import type { TimerProps, WorkoutSet, TimerState, TimerPhase, CustomPreset } from '../types/timer';

export const Timer: React.FC<TimerProps> = ({ presetTimes }) => {
  const [timerState, setTimerState] = useState<TimerState>({
    phase: 'workout',
    time: 60,
    workoutTime: 60,
    intervalTime: 30,
  });
  const [isRunning, setIsRunning] = useState(false);
  const [workoutSet, setWorkoutSet] = useState<WorkoutSet>({
    currentSet: 1,
    totalSets: 3,
    isCompleted: false,
  });
  const [showPresetForm, setShowPresetForm] = useState(false);
  const { presets, addPreset, removePreset } = useCustomPresets();

  useEffect(() => {
    let interval: number | undefined;

    if (isRunning && timerState.time > 0) {
      interval = window.setInterval(() => {
        setTimerState(prev => ({
          ...prev,
          time: prev.time - 1
        }));
      }, 1000);
    } else if (timerState.time === 0) {
      handlePhaseComplete();
    }

    return () => clearInterval(interval);
  }, [isRunning, timerState.time]);

  const handlePhaseComplete = () => {
    setIsRunning(false);
    playAlarm();

    if (timerState.phase === 'workout') {
      if (workoutSet.currentSet < workoutSet.totalSets) {
        setTimerState(prev => ({
          ...prev,
          phase: 'interval',
          time: prev.intervalTime
        }));
        setIsRunning(true);
      } else {
        setTimerState(prev => ({
          ...prev,
          phase: 'completed'
        }));
        setWorkoutSet(prev => ({
          ...prev,
          isCompleted: true
        }));
      }
    } else if (timerState.phase === 'interval') {
      setWorkoutSet(prev => ({
        ...prev,
        currentSet: prev.currentSet + 1
      }));
      setTimerState(prev => ({
        ...prev,
        phase: 'workout',
        time: prev.workoutTime
      }));
      setIsRunning(true);
    }
  };

  const toggleTimer = () => {
    if (workoutSet.isCompleted) {
      resetWorkout();
    } else {
      setIsRunning(!isRunning);
    }
  };

  const resetWorkout = () => {
    setIsRunning(false);
    setTimerState(prev => ({
      ...prev,
      phase: 'workout',
      time: prev.workoutTime
    }));
    setWorkoutSet({
      currentSet: 1,
      totalSets: workoutSet.totalSets,
      isCompleted: false,
    });
  };

  const adjustTime = (amount: number, timeType: 'workout' | 'interval') => {
    if (!isRunning) {
      setTimerState(prev => {
        const newTime = (timeType === 'workout' ? prev.workoutTime : prev.intervalTime) + amount;
        if (newTime >= 5 && newTime <= 3600) {
          const updates = {
            [timeType === 'workout' ? 'workoutTime' : 'intervalTime']: newTime,
          };
          if (prev.phase === timeType) {
            updates['time'] = newTime;
          }
          return { ...prev, ...updates };
        }
        return prev;
      });
    }
  };

  const adjustSets = (amount: number) => {
    if (!isRunning) {
      const newTotal = workoutSet.totalSets + amount;
      if (newTotal >= 1 && newTotal <= 10) {
        setWorkoutSet(prev => ({
          ...prev,
          totalSets: newTotal,
          currentSet: Math.min(prev.currentSet, newTotal),
        }));
      }
    }
  };

  const setPresetTime = (seconds: number) => {
    if (!isRunning) {
      setTimerState(prev => ({
        ...prev,
        workoutTime: seconds,
        time: seconds
      }));
    }
  };

  const loadCustomPreset = (preset: CustomPreset) => {
    if (!isRunning) {
      setTimerState(prev => ({
        ...prev,
        workoutTime: preset.workoutTime,
        intervalTime: preset.intervalTime,
        time: preset.workoutTime,
        phase: 'workout'
      }));
      setWorkoutSet({
        currentSet: 1,
        totalSets: preset.totalSets,
        isCompleted: false
      });
    }
  };

  const playAlarm = () => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audio.play().catch(error => console.log('Audio playback failed:', error));
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center space-y-8">
      <div className="flex flex-wrap justify-center gap-2 w-full">
        {presetTimes.map((preset, index) => (
          <PresetButton
            key={index}
            preset={preset}
            onClick={setPresetTime}
            isDisabled={isRunning}
            isActive={preset.seconds === timerState.workoutTime}
          />
        ))}
      </div>

      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">マイセット</h2>
          <button
            onClick={() => setShowPresetForm(!showPresetForm)}
            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md transition-colors"
          >
            {showPresetForm ? 'キャンセル' : '新規作成'}
          </button>
        </div>

        {showPresetForm && (
          <div className="mb-4 p-4 bg-white dark:bg-gray-700 rounded-lg shadow">
            <CustomPresetForm onSubmit={addPreset} onClose={() => setShowPresetForm(false)} />
          </div>
        )}

        {presets.length > 0 && (
          <div className="mb-6">
            <CustomPresetList
              presets={presets}
              onSelect={loadCustomPreset}
              onDelete={removePreset}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col items-center space-y-4">
        <TimerPhaseIndicator
          phase={timerState.phase}
          workoutTime={timerState.workoutTime}
          intervalTime={timerState.intervalTime}
          onAdjustTime={adjustTime}
          isDisabled={isRunning}
        />

        <SetCounter
          workoutSet={workoutSet}
          onAdjustSets={adjustSets}
          isDisabled={isRunning}
        />
      </div>

      <PhaseStatus phase={timerState.phase} isRunning={isRunning} />

      <TimeDisplay time={timerState.time} formatTime={formatTime} />
      
      <Controls
        isRunning={isRunning}
        onToggle={toggleTimer}
        onReset={resetWorkout}
        onAdjustTime={(amount) => adjustTime(amount, timerState.phase)}
      />

      {workoutSet.isCompleted && (
        <div className="text-green-600 dark:text-green-400 font-bold text-xl animate-bounce">
          ワークアウト完了！🎉
        </div>
      )}
    </div>
  );
};