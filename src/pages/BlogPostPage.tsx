import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight, BookOpen, Calendar, Clock, Calculator, User, RefreshCw } from 'lucide-react';
import { getBlogPostBySlug, getRelatedArticles } from '../data/blogPosts';
import { Breadcrumb } from '../components/Breadcrumb';
import { AdSlot } from '../components/AdSlot';
import { SEO } from '../components/SEO';
import { FAQ } from '../components/FAQ';
import { RelatedTools } from '../components/RelatedTools';
import { RelatedArticles } from '../components/RelatedArticles';

export const BlogPostPage: React.FC = () => {
  const { postSlug } = useParams<{ postSlug: string }>();
  const post = getBlogPostBySlug(postSlug || '');

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const authorName = post.author || 'MasterTools';
  const relatedArticlesList = getRelatedArticles(post, 3);
  const toolIds = post.relatedToolSlugs || (post.relatedToolSlug ? [post.relatedToolSlug] : []);

  // Schema.org Article structured data
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': post.title,
    'description': post.metaDescription,
    'datePublished': post.publishDate,
    'dateModified': post.updatedDate || post.publishDate,
    'author': {
      '@type': 'Organization',
      'name': authorName,
      'url': 'https://masterperi5.me/'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'MasterTools',
      'url': 'https://masterperi5.me/'
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': `https://masterperi5.me/blog/${post.slug}`
    }
  };

  // Schema.org BreadcrumbList
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://masterperi5.me/'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Blog',
        'item': 'https://masterperi5.me/blog'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': post.title,
        'item': `https://masterperi5.me/blog/${post.slug}`
      }
    ]
  };

  // Schema.org FAQPage (only if FAQs exist and are visible)
  const faqSchema = post.faqs && post.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': post.faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  } : null;

  const combinedSchemas = faqSchema ? [articleSchema, breadcrumbSchema, faqSchema] : [articleSchema, breadcrumbSchema];

  return (
    <>
      <SEO
        title={`${post.metaTitle} | MasterTools`}
        description={post.metaDescription}
        canonical={`https://masterperi5.me/blog/${post.slug}`}
        schema={combinedSchemas}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 space-y-8">
        <Breadcrumb
          items={[
            { label: 'Blog', to: '/blog' },
            { label: post.title }
          ]}
        />

        {/* Article Header */}
        <header className="pb-6 border-b border-slate-100 dark:border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400">
            <span className="px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wider">
              {post.category}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
              <User className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              <span>{authorName}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <time dateTime={post.publishDate}>{post.publishDate}</time>
            </span>
            {post.updatedDate && (
              <>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                  <RefreshCw className="h-3 w-3" />
                  <span>Updated {post.updatedDate}</span>
                </span>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{post.readTime}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.2]">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
            {post.excerpt}
          </p>
        </header>

        {/* Top Ad Slot */}
        <AdSlot size="banner" slotId={`blog-${post.slug}-top`} />

        {/* Article Body */}
        <div className="space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          {/* Introduction */}
          <div className="space-y-4 text-slate-700 dark:text-slate-200">
            {post.introduction.map((p, idx) => (
              <p key={idx} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          {/* Quick Tool Callout CTA */}
          {post.relatedToolSlug && (
            <div className="my-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50/50 dark:from-blue-950/50 dark:to-indigo-950/30 border border-blue-100 dark:border-blue-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shrink-0 shadow-xs">
                  <Calculator className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    Need to calculate this directly?
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                    Try the free {post.relatedToolName || 'MasterTools Calculator'} — instant client-side results in your browser.
                  </div>
                </div>
              </div>
              <Link
                to={`/tools/${post.relatedToolSlug}`}
                className="inline-flex items-center justify-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
              >
                <span>Open {post.relatedToolName || 'Calculator'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}

          {/* Sections */}
          {post.sections.map((section, sIdx) => (
            <section key={sIdx} className="space-y-4 pt-3">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {section.heading}
              </h2>

              {section.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="leading-relaxed">{p}</p>
              ))}

              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <ul className="space-y-2 list-disc pl-5 text-sm sm:text-base text-slate-600 dark:text-slate-300">
                  {section.bulletPoints.map((item, bIdx) => (
                    <li key={bIdx} className="leading-normal">{item}</li>
                  ))}
                </ul>
              )}

              {section.exampleBlock && (
                <div className="rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 p-4 sm:p-5 font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed overflow-x-auto shadow-2xs">
                  {section.exampleBlock}
                </div>
              )}

              {section.callout && (
                <div className="p-4 sm:p-5 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/60 text-xs sm:text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
                  {section.callout}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Mid-Article Ad Slot */}
        <AdSlot size="banner" slotId={`blog-${post.slug}-mid`} />

        {/* Related Tools Section */}
        {toolIds.length > 0 && (
          <RelatedTools
            toolIds={toolIds}
            title="Interactive Tools Mentioned in This Guide"
            subtitle="Perform instant calculations or data transformations using these dedicated MasterTools utilities."
          />
        )}

        {/* Article Visible FAQs */}
        {post.faqs && post.faqs.length > 0 && (
          <section className="pt-6 border-t border-slate-100 dark:border-slate-800">
            <FAQ faqs={post.faqs} title="Frequently Asked Questions" />
          </section>
        )}

        {/* Related Articles Section */}
        {relatedArticlesList.length > 0 && (
          <RelatedArticles
            articles={relatedArticlesList}
            title="Related Educational Guides & Primers"
            subtitle="Explore additional related guides to deepen your knowledge."
          />
        )}

        {/* Article Footer & Return Link */}
        <footer className="pt-8 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <Link
            to="/blog"
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            ← Back to All Guides &amp; Articles
          </Link>

          {post.relatedToolSlug && (
            <Link
              to={`/tools/${post.relatedToolSlug}`}
              className="text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1"
            >
              <span>Launch {post.relatedToolName}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </footer>
      </article>
    </>
  );
};
