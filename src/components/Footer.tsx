import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Sparkles } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="sm:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2">
              <BrandLogo className="h-7 w-7" size={28} />
              <span className="text-base font-black tracking-tight text-slate-900 dark:text-white uppercase">
                Master<span className="text-blue-600 dark:text-blue-400">Tools</span>
              </span>
            </Link>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Free Tools. Simple. Fast. Useful.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              MasterTools provides free online calculators, converters, developer utilities, student tools, and productivity utilities. Designed for speed, privacy, and zero bloat.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1">
              <div className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>100% Client-Side Privacy</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                <span>No Account Required</span>
              </div>
            </div>
          </div>

          {/* Popular Tools */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Popular Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/tools/cgpa-calculator" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                  CGPA Calculator
                </Link>
              </li>
              <li>
                <Link to="/tools/gpa-calculator" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                  GPA Calculator
                </Link>
              </li>
              <li>
                <Link to="/tools/percentage-calculator" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                  Percentage Calculator
                </Link>
              </li>
              <li>
                <Link to="/tools/attendance-calculator" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                  Attendance Calculator
                </Link>
              </li>
              <li>
                <Link to="/tools/json-formatter" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                  JSON Formatter
                </Link>
              </li>
              <li>
                <Link to="/tools/word-counter" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                  Word Counter
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Categories
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/categories/student" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                  Student Tools
                </Link>
              </li>
              <li>
                <Link to="/categories/developer" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                  Developer Tools
                </Link>
              </li>
              <li>
                <Link to="/categories/calculator" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                  Calculators
                </Link>
              </li>
              <li>
                <Link to="/categories/productivity" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                  Productivity
                </Link>
              </li>
              <li>
                <Link to="/categories/utility" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                  Utility
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Legal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Company &amp; Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/tools" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                  All Tools Directory
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                  Blog &amp; Guides
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© 2026 MasterTools. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 text-[11px]">
            <Sparkles className="h-3 w-3 text-amber-500" />
            <span>Built for speed, utility &amp; accuracy.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
