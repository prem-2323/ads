import React, { useState } from 'react';
import { Percent, RotateCcw, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';
import { getToolBySlug } from '../data/tools';

export const PercentageCalculator: React.FC = () => {
  const tool = getToolBySlug('percentage-calculator')!;

  const [obtainedMarks, setObtainedMarks] = useState<string>('450');
  const [totalMarks, setTotalMarks] = useState<string>('500');
  const [result, setResult] = useState<{
    percentage: number;
    fraction: string;
    difference: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);

    const obtained = parseFloat(obtainedMarks);
    const total = parseFloat(totalMarks);

    if (isNaN(obtained) || isNaN(total)) {
      setError('Please enter valid numeric values for both Obtained and Total marks.');
      return;
    }

    if (total <= 0) {
      setError('Total Marks must be a positive number greater than zero.');
      return;
    }

    if (obtained < 0) {
      setError('Obtained Marks cannot be negative.');
      return;
    }

    const calculatedPct = (obtained / total) * 100;
    setResult({
      percentage: calculatedPct,
      fraction: `${obtained} / ${total}`,
      difference: total - obtained,
    });
  };

  const handleReset = () => {
    setObtainedMarks('');
    setTotalMarks('');
    setResult(null);
    setError(null);
  };

  return (
    <ToolLayout tool={tool}>
      <form onSubmit={handleCalculate} className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Mark &amp; Score Percentage
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Enter your obtained marks and the maximum possible score
            </p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        </div>

        {error && (
          <div className="p-3 text-xs rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50" role="alert">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="obtainedMarks" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Obtained Marks / Score
            </label>
            <input
              id="obtainedMarks"
              type="number"
              step="any"
              placeholder="e.g. 450"
              value={obtainedMarks}
              onChange={e => {
                setObtainedMarks(e.target.value);
                setError(null);
              }}
              className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label htmlFor="totalMarks" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Total Maximum Marks
            </label>
            <input
              id="totalMarks"
              type="number"
              step="any"
              placeholder="e.g. 500"
              value={totalMarks}
              onChange={e => {
                setTotalMarks(e.target.value);
                setError(null);
              }}
              className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              required
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm hover:shadow transition-all inline-flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <Percent className="h-4 w-4" />
            <span>Calculate Percentage</span>
          </button>
        </div>

        {result && (
          <div className="mt-8 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 p-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-800 dark:text-blue-300">
                  Calculated Percentage
                </span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-4xl font-black text-blue-600 dark:text-blue-400">
                    {result.percentage.toFixed(2)}%
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  Ratio: <strong className="text-slate-900 dark:text-white">{result.fraction}</strong>
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-blue-100 dark:border-blue-900/50 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">Marks Lost / Remainder</span>
                <span className="font-semibold text-slate-900 dark:text-white text-sm">
                  {result.difference >= 0 ? result.difference.toFixed(1) : 'Exceeded Maximum'}
                </span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">Decimal Multiplier</span>
                <span className="font-semibold text-slate-900 dark:text-white text-sm">
                  {(result.percentage / 100).toFixed(4)}
                </span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">Grade Classification</span>
                <span className="font-semibold text-slate-900 dark:text-white text-sm">
                  {result.percentage >= 90
                    ? 'A+ (Distinction)'
                    : result.percentage >= 75
                    ? 'A (First Class)'
                    : result.percentage >= 60
                    ? 'B (Second Class)'
                    : result.percentage >= 40
                    ? 'Pass'
                    : 'Fail'}
                </span>
              </div>
            </div>
          </div>
        )}
      </form>
    </ToolLayout>
  );
};
