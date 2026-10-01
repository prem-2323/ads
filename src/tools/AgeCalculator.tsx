import React, { useState } from 'react';
import { Calendar, RotateCcw, Cake, Clock } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';
import { getToolBySlug } from '../data/tools';

export const AgeCalculator: React.FC = () => {
  const tool = getToolBySlug('age-calculator')!;

  const todayStr = new Date().toISOString().split('T')[0];
  const [birthDate, setBirthDate] = useState<string>('2000-01-15');
  const [asOfDate, setAsOfDate] = useState<string>(todayStr);

  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDaysLived: number;
    totalWeeksLived: number;
    totalHoursLived: number;
    nextBirthdayDays: number;
    nextBirthdayDayOfWeek: string;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);

    if (!birthDate || !asOfDate) {
      setError('Please select both a valid Date of Birth and a Reference Date.');
      return;
    }

    const birth = new Date(birthDate + 'T00:00:00');
    const target = new Date(asOfDate + 'T00:00:00');

    if (isNaN(birth.getTime()) || isNaN(target.getTime())) {
      setError('Please enter valid calendar dates.');
      return;
    }

    if (birth > target) {
      setError('Date of birth cannot be in the future relative to the reference date.');
      return;
    }

    // Precise calendar math for Years, Months, Days
    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      // Days in previous month of target
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Total days lived
    const diffTime = Math.abs(target.getTime() - birth.getTime());
    const totalDaysLived = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeksLived = Math.floor(totalDaysLived / 7);
    const totalHoursLived = totalDaysLived * 24;

    // Next birthday calculation relative to target date
    const currentYear = target.getFullYear();
    let nextBday = new Date(currentYear, birth.getMonth(), birth.getDate());
    if (nextBday < target) {
      nextBday = new Date(currentYear + 1, birth.getMonth(), birth.getDate());
    }

    const nextBdayDiff = nextBday.getTime() - target.getTime();
    const nextBirthdayDays = Math.ceil(nextBdayDiff / (1000 * 60 * 60 * 24));
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const nextBirthdayDayOfWeek = daysOfWeek[nextBday.getDay()];

    setResult({
      years,
      months,
      days,
      totalDaysLived,
      totalWeeksLived,
      totalHoursLived,
      nextBirthdayDays,
      nextBirthdayDayOfWeek,
    });
  };

  const handleReset = () => {
    setBirthDate('');
    setAsOfDate(todayStr);
    setResult(null);
    setError(null);
  };

  return (
    <ToolLayout tool={tool}>
      <form onSubmit={handleCalculate} className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Birth Details
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Accurate chronological age breakdown
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
            <label htmlFor="birthDate" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Date of Birth
            </label>
            <input
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={e => {
                setBirthDate(e.target.value);
                setError(null);
              }}
              className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              required
            />
          </div>

          <div>
            <label htmlFor="asOfDate" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Calculate Age As Of
            </label>
            <input
              id="asOfDate"
              type="date"
              value={asOfDate}
              onChange={e => {
                setAsOfDate(e.target.value);
                setError(null);
              }}
              className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              required
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm hover:shadow transition-all inline-flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <Calendar className="h-4 w-4" />
            <span>Calculate Age</span>
          </button>
        </div>

        {result && (
          <div className="mt-8 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 p-6 animate-in fade-in duration-300 space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-800 dark:text-blue-300">
                Your Exact Chronological Age
              </span>
              <div className="mt-2 grid grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900/50 text-center">
                  <div className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400">
                    {result.years}
                  </div>
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                    Years
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900/50 text-center">
                  <div className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400">
                    {result.months}
                  </div>
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                    Months
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900/50 text-center">
                  <div className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400">
                    {result.days}
                  </div>
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
                    Days
                  </div>
                </div>
              </div>
            </div>

            {/* Next Birthday & Lifetime Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-blue-100 dark:border-blue-900/50 text-xs">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900/50">
                <Cake className="h-5 w-5 text-pink-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">Next Birthday</div>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                    {result.nextBirthdayDays === 0
                      ? 'Happy Birthday today!'
                      : `${result.nextBirthdayDays} days away on a ${result.nextBirthdayDayOfWeek}.`}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900/50">
                <Clock className="h-5 w-5 text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900 dark:text-white">Total Time Lived</div>
                  <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                    {result.totalDaysLived.toLocaleString()} days ({result.totalWeeksLived.toLocaleString()} weeks)
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </ToolLayout>
  );
};
