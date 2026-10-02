import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // In production, log silently to internal monitoring or console without surfacing raw stack traces to users
    console.error('MasterTools ErrorBoundary caught an exception:', error, errorInfo);
  }

  private handleReload = () => {
    this.setState({ hasError: false });
    window.location.reload();
  };

  private handleReset = () => {
    this.setState({ hasError: false });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 mx-auto shadow-sm">
            <AlertTriangle className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Something Went Wrong
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              An unexpected error occurred while rendering this page. You can reload the application or return to the homepage.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={this.handleReset}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors inline-flex items-center gap-1.5 shadow-xs"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Try Again</span>
            </button>
            <a
              href="/"
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors inline-flex items-center gap-1.5"
            >
              <Home className="h-4 w-4" />
              <span>Return to Homepage</span>
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
