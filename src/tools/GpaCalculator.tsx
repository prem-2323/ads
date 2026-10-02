import React, { useState } from 'react';
import { Plus, Trash2, RotateCcw, Calculator, Award, ArrowLeftRight } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';
import { getToolBySlug } from '../data/tools';

type Scale = '4.0' | '5.0' | '10.0';

const GRADE_SETS: Record<Scale, Record<string, number>> = {
  '4.0': {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D': 1.0, 'F': 0.0,
  },
  '5.0': {
    'A': 5.0, 'B': 4.0, 'C': 3.0, 'D': 2.0, 'E': 1.0, 'F': 0.0,
  },
  '10.0': {
    'O': 10, 'A+': 9, 'A': 8, 'B+': 7, 'B': 6, 'C': 5, 'D': 4, 'F': 0,
  },
};

const SCALE_META: Record<Scale, { label: string; pctFactor: number; pctNote: string }> = {
  '4.0': { label: '4.0 Scale (US)', pctFactor: 25, pctNote: 'Percentage ≈ GPA ÷ 4 × 100' },
  '5.0': { label: '5.0 Scale', pctFactor: 20, pctNote: 'Percentage ≈ GPA ÷ 5 × 100' },
  '10.0': { label: '10.0 Scale (Indian)', pctFactor: 10, pctNote: 'Percentage ≈ CGPA × 10 (many universities use × 9.5)' },
};

interface CourseRow {
  id: string;
  name: string;
  credit: number;
  grade: string;
}

const makeInitial = (scale: Scale): CourseRow[] => {
  const grades = GRADE_SETS[scale];
  const defaultGrade = scale === '10.0' ? 'A+' : scale === '5.0' ? 'A' : 'A-';
  const names = ['Advanced Engineering Mathematics', 'Data Structures & Algorithms', 'Computer Architecture', 'Professional Ethics'];
  return names.map((name, i) => ({
    id: String(i + 1),
    name,
    credit: i === 3 ? 2 : 4,
    grade: i === 1 ? Object.keys(grades)[0] : defaultGrade,
  }));
};

