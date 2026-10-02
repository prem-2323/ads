import React from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { SEO } from '../components/SEO';
import { ShieldCheck, Lock } from 'lucide-react';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Privacy Policy – MasterTools"
        description="MasterTools Privacy Policy. Read how we protect your personal data, operate entirely client-side, and our guidelines on future advertising."
        canonical="https://masterperi5.me/privacy-policy"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 space-y-8">
        <Breadcrumb items={[{ label: 'Privacy Policy' }]} />

        {/* Header */}
        <div className="pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-2">
            <Lock className="h-4 w-4" />
            <span>Privacy First Architecture</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Last Updated: October 1, 2026 · Effective Date: October 1, 2026
          </p>
        </div>

        {/* Policy Body */}
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Introduction</h2>
            <p>
              Welcome to <strong>MasterTools</strong> (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), accessible from <strong>masterperi5.me</strong>. We respect your privacy and are committed to safeguarding personal information. This Privacy Policy details the types of information collected and how it is treated.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. Information Users Provide Directly</h2>
            <p>
              MasterTools is built with client-side computation. All calculations performed using our tools—including academic grades, marks, attendance records, birthdates, JSON strings, and writing text—are executed <strong>strictly within your local web browser memory</strong>. We do not transmit, log, or store your calculator inputs on any remote database or server.
            </p>
            <p>
              If you contact us via email, you provide your name, email address, and the contents of your message. We use this information solely to respond to your specific inquiry or feedback.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">3. Automatically Collected Technical Information</h2>
            <p>
              When you access MasterTools, our web hosting provider (such as Vercel or cloud delivery networks) may automatically collect standard web server log entries. This data may include your Internet Protocol (IP) address, browser type and version, referring/exit pages, operating system, and date/time stamps. This raw log information is used solely for maintaining server reliability, DDoS defense, and infrastructure security.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">4. Cookies and Local Storage</h2>
            <p>
              MasterTools uses browser <code>localStorage</code> solely to remember your chosen interface theme (Dark Mode vs. Light Mode) between sessions. This token contains zero personal data and remains on your device.
            </p>
            <p>
              We do not use tracking cookies or session profiling cookies for our core tools.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">5. Web Analytics &amp; Metrics</h2>
            <p>
              Currently, third-party analytics trackers (such as Google Analytics) are not active. If privacy-preserving analytics are integrated in the future, this policy will be updated to describe the exact metrics collected and provide opt-out instructions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">6. Advertising and Third-Party Advertising Providers</h2>
            <p>
              MasterTools is intended to eventually monetize through legitimate display advertising partners, such as <strong>Google AdSense</strong>.
            </p>
            <p>
              Currently, live advertising scripts are not connected; placeholder units are reserved in non-intrusive page locations. Once integrated, Google and other third-party vendors may use cookies (including the DoubleClick cookie) to serve ads based on prior visits to this website or other websites on the Internet.
            </p>
            <p>
              Users will be able to opt out of personalized advertising by visiting Google&rsquo;s Ads Settings (<a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://adssettings.google.com</a>) or through the Network Advertising Initiative opt-out page (<a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://optout.networkadvertising.org</a>).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">7. External Links</h2>
            <p>
              Our website may contain links to external sites or academic resources. MasterTools does not operate or control third-party websites and assumes no responsibility for their privacy practices or content.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">8. Children&rsquo;s Privacy Protection</h2>
            <p>
              MasterTools does not knowingly collect personally identifiable information from children under the age of 13. Our website is an educational and utility resource available to general audiences without personal profiling.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">9. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy periodically to reflect technological adjustments or regulatory standards. The updated date at the top of this document will always denote the latest revision.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">10. Contact Information</h2>
            <p>
              If you have questions regarding this Privacy Policy or data processing, please contact us at:
            </p>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs">
              Email: support@masterperi5.me<br />
              Website: https://masterperi5.me
            </div>
          </section>
        </div>
      </div>
    </>
  );
};
