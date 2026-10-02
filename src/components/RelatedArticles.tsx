import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Clock, Calendar } from 'lucide-react';
import { BlogPost, getBlogPostsBySlugs } from '../data/blogPosts';

interface RelatedArticlesProps {
  articleSlugs?: string[];
  articles?: BlogPost[];
  title?: string;
  subtitle?: string;
}

export const RelatedArticles: React.FC<RelatedArticlesProps> = ({
  articleSlugs = [],
  articles,
  title = 'Related Educational Guides',
  subtitle = 'Explore related articles and calculation primers to deepen your understanding.'
}) => {
  const displayArticles: BlogPost[] = articles || getBlogPostsBySlugs(articleSlugs);

  if (!displayArticles || displayArticles.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 sm:p-7 space-y-4 my-8 shadow-xs">
      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
        <BookOpen className="h-5 w-5" />
        <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
          {title}
        </h3>
      </div>
      {subtitle && (
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          {subtitle}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {displayArticles.map(article => (
          <article
            key={article.id}
            className="flex flex-col justify-between rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 p-4 shadow-2xs hover:border-blue-500/40 hover:bg-white dark:hover:bg-slate-900 transition-all group"
          >
            <div>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mb-2">
                <span className="font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider text-[10px]">
                  {article.category}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{article.readTime}</span>
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 mb-2 leading-snug">
                {article.title}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed mb-3">
                {article.excerpt}
              </p>
            </div>

            <Link
              to={`/blog/${article.slug}`}
              className="inline-flex items-center justify-between w-full pt-2.5 border-t border-slate-200/60 dark:border-slate-800 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              <span>Read Guide</span>
              <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};
