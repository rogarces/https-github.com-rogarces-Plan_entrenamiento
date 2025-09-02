
import React, { useRef } from 'react';
import { TrainingPlan, DayPlan, Session } from '../types';
import PdfIcon from './icons/PdfIcon';

// This is a workaround for using globals from CDNs in a TS module
declare const jspdf: any;
declare const html2canvas: any;

interface TrainingPlanDisplayProps {
  plan: TrainingPlan;
}

const SessionDetails: React.FC<{ session: Session }> = ({ session }) => (
    <div className="space-y-3">
        <div>
            <h4 className="font-semibold text-blue-700 dark:text-blue-400">Calentamiento</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap">{session.warmup}</p>
        </div>
        <div>
            <h4 className="font-semibold text-green-700 dark:text-green-400">Parte Principal</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap">{session.mainSet}</p>
        </div>
        <div>
            <h4 className="font-semibold text-purple-700 dark:text-purple-400">Vuelta a la Calma</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap">{session.cooldown}</p>
        </div>
    </div>
);

const TrainingPlanDisplay: React.FC<TrainingPlanDisplayProps> = ({ plan }) => {
  const planRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdf = () => {
    const input = planRef.current;
    if (!input) return;

    const { jsPDF } = jspdf;

    html2canvas(input, { scale: 2, backgroundColor: null, useCORS: true }).then((canvas: any) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / canvasHeight;
      const imgWidth = pdfWidth;
      const imgHeight = imgWidth / ratio;
      
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }
      
      pdf.save(`plan-running-${plan.runnerName.replace(/\s+/g, '-')}.pdf`);
    });
  };
  
  return (
    <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white">{plan.title}</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">Plan personalizado para: <span className="font-semibold text-blue-600 dark:text-blue-400">{plan.runnerName}</span></p>
        </div>
        <button
          onClick={handleDownloadPdf}
          className="flex items-center gap-2 py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 transition-colors"
        >
          <PdfIcon className="h-5 w-5" />
          <span>PDF</span>
        </button>
      </div>

      <div ref={planRef} className="printable-content bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg">
        {plan.weeks.map((week) => (
          <div key={week.weekNumber} className="mb-10 last:mb-0">
            <div className="flex items-center justify-between mb-4 border-b-2 border-blue-500 dark:border-blue-400 pb-2">
                <h3 className="text-2xl font-bold text-slate-700 dark:text-slate-200">Semana {week.weekNumber}</h3>
                <span className="font-semibold text-lg text-slate-600 dark:text-slate-400">Total: {week.totalKm} km</span>
            </div>
            <p className="italic text-slate-600 dark:text-slate-400 mb-4">{week.weeklySummary}</p>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <thead className="bg-slate-100 dark:bg-slate-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider w-1/5">Día</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider w-4/5">Sesión de Entrenamiento</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                        {week.days.map((dayPlan: DayPlan) => (
                            <tr key={dayPlan.day}>
                                <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900 dark:text-slate-100 align-top">{dayPlan.day}</td>
                                <td className="px-6 py-4">
                                    {typeof dayPlan.session === 'string' ? (
                                        <p className="font-medium text-slate-500 dark:text-slate-400">{dayPlan.session}</p>
                                    ) : (
                                        <>
                                            <h4 className="font-bold text-lg text-slate-800 dark:text-slate-200 mb-2">{dayPlan.session.title}</h4>
                                            <SessionDetails session={dayPlan.session} />
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {week.recoveryNotes && (
                <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/40 border-l-4 border-amber-400 dark:border-amber-500 rounded-r-lg">
                    <p className="text-sm font-medium text-amber-800 dark:text-amber-200"><strong className="font-bold">Recuperación:</strong> {week.recoveryNotes}</p>
                </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainingPlanDisplay;
