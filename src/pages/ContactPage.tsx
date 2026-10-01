import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { SEO } from '../components/SEO';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !message) return;

    // Build mailto fallback link for client reliability
    const mailtoSubject = encodeURIComponent(`[MasterTools Feedback] ${subject || 'User Inquiry'}`);
    const mailtoBody = encodeURIComponent(`From: ${name} (${email})\n\n${message}`);
    const mailtoUrl = `mailto:support@masterperi5.me?subject=${mailtoSubject}&body=${mailtoBody}`;

    setSubmitted(true);
    // Optionally open the user's mail client
    window.location.href = mailtoUrl;
  };

  return (
    <>
      <SEO
        title="Contact MasterTools – Feedback & Support"
        description="Have questions, suggestions, or tool requests? Get in touch with the MasterTools team at support@masterperi5.me."
        canonical="https://masterperi5.me/contact"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 space-y-8">
        <Breadcrumb items={[{ label: 'Contact Us' }]} />

        {/* Header */}
        <div className="pb-6 border-b border-slate-100 dark:border-slate-800">
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white mt-1">
            Contact Us
          </h1>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Have a question, tool suggestion, calculation correction, or feedback? We’d love to hear from you.
          </p>
        </div>

        {/* Email Direct Card */}
        <div className="rounded-2xl border border-blue-200/70 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/40 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white shrink-0 shadow-xs">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-blue-800 dark:text-blue-300">
                Direct Email Support
              </div>
              <a
                href="mailto:support@masterperi5.me"
                className="text-base sm:text-lg font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                support@masterperi5.me
              </a>
            </div>
          </div>
          <a
            href="mailto:support@masterperi5.me"
            className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Open in Email Client
          </a>
        </div>

        {/* Contact Form */}
        <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-xs">
          <div className="flex items-center gap-2 mb-6 text-slate-900 dark:text-white font-bold text-lg">
            <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h2>Send a Direct Feedback Message</h2>
          </div>

          {submitted ? (
            <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-300 space-y-2">
              <div className="flex items-center gap-2 font-bold text-base">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                <span>Thank you! Your email client has been opened.</span>
              </div>
              <p className="text-xs text-emerald-700 dark:text-emerald-300/80 leading-relaxed">
                If your default email app did not open automatically, please send your email directly to{' '}
                <strong className="underline">support@masterperi5.me</strong>. We respond to all user inquiries within 24 to 48 hours.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contactName" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="contactName"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-3.5 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="contactEmail" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contactEmail"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full px-3.5 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contactSubject" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Subject
                </label>
                <input
                  id="contactSubject"
                  type="text"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                  placeholder="e.g. Suggestion for new GPA scale"
                  className="w-full px-3.5 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="contactMessage" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Your Message <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="contactMessage"
                  required
                  rows={5}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Write your feedback, question, or bug report here..."
                  className="w-full p-3.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm hover:shadow transition-all inline-flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <Send className="h-4 w-4" />
                  <span>Send Message via Email</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-400 dark:text-slate-500 pt-1">
                <AlertCircle className="h-3.5 w-3.5 text-slate-400" />
                <span>Notice: Clicking send opens your device’s default mail app to preserve privacy without backend message logging.</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};
