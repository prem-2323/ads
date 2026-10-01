import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, CornerDownLeft } from 'lucide-react';
import { TOOLS, ToolItem } from '../data/tools';
import { ToolIcon } from './ToolIcon';

interface SearchBarProps {
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
  onSelect?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search for a tool (e.g. CGPA, JSON, Attendance)...',
  autoFocus = false,
  className = '',
  onSelect
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter tools matching query in name, description, tags, category
  const filteredTools = query.trim()
    ? TOOLS.filter(tool => {
        const q = query.toLowerCase().trim();
        return (
          tool.name.toLowerCase().includes(q) ||
          tool.description.toLowerCase().includes(q) ||
          tool.category.toLowerCase().includes(q) ||
          tool.tags.some(tag => tag.toLowerCase().includes(q))
        );
      })
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!filteredTools.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < filteredTools.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredTools.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const targetTool = selectedIndex >= 0 ? filteredTools[selectedIndex] : filteredTools[0];
      if (targetTool) {
        handleSelectTool(targetTool);
      }
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const handleSelectTool = (tool: ToolItem) => {
    setQuery('');
    setIsOpen(false);
    navigate(tool.path);
    if (onSelect) onSelect();
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      <div className="relative flex items-center">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full pl-10 pr-9 py-2.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
          aria-label="Search tools"
          role="combobox"
          aria-expanded={isOpen && filteredTools.length > 0}
          aria-autocomplete="list"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setIsOpen(false);
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            aria-label="Clear search query"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Instant Search Results Dropdown */}
      {isOpen && query.trim() !== '' && (
        <div className="absolute left-0 right-0 top-full mt-2 z-50 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl">
          {filteredTools.length > 0 ? (
            <div>
              <div className="px-3 py-2 text-[11px] font-semibold tracking-wider uppercase text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40">
                Tools ({filteredTools.length})
              </div>
              <ul className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60 p-1">
                {filteredTools.map((tool, idx) => (
                  <li key={tool.id}>
                    <button
                      type="button"
                      onClick={() => handleSelectTool(tool)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`flex w-full items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-colors ${
                        selectedIndex === idx
                          ? 'bg-blue-50 text-blue-900 dark:bg-blue-950/70 dark:text-blue-200'
                          : 'text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 shrink-0">
                          <ToolIcon name={tool.iconName} className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="font-medium">{tool.name}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                            {tool.description}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 shrink-0">
                        <span>{tool.category}</span>
                        {selectedIndex === idx ? (
                          <CornerDownLeft className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                        ) : (
                          <ArrowRight className="h-3.5 w-3.5" />
                        )}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                No tools found for &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Try searching for &quot;cgpa&quot;, &quot;percentage&quot;, &quot;attendance&quot;, or &quot;json&quot;.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