export const GpaCalculator: React.FC = () => {
  const tool = getToolBySlug('gpa-calculator')!;
  const [scale, setScale] = useState<Scale>('4.0');
  const [courses, setCourses] = useState<CourseRow[]>(() => makeInitial('4.0'));
  const [result, setResult] = useState<{
    gpa: number;
    totalCredits: number;
    totalPoints: number;
    percentage: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const gradeSet = GRADE_SETS[scale];

  const changeScale = (next: Scale) => {
    setScale(next);
    const allowed = GRADE_SETS[next];
    setCourses(prev =>
      prev.map(c => ({ ...c, grade: allowed[c.grade] !== undefined ? c.grade : Object.keys(allowed)[0] }))
    );
    setResult(null);
    setError(null);
  };

  const addCourse = () => {
    setCourses(prev => [
      ...prev,
      { id: String(Date.now()), name: `Course ${prev.length + 1}`, credit: 3, grade: Object.keys(gradeSet)[0] },
    ]);
  };

  const removeCourse = (id: string) => {
    if (courses.length <= 1) {
      setError('You must keep at least one course to calculate GPA.');
      return;
    }
    setError(null);
    setResult(null);
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  const updateCourse = (id: string, field: keyof CourseRow, value: string | number) => {
    setError(null);
    setResult(null);
    setCourses(prev => prev.map(c => (c.id === id ? { ...c, [field]: value } : c)));
  };

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    let totalCredits = 0;
    let totalPoints = 0;

    for (const course of courses) {
      const credit = Number(course.credit);
      if (isNaN(credit) || credit < 0) {
        setError('Credit hours must be zero or a positive number for every course.');
        return;
      }
      if (credit === 0) continue; // zero-credit courses do not affect GPA
      const point = gradeSet[course.grade];
      if (point === undefined) {
        setError(`"${course.grade}" is not a valid grade on the ${scale} scale.`);
        return;
      }
      totalCredits += credit;
      totalPoints += credit * point;
    }

    if (totalCredits === 0) {
      setError('Total credit hours must be greater than zero (courses with 0 credits are skipped).');
      return;
    }

    const gpa = totalPoints / totalCredits;
    setResult({
      gpa,
      totalCredits,
      totalPoints,
      percentage: Math.min(100, (gpa / Number(scale)) * 100),
    });
    setError(null);
  };

  const handleReset = () => {
    setCourses(makeInitial(scale));
    setResult(null);
    setError(null);
  };

  return (
    <ToolLayout tool={tool}>
      <form onSubmit={handleCalculate} className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Courses &amp; Grades</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Credit-weighted average for one semester or year
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
              <span>Scale</span>
              <select
                value={scale}
                onChange={e => changeScale(e.target.value as Scale)}
                className="px-2 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="4.0">{SCALE_META['4.0'].label}</option>
                <option value="5.0">{SCALE_META['5.0'].label}</option>
                <option value="10.0">{SCALE_META['10.0'].label}</option>
              </select>
            </label>
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
              onClick={addCourse}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 text-xs font-semibold hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Add Course</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 text-xs rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50" role="alert">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <div className="hidden sm:grid grid-cols-12 gap-3 px-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            <div className="col-span-6">Course Name</div>
            <div className="col-span-2">Credit Hours</div>
            <div className="col-span-3">Grade</div>
            <div className="col-span-1 text-center">Action</div>
          </div>

          {courses.map((course, index) => (
            <div
              key={course.id}
              className="grid grid-cols-1 sm:grid-cols-12 gap-3 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 items-center"
            >
              <div className="sm:col-span-6">
                <label className="sm:hidden block text-xs font-medium text-slate-500 mb-1">Course #{index + 1}</label>
                <input
                  type="text"
                  value={course.name}
                  onChange={e => updateCourse(course.id, 'name', e.target.value)}
                  placeholder={`Course ${index + 1}`}
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="sm:hidden block text-xs font-medium text-slate-500 mb-1">Credit Hours</label>
                <input
                  type="number"
                  min="0"
                  max="12"
                  step="0.5"
                  value={course.credit}
                  onChange={e => updateCourse(course.id, 'credit', Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="sm:hidden block text-xs font-medium text-slate-500 mb-1">Grade</label>
                <select
                  value={course.grade}
                  onChange={e => updateCourse(course.id, 'grade', e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  {Object.entries(gradeSet).map(([letter, point]) => (
                    <option key={letter} value={letter}>
                      {letter} ({point.toFixed(1)} pts)
                    </option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-1 flex justify-end sm:justify-center">
                <button
                  type="button"
                  onClick={() => removeCourse(course.id)}
                  disabled={courses.length <= 1}
                  className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-400 transition-colors"
                  aria-label={`Remove ${course.name || 'course'}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm hover:shadow transition-all inline-flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <Calculator className="h-4 w-4" />
            <span>Calculate GPA</span>
          </button>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {courses.length} courses · {SCALE_META[scale].label}
          </span>
        </div>

        {result && (
          <div className="mt-8 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white shadow-xs">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-blue-800 dark:text-blue-300">Calculated Result</div>
                  <div className="text-xs text-slate-600 dark:text-slate-400">Credit-weighted grade point average</div>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-slate-500 dark:text-slate-400 block">Your GPA</span>
                <span className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400">
                  {result.gpa.toFixed(2)}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400"> / {scale}.00</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-blue-100 dark:border-blue-900/50 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">Total Credits</span>
                <span className="font-semibold text-slate-900 dark:text-white text-sm">{result.totalCredits}</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">Grade Points</span>
                <span className="font-semibold text-slate-900 dark:text-white text-sm">{result.totalPoints.toFixed(1)}</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">≈ Percentage</span>
                <span className="font-semibold text-slate-900 dark:text-white text-sm">{result.percentage.toFixed(1)}%</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">Standing</span>
                <span className="font-semibold text-slate-900 dark:text-white text-sm">
                  {result.gpa / Number(scale) >= 0.9 ? 'Excellent' : result.gpa / Number(scale) >= 0.75 ? 'Very Good' : result.gpa / Number(scale) >= 0.6 ? 'Good' : result.gpa / Number(scale) >= 0.4 ? 'Average' : 'Needs Improvement'}
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
              <ArrowLeftRight className="h-3.5 w-3.5" />
              <span>{SCALE_META[scale].pctNote}</span>
            </div>
          </div>
        )}
      </form>
    </ToolLayout>
  );
};
