import { useState, useEffect } from 'react';
import type { CustomPreset } from '../types/timer';

export function useCustomPresets() {
  const [presets, setPresets] = useState<CustomPreset[]>(() => {
    const savedPresets = localStorage.getItem('customPresets');
    return savedPresets ? JSON.parse(savedPresets) : [];
  });

  useEffect(() => {
    localStorage.setItem('customPresets', JSON.stringify(presets));
  }, [presets]);

  const addPreset = (preset: CustomPreset) => {
    setPresets(prev => [...prev, preset]);
  };

  const removePreset = (id: string) => {
    setPresets(prev => prev.filter(p => p.id !== id));
  };

  return { presets, addPreset, removePreset };
};