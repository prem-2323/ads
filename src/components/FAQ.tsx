import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { ToolFAQ } from '../data/tools';

interface FAQProps {
  faqs: ToolFAQ[];
  title?: string;
}

export const FAQ: React.FC<FAQProps> = ({ faqs, title = 'Frequently Asked Questions' }) => {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggle = (index: number) => {
    setOpenIndices(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="mt-12 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 shadow-sm">
      <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
        {title}
      </h3>
      <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
        {faqs.map((faq, index) => {
          const isOpen = openIndices.includes(index);
          return (
            <div key={index} className="py-4 first:pt-0 last:pb-0">
              <button
                type="button"
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between text-left text-base font-medium text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md py-1"
                aria-expanded={isOpen}
              >
                <span className="pr-4">{faq.question}</span>
                <ChevronDown
                  className={`h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="mt-2.5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed pr-6">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
