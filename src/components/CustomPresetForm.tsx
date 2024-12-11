import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { CustomPreset } from '../types/timer';

const presetSchema = z.object({
  name: z.string().min(1, '名前を入力してください'),
  workoutTime: z.number().min(5).max(3600),
  intervalTime: z.number().min(5).max(3600),
  totalSets: z.number().min(1).max(10),
});

interface CustomPresetFormProps {
  onSubmit: (preset: CustomPreset) => void;
  onClose: () => void;
}

export const CustomPresetForm: React.FC<CustomPresetFormProps> = ({ onSubmit, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(presetSchema),
    defaultValues: {
      name: '',
      workoutTime: 60,
      intervalTime: 30,
      totalSets: 3,
    },
  });

  const onFormSubmit = (data: any) => {
    onSubmit({
      ...data,
      id: crypto.randomUUID(),
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          プリセット名
        </label>
        <input
          {...register('name')}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 dark:bg-gray-700 dark:text-white"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            ワークアウト時間
          </label>
          <input
            type="number"
            {...register('workoutTime', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            インターバル時間
          </label>
          <input
            type="number"
            {...register('intervalTime', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            セット数
          </label>
          <input
            type="number"
            {...register('totalSets', { valueAsNumber: true })}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
        >
          キャンセル
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md"
        >
          保存
        </button>
      </div>
    </form>
  );
};