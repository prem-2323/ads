import React, { useState, useEffect } from 'react';
import { Fingerprint, Copy, Check, RotateCcw, Trash2, ShieldCheck, Sparkles } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';
import { getToolBySlug } from '../data/tools';

/** Generates a single RFC 4122 v4 UUID */
function generateSingleUuid(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Fallback using crypto.getRandomValues if randomUUID is unavailable
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 0x0f) | 0x40; // Version 4
    bytes[8] = (bytes[8] & 0x3f) | 0x80; // Variant 10xx
    const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
  }
  // Fallback for older environments
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const UuidGenerator: React.FC = () => {
  const tool = getToolBySlug('uuid-generator')!;
  const [count, setCount] = useState<number>(5);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [hyphens, setHyphens] = useState<boolean>(true);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateUuids = (qty = count, isUpper = uppercase, hasHyphens = hyphens) => {
    const safeQty = Math.max(1, Math.min(qty, 50));
    const generated: string[] = [];
    for (let i = 0; i < safeQty; i++) {
      let id = generateSingleUuid();
      if (!hasHyphens) {
        id = id.replace(/-/g, '');
      }
      if (isUpper) {
        id = id.toUpperCase();
      }
      generated.push(id);
    }
    setUuids(generated);
  };

  useEffect(() => {
    generateUuids();
  }, []);

  const handleCopyAll = async () => {
    if (!uuids.length) return;
    try {
      await navigator.clipboard.writeText(uuids.join('\n'));
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleCopySingle = async (uuid: string, index: number) => {
    try {
      await navigator.clipboard.writeText(uuid);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1800);
    } catch {
      // ignore
    }
  };

  const handleClear = () => {
    setUuids([]);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              UUID v4 Generator
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Cryptographically secure Version 4 UUIDs generated client-side.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => generateUuids()}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Regenerate</span>
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors"
              title="Clear all"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Configuration Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Quantity to Generate ({count})
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min="1"
                max="50"
                value={count}
                onChange={e => {
                  const val = Number(e.target.value);
                  setCount(val);
                  generateUuids(val, uppercase, hyphens);
                }}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-white w-6 text-right">
                {count}
              </span>
            </div>
          </div>

          <div className="flex items-center sm:justify-center">
            <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={e => {
                  setUppercase(e.target.checked);
                  generateUuids(count, e.target.checked, hyphens);
                }}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Uppercase (A-F)</span>
            </label>
          </div>

          <div className="flex items-center sm:justify-end">
            <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={hyphens}
                onChange={e => {
                  setHyphens(e.target.checked);
                  generateUuids(count, uppercase, e.target.checked);
                }}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Include Hyphens (-)</span>
            </label>
          </div>
        </div>

        {/* Quick quantity buttons */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500 dark:text-slate-400">Quick counts:</span>
          {[1, 5, 10, 25, 50].map(qty => (
            <button
              key={qty}
              type="button"
              onClick={() => {
                setCount(qty);
                generateUuids(qty, uppercase, hyphens);
              }}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                count === qty
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {qty}
            </button>
          ))}
        </div>

        {/* UUID List Display */}
        {uuids.length > 0 ? (
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900">
            <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-600 dark:text-slate-400">
                Generated UUIDs ({uuids.length})
              </span>
              <button
                type="button"
                onClick={handleCopyAll}
                className="inline-flex items-center gap-1.5 font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                {copiedAll ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedAll ? 'All Copied!' : 'Copy All'}</span>
              </button>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800/80 max-h-96 overflow-y-auto font-mono text-xs">
              {uuids.map((id, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2.5 flex items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group"
                >
                  <div className="flex items-center gap-3 truncate">
                    <span className="text-slate-400 dark:text-slate-500 w-6 text-right shrink-0 select-none">
                      {idx + 1}.
                    </span>
                    <span className="text-slate-900 dark:text-slate-100 select-all truncate">
                      {id}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopySingle(id, idx)}
                    className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded transition-colors shrink-0"
                    title="Copy this UUID"
                  >
                    {copiedIndex === idx ? (
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-8 text-center rounded-xl border border-dashed border-slate-200 dark:border-slate-800 text-slate-500 text-xs">
            No UUIDs generated. Click &quot;Regenerate&quot; above to create unique identifiers.
          </div>
        )}
      </div>
    </ToolLayout>
  );
};
