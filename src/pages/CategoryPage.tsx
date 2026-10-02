import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight, Layers, Sparkles } from 'lucide-react';
import { CATEGORIES, getToolsByCategory, CategoryItem } from '../data/tools';
import { ToolCard } from '../components/ToolCard';
import { ToolIcon } from '../components/ToolIcon';
import { Breadcrumb } from '../components/Breadcrumb';
import { AdSlot } from '../components/AdSlot';
import { SEO } from '../components/SEO';

export const CategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();

  // Find category definition
  const currentCategory = CATEGORIES.find(
    c => c.slug.toLowerCase() === (categorySlug || '').toLowerCase()
  );

  if (!currentCategory || currentCategory.id === 'All') {
    // If not found, redirect to /tools
    return <Navigate to="/tools" replace />;
  }

  // Get tools for this category
  const tools = getToolsByCategory(currentCategory.id);

  // Other categories for "Related Categories" section
  const relatedCategories = CATEGORIES.filter(
    c => c.id !== 'All' && c.id !== currentCategory.id
  );

  const categorySchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': `${currentCategory.name} – MasterTools`,
    'description': currentCategory.description,
    'url': `https://masterperi5.me/categories/${currentCategory.slug}`,
  };

  return (
    <>
      <SEO
        title={`${currentCategory.name} – Free Online Tools & Calculators`}
        description={currentCategory.description}
        canonical={`https://masterperi5.me/categories/${currentCategory.slug}`}
        schema={categorySchema}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 space-y-8">
        <Breadcrumb
          items={[
            { label: 'Tools', to: '/tools' },
            { label: currentCategory.name }
          ]}
        />

        {/* Category Header */}
        <div className="pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400">
              <ToolIcon name={currentCategory.iconName} className="h-6 w-6" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Category Directory
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            {currentCategory.name}
          </h1>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            {currentCategory.description}
          </p>
        </div>

        {/* Top Ad Slot */}
        <AdSlot size="banner" slotId={`category-${currentCategory.slug}-top`} />

        {/* Tools Grid */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Available Tools ({tools.length})
            </h2>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              100% Free · Client-Side
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* Mid-page Ad Slot */}
        <AdSlot size="banner" slotId={`category-${currentCategory.slug}-mid`} />

        {/* Related Categories Section */}
        <section className="pt-6 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            Explore Other Categories
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedCategories.map(cat => (
              <Link
                key={cat.id}
                to={`/categories/${cat.slug}`}
                className="group p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500/40 hover:shadow-xs transition-all flex items-start gap-3"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors shrink-0">
                  <ToolIcon name={cat.iconName} className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center justify-between">
                    <span>{cat.name}</span>
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                    {cat.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};
