
import React, { useState } from 'react';
import { FormData, ExperienceLevel, TargetDistance } from '../types';

interface RunningPlanFormProps {
  onSubmit: (formData: FormData) => void;
  isLoading: boolean;
}

const RunningPlanForm: React.FC<RunningPlanFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    age: 30,
    experience: ExperienceLevel.Principiante,
    distance: TargetDistance._21K,
    pace: '05:30',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Nombre</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Tu nombre"
          />
        </div>
        <div>
          <label htmlFor="age" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Edad</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            min="12"
            max="100"
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="experience" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Experiencia Corriendo</label>
          <select
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            {Object.values(ExperienceLevel).map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="distance" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Distancia Objetivo</label>
          <select
            id="distance"
            name="distance"
            value={formData.distance}
            onChange={handleChange}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          >
            {Object.values(TargetDistance).map(dist => (
              <option key={dist} value={dist}>{dist.replace('_', '')}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="pace" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Ritmo Objetivo (min/km)</label>
          <input
            type="text"
            id="pace"
            name="pace"
            value={formData.pace}
            onChange={handleChange}
            required
            pattern="\d{2}:\d{2}"
            placeholder="05:30"
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
      
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-400 disabled:cursor-not-allowed dark:focus:ring-offset-slate-800"
        >
          {isLoading ? 'Generando Plan...' : 'Generar Mi Plan'}
        </button>
      </div>
    </form>
  );
};

export default RunningPlanForm;
