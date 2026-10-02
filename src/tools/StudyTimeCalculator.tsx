import React, { useState } from 'react';
import { Timer, CalendarClock, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';
import { getToolBySlug } from '../data/tools';

const todayIso = () => new Date().toISOString().slice(0, 10);
const defaultExamIso = () => {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().slice(0, 10);
};

interface Result {
  totalRequired: number;
  remaining: number;
  daysRemaining: number;
  requiredPerDay: number;
  availablePerDay: number;
  fits: boolean;
  shortfall: number;
  bufferHours: number;
  daysNeeded: number;
}

export const StudyTimeCalculator: React.FC = () => {
  const tool = getToolBySlug('study-time-calculator')!;

  const [chapters, setChapters] = useState<number>(24);
  const [hoursPerChapter, setHoursPerChapter] = useState<number>(2);
  const [hoursStudied, setHoursStudied] = useState<number>(10);
  const [examDate, setExamDate] = useState<string>(defaultExamIso());
  const [availablePerDay, setAvailablePerDay] = useState<number>(4);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const ch = Number(chapters);
    const hpc = Number(hoursPerChapter);
    const studied = Number(hoursStudied);
    const capacity = Number(availablePerDay);

    if (isNaN(ch) || ch <= 0) return setError('Enter how many chapters or topics your syllabus has.');
    if (isNaN(hpc) || hpc <= 0) return setError('Enter realistic hours needed per chapter (greater than zero).');
    if (isNaN(studied) || studied < 0) return setError('Hours already studied must be zero or more.');
    if (isNaN(capacity) || capacity <= 0) return setError('Your available hours per day must be greater than zero.');

    const exam = new Date(`${examDate}T00:00:00`);
    if (isNaN(exam.getTime())) return setError('Pick a valid exam date.');
    const today = new Date(`${todayIso()}T00:00:00`);
    const daysRemaining = Math.round((exam.getTime() - today.getTime()) / 86400000);
    if (daysRemaining < 0) return setError('The exam date is in the past. Choose an upcoming date.');

    const totalRequired = ch * hpc;
    const remaining = Math.max(0, totalRequired - studied);
    const requiredPerDay = daysRemaining === 0 ? remaining : remaining / Math.max(daysRemaining, 1);
    const fits = capacity >= requiredPerDay;
    const daysNeeded = Math.ceil(remaining / capacity);
    const bufferHours = Math.max(0, capacity * Math.max(daysRemaining, 1) - remaining);

    setResult({
      totalRequired,
      remaining,
      daysRemaining,
      requiredPerDay,
      availablePerDay: capacity,
      fits,
      shortfall: Math.max(0, remaining - capacity * daysRemaining),
      bufferHours,
      daysNeeded,
    });
    setError(null);
  };

  return (
    <ToolLayout tool={tool}>
      <form onSubmit={handleCalculate} className="space-y-6">
        <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Syllabus &amp; Time Budget</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Get an honest daily-study target before the exam, not a vague promise
          </p>
        </div>

        {error && (
          <div className="p-3 text-xs rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50" role="alert">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <label className="block">
            <span className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">Chapters / topics</span>
            <input
              type="number"
              min="1"
              value={chapters}
              onChange={e => setChapters(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </label>
          <label className="block">
            <span className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">Hours per chapter</span>
            <input
              type="number"
              min="0.5"
              step="0.5"
              value={hoursPerChapter}
              onChange={e => setHoursPerChapter(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </label>
          <label className="block">
            <span className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">Hours already studied</span>
            <input
              type="number"
              min="0"
              step="0.5"
              value={hoursStudied}
              onChange={e => setHoursStudied(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </label>
          <label className="block">
            <span className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">Exam date</span>
            <input
              type="date"
              value={examDate}
              onChange={e => setExamDate(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </label>
          <label className="block">
            <span className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1.5">Hours you can study per day</span>
            <input
              type="number"
              min="0.5"
              step="0.5"
              value={availablePerDay}
              onChange={e => setAvailablePerDay(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </label>
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm hover:shadow transition-all inline-flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <Timer className="h-4 w-4" />
              <span>Calculate Study Plan</span>
            </button>
          </div>
        </div>

        {result && (
          <div className="rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-xs ${result.fits ? 'bg-emerald-600' : 'bg-rose-600'}`}>
                  {result.fits ? <CheckCircle2 className="h-6 w-6" /> : <AlertTriangle className="h-6 w-6" />}
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-blue-800 dark:text-blue-300">Your Daily Target</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    {result.fits ? 'Your plan fits the time left' : 'Short on time — adjust the plan below'}
                  </div>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">Study required per day</span>
                <span className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400">
                  {result.requiredPerDay.toFixed(1)}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400"> hrs/day</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-blue-100 dark:border-blue-900/50 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">Total Needed</span>
                <span className="font-semibold text-slate-900 dark:text-white text-sm">{result.totalRequired.toFixed(1)} hrs</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">Remaining</span>
                <span className="font-semibold text-slate-900 dark:text-white text-sm">{result.remaining.toFixed(1)} hrs</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <CalendarClock className="h-3 w-3" /> Days Left
                </span>
                <span className="font-semibold text-slate-900 dark:text-white text-sm">{result.daysRemaining}</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">At {result.availablePerDay} hrs/day</span>
                <span className="font-semibold text-slate-900 dark:text-white text-sm">
                  {result.fits
                    ? `${result.bufferHours.toFixed(1)} hrs buffer`
                    : `${result.shortfall.toFixed(1)} hrs short`}
                </span>
              </div>
            </div>

            {!result.fits && (
              <div className="mt-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                At {result.availablePerDay} hours/day you finish in ~{result.daysNeeded} days, but only{' '}
                {result.daysRemaining} remain. Raise your daily capacity to{' '}
                {(result.remaining / Math.max(result.daysRemaining, 1)).toFixed(1)} hrs/day, start{' '}
                {Math.max(0, result.daysNeeded - result.daysRemaining)} day(s) earlier, or prioritise the
                highest-weight chapters first.
              </div>
            )}
          </div>
        )}
      </form>
    </ToolLayout>
  );
};
