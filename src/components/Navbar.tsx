import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Laptop, Wrench, ChevronDown } from 'lucide-react';
import { useTheme, ThemeMode } from '../context/ThemeContext';
import { SearchBar } from './SearchBar';
import { BrandLogo } from './BrandLogo';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const { themeMode, theme, setThemeMode, toggleTheme } = useTheme();
  const location = useLocation();
  const themeDropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Tools', path: '/tools' },
    { name: 'Blog', path: '/blog' },
    { name: 'About', path: '/about' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(e.target as Node)) {
        setThemeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-md transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="flex items-center gap-2 font-bold tracking-tight text-slate-900 dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
            aria-label="MasterTools Home"
          >
            <BrandLogo className="h-8 w-8" size={32} />
            <span className="text-lg font-black tracking-tight uppercase">
              Master<span className="text-blue-600 dark:text-blue-400">Tools</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 text-sm font-medium transition-colors rounded-md ${
                    active
                      ? 'text-blue-600 dark:text-blue-400 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Desktop Search & Dark mode toggle */}
        <div className="hidden sm:flex items-center gap-3 flex-1 max-w-xs md:max-w-sm ml-auto">
          <SearchBar placeholder="Search tools..." />

          {/* Theme Dropdown (Light / Dark / System) */}
          <div ref={themeDropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setThemeDropdownOpen(prev => !prev)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 flex items-center gap-1"
              aria-label={`Current theme mode: ${themeMode}. Click to change.`}
              aria-expanded={themeDropdownOpen}
            >
              {themeMode === 'system' ? (
                <Laptop className="h-4 w-4" />
              ) : theme === 'dark' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
              <ChevronDown className="h-3 w-3 opacity-60" />
            </button>

            {themeDropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg py-1 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
                <button
                  type="button"
                  onClick={() => {
                    setThemeMode('light');
                    setThemeDropdownOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors ${
                    themeMode === 'light'
                      ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50/70 dark:bg-blue-950/50'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <Sun className="h-3.5 w-3.5 text-amber-500" />
                  <span>Light</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setThemeMode('dark');
                    setThemeDropdownOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors ${
                    themeMode === 'dark'
                      ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50/70 dark:bg-blue-950/50'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <Moon className="h-3.5 w-3.5 text-blue-400" />
                  <span>Dark</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setThemeMode('system');
                    setThemeDropdownOpen(false);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors ${
                    themeMode === 'system'
                      ? 'text-blue-600 dark:text-blue-400 font-semibold bg-blue-50/70 dark:bg-blue-950/50'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <Laptop className="h-3.5 w-3.5 text-slate-400" />
                  <span>System</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="flex sm:hidden items-center gap-1.5">
          <button
            type="button"
            onClick={() => setMobileSearchOpen(prev => !prev)}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle search input"
          >
            <Wrench className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label={`Current theme: ${themeMode}. Tap to cycle.`}
          >
            {themeMode === 'system' ? (
              <Laptop className="h-4 w-4" />
            ) : theme === 'dark' ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="p-2 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar toggle drawer */}
      {mobileSearchOpen && (
        <div className="sm:hidden px-4 py-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
          <SearchBar
            autoFocus
            placeholder="Search tools..."
            onSelect={() => setMobileSearchOpen(false)}
          />
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <SearchBar
              placeholder="Search tools..."
              onSelect={() => setMobileMenuOpen(false)}
            />
          </div>
          <nav className="flex flex-col space-y-1 pt-2">
            {navLinks.map(link => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    active
                      ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 font-semibold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-850'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-850"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
