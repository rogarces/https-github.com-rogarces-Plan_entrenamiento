
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 my-10">
      <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      <p className="text-lg font-semibold text-slate-600 dark:text-slate-300">
        Creando tu plan de entrenamiento...
      </p>
    </div>
  );
};

export default LoadingSpinner;
