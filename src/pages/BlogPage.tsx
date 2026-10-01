import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { BLOG_POSTS, BlogPost } from '../data/blogPosts';
import { Breadcrumb } from '../components/Breadcrumb';
import { AdSlot } from '../components/AdSlot';
import { SEO } from '../components/SEO';

export const BlogPage: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <>
      <SEO
        title="Educational Guides & Calculators Blog – MasterTools"
        description="Comprehensive guides on calculating CGPA, managing attendance percentages, formatting JSON payloads, and student productivity techniques."
        canonical="https://masterperi5.me/blog"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 space-y-8">
        <Breadcrumb items={[{ label: 'Blog & Educational Guides' }]} />

        {/* Page Header */}
        <div className="pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            <BookOpen className="h-4 w-4" />
            <span>MasterTools Knowledge Base</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Guides &amp; Explanations
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            In-depth explanations of calculation methodologies, formulas, developer standards, and academic best practices.
          </p>
        </div>

        {/* AdSlot banner */}
        <AdSlot size="banner" slotId="blog-page-top" />

        {/* Article Cards Listing */}
        <div className="space-y-6">
          {BLOG_POSTS.map(post => {
            const isExpanded = expandedId === post.id;
            return (
              <article
                key={post.id}
                id={post.slug}
                className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xs hover:border-blue-500/40 transition-all scroll-mt-24"
              >
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
                  <span className="font-semibold text-blue-600 dark:text-blue-400">{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{post.publishDate}</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-3">
                  {post.title}
                </h2>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                {/* Expanded Full Content */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed animate-in fade-in duration-200">
                    {post.content.map((paragraph, pIdx) => (
                      <p key={pIdx}>{paragraph}</p>
                    ))}

                    {post.relatedToolSlug && (
                      <div className="mt-6 p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="text-xs">
                          <span className="font-bold text-slate-900 dark:text-white block">
                            Want to calculate this now?
                          </span>
                          <span className="text-slate-500 dark:text-slate-400">
                            Use our free interactive tool with zero wait.
                          </span>
                        </div>
                        <Link
                          to={`/tools/${post.relatedToolSlug}`}
                          className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition-colors"
                        >
                          <span>Launch Calculator</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {/* Actions */}
                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => toggleExpand(post.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors"
                  >
                    <span>{isExpanded ? 'Collapse Article' : 'Read Full Article'}</span>
                    {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                  </button>

                  {post.relatedToolSlug && (
                    <Link
                      to={`/tools/${post.relatedToolSlug}`}
                      className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      Open Related Tool →
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* AdSlot banner */}
        <AdSlot size="banner" slotId="blog-page-bottom" />
      </div>
    </>
  );
};
