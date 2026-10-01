import React from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { SEO } from '../components/SEO';
import { ShieldAlert } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Terms of Service – MasterTools"
        description="Review the terms and conditions governing your use of MasterTools calculators, converters, and online utilities."
        canonical="https://masterperi5.me/terms"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 space-y-8">
        <Breadcrumb items={[{ label: 'Terms of Service' }]} />

        {/* Header */}
        <div className="pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            <ShieldAlert className="h-4 w-4" />
            <span>Usage Guidelines</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Terms of Service
          </h1>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Last Updated: October 1, 2026 · Effective Date: October 1, 2026
          </p>
        </div>

        {/* Terms Body */}
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Acceptance of Terms</h2>
            <p>
              By accessing and using <strong>MasterTools</strong> (located at <strong>masterperi5.me</strong>), you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service. If you disagree with any portion of these terms, please discontinue use of the platform immediately.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. Permitted Website Usage</h2>
            <p>
              MasterTools grants you a revocable, non-exclusive, non-transferable, and royalty-free license to use our web-based tools and calculators for personal, educational, and internal business calculations. You agree not to attempt to disrupt, reverse engineer, DDoS, or systematically scrape platform assets.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">3. Tool Accuracy &amp; Calculations Disclaimer</h2>
            <p>
              While we make every reasonable effort to test, audit, and verify the accuracy of all computational algorithms (including CGPA averages, percentage ratios, attendance forecasts, and age metrics), all tools are provided strictly on an <strong>&ldquo;as-is&rdquo; and &ldquo;as-available&rdquo;</strong> basis.
            </p>
            <p>
              Academic institutions, testing authorities, and universities may utilize idiosyncratic rounding schemes, specific grade-point weighting rules, or proprietary attendance policies that differ from standard published models. Users should always cross-reference critical calculations with official institutional guidelines.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">4. No Professional Advice</h2>
            <p>
              The outputs provided by MasterTools do not constitute accredited academic, legal, financial, or tax advice. No fiduciary relationship is created between MasterTools and the visitor.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">5. User Responsibilities &amp; Client Privacy</h2>
            <p>
              Because MasterTools performs calculations client-side in your local browser, you maintain total control and responsibility over the data, strings, and inputs you paste into the tools (such as JSON payloads). You are advised to never paste production credentials or secret API keys into any web interface regardless of its security profile.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">6. Intellectual Property Rights</h2>
            <p>
              The MasterTools name, branding, visual design, custom scripts, layout, and original explanatory guides are protected by international copyright and intellectual property laws. You may not republish, mirror, or repackage substantial portions of the website without written consent.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">7. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, MasterTools, its operators, and contributors shall not be liable for any direct, indirect, incidental, consequential, or punitive damages resulting from the use of, or inability to use, our services, or any discrepancies in calculations.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">8. Changes to These Terms</h2>
            <p>
              We reserve the right to revise these Terms of Service at any time. Any changes will be posted on this page with an updated effective date. Continued usage of MasterTools following modifications represents acceptance of the updated terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">9. Contact Information</h2>
            <p>
              For legal inquiries or terms clarification, please contact:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs">
              Email: support@masterperi5.me<br />
              Domain: https://masterperi5.me
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
