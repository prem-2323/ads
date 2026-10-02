import React, { useState } from 'react';
import { CalendarDays, Plus, Minus, RotateCcw, Calendar, CheckCircle2, Clock } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';
import { getToolBySlug } from '../data/tools';

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function formatPrettyDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export const DateCalculator: React.FC = () => {
  const tool = getToolBySlug('date-calculator')!;
  const today = new Date();
  const todayStr = formatDate(today);

  // Tab: 'difference' or 'add-subtract'
  const [tab, setTab] = useState<'difference' | 'add-subtract'>('difference');

  // Difference inputs
  const [startDate, setStartDate] = useState<string>(todayStr);
  const [endDate, setEndDate] = useState<string>(
    formatDate(new Date(today.getFullYear(), today.getMonth() + 1, today.getDate()))
  );

  // Add / Subtract inputs
  const [baseDate, setBaseDate] = useState<string>(todayStr);
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');
  const [amount, setAmount] = useState<string>('30');
  const [unit, setUnit] = useState<'days' | 'weeks' | 'months' | 'years'>('days');

  // Difference calculation
  const diffResult = React.useMemo(() => {
    if (!startDate || !endDate) return null;
    const start = new Date(startDate + 'T00:00:00');
    const end = new Date(endDate + 'T00:00:00');

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;

    const isNegative = end < start;
    const earlier = isNegative ? end : start;
    const later = isNegative ? start : end;

    // Total milliseconds and days
    const diffMs = later.getTime() - earlier.getTime();
    const totalDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const remainingDaysAfterWeeks = totalDays % 7;

    // Count weekdays (Mon-Fri) vs weekend days
    let weekdays = 0;
    let weekendDays = 0;
    const curr = new Date(earlier);
    while (curr < later) {
      const dayOfWeek = curr.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekendDays++;
      } else {
        weekdays++;
      }
      curr.setDate(curr.getDate() + 1);
    }

    // Precise Calendar Years, Months, Days breakdown
    let years = later.getFullYear() - earlier.getFullYear();
    let months = later.getMonth() - earlier.getMonth();
    let days = later.getDate() - earlier.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(later.getFullYear(), later.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return {
      isNegative,
      totalDays,
      totalWeeks,
      remainingDaysAfterWeeks,
      weekdays,
      weekendDays,
      years,
      months,
      days,
    };
  }, [startDate, endDate]);

  // Add / Subtract calculation
  const addSubResult = React.useMemo(() => {
    if (!baseDate) return null;
    const date = new Date(baseDate + 'T00:00:00');
    if (isNaN(date.getTime())) return null;

    const count = parseInt(amount, 10);
    if (isNaN(count)) return null;

    const factor = operation === 'add' ? count : -count;
    const target = new Date(date);

    if (unit === 'days') {
      target.setDate(target.getDate() + factor);
    } else if (unit === 'weeks') {
      target.setDate(target.getDate() + factor * 7);
    } else if (unit === 'months') {
      target.setMonth(target.getMonth() + factor);
    } else if (unit === 'years') {
      target.setFullYear(target.getFullYear() + factor);
    }

    return {
      targetDate: target,
      formatted: formatDate(target),
      pretty: formatPrettyDate(target),
    };
  }, [baseDate, operation, amount, unit]);

  const handleResetDiff = () => {
    setStartDate(todayStr);
    setEndDate(formatDate(new Date(today.getFullYear(), today.getMonth() + 1, today.getDate())));
  };

  const handleResetAddSub = () => {
    setBaseDate(todayStr);
    setOperation('add');
    setAmount('30');
    setUnit('days');
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        {/* Navigation Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {tab === 'difference' ? 'Calculate Date Difference' : 'Add or Subtract Date Spans'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Accurate calendar arithmetic accounting for months, leap years, and weekdays.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setTab('difference')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                tab === 'difference'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Date Difference
            </button>
            <button
              type="button"
              onClick={() => setTab('add-subtract')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                tab === 'add-subtract'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Add / Subtract Days
            </button>
          </div>
        </div>

        {/* Tab 1: Date Difference */}
        {tab === 'difference' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800">
              <div className="space-y-1.5">
                <label htmlFor="diff-start-date" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Start Date
                </label>
                <input
                  id="diff-start-date"
                  type="date"
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="diff-end-date" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  End Date
                </label>
                <input
                  id="diff-end-date"
                  type="date"
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleResetDiff}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset Dates</span>
              </button>
            </div>

            {diffResult && (
              <div className="space-y-4">
                {/* Hero Stat */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 via-slate-50 to-slate-50 dark:from-blue-950/40 dark:via-slate-900 dark:to-slate-900 border border-blue-200/80 dark:border-blue-900/60 shadow-xs">
                  <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Total Duration Difference
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1">
                    {diffResult.totalDays} Days
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Equivalent to {diffResult.totalWeeks} weeks and {diffResult.remainingDaysAfterWeeks} days
                    {diffResult.isNegative ? ' (End Date is earlier than Start Date)' : ''}
                  </p>
                </div>

                {/* Metrics Breakdown Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      Calendar Breakdown
                    </div>
                    <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                      {diffResult.years}y {diffResult.months}m {diffResult.days}d
                    </div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                      Years, Months, Days
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      Working Days
                    </div>
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-1">
                      {diffResult.weekdays} Weekdays
                    </div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                      Mon–Fri business days
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                    <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      Weekend Days
                    </div>
                    <div className="text-lg font-bold text-slate-700 dark:text-slate-300 mt-1">
                      {diffResult.weekendDays} Weekend Days
                    </div>
                    <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                      Saturdays and Sundays
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Add or Subtract Days */}
        {tab === 'add-subtract' && (
          <div className="space-y-6">
            <div className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="base-calc-date" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Starting Date
                  </label>
                  <input
                    id="base-calc-date"
                    type="date"
                    value={baseDate}
                    onChange={e => setBaseDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Operation
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setOperation('add')}
                      className={`flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-xl border transition-colors ${
                        operation === 'add'
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Add (+)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setOperation('subtract')}
                      className={`flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-xl border transition-colors ${
                        operation === 'subtract'
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                          : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      <Minus className="h-3.5 w-3.5" />
                      <span>Subtract (−)</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1.5">
                  <label htmlFor="duration-qty" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Amount
                  </label>
                  <input
                    id="duration-qty"
                    type="number"
                    min="0"
                    value={amount}
                    onChange={e => setAmount(e.target.value)}
                    placeholder="e.g. 30"
                    className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Duration Unit
                  </label>
                  <select
                    value={unit}
                    onChange={e => setUnit(e.target.value as typeof unit)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="days">Days</option>
                    <option value="weeks">Weeks</option>
                    <option value="months">Months</option>
                    <option value="years">Years</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleResetAddSub}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset Inputs</span>
              </button>
            </div>

            {addSubResult && (
              <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 via-slate-50 to-slate-50 dark:from-blue-950/40 dark:via-slate-900 dark:to-slate-900 border border-blue-200/80 dark:border-blue-900/60 shadow-xs space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Calculated Target Date
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {addSubResult.pretty}
                </div>
                <div className="font-mono text-xs text-slate-500 dark:text-slate-400">
                  ISO Format: {addSubResult.formatted}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  );
};
