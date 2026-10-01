import React, { useState } from 'react';
import { CalendarCheck2, RotateCcw, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';
import { getToolBySlug } from '../data/tools';

export const AttendanceCalculator: React.FC = () => {
  const tool = getToolBySlug('attendance-calculator')!;

  const [conducted, setConducted] = useState<string>('40');
  const [attended, setAttended] = useState<string>('34');
  const [requiredPct, setRequiredPct] = useState<string>('75');

  const [result, setResult] = useState<{
    currentPct: number;
    targetPct: number;
    classesConducted: number;
    classesAttended: number;
    status: 'above' | 'below' | 'exact';
    classesCanMiss?: number;
    classesNeeded?: number;
    unreachable?: boolean;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);

    const c = parseInt(conducted, 10);
    const a = parseInt(attended, 10);
    const req = parseFloat(requiredPct);

    if (isNaN(c) || isNaN(a) || isNaN(req)) {
      setError('Please fill in all input fields with valid numbers.');
      return;
    }

    if (c <= 0) {
      setError('Classes conducted must be at least 1.');
      return;
    }

    if (a < 0) {
      setError('Classes attended cannot be negative.');
      return;
    }

    if (a > c) {
      setError('Classes attended cannot be greater than classes conducted.');
      return;
    }

    if (req <= 0 || req > 100) {
      setError('Required attendance percentage must be between 1% and 100%.');
      return;
    }

    const currentPct = (a / c) * 100;

    if (currentPct > req) {
      // Classes that can be safely missed
      const canMiss = Math.floor((a * 100 - req * c) / req);
      setResult({
        currentPct,
        targetPct: req,
        classesConducted: c,
        classesAttended: a,
        status: 'above',
        classesCanMiss: Math.max(0, canMiss),
      });
    } else if (currentPct < req) {
      if (req === 100) {
        setResult({
          currentPct,
          targetPct: req,
          classesConducted: c,
          classesAttended: a,
          status: 'below',
          unreachable: true,
        });
      } else {
        const needed = Math.ceil((req * c - 100 * a) / (100 - req));
        setResult({
          currentPct,
          targetPct: req,
          classesConducted: c,
          classesAttended: a,
          status: 'below',
          classesNeeded: needed,
        });
      }
    } else {
      setResult({
        currentPct,
        targetPct: req,
        classesConducted: c,
        classesAttended: a,
        status: 'exact',
        classesCanMiss: 0,
      });
    }
  };

  const handleReset = () => {
    setConducted('');
    setAttended('');
    setRequiredPct('75');
    setResult(null);
    setError(null);
  };

  return (
    <ToolLayout tool={tool}>
      <form onSubmit={handleCalculate} className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Attendance Parameters
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Track lecture counts and minimum cutoff compliance
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

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label htmlFor="conducted" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Classes Conducted
            </label>
            <input
              id="conducted"
              type="number"
              min="1"
              placeholder="e.g. 40"
              value={conducted}
              onChange={e => {
                setConducted(e.target.value);
                setError(null);
              }}
              className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label htmlFor="attended" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Classes Attended
            </label>
            <input
              id="attended"
              type="number"
              min="0"
              placeholder="e.g. 34"
              value={attended}
              onChange={e => {
                setAttended(e.target.value);
                setError(null);
              }}
              className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label htmlFor="requiredPct" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Required Attendance %
            </label>
            <input
              id="requiredPct"
              type="number"
              min="1"
              max="100"
              placeholder="e.g. 75"
              value={requiredPct}
              onChange={e => {
                setRequiredPct(e.target.value);
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
            <CalendarCheck2 className="h-4 w-4" />
            <span>Calculate Attendance</span>
          </button>
        </div>

        {result && (
          <div className="mt-8 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 p-6 animate-in fade-in duration-300 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-800 dark:text-blue-300">
                  Current Status
                </span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-4xl font-black text-blue-600 dark:text-blue-400">
                    {result.currentPct.toFixed(2)}%
                  </span>
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    ({result.classesAttended} of {result.classesConducted} classes)
                  </span>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">Target Requirement</span>
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  {result.targetPct}%
                </span>
              </div>
            </div>

            {/* Clear Explanation of Result */}
            {result.status === 'above' && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 dark:text-emerald-300 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold">
                    You can safely miss {result.classesCanMiss}{' '}
                    {result.classesCanMiss === 1 ? 'class' : 'classes'}.
                  </p>
                  <p className="text-xs mt-1 text-emerald-700 dark:text-emerald-300/80 leading-relaxed">
                    Even if you skip the next {result.classesCanMiss} upcoming lectures consecutively, your attendance will stay at or above {result.targetPct}%.
                  </p>
                </div>
              </div>
            )}

            {result.status === 'below' && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="text-sm">
                  {result.unreachable ? (
                    <p className="font-semibold">
                      Mathematically impossible to achieve 100% attendance because 1 or more classes have already been missed.
                    </p>
                  ) : (
                    <>
                      <p className="font-semibold">
                        You need to attend {result.classesNeeded} more consecutive{' '}
                        {result.classesNeeded === 1 ? 'class' : 'classes'}.
                      </p>
                      <p className="text-xs mt-1 text-amber-800 dark:text-amber-300/80 leading-relaxed">
                        To bring your overall attendance back up to the required {result.targetPct}%, you must attend the next {result.classesNeeded} classes without missing any.
                      </p>
                    </>
                  )}
                </div>
              </div>
            )}

            {result.status === 'exact' && (
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-900 dark:text-blue-200 flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold">
                    Your attendance is exactly at the required cutoff ({result.targetPct}%).
                  </p>
                  <p className="text-xs mt-1 text-blue-800 dark:text-blue-300/80">
                    Missing even one upcoming class will drop your attendance below the required threshold.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}
      </form>
    </ToolLayout>
  );
};
