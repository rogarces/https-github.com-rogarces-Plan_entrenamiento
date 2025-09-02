
import React, { useState, useCallback } from 'react';
import { FormData, TrainingPlan } from './types';
import Header from './components/Header';
import RunningPlanForm from './components/RunningPlanForm';
import TrainingPlanDisplay from './components/TrainingPlanDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { generateTrainingPlan } from './services/geminiService';

const App: React.FC = () => {
  const [trainingPlan, setTrainingPlan] = useState<TrainingPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = useCallback(async (formData: FormData) => {
    setIsLoading(true);
    setError(null);
    setTrainingPlan(null);
    try {
      const plan = await generateTrainingPlan(formData);
      setTrainingPlan(plan);
    } catch (err) {
      console.error(err);
      setError('Hubo un error al generar el plan. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <section id="form-section" className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg mb-12 border border-slate-200 dark:border-slate-700">
            <h2 className="text-3xl font-bold text-center mb-2 text-slate-800 dark:text-white">Crea tu Plan de Running Personalizado</h2>
            <p className="text-center text-slate-600 dark:text-slate-400 mb-8">
              Completa tus datos y deja que nuestra IA diseñe el entrenamiento perfecto para ti.
            </p>
            <RunningPlanForm onSubmit={handleFormSubmit} isLoading={isLoading} />
          </section>

          {isLoading && <LoadingSpinner />}
          
          {error && (
            <div className="text-center p-4 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-lg">
              <p>{error}</p>
            </div>
          )}

          {trainingPlan && (
            <section id="plan-section">
              <TrainingPlanDisplay plan={trainingPlan} />
            </section>
          )}
        </div>
      </main>
      <footer className="text-center py-6 text-sm text-slate-500 dark:text-slate-400">
          <p>Potenciado por IA para corredores como tú.</p>
      </footer>
    </div>
  );
};

export default App;
