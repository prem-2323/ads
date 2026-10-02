import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Wrench } from 'lucide-react';
import { getToolsByIds, ToolItem } from '../data/tools';
import { ToolIcon } from './ToolIcon';

import { trackRelatedToolClick } from '../analytics/gtag';

interface RelatedToolsProps {
  toolIds?: string[];
  tools?: ToolItem[];
  title?: string;
  subtitle?: string;
}

export const RelatedTools: React.FC<RelatedToolsProps> = ({
  toolIds = [],
  tools,
  title = 'Recommended Online Tools',
  subtitle = 'Try these free, fast, and private browser-based utilities directly on MasterTools.'
}) => {
  const displayTools: ToolItem[] = tools || getToolsByIds(toolIds);

  if (!displayTools || displayTools.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-blue-100 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 p-6 sm:p-7 space-y-4 my-8">
      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
        <Wrench className="h-5 w-5" />
        <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
          {title}
        </h3>
      </div>
      {subtitle && (
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          {subtitle}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
        {displayTools.map(tool => (
          <div
            key={tool.id}
            className="flex flex-col justify-between rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-xs hover:border-blue-500/50 hover:shadow-md transition-all group"
          >
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <ToolIcon name={tool.iconName} className="h-4 w-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                  {tool.name}
                </h4>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-3">
                {tool.description}
              </p>
            </div>

            <Link
              to={tool.path}
              onClick={() => trackRelatedToolClick(tool.name, 'article')}
              className="inline-flex items-center justify-between w-full pt-2.5 border-t border-slate-100 dark:border-slate-800/80 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <span>Open Tool</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
