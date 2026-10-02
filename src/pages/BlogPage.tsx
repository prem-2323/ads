import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, Calendar, Calculator, Sparkles } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogPosts';
import { Breadcrumb } from '../components/Breadcrumb';
import { AdSlot } from '../components/AdSlot';
import { SEO } from '../components/SEO';

export const BlogPage: React.FC = () => {
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
        description="Comprehensive guides on calculating CGPA, managing attendance percentages, formatting JSON payloads, and student productivity techniques."
        canonical="https://masterperi5.me/blog"
        schema={blogListSchema}
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
            Guides &amp; Articles
          </h1>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            In-depth guides on calculation methodologies, academic grading scales, developer standards, and conversion formulas.
          </p>
        </div>

        {/* Top Ad Slot */}
        <AdSlot size="banner" slotId="blog-page-top" />

        {/* Articles Grid / List */}
        <div className="space-y-6">
          {BLOG_POSTS.map(post => (
            <article
              key={post.id}
              className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 shadow-xs hover:border-blue-500/40 hover:shadow-sm transition-all"
            >
              {/* Meta details */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-3">
                <span className="font-semibold text-blue-600 dark:text-blue-400">
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

              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
                <Link
                  to={`/blog/${post.slug}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {post.title}
                </Link>
              </h2>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-5">
                {post.excerpt}
              </p>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  <span>Read Full Guide</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                {post.relatedToolSlug && (
                  <Link
                    to={`/tools/${post.relatedToolSlug}`}
                    className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <span>Use {post.relatedToolName}</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Ad Slot */}
        <AdSlot size="banner" slotId="blog-page-bottom" />
      </div>
    </>
  );
};
