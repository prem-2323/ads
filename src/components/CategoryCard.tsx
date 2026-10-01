import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CategoryIconName } from '../data/tools';
import { ToolIcon } from './ToolIcon';

interface CategoryCardProps {
  id: string;
  name: string;
  iconName: CategoryIconName;
  count: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, iconName, count }) => {
  return (
    <Link
      to={`/tools?category=${id}`}
      className="group flex items-center justify-between p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-200 hover:border-blue-500/50 hover:shadow-sm"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
          <ToolIcon name={iconName} className="h-4 w-4" />
        </div>
        <div>
          <span className="font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {name}
          </span>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {count} {count === 1 ? 'tool' : 'tools'} available
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1 text-xs font-medium text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        <span>Browse</span>
        <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </Link>
  );
};
