import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Copy, Check, Trash2, FileCode, ClipboardCopy, Clock3, Layers } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';
import { getToolBySlug } from '../data/tools';

const SAMPLE_JSON = `{
  "app": "MasterTools",
  "features": [
    { "name": "JSON Validator", "stable": true },
    { "name": "Hash Generator", "stable": true }
  ],
  "limits": { "maxInput": 1048576, "retries": 3 },
  "version": 2.1
}`;

/** Convert a character offset into a human line/column reference. */
function offsetToLineCol(text: string, offset: number): { line: number; column: number } {
  const safeOffset = Math.max(0, Math.min(offset, text.length));
  let line = 1;
  let lastNewline = -1;
  for (let i = 0; i < safeOffset; i++) {
    if (text[i] === '\n') {
      line++;
      lastNewline = i;
    }
  }
  return { line, column: safeOffset - lastNewline };
}

function analyzeTree(value: unknown): { objects: number; arrays: number; keys: number; primitives: number; maxDepth: number } {
  let objects = 0;
  let arrays = 0;
  let keys = 0;
  let primitives = 0;
  let maxDepth = 0;

  const walk = (node: unknown, depth: number) => {
    maxDepth = Math.max(maxDepth, depth);
    if (Array.isArray(node)) {
      arrays++;
      node.forEach(child => walk(child, depth + 1));
    } else if (node !== null && typeof node === 'object') {
      objects++;
      const entries = Object.entries(node as Record<string, unknown>);
      keys += entries.length;
      entries.forEach(([, child]) => walk(child, depth + 1));
    } else {
      primitives++;
    }
  };

  walk(value, 0);
  return { objects, arrays, keys, primitives, maxDepth };
}

interface Stats {
  bytes: number;
  parseMs: number;
  objects: number;
  arrays: number;
  keys: number;
  primitives: number;
  maxDepth: number;
  rootType: string;
}

interface ErrorInfo {
  message: string;
  line: number | null;
  column: number | null;
  offset: number | null;
}

