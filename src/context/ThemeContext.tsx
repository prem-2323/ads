import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';
export type ThemeMode = Theme;

interface ThemeContextType {
  theme: Theme;
  themeMode: Theme;
  resolved: 'light' | 'dark';
  setTheme: (t: Theme) => void;
  setThemeMode: (t: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getSystem(): 'light' | 'dark' {
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const stored = localStorage.getItem('mastertools_theme');
      if (stored === 'dark' || stored === 'light' || stored === 'system') return stored as Theme;
      return getSystem() === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  const [resolved, setResolved] = useState<'light' | 'dark'>(() =>
    theme === 'system' ? getSystem() : theme
  );

  useEffect(() => {
    const actual = theme === 'system' ? getSystem() : theme;
    setResolved(actual);
    const root = document.documentElement;
    if (actual === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    try {
      localStorage.setItem('mastertools_theme', theme);
    } catch { /* ignore */ }
  }, [theme]);

  useEffect(() => {
    if (theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => {
      setResolved(e.matches ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', e.matches);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [theme]);

  const setTheme = (t: Theme) => setThemeState(t);
  const toggleTheme = () => {
    setThemeState(prev => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'light';
      return getSystem() === 'dark' ? 'light' : 'dark';
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, themeMode: theme, resolved, setTheme, setThemeMode: setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
