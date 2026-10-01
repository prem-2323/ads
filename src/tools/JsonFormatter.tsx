import React, { useState } from 'react';
import { Code, Copy, Check, Trash2, Minimize2, Maximize2, ShieldCheck, AlertCircle, FileCode } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';
import { getToolBySlug } from '../data/tools';

const SAMPLE_JSON = `{
  "name": "MasterTools",
  "domain": "masterperi5.me",
  "version": 1.0,
  "features": [
    "Fast client-side calculation",
    "Privacy focused",
    "Zero registration required"
  ],
  "monetization": {
    "provider": "Google AdSense",
    "status": "Ready for integration"
  },
  "status": "active"
}`;

export const JsonFormatter: React.FC = () => {
  const tool = getToolBySlug('json-formatter')!;

  const [inputJson, setInputJson] = useState<string>(SAMPLE_JSON);
  const [outputJson, setOutputJson] = useState<string>('');
  const [indentSize, setIndentSize] = useState<number>(2);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error' | 'info';
    text: string;
  } | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleFormat = () => {
    if (!inputJson.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter JSON string to format.' });
      return;
    }

    try {
      const parsed = JSON.parse(inputJson);
      const formatted = JSON.stringify(parsed, null, indentSize);
      setOutputJson(formatted);
      setStatusMessage({ type: 'success', text: 'Valid JSON formatted successfully.' });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Invalid JSON format';
      setStatusMessage({
        type: 'error',
        text: `Syntax Error: ${errorMsg}. Please check for unquoted keys, trailing commas, or missing brackets.`
      });
      setOutputJson('');
    }
  };

  const handleMinify = () => {
    if (!inputJson.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter JSON string to minify.' });
      return;
    }

    try {
      const parsed = JSON.parse(inputJson);
      const minified = JSON.stringify(parsed);
      setOutputJson(minified);
      setStatusMessage({ type: 'success', text: 'JSON minified successfully.' });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Invalid JSON format';
      setStatusMessage({
        type: 'error',
        text: `Syntax Error: ${errorMsg}. Cannot minify invalid JSON.`
      });
      setOutputJson('');
    }
  };

  const handleValidate = () => {
    if (!inputJson.trim()) {
      setStatusMessage({ type: 'error', text: 'Please paste or type JSON first.' });
      return;
    }

    try {
      JSON.parse(inputJson);
      setStatusMessage({
        type: 'success',
        text: 'Success: The input is 100% valid JSON according to RFC 8259 specifications.'
      });
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Invalid JSON';
      setStatusMessage({
        type: 'error',
        text: `Validation Failed: ${errorMsg}`
      });
    }
  };

  const handleCopy = async () => {
    const textToCopy = outputJson || inputJson;
    if (!textToCopy) return;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setStatusMessage({ type: 'error', text: 'Failed to copy to clipboard.' });
    }
  };

  const handleClear = () => {
    setInputJson('');
    setOutputJson('');
    setStatusMessage(null);
  };

  const handleLoadSample = () => {
    setInputJson(SAMPLE_JSON);
    setOutputJson('');
    setStatusMessage(null);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        {/* Controls Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleFormat}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              <span>Format JSON</span>
            </button>

            <button
              type="button"
              onClick={handleMinify}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <Minimize2 className="h-3.5 w-3.5" />
              <span>Minify</span>
            </button>

            <button
              type="button"
              onClick={handleValidate}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <Code className="h-3.5 w-3.5" />
              <span>Validate</span>
            </button>

            <div className="flex items-center gap-1.5 pl-2 text-xs text-slate-500 dark:text-slate-400">
              <span>Indent:</span>
              <select
                value={indentSize}
                onChange={e => setIndentSize(Number(e.target.value))}
                className="px-2 py-1 text-xs rounded border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
              >
                <option value={2}>2 spaces</option>
                <option value={4}>4 spaces</option>
                <option value={1}>Tab</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLoadSample}
              className="px-2.5 py-1.5 text-xs text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium"
            >
              Load Sample
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs text-slate-500 hover:text-rose-600 font-medium"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Status Alerts */}
        {statusMessage && (
          <div
            className={`p-3.5 text-xs rounded-xl flex items-start gap-2.5 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50'
                : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-900/50'
            }`}
            role="alert"
          >
            {statusMessage.type === 'success' ? (
              <FileCode className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400 mt-0.5" />
            )}
            <span className="leading-relaxed">{statusMessage.text}</span>
          </div>
        )}

        {/* Dual Editor Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Input Panel */}
          <div>
            <div className="flex items-center justify-between pb-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <span>Input Raw JSON</span>
              <span className="font-mono text-[11px] text-slate-400">
                {inputJson.length.toLocaleString()} chars
              </span>
            </div>
            <textarea
              value={inputJson}
              onChange={e => setInputJson(e.target.value)}
              placeholder="Paste raw or minified JSON here..."
              rows={14}
              className="w-full p-3 font-mono text-xs sm:text-sm bg-slate-50/70 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-slate-900 transition-all resize-y"
              spellCheck={false}
            />
          </div>

          {/* Formatted Output Panel */}
          <div>
            <div className="flex items-center justify-between pb-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
              <span>Formatted Output</span>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] text-slate-400">
                  {(outputJson || inputJson).length.toLocaleString()} chars
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 font-medium"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-600" />
                      <span className="text-emerald-600">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            <textarea
              readOnly
              value={outputJson || (inputJson ? 'Click "Format JSON" or "Minify" above to process.' : '')}
              placeholder="Formatted output will appear here..."
              rows={14}
              className="w-full p-3 font-mono text-xs sm:text-sm bg-slate-100/60 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 focus:outline-none resize-y"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Privacy Note */}
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-2">
          <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          <span>Your data is strictly processed client-side in memory and never leaves your browser.</span>
        </div>
      </div>
    </ToolLayout>
  );
};
