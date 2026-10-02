import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CategoryIconName, CategoryItem, getToolsByCategory } from '../data/tools';
import { ToolIcon } from './ToolIcon';

interface CategoryCardProps {
  category?: CategoryItem;
  id?: string;
  name?: string;
  iconName?: CategoryIconName;
  count?: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  id,
  name,
  iconName,
  count,
}) => {
  const catId = category ? category.id : id || '';
  const catName = category ? category.name : name || '';
  const catIcon = category ? category.iconName : iconName || 'Layers';
  const catSlug = category ? category.slug : (id || '').toLowerCase();
  const toolCount = count !== undefined ? count : (category ? getToolsByCategory(catId).length : 0);

  return (
    <Link
      to={`/categories/${catSlug}`}
      className="group flex items-center justify-between p-4 rounded-xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-200 hover:border-blue-500/50 hover:shadow-xs"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200 shrink-0">
          <ToolIcon name={catIcon} className="h-5 w-5" />
        </div>
        <div>
          <span className="font-semibold text-sm text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {catName}
          </span>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {toolCount} {toolCount === 1 ? 'tool' : 'tools'} available
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1 text-xs font-medium text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors shrink-0">
        <span>View</span>
        <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </Link>
  );
};
