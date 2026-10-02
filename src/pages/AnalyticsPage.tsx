import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  Users,
  Wrench,
  Search,
  Copy,
  Monitor,
  Smartphone,
  Tablet,
  Globe,
  TrendingUp,
  Calendar,
  Download,
  Trash2,
  ArrowLeft,
} from 'lucide-react';
import { analytics, AnalyticsSummary } from '../analytics/tracker';
import { SEO } from '../components/SEO';
import { Link } from 'react-router-dom';

export const AnalyticsPage: React.FC = () => {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);

  useEffect(() => {
    setSummary(analytics.getSummary());
  }, []);

  const handleExport = () => {
    const data = analytics.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mastertools-analytics-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all analytics data? This cannot be undone.')) {
      analytics.clearData();
      setSummary(analytics.getSummary());
    }
  };

  const topPages = summary
    ? Object.entries(summary.topPages).sort((a, b) => b[1] - a[1]).slice(0, 10)
    : [];

  const topTools = summary
    ? Object.entries(summary.topTools).sort((a, b) => b[1] - a[1]).slice(0, 10)
    : [];

  const topReferrers = summary
    ? Object.entries(summary.topReferrers).sort((a, b) => b[1] - a[1]).slice(0, 10)
    : [];

  const dailyViews = summary
    ? Object.entries(summary.dailyViews).sort((a, b) => a[0].localeCompare(b[0])).slice(-14)
    : [];

  const maxDailyViews = dailyViews.length > 0 ? Math.max(...dailyViews.map(d => d[1])) : 1;

  return (
    <>
      <SEO
        title="Analytics Dashboard – MasterTools"
        description="Privacy-first analytics dashboard for MasterTools. View page views, tool usage, and traffic sources."
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="h-7 w-7 text-blue-600" />
              Analytics Dashboard
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Privacy-first analytics. All data stored locally in your browser.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              Export JSON
            </button>
            <button
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-rose-200 dark:border-rose-900/50 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear Data
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
              <Users className="h-4 w-4" />
              <span className="text-xs font-medium">Page Views</span>
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {summary?.totalPageViews ?? 0}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
              <Wrench className="h-4 w-4" />
              <span className="text-xs font-medium">Tool Uses</span>
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {summary?.totalToolUses ?? 0}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
              <Search className="h-4 w-4" />
              <span className="text-xs font-medium">Searches</span>
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {summary?.totalSearches ?? 0}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
              <Copy className="h-4 w-4" />
              <span className="text-xs font-medium">Copies</span>
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {summary?.totalCopies ?? 0}
            </div>
          </div>
        </div>

        {/* Device Breakdown */}
        {summary && (
          <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Device Breakdown</h2>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Monitor className="h-4 w-4 text-blue-500" />
                <span className="text-xs text-slate-600 dark:text-slate-300">Desktop</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{summary.deviceBreakdown.desktop ?? 0}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tablet className="h-4 w-4 text-emerald-500" />
                <span className="text-xs text-slate-600 dark:text-slate-300">Tablet</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{summary.deviceBreakdown.tablet ?? 0}</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="h-4 w-4 text-amber-500" />
                <span className="text-xs text-slate-600 dark:text-slate-300">Mobile</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">{summary.deviceBreakdown.mobile ?? 0}</span>
              </div>
            </div>
          </div>
        )}

        {/* Daily Views Chart */}
        {dailyViews.length > 0 && (
          <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-4 w-4 text-slate-500" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Daily Page Views (Last 14 Days)</h2>
            </div>
            <div className="flex items-end gap-1 h-32">
              {dailyViews.map(([date, count]) => (
                <div key={date} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full bg-blue-500/80 rounded-t-sm min-h-[2px] transition-all"
                    style={{ height: `${(count / maxDailyViews) * 100}%` }}
                    title={`${date}: ${count} views`}
                  />
                  <span className="text-[9px] text-slate-400 rotate-[-45deg] origin-top-left whitespace-nowrap">
                    {date.slice(5)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Pages */}
        {topPages.length > 0 && (
          <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-4 w-4 text-slate-500" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Top Pages</h2>
            </div>
            <div className="space-y-2">
              {topPages.map(([page, count]) => (
                <div key={page} className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-300 font-mono truncate max-w-[70%]">{page}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Tools */}
        {topTools.length > 0 && (
          <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2 mb-4">
              <Wrench className="h-4 w-4 text-slate-500" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Most Used Tools</h2>
            </div>
            <div className="space-y-2">
              {topTools.map(([tool, count]) => (
                <div key={tool} className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-300">{tool}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Referrers */}
        {topReferrers.length > 0 && (
          <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-4 w-4 text-slate-500" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Traffic Sources</h2>
            </div>
            <div className="space-y-2">
              {topReferrers.map(([ref, count]) => (
                <div key={ref} className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-300 font-mono truncate max-w-[70%]">{ref}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {summary && summary.totalPageViews === 0 && (
          <div className="text-center py-12">
            <BarChart3 className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No data yet</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Start using the tools and your analytics data will appear here.
            </p>
          </div>
        )}

        {/* Back Link */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <Link
            to="/"
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
};
