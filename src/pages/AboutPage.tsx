import React from 'react';
import { ShieldCheck, Zap, HeartHandshake, EyeOff, CheckCircle2 } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { AdSlot } from '../components/AdSlot';
import { SEO } from '../components/SEO';

export const AboutPage: React.FC = () => {
  return (
    <>
      <SEO
        title="About MasterTools – Free, Fast & Private Online Utilities"
        description="Learn about MasterTools, our mission to deliver free, privacy-first web utilities, calculators, and developer tools without bloat or tracking."
        canonical="https://masterperi5.me/about"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 space-y-8">
        <Breadcrumb items={[{ label: 'About Us' }]} />

        {/* Header */}
        <div className="pb-6 border-b border-slate-100 dark:border-slate-800">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            About Our Mission
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white mt-1">
            What is MasterTools?
          </h1>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            MasterTools is a free collection of simple online tools designed to make everyday calculations, conversions, development tasks, and student work easier.
          </p>
        </div>

        {/* Main Content */}
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Why We Built MasterTools
            </h2>
            <p>
              The modern web is filled with utility websites overrun by misleading download buttons, aggressive full-screen popups, mandatory registration forms, and slow bloated scripts.
            </p>
            <p>
              We established MasterTools on <strong>masterperi5.me</strong> with a straightforward premise: calculating your semester CGPA, finding an attendance threshold, formatting a snippet of JSON, or checking an essay word count should take seconds, not require signing up for a newsletter or navigating a maze of deceptive banners.
            </p>
          </section>

          {/* Core Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8 not-prose">
            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="flex items-center gap-2.5 mb-2 font-bold text-slate-900 dark:text-white text-base">
                <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span>Instant Performance</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Calculations execute immediately in your browser memory. There is no server latency, database delay, or round-trip wait time.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="flex items-center gap-2.5 mb-2 font-bold text-slate-900 dark:text-white text-base">
                <EyeOff className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <span>Absolute Client Privacy</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Your grades, text, dates of birth, and JSON data are never sent to remote backends. Everything is isolated locally in your browser.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="flex items-center gap-2.5 mb-2 font-bold text-slate-900 dark:text-white text-base">
                <HeartHandshake className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <span>Always 100% Free</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Every calculator and utility is free to use without paywalls, token limits, or premium locks.
              </p>
            </div>

            <div className="p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="flex items-center gap-2.5 mb-2 font-bold text-slate-900 dark:text-white text-base">
                <ShieldCheck className="h-5 w-5 text-amber-500" />
                <span>Ethical &amp; Transparent</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                When monetization is enabled in the future, we rely strictly on standard non-intrusive display ads. No pop-ups, no fake system warnings, and no deceptive UI.
              </p>
            </div>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Accuracy &amp; Validation
            </h2>
            <p>
              Each formula and algorithm used across our utilities is grounded in verified mathematical standards and official academic conventions:
            </p>
            <ul className="space-y-2 list-disc list-inside text-sm">
              <li>College grade point formulas follow accredited 10-point cumulative grading models.</li>
              <li>Attendance threshold calculations use exact linear equations to determine precise class recovery requirements.</li>
              <li>JSON parsers leverage native ECMAScript standard JSON specifications (ECMA-404).</li>
              <li>Age and calendar calculations incorporate full leap year and Gregorian calendar adjustments.</li>
            </ul>
          </section>
        </div>

        {/* AdSlot */}
        <AdSlot size="banner" slotId="about-page-bottom" />
      </div>
    </>
  );
};