export const JsonValidator: React.FC = () => {
  const tool = getToolBySlug('json-validator')!;

  const [input, setInput] = useState<string>(SAMPLE_JSON);
  const [status, setStatus] = useState<'idle' | 'valid' | 'invalid'>('idle');
  const [stats, setStats] = useState<Stats | null>(null);
  const [errorInfo, setErrorInfo] = useState<ErrorInfo | null>(null);
  const [copied, setCopied] = useState(false);

  const handleValidate = () => {
    if (!input.trim()) {
      setStatus('invalid');
      setStats(null);
      setErrorInfo({ message: 'Nothing to validate — paste some JSON first.', line: null, column: null, offset: null });
      return;
    }

    const started = performance.now();
    try {
      const parsed = JSON.parse(input);
      const parseMs = performance.now() - started;
      const tree = analyzeTree(parsed);
      setStats({
        bytes: new TextEncoder().encode(input).length,
        parseMs,
        ...tree,
        rootType: Array.isArray(parsed) ? 'array' : parsed === null ? 'null' : typeof parsed,
      });
      setStatus('valid');
      setErrorInfo(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid JSON';
      // Extract character offset reported by V8/SpiderMonkey ("... at position 42")
      const posMatch = message.match(/position (\d+)/);
      const offset = posMatch ? Number(posMatch[1]) : null;
      const lineMatch = message.match(/line (\d+) column (\d+)/);
      const loc =
        offset !== null
          ? offsetToLineCol(input, offset)
          : lineMatch
            ? { line: Number(lineMatch[1]), column: Number(lineMatch[2]) }
            : null;
      setStatus('invalid');
      setStats(null);
      setErrorInfo({
        message,
        line: loc ? loc.line : null,
        column: loc ? loc.column : null,
        offset,
      });
    }
  };

  const handleCopyError = async () => {
    if (!errorInfo) return;
    const text =
      errorInfo.line !== null
        ? `JSON error at line ${errorInfo.line}, column ${errorInfo.column}: ${errorInfo.message}`
        : `JSON error: ${errorInfo.message}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">JSON Input</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              ECMA-404 / RFC 8259 validation with exact error location
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleValidate}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Validate JSON</span>
            </button>
            <button
              type="button"
              onClick={() => { setInput(SAMPLE_JSON); setStatus('idle'); setStats(null); setErrorInfo(null); }}
              className="px-2.5 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
            >
              Load Sample
            </button>
            <button
              type="button"
              onClick={() => { setInput(''); setStatus('idle'); setStats(null); setErrorInfo(null); }}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-500 hover:text-rose-600 font-medium"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between pb-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <span>Paste JSON to check</span>
            <span className="font-mono text-[11px] text-slate-400">{input.length.toLocaleString()} chars</span>
          </div>
          <textarea
            value={input}
            onChange={e => { setInput(e.target.value); setStatus('idle'); setErrorInfo(null); }}
            placeholder="Paste JSON here..."
            rows={12}
            spellCheck={false}
            className="w-full p-3 font-mono text-xs sm:text-sm bg-slate-50/70 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-slate-900 transition-all resize-y"
          />
        </div>

        {status === 'valid' && stats && (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50" role="status">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
              <div className="text-xs text-emerald-800 dark:text-emerald-300 leading-relaxed">
                <strong className="font-semibold">Valid JSON.</strong> Parsed successfully in{' '}
                {stats.parseMs < 0.1 ? '&lt;0.1' : stats.parseMs.toFixed(1)} ms according to ECMA-404.
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-emerald-100 dark:border-emerald-900/50 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-emerald-700/70 dark:text-emerald-400/70 flex items-center gap-1">
                  <FileCode className="h-3 w-3" /> Size
                </span>
                <span className="font-semibold text-slate-900 dark:text-white text-sm">{stats.bytes.toLocaleString()} bytes</span>
              </div>
              <div>
                <span className="text-emerald-700/70 dark:text-emerald-400/70 flex items-center gap-1">
                  <Clock3 className="h-3 w-3" /> Parse time
                </span>
                <span className="font-semibold text-slate-900 dark:text-white text-sm">
                  {stats.parseMs < 0.1 ? '<0.1' : stats.parseMs.toFixed(1)} ms
                </span>
              </div>
              <div>
                <span className="text-emerald-700/70 dark:text-emerald-400/70 flex items-center gap-1">
                  <Layers className="h-3 w-3" /> Root type
                </span>
                <span className="font-semibold text-slate-900 dark:text-white text-sm">{stats.rootType}</span>
              </div>
              <div>
                <span className="text-emerald-700/70 dark:text-emerald-400/70">Max depth</span>
                <span className="font-semibold text-slate-900 dark:text-white text-sm">{stats.maxDepth}</span>
              </div>
              <div>
                <span className="text-emerald-700/70 dark:text-emerald-400/70">Objects</span>
                <span className="font-semibold text-slate-900 dark:text-white text-sm">{stats.objects}</span>
              </div>
              <div>
                <span className="text-emerald-700/70 dark:text-emerald-400/70">Arrays</span>
                <span className="font-semibold text-slate-900 dark:text-white text-sm">{stats.arrays}</span>
              </div>
              <div>
                <span className="text-emerald-700/70 dark:text-emerald-400/70">Keys</span>
                <span className="font-semibold text-slate-900 dark:text-white text-sm">{stats.keys}</span>
              </div>
              <div>
                <span className="text-emerald-700/70 dark:text-emerald-400/70">Values</span>
                <span className="font-semibold text-slate-900 dark:text-white text-sm">{stats.primitives}</span>
              </div>
            </div>
          </div>
        )}

        {status === 'invalid' && errorInfo && (
          <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50" role="alert">
            <div className="flex items-start gap-2.5">
              <ShieldAlert className="h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
              <div className="flex-1 text-xs text-rose-800 dark:text-rose-300 leading-relaxed">
                <strong className="font-semibold">Invalid JSON.</strong>{' '}
                {errorInfo.line !== null ? (
                  <span className="block mt-1">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-100 dark:bg-rose-900/60 font-mono font-semibold text-[11px] mb-1.5">
                      Line {errorInfo.line}, Column {errorInfo.column}
                      {errorInfo.offset !== null && ` · char ${errorInfo.offset}`}
                    </span>
                    <span className="block font-mono text-[11px] text-rose-700 dark:text-rose-400">{errorInfo.message}</span>
                  </span>
                ) : (
                  <span className="block mt-1 font-mono text-[11px]">{errorInfo.message}</span>
                )}
              </div>
              <button
                type="button"
                onClick={handleCopyError}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-rose-700 dark:text-rose-400 hover:text-rose-900 dark:hover:text-rose-300"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        )}

        {status === 'idle' && !stats && !errorInfo && (
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
            <ClipboardCopy className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span>Paste your JSON and click &ldquo;Validate JSON&rdquo; — nothing is uploaded.</span>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};
