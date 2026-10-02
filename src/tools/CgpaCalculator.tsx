import React, { useState } from 'react';
import { Plus, Trash2, RotateCcw, Calculator, Award } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';
import { getToolBySlug } from '../data/tools';
import { trackToolComplete } from '../analytics/gtag';

interface SubjectRow {
  id: string;
  name: string;
  credit: number;
  grade: string;
}

const GRADE_POINTS: Record<string, number> = {
  'O': 10,
  'A+': 9,
  'A': 8,
  'B+': 7,
  'B': 6,
  'C': 5,
  'U': 0,
};

const INITIAL_SUBJECTS: SubjectRow[] = [
  { id: '1', name: 'Advanced Engineering Mathematics', credit: 4, grade: 'A+' },
  { id: '2', name: 'Data Structures & Algorithms', credit: 4, grade: 'O' },
  { id: '3', name: 'Computer Architecture', credit: 3, grade: 'A' },
  { id: '4', name: 'Operating Systems Laboratory', credit: 2, grade: 'A+' },
  { id: '5', name: 'Professional Ethics', credit: 2, grade: 'B+' },
];

export const CgpaCalculator: React.FC = () => {
  const tool = getToolBySlug('cgpa-calculator')!;
  const [subjects, setSubjects] = useState<SubjectRow[]>(INITIAL_SUBJECTS);
  const [result, setResult] = useState<{
    cgpa: number;
    totalCredits: number;
    totalPoints: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const addSubject = () => {
    const newId = String(Date.now());
    setSubjects(prev => [
      ...prev,
      { id: newId, name: `Subject ${prev.length + 1}`, credit: 3, grade: 'A' }
    ]);
  };

  const removeSubject = (id: string) => {
    if (subjects.length <= 1) {
      setError('You must have at least one subject to calculate CGPA.');
      return;
    }
    setError(null);
    setSubjects(prev => prev.filter(s => s.id !== id));
  };

  const updateSubject = (id: string, field: keyof SubjectRow, value: string | number) => {
    setError(null);
    setSubjects(prev =>
      prev.map(s => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    let totalCredits = 0;
    let totalPoints = 0;

    for (const sub of subjects) {
      const creditNum = Number(sub.credit);
      if (isNaN(creditNum) || creditNum <= 0) {
        setError('Please enter a valid positive credit value for all subjects.');
        return;
      }
      const gradePoint = GRADE_POINTS[sub.grade] ?? 0;
      totalCredits += creditNum;
      totalPoints += creditNum * gradePoint;
    }

    if (totalCredits === 0) {
      setError('Total credits must be greater than zero.');
      return;
    }

    const calculatedCgpa = totalPoints / totalCredits;
    setResult({
      cgpa: calculatedCgpa,
      totalCredits,
      totalPoints
    });
    setError(null);
    trackToolComplete('CGPA Calculator', 'Student');
  };

  const handleReset = () => {
    setSubjects(INITIAL_SUBJECTS);
    setResult(null);
    setError(null);
  };

  return (
    <ToolLayout tool={tool}>
      <form onSubmit={handleCalculate} className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Course Details &amp; Grades
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Standard 10-Point university grading system
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
            <button
              type="button"
              onClick={addSubject}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 text-xs font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Subject</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 text-xs rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50" role="alert">
            {error}
          </div>
        )}

        {/* Subjects Table */}
        <div className="space-y-3">
          <div className="hidden sm:grid grid-cols-12 gap-3 px-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            <div className="col-span-6">Subject / Course Name</div>
            <div className="col-span-2">Credits</div>
            <div className="col-span-3">Grade Achieved</div>
            <div className="col-span-1 text-center">Action</div>
          </div>

          {subjects.map((sub, index) => (
            <div
              key={sub.id}
              className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 items-center transition-colors"
            >
              {/* Subject Name */}
              <div className="sm:col-span-6">
                <label className="sm:hidden block text-xs font-medium text-slate-500 mb-1">
                  Subject #{index + 1}
                </label>
                <input
                  type="text"
                  value={sub.name}
                  onChange={e => updateSubject(sub.id, 'name', e.target.value)}
                  placeholder={`Subject ${index + 1}`}
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              {/* Credits */}
              <div className="sm:col-span-2">
                <label className="sm:hidden block text-xs font-medium text-slate-500 mb-1">
                  Credits
                </label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={sub.credit}
                  onChange={e => updateSubject(sub.id, 'credit', Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              {/* Grade */}
              <div className="sm:col-span-3">
                <label className="sm:hidden block text-xs font-medium text-slate-500 mb-1">
                  Grade
                </label>
                <select
                  value={sub.grade}
                  onChange={e => updateSubject(sub.id, 'grade', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  <option value="O">O (Outstanding - 10 pts)</option>
                  <option value="A+">A+ (Excellent - 9 pts)</option>
                  <option value="A">A (Very Good - 8 pts)</option>
                  <option value="B+">B+ (Good - 7 pts)</option>
                  <option value="B">B (Above Average - 6 pts)</option>
                  <option value="C">C (Average - 5 pts)</option>
                  <option value="U">U (Re-appear - 0 pts)</option>
                </select>
              </div>

              {/* Delete Button */}
              <div className="sm:col-span-1 flex justify-end sm:justify-center">
                <button
                  type="button"
                  onClick={() => removeSubject(sub.id)}
                  disabled={subjects.length <= 1}
                  className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-400 transition-colors"
                  aria-label={`Remove ${sub.name || 'subject'}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Calculate Action */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm hover:shadow transition-all inline-flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <Calculator className="h-4 w-4" />
            <span>Calculate CGPA</span>
          </button>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {subjects.length} subjects registered
          </span>
        </div>

        {/* Result Display */}
        {result && (
          <div className="mt-8 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 p-6 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-blue-800 dark:text-blue-300">
                    Calculated Result
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">
                    Weighted Grade Point Average
                  </div>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">Your CGPA</span>
                <span className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400">
                  {result.cgpa.toFixed(2)}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400"> / 10.00</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-blue-100 dark:border-blue-900/50 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">Total Credits</span>
                <span className="font-semibold text-slate-900 dark:text-white text-sm">
                  {result.totalCredits}
                </span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">Total Grade Points</span>
                <span className="font-semibold text-slate-900 dark:text-white text-sm">
                  {result.totalPoints.toFixed(1)}
                </span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-slate-500 dark:text-slate-400 block">Academic Standing</span>
                <span className="font-semibold text-slate-900 dark:text-white text-sm">
                  {result.cgpa >= 8.5 ? 'First Class with Distinction' : result.cgpa >= 6.5 ? 'First Class' : 'Second Class'}
                </span>
              </div>
            </div>
          </div>
        )}
      </form>
    </ToolLayout>
  );
};
