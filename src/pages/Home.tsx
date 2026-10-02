import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Lock,
  Layers,
  GraduationCap,
  Code,
  Calculator,
  CheckSquare,
  ArrowLeftRight,
  HelpCircle,
  Clock,
  Search as SearchIcon
} from 'lucide-react';
import { TOOLS, CATEGORIES, ToolItem } from '../data/tools';
import { ToolCard } from '../components/ToolCard';
import { CategoryCard } from '../components/CategoryCard';
import { SearchBar } from '../components/SearchBar';
import { AdSlot } from '../components/AdSlot';
import { SEO } from '../components/SEO';
import { FAQ } from '../components/FAQ';

export const Home: React.FC = () => {
  // Popular tools explicitly requested in Step 3:
  // CGPA Calculator, GPA Calculator, Percentage Calculator, Attendance Calculator, JSON Formatter, Word Counter
  const popularSlugs = [
    'cgpa-calculator',
    'gpa-calculator',
    'percentage-calculator',
    'attendance-calculator',
    'json-formatter',
    'word-counter',
  ];

  const popularTools = popularSlugs
    .map(slug => TOOLS.find(t => t.slug === slug))
    .filter((t): t is ToolItem => t !== undefined);

  // Recently added tools (e.g., QR Generator, Date Calculator, Unit Converter, UUID Generator, Base64, URL Encoder)
  const recentlyAddedSlugs = [
    'qr-generator',
    'date-calculator',
    'unit-converter',
    'uuid-generator',
    'base64',
    'url-encoder',
  ];

  const recentlyAddedTools = recentlyAddedSlugs
    .map(slug => TOOLS.find(t => t.slug === slug))
    .filter((t): t is ToolItem => t !== undefined);

  // Categories list (excluding 'All')
  const displayCategories = CATEGORIES.filter(c => c.id !== 'All');

  const homeFaqs = [
    {
      question: 'Are all MasterTools utilities completely free?',
      answer: 'Yes. Every tool on MasterTools is 100% free with no hidden fees, paid tiers, subscriptions, or credit card requirements.'
    },
    {
      question: 'Does MasterTools store or upload my calculations?',
      answer: 'No. All calculations, conversions, JSON formatting, and text processing run client-side directly within your web browser. No inputs or personal data are ever uploaded or saved on our servers.'
    },
    {
      question: 'Do I need to create an account or sign in to use the tools?',
      answer: 'No account, registration, or email signup is required. You can access and run any tool immediately.'
    },
    {
      question: 'Are the calculation formulas accurate and verified?',
      answer: 'Yes. All formulas (including CGPA credit weighting, attendance percentages, unit conversions, and date math) follow standard academic and scientific specifications.'
    }
  ];

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'MasterTools',
    'url': 'https://masterperi5.me/',
    'description': 'Free online tools. Simple, fast and useful tools for students, developers and everyday tasks.',
    'potentialAction': {
      '@type': 'SearchAction',
      'target': 'https://masterperi5.me/tools?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <>
      <SEO
        title="MasterTools – Free Online Tools for Students, Developers & Everyday Tasks"
        description="Free online tools for students, developers and everyday tasks. Calculate CGPA, GPA, attendance, format JSON, count words, and convert units. 100% free & client-side."
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
            Simple, fast and useful tools for students, developers and everyday tasks.
          </p>

          {/* Working Search Bar */}
          <div className="mt-8 max-w-xl mx-auto">
            <SearchBar placeholder="Search for a tool (e.g. CGPA, GPA, JSON, Attendance)..." />
          </div>

          {/* Trust Indicators */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-amber-500" />
              <span>Instant Local Calculations</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-emerald-500" />
              <span>Zero Data Leaves Your Device</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-500" />
              <span>No Registration Required</span>
            </div>
          </div>
        </section>

        {/* Ad Placement: After hero */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdSlot size="banner" slotId="home-after-hero" />
        </div>

        {/* Popular Tools Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Popular Tools
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Our most frequently used calculators and developer utilities
              </p>
            </div>
            <Link
              to="/tools"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1"
            >
              <span>View All Tools</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {popularTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Categories
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Explore tools tailored for your workflow
              </p>
            </div>
            <Link
              to="/tools"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1"
            >
              <span>All Categories</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayCategories.map(cat => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </section>

        {/* Recently Added Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Recently Added
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Newly released utilities and converters
              </p>
            </div>
            <Link
              to="/tools"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1"
            >
              <span>Browse All</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {recentlyAddedTools.map(tool => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>

        {/* Ad Placement: Mid-page */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdSlot size="banner" slotId="home-mid-page" />
        </div>

        {/* Why MasterTools Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Why Choose MasterTools?
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              Designed as the antidote to slow, bloated, ad-cluttered utility websites.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Instant Execution
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Calculations execute immediately in your browser memory with zero network delay or server latency.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400">
                <Lock className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                100% Private &amp; Secure
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Your grades, JSON strings, documents, and dates never leave your computer. Everything is processed offline in your browser.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 dark:bg-amber-950/70 text-amber-600 dark:text-amber-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No Sign-Up or Paywalls
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                No account registration, no credit cards, and no annoying email forms. Open any tool and use it instantly.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-10 rounded-2xl bg-slate-100/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-8">
            <div className="text-center max-w-xl mx-auto">
              <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                How It Works
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Three effortless steps to get work done faster.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center space-y-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-black shadow-xs">
                  1
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Select Your Tool
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Choose from our directory of calculators, converters, and student utilities or use instant search.
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-black shadow-xs">
                  2
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Enter Your Values
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Input course marks, JSON code, attendance stats, or text. Our forms validate your inputs in real time.
                </p>
              </div>

              <div className="flex flex-col items-center text-center space-y-2.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white text-sm font-black shadow-xs">
                  3
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Get Instant Results
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Receive verified calculations, step-by-step mathematical explanations, and copy results with one click.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FAQ faqs={homeFaqs} title="Frequently Asked Questions" />
        </section>

        {/* Ad Placement: Before Footer */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AdSlot size="banner" slotId="home-before-footer" />
        </div>
      </div>
    </>
  );
};
