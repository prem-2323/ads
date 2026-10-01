import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Lock, BookOpen } from 'lucide-react';
import { TOOLS, CATEGORIES } from '../data/tools';
import { ToolCard } from '../components/ToolCard';
import { CategoryCard } from '../components/CategoryCard';
import { SearchBar } from '../components/SearchBar';
import { AdSlot } from '../components/AdSlot';
import { SEO } from '../components/SEO';
import { BLOG_POSTS } from '../data/blogPosts';

export const Home: React.FC = () => {
  const popularTools = TOOLS.filter(t => t.popular);

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'MasterTools',
    'url': 'https://masterperi5.me/',
    'description': 'Free online calculators, converters, developer utilities, student tools, and productivity tools.',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': 'https://masterperi5.me/tools?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <>
      <SEO
        title="MasterTools  roopika tha mass da – Free Online Calculators, Converters & Developer Utilities"
        description="MasterTools provides free online calculators, converters, developer utilities, student tools, and productivity tools. Simple, fast, and 100% private."
        canonical="https://masterperi5.me/"
        schema={websiteSchema}
      />

      <div className="space-y-12 sm:space-y-16 pb-16">
        {/* Hero Section */}
        <section className="relative pt-12 pb-6 sm:pt-16 sm:pb-8 text-center max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 text-xs font-semibold mb-6 border border-blue-100 dark:border-blue-900/50">
            <Sparkles className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span>100% Free · No Sign-Up · Client-Side Execution</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15]">
            Free Online Tools
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Simple, fast, and useful tools for students, developers, and everyday tasks. Instant answers right in your browser.
          </p>

          {/* Prominent Search Bar */}
          <div className="mt-8 max-w-xl mx-auto">
            <SearchBar placeholder="Search for a tool (e.g. CGPA, Percentage, JSON)..." />
          </div>

          {/* Micro trust indicators */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-amber-500" />
              <span>Instant Calculations</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-emerald-500" />
              <span>Zero Data Leaves Your Device</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-500" />
              <span>No Annoying Popups</span>
            </div>
          </div>
        </section>

        {/* Ad Placement: After hero */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdSlot size="banner" slotId="home-after-hero" />
        </div>

        {/* Categories Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Explore Categories
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Find the right utility for your current task
              </p>
            </div>
            <Link
              to="/tools"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORIES.filter(c => c.id !== 'All' && c.id !== 'Converter').map(cat => {
              const count = TOOLS.filter(t => t.category === cat.id).length;
              return (
                <CategoryCard
                  key={cat.id}
                  id={cat.id}
                  name={cat.name}
                  iconName={cat.iconName}
                  count={count}
                />
              );
            })}
          </div>
        </section>

        {/* Popular Tools Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Popular Tools
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Our most frequently used utilities by students and professionals
              </p>
            </div>
            <Link
              to="/tools"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1"
            >
              <span>All 6 Tools</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* Ad Placement: Between tool categories and guides */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdSlot size="banner" slotId="home-mid-page" />
        </div>

        {/* Educational Blog / Guides Highlights */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Helpful Guides &amp; Insights
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Learn the formulas and methodologies behind our calculators
              </p>
            </div>
            <Link
              to="/blog"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1"
            >
              <span>Read Blog</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BLOG_POSTS.slice(0, 3).map(post => (
              <article
                key={post.id}
                className="flex flex-col justify-between rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs hover:border-blue-500/50 hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
                    <span>{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    <Link to={`/blog#${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <Link
                    to={`/blog#${post.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Ad Placement: Before footer */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdSlot size="banner" slotId="home-before-footer" />
        </div>
      </div>
    </>
  );
};
