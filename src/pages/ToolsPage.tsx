import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { TOOLS, CATEGORIES, ToolItem } from '../data/tools';
import { ToolCard } from '../components/ToolCard';
import { ToolIcon } from '../components/ToolIcon';
import { Breadcrumb } from '../components/Breadcrumb';
import { AdSlot } from '../components/AdSlot';
import { SEO } from '../components/SEO';

export const ToolsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialQuery = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>(initialQuery);

  // Sync category from query params if URL changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat && cat !== selectedCategory) {
      setSelectedCategory(cat);
    }
    const q = searchParams.get('q');
    if (q !== null && q !== searchQuery) {
      setSearchQuery(q);
    }
  }, [searchParams]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  // Client-side filtering
  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      const matchesCategory =
        selectedCategory === 'All' ||
        tool.category.toLowerCase() === selectedCategory.toLowerCase() ||
        (tool.categories && tool.categories.some(c => c.toLowerCase() === selectedCategory.toLowerCase()));

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q) ||
        tool.tags.some(t => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <>
      <SEO
        title="All Online Tools – MasterTools Directory"
        description="Browse all free online calculators, student tools, converters, and developer utilities on MasterTools. Completely free and secure."
        canonical="https://masterperi5.me/tools"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 space-y-8">
        <Breadcrumb items={[{ label: 'All Tools' }]} />

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              All Tools
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Browse {TOOLS.length} free browser-based tools and calculators. No installations required.
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-72 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Filter tools..."
              className="w-full pl-9 pr-4 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Category Filters (Segmented Control Buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map(cat => {
            const isSelected = selectedCategory.toLowerCase() === cat.id.toLowerCase();
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <ToolIcon name={cat.iconName} className="h-3.5 w-3.5" />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* AdSlot banner */}
        <AdSlot size="banner" slotId="tools-page-top" />

        {/* Tools Grid / Empty State */}
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center max-w-lg mx-auto">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto mb-4">
              <SlidersHorizontal className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              No tools found
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Try searching with another keyword or resetting the category filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom AdSlot */}
        <div className="pt-6">
          <AdSlot size="banner" slotId="tools-page-bottom" />
        </div>
      </div>
    </>
  );
};
