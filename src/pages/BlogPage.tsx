import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, Calendar, Search, Filter, Sparkles, Wrench, Layers } from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../data/blogPosts';
import { Breadcrumb } from '../components/Breadcrumb';
import { AdSlot } from '../components/AdSlot';
import { SEO } from '../components/SEO';
import { RelatedTools } from '../components/RelatedTools';

export const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    BLOG_POSTS.forEach(post => set.add(post.category));
    return ['All', ...Array.from(set)];
  }, []);

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesCategory = selectedCategory === 'All' || post.category.toLowerCase() === selectedCategory.toLowerCase();
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const inTitle = post.title.toLowerCase().includes(q);
      const inExcerpt = post.excerpt.toLowerCase().includes(q);
      const inCategory = post.category.toLowerCase().includes(q);
      const inSlug = post.slug.toLowerCase().includes(q);
      const inIntro = post.introduction.some(p => p.toLowerCase().includes(q));
      return inTitle || inExcerpt || inCategory || inSlug || inIntro;
    });
  }, [searchQuery, selectedCategory]);

  // Featured Articles
  const featuredPosts = useMemo(() => {
    const featuredSlugs = [
      'how-to-calculate-cgpa',
      'how-to-calculate-attendance',
      'what-is-json',
      'how-to-calculate-percentage',
      'how-to-calculate-age-from-date-of-birth'
    ];
    return BLOG_POSTS.filter(p => featuredSlugs.includes(p.slug));
  }, []);

  // Topic Clusters / Hubs
  const topicHubs = [
    {
      title: 'CGPA & GPA Guides',
      slugs: ['how-to-calculate-cgpa', 'cgpa-vs-gpa', 'cgpa-to-percentage', 'sgpa-vs-cgpa-difference']
    },
    {
      title: 'Attendance & Class Tracking',
      slugs: ['how-to-calculate-attendance', 'how-many-classes-can-i-miss-75-attendance', 'how-many-classes-to-attend-for-75-percent', 'attendance-percentage-changes-after-missing-class']
    },
    {
      title: 'Developer Tools & JSON Standards',
      slugs: ['what-is-json', 'how-to-format-json', 'base64-encoding-explained', 'url-encoding-explained', 'what-is-a-uuid']
    },
    {
      title: 'Calculators & Daily Utilities',
      slugs: ['how-to-calculate-percentage', 'how-to-calculate-age-from-date-of-birth', 'common-unit-conversions-explained', 'how-qr-codes-work']
    }
  ];

  const blogListSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    'name': 'MasterTools Educational Guides & Calculation Primers',
    'description': 'Comprehensive guides on calculating CGPA, attendance thresholds, formatting JSON payloads, and unit conversion formulas.',
    'url': 'https://masterperi5.me/blog',
  };

  return (
    <>
      <SEO
        title="Guides, Tutorials & Educational Articles – MasterTools Blog"
        description="Comprehensive educational guides on calculating CGPA, managing attendance percentages, formatting JSON payloads, and student productivity techniques."
        canonical="https://masterperi5.me/blog"
        schema={blogListSchema}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 space-y-8">
        <Breadcrumb items={[{ label: 'Blog & Educational Guides' }]} />

        {/* Page Header */}
        <div className="pb-6 border-b border-slate-100 dark:border-slate-800 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            <BookOpen className="h-4 w-4" />
            <span>MasterTools Knowledge Base</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Guides &amp; Educational Articles
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            In-depth guides on calculation methodologies, academic grading scales, developer standards, conversion formulas, and student productivity techniques.
          </p>
        </div>

        {/* Top Ad Slot */}
        <AdSlot size="banner" slotId="blog-page-top" />

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search articles (e.g. CGPA, JSON, attendance, UUID, percentage)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <Filter className="h-4 w-4 text-slate-400 shrink-0 hidden sm:block ml-2" />
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Guides Section (when no active search/filter) */}
        {!searchQuery && selectedCategory === 'All' && (
          <section className="space-y-4 pt-2">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <h2 className="text-xl font-bold tracking-tight">Featured Guides &amp; Recommended Primers</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {featuredPosts.slice(0, 3).map(post => (
                <div
                  key={post.id}
                  className="flex flex-col justify-between rounded-2xl border border-blue-200/80 dark:border-blue-900/60 bg-gradient-to-b from-blue-50/50 to-white dark:from-blue-950/20 dark:to-slate-900 p-6 shadow-xs hover:border-blue-500 hover:shadow-md transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 text-[10px] font-bold uppercase tracking-wider">
                        Featured Guide
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">{post.readTime}</span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug mb-2">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                  </div>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center justify-between pt-3 border-t border-slate-200/80 dark:border-slate-800 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors"
                  >
                    <span>Read Featured Guide</span>
                    <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Topic Hubs Section (when no active search/filter) */}
        {!searchQuery && selectedCategory === 'All' && (
          <section className="space-y-6 pt-4 border-t border-slate-200/80 dark:border-slate-800">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white">
              <Layers className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-bold tracking-tight">Browse Topic Hubs</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {topicHubs.map(hub => {
                const hubPosts = BLOG_POSTS.filter(p => hub.slugs.includes(p.slug));
                return (
                  <div
                    key={hub.title}
                    className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-3 shadow-2xs"
                  >
                    <h3 className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
                      {hub.title}
                    </h3>
                    <ul className="space-y-2 text-xs">
                      {hubPosts.map(p => (
                        <li key={p.id}>
                          <Link
                            to={`/blog/${p.slug}`}
                            className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center justify-between group"
                          >
                            <span className="line-clamp-1 group-hover:underline">{p.title}</span>
                            <ArrowRight className="h-3 w-3 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0 ml-2" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Articles List / Search Results */}
        <section className="space-y-6 pt-4 border-t border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              {searchQuery || selectedCategory !== 'All'
                ? `Articles (${filteredPosts.length})`
                : `All Educational Articles (${BLOG_POSTS.length})`}
            </h2>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-12 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 p-8 space-y-3">
              <BookOpen className="h-10 w-10 text-slate-400 mx-auto stroke-1" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No matching articles found
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Try clearing your search query or selecting a different category filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors mt-2"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredPosts.map(post => (
                <article
                  key={post.id}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-2xs hover:border-blue-500/40 hover:shadow-sm transition-all group"
                >
                  <div>
                    {/* Meta details */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/70 font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider text-[10px]">
                        {post.category}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <time dateTime={post.publishDate}>{post.publishDate}</time>
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </span>
                    </div>

                    <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white mb-2 leading-snug">
                      <Link
                        to={`/blog/${post.slug}`}
                        className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2"
                      >
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 text-xs">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                    >
                      <span>Read Full Guide</span>
                      <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>

                    {post.relatedToolSlug && (
                      <Link
                        to={`/tools/${post.relatedToolSlug}`}
                        className="inline-flex items-center gap-1 font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <span>Use {post.relatedToolName || 'Tool'}</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Featured Tools at Bottom of Blog */}
        <RelatedTools
          toolIds={['cgpa-calculator', 'attendance-calculator', 'percentage-calculator', 'json-formatter', 'age-calculator', 'qr-generator']}
          title="Try Popular MasterTools Online Utilities"
          subtitle="All calculations and utilities run 100% locally inside your browser with maximum speed and privacy."
        />

        {/* Bottom Ad Slot */}
        <AdSlot size="banner" slotId="blog-page-bottom" />
      </div>
    </>
  );
};
