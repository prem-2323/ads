import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ToolItem } from '../data/tools';
import { ToolIcon } from './ToolIcon';

interface ToolCardProps {
  tool: ToolItem;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 transition-all duration-200 hover:border-blue-500/50 hover:shadow-md dark:hover:border-blue-500/40">
      <div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
            <ToolIcon name={tool.iconName} className="h-5 w-5" />
          </div>
          {/* Quiet unboxed metadata */}
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
            <ToolIcon name={tool.categoryIconName} className="h-3.5 w-3.5 text-slate-400 dark:text-slate-500" />
            <span>{tool.category}</span>
          </span>
        </div>

        <h3 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          <Link to={tool.path} className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
            {tool.name}
          </Link>
        </h3>

        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2">
          {tool.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <span className="text-xs text-slate-400 dark:text-slate-500">100% Free · Browser Only</span>
        <Link
          to={tool.path}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform"
          aria-label={`Open ${tool.name}`}
        >
          <span>Open Tool</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
};
