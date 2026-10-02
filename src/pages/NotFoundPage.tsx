import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowRight, HelpCircle } from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { SEO } from '../components/SEO';
import { TOOLS } from '../data/tools';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Page not found. – MasterTools"
        description="The page you are looking for does not exist or has been moved. Explore our directory of free online calculators and tools."
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 mb-6">
          <HelpCircle className="h-8 w-8" />
        </div>

        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          Page not found.
        </h1>

        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
          The tool or page you requested does not exist or may have been relocated.
        </p>

        {/* Quick Search */}
        <div className="mt-8 max-w-md mx-auto text-left">
          <SearchBar placeholder="Search tools (e.g. CGPA, GPA, JSON)..." />
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <Home className="h-4 w-4" />
            <span>Back Home</span>
          </Link>
          <Link
            to="/tools"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-semibold transition-colors"
          >
            <span>Browse Tools</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Popular Tools quick links */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 dark:border-slate-800">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 block mb-3">
            Popular Tools
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {TOOLS.slice(0, 6).map(tool => (
              <Link
                key={tool.id}
                to={tool.path}
                className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {tool.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
