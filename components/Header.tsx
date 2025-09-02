
import React from 'react';
import RunnerIcon from './icons/RunnerIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-slate-800 shadow-md border-b border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4 py-4 flex items-center justify-center">
        <RunnerIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        <h1 className="ml-3 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Generador de Planes de Running
        </h1>
      </div>
    </header>
  );
};

export default Header;
