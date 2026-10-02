import React, { useState } from 'react';
import { Plus, Trash2, RotateCcw, ClipboardList, TrendingUp, CheckCircle2, Award } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';
import { getToolBySlug } from '../data/tools';

interface SubjectRow {
  id: string;
  name: string;
  internal: number | '';
  external: number | '';
  maxMarks: number | '';
}

const INITIAL_SUBJECTS: SubjectRow[] = [
  { id: '1', name: 'Mathematics', internal: 26, external: 64, maxMarks: 100 },
  { id: '2', name: 'Physics', internal: 24, external: 58, maxMarks: 100 },
  { id: '3', name: 'Computer Science', internal: 28, external: 67, maxMarks: 100 },
  { id: '4', name: 'English Literature', internal: 18, external: 42, maxMarks: 60 },
];

interface SubjectResult {
  id: string;
  name: string;
  internal: number;
  external: number;
  maxMarks: number;
  total: number;
  percentage: number;
}

interface OverallResult {
  subjects: SubjectResult[];
  overallTotal: number;
  overallMax: number;
  overallPercentage: number;
}

export const MarksCalculator: React.FC = () => {
  const tool = getToolBySlug('marks-calculator')!;
  const [subjects, setSubjects] = useState<SubjectRow[]>(INITIAL_SUBJECTS);
  const [result, setResult] = useState<OverallResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const addSubject = () => {
    setSubjects(prev => [
      ...prev,
      {
        id: String(Date.now()),
        name: `Subject ${prev.length + 1}`,
        internal: '',
        external: '',
        maxMarks: 100,
      },
    ]);
    setResult(null);
  };

  const removeSubject = (id: string) => {
    if (subjects.length <= 1) {
      setError('You must keep at least one subject to calculate marks.');
      return;
    }
    setError(null);
    setResult(null);
    setSubjects(prev => prev.filter(s => s.id !== id));
  };

  const updateSubject = (id: string, field: keyof SubjectRow, value: string | number) => {
    setError(null);
    setResult(null);
    setSubjects(prev =>
      prev.map(s => {
        if (s.id !== id) return s;
        if (field === 'name') return { ...s, name: String(value) };
        const numVal = value === '' ? '' : Number(value);
        return { ...s, [field]: numVal };
      })
    );
  };

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);

    let sumTotal = 0;
    let sumMax = 0;
    const computedSubjects: SubjectResult[] = [];

    for (let i = 0; i < subjects.length; i++) {
      const s = subjects[i];
      const subjectLabel = s.name.trim() || `Subject ${i + 1}`;

      const internalNum = s.internal === '' ? 0 : Number(s.internal);
      const externalNum = s.external === '' ? 0 : Number(s.external);
      const maxNum = s.maxMarks === '' ? 0 : Number(s.maxMarks);

      if (isNaN(internalNum) || isNaN(externalNum) || isNaN(maxNum)) {
        setError(`Please enter valid numeric marks for "${subjectLabel}".`);
        return;
      }

      if (maxNum <= 0) {
        setError(`Maximum marks for "${subjectLabel}" must be greater than zero.`);
        return;
      }

      if (internalNum < 0 || externalNum < 0) {
        setError(`Marks cannot be negative for "${subjectLabel}".`);
        return;
      }

      const subjectTotal = internalNum + externalNum;
      if (subjectTotal > maxNum) {
        setError(
          `For "${subjectLabel}", internal (${internalNum}) + external (${externalNum}) = ${subjectTotal}, which exceeds maximum marks (${maxNum}).`
        );
        return;
      }

      const pct = (subjectTotal / maxNum) * 100;
      sumTotal += subjectTotal;
      sumMax += maxNum;

      computedSubjects.push({
        id: s.id,
        name: subjectLabel,
        internal: internalNum,
        external: externalNum,
        maxMarks: maxNum,
        total: subjectTotal,
        percentage: pct,
      });
    }

    if (sumMax === 0) {
      setError('Overall maximum marks cannot be zero.');
      return;
    }

    const overallPercentage = (sumTotal / sumMax) * 100;

    setResult({
      subjects: computedSubjects,
      overallTotal: sumTotal,
      overallMax: sumMax,
      overallPercentage,
    });
  };

  const handleReset = () => {
    setSubjects(INITIAL_SUBJECTS);
    setResult(null);
    setError(null);
  };

  return (
    <ToolLayout tool={tool}>
      <form onSubmit={handleCalculate} className="space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Subject Marks Input
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Enter internal, external, and maximum marks for each subject.
            </p>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-300">
            {error}
          </div>
        )}

        {/* Subjects Table */}
        <div className="space-y-3">
          <div className="hidden sm:grid sm:grid-cols-12 gap-3 px-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <div className="sm:col-span-4">Subject Name</div>
            <div className="sm:col-span-2 text-right">Internal</div>
            <div className="sm:col-span-2 text-right">External</div>
            <div className="sm:col-span-3 text-right">Maximum Marks</div>
            <div className="sm:col-span-1 text-center">Action</div>
          </div>

          {subjects.map((sub, idx) => (
            <div
              key={sub.id}
              className="p-3 sm:p-2.5 rounded-xl bg-slate-50/70 dark:bg-slate-950/50 border border-slate-200/80 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-3 items-center"
            >
              <div className="sm:col-span-4">
                <label className="sm:hidden block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Subject Name
                </label>
                <input
                  type="text"
                  value={sub.name}
                  onChange={e => updateSubject(sub.id, 'name', e.target.value)}
                  placeholder={`Subject ${idx + 1}`}
                  className="w-full px-3 py-1.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="sm:hidden block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Internal Marks
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={sub.internal}
                  onChange={e => updateSubject(sub.id, 'internal', e.target.value)}
                  placeholder="e.g. 25"
                  className="w-full px-3 py-1.5 text-sm text-right bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="sm:hidden block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                  External Marks
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={sub.external}
                  onChange={e => updateSubject(sub.id, 'external', e.target.value)}
                  placeholder="e.g. 65"
                  className="w-full px-3 py-1.5 text-sm text-right bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="sm:hidden block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Maximum Marks
                </label>
                <input
                  type="number"
                  min="1"
                  step="any"
                  value={sub.maxMarks}
                  onChange={e => updateSubject(sub.id, 'maxMarks', e.target.value)}
                  placeholder="e.g. 100"
                  className="w-full px-3 py-1.5 text-sm text-right bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="sm:col-span-1 flex justify-end sm:justify-center">
                <button
                  type="button"
                  onClick={() => removeSubject(sub.id)}
                  disabled={subjects.length <= 1}
                  className="p-1.5 text-slate-400 hover:text-red-600 dark:hover:text-red-400 disabled:opacity-30 disabled:pointer-events-none rounded-lg transition-colors"
                  aria-label={`Remove ${sub.name || 'subject'}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={addSubject}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/70 hover:bg-blue-100 dark:hover:bg-blue-900/60 rounded-xl transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Subject</span>
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors"
          >
            <ClipboardList className="h-4 w-4" />
            <span>Calculate Marks</span>
          </button>
        </div>

        {/* Results Display */}
        {result && (
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-6">
            {/* Overall summary card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 via-slate-50 to-slate-50 dark:from-blue-950/40 dark:via-slate-900 dark:to-slate-900 border border-blue-200/80 dark:border-blue-900/60 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
                <Award className="h-4 w-4" />
                <span>Overall Academic Result</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60">
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Aggregate Percentage
                  </div>
                  <div className="text-3xl font-black text-blue-600 dark:text-blue-400 mt-1">
                    {result.overallPercentage.toFixed(2)}%
                  </div>
                  <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                    {result.overallPercentage >= 60 ? 'First Class Division' : result.overallPercentage >= 40 ? 'Pass Division' : 'Needs Improvement'}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60">
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Overall Total Marks
                  </div>
                  <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                    {result.overallTotal}
                  </div>
                  <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                    Out of {result.overallMax} maximum marks
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/60">
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Subjects Evaluated
                  </div>
                  <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">
                    {result.subjects.length}
                  </div>
                  <div className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
                    Average: {(result.overallTotal / result.subjects.length).toFixed(1)} per subject
                  </div>
                </div>
              </div>
            </div>

            {/* Subject-wise breakdown table */}
            <div className="rounded-xl border border-slate-200/80 dark:border-slate-800 overflow-hidden">
              <div className="px-4 py-3 bg-slate-50 dark:bg-slate-950 border-b border-slate-200/80 dark:border-slate-800 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                Subject-by-Subject Breakdown
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800/80 bg-white dark:bg-slate-900">
                {result.subjects.map(s => (
                  <div key={s.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {s.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Internal: <span className="font-medium text-slate-700 dark:text-slate-300">{s.internal}</span> · External: <span className="font-medium text-slate-700 dark:text-slate-300">{s.external}</span> (Max: {s.maxMarks})
                      </div>
                    </div>
                    <div className="flex items-center gap-4 self-end sm:self-center">
                      <div className="text-right">
                        <div className="font-bold text-slate-900 dark:text-white">
                          {s.total} / {s.maxMarks}
                        </div>
                        <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                          {s.percentage.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </form>
    </ToolLayout>
  );
};
