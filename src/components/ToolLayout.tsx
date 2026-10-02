import React, { useEffect } from 'react';
import { ToolItem, getRelatedTools } from '../data/tools';
import { getBlogPostsForTool } from '../data/blogPosts';
import { trackToolOpen } from '../analytics/gtag';
import { Breadcrumb } from './Breadcrumb';
import { FAQ } from './FAQ';
import { AdSlot } from './AdSlot';
import { SEO } from './SEO';
import { ToolIcon } from './ToolIcon';
import { RelatedArticles } from './RelatedArticles';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, BookOpen, HelpCircle, Calculator } from 'lucide-react';

interface ToolLayoutProps {
  tool: ToolItem;
  children: React.ReactNode;
}

export const ToolLayout: React.FC<ToolLayoutProps> = ({ tool, children }) => {
  // Get curated related tools for this specific tool
  const relatedTools = getRelatedTools(tool);
  // Get related blog posts for this specific tool
  const relatedPosts = getBlogPostsForTool(tool.id, 3);

  useEffect(() => {
    trackToolOpen(tool.name, tool.category);
  }, [tool.id, tool.name, tool.category]);

  // Schema.org Structured Data for WebApplication
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': tool.name,
    'url': `https://masterperi5.me${tool.path}`,
    'applicationCategory': 'UtilitiesApplication',
    'operatingSystem': 'All',
    'description': tool.description,
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD'
    }
  };

  return (
    <>
      <SEO
        title={tool.metaTitle}
        description={tool.metaDescription}
        canonical={`https://masterperi5.me${tool.path}`}
        schema={webAppSchema}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <Breadcrumb
          items={[
            { label: 'Tools', to: '/tools' },
            { label: tool.name }
          ]}
        />

        {/* Tool Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400">
              <ToolIcon name={tool.iconName} className="h-5 w-5" />
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <ToolIcon name={tool.categoryIconName} className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              <span>{tool.category} Tool</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            {tool.name}
          </h1>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
            {tool.description}
          </p>
        </div>

        {/* Main Grid: Interactive Tool + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Interactive Tool Area */}
          <div className="lg:col-span-8 space-y-8">
            {/* The Interactive Calculator / Tool */}
            <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm p-6 sm:p-8">
              {children}
            </div>

            {/* In-content Ad Slot below calculator */}
            <AdSlot size="banner" slotId={`tool-${tool.id}-below-calc`} />

            {/* Educational Section: What is this tool? */}
            <section className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xs">
              <div className="flex items-center gap-2.5 text-slate-900 dark:text-white mb-4">
                <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-bold tracking-tight">What is the {tool.name}?</h2>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {tool.about}
              </p>

              {/* How to use */}
              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-3">
                  How to Use This Tool
                </h3>
                <ol className="space-y-2.5 text-sm text-slate-600 dark:text-slate-300">
                  {tool.howTo.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-950/70 text-[11px] font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Formula & Method */}
              {tool.formula && (
                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white mb-2">
                    <Calculator className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <h3 className="text-base font-semibold">Calculation Formula</h3>
                  </div>
                  <div className="rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 p-3.5 font-mono text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">
                    {tool.formula}
                  </div>
                </div>
              )}

              {/* Example */}
              {tool.example && (
                <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
                    Step-by-Step Practical Example
                  </h3>
                  <div className="rounded-lg bg-slate-50/70 dark:bg-slate-950/70 border border-slate-200/60 dark:border-slate-800 p-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-mono whitespace-pre-line leading-relaxed">
                    {tool.example}
                  </div>
                </div>
              )}
            </section>

            {/* Second Ad Slot between educational sections & FAQs */}
            <AdSlot size="banner" slotId={`tool-${tool.id}-mid-content`} />

            {/* Frequently Asked Questions */}
            <FAQ faqs={tool.faqs} title={`Frequently Asked Questions about ${tool.name}`} />

            {/* Related Educational Articles */}
            {relatedPosts.length > 0 && (
              <RelatedArticles
                articles={relatedPosts}
                title={`Educational Guides & Articles for ${tool.name}`}
                subtitle="Learn more about formulas, grading scales, data structures, and practical steps."
              />
            )}
          </div>

          {/* Desktop Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Quick Benefits Card */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
              <h3 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white mb-4">
                MasterTools Guarantee
              </h3>
              <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>100% Free:</strong> No subscription, no paid tier, no credit card.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Private &amp; Secure:</strong> Calculations run client-side. Zero server logs.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Instant Results:</strong> Validated formulas updated live in real time.</span>
                </li>
              </ul>
            </div>

            {/* Sidebar Ad Placement */}
            <div className="hidden lg:block">
              <AdSlot size="rectangle" slotId={`sidebar-${tool.id}`} />
            </div>

            {/* Related Tools */}
            <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-xs">
              <h3 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white mb-4">
                Other Popular Tools
              </h3>
              <div className="space-y-3">
                {relatedTools.map(rel => (
                  <Link
                    key={rel.id}
                    to={rel.path}
                    className="group flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <ToolIcon name={rel.iconName} className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <div className="text-xs font-medium text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {rel.name}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          {rel.category}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

