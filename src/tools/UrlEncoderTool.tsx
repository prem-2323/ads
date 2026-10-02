import React, { useState } from 'react';
import { Link2, Copy, Check, Trash2, ArrowLeftRight, AlertCircle } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';
import { getToolBySlug } from '../data/tools';

export const UrlEncoderTool: React.FC = () => {
  const tool = getToolBySlug('url-encoder')!;
  const [tab, setTab] = useState<'encode' | 'decode'>('encode');
  const [mode, setMode] = useState<'component' | 'full'>('component');
  const [input, setInput] = useState<string>('https://masterperi5.me/search?query=hello world & tag=fast');
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleProcess = (overrideInput?: string, overrideTab?: 'encode' | 'decode', overrideMode?: 'component' | 'full') => {
    const textToProcess = overrideInput !== undefined ? overrideInput : input;
    const activeTab = overrideTab !== undefined ? overrideTab : tab;
    const activeMode = overrideMode !== undefined ? overrideMode : mode;

    setError(null);
    if (!textToProcess) {
      setOutput('');
      return;
    }

    try {
      if (activeTab === 'encode') {
        const encoded = activeMode === 'component'
          ? encodeURIComponent(textToProcess)
          : encodeURI(textToProcess);
        setOutput(encoded);
      } else {
        const decoded = activeMode === 'component'
          ? decodeURIComponent(textToProcess.replace(/\+/g, '%20'))
          : decodeURI(textToProcess.replace(/\+/g, '%20'));
        setOutput(decoded);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid URI sequence';
      setError(`Malformed URL sequence: ${msg}. Check for invalid percent (%) escape sequences.`);
      setOutput('');
    }
  };

  React.useEffect(() => {
    handleProcess(input, tab, mode);
  }, []);

  const handleTabChange = (newTab: 'encode' | 'decode') => {
    setTab(newTab);
    setError(null);
    if (output) {
      const prevOutput = output;
      setInput(prevOutput);
      handleProcess(prevOutput, newTab, mode);
    } else {
      handleProcess(input, newTab, mode);
    }
  };

  const handleModeChange = (newMode: 'component' | 'full') => {
    setMode(newMode);
    handleProcess(input, tab, newMode);
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  const handleSwap = () => {
    if (!output) return;
    const newTab = tab === 'encode' ? 'decode' : 'encode';
    setTab(newTab);
    setInput(output);
    handleProcess(output, newTab, mode);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        {/* Header & Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              URL {tab === 'encode' ? 'Encoder' : 'Decoder'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Percent-encode URL strings or decode encoded parameters safely.
            </p>
          </div>

          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl self-start sm:self-auto">
            <button
              type="button"
              onClick={() => handleTabChange('encode')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                tab === 'encode'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Encode
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('decode')}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                tab === 'decode'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Decode
            </button>
          </div>
        </div>

        {/* Options Row */}
        <div className="flex flex-wrap items-center gap-4 p-3 rounded-xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800 text-xs">
          <span className="font-semibold text-slate-700 dark:text-slate-300">Encoding Mode:</span>
          <label className="inline-flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="url-mode"
              checked={mode === 'component'}
              onChange={() => handleModeChange('component')}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="text-slate-700 dark:text-slate-300">
              Component Mode (encodes all delimiters — ideal for query params)
            </span>
          </label>
          <label className="inline-flex items-center gap-1.5 cursor-pointer">
            <input
              type="radio"
              name="url-mode"
              checked={mode === 'full'}
              onChange={() => handleModeChange('full')}
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="text-slate-700 dark:text-slate-300">
              Full URI Mode (preserves :// and / structure)
            </span>
          </label>
        </div>

        {/* Input Area */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <label htmlFor="url-input" className="font-semibold text-slate-700 dark:text-slate-300">
              {tab === 'encode' ? 'Raw URL or Query Text to Encode' : 'Encoded URL to Decode'}
            </label>
            <div className="flex items-center gap-3">
              <span>{input.length} characters</span>
              <button
                type="button"
                onClick={handleClear}
                className="text-slate-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                title="Clear input"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
          <textarea
            id="url-input"
            rows={4}
            value={input}
            onChange={e => {
              setInput(e.target.value);
              handleProcess(e.target.value, tab, mode);
            }}
            placeholder={
              tab === 'encode'
                ? 'Type or paste a URL or query string to percent-encode...'
                : 'Paste a percent-encoded URL here (e.g. hello%20world)...'
            }
            className="w-full p-3.5 font-mono text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
          />
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => handleProcess()}
            className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
          >
            <Link2 className="h-4 w-4" />
            <span>{tab === 'encode' ? 'Encode URL' : 'Decode URL'}</span>
          </button>

          {output && (
            <button
              type="button"
              onClick={handleSwap}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              <ArrowLeftRight className="h-3.5 w-3.5" />
              <span>Swap Input &amp; Output</span>
            </button>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 flex items-start gap-2.5 text-xs text-red-700 dark:text-red-300">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Output */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {tab === 'encode' ? 'Percent-Encoded Output' : 'Decoded URL Output'}
            </span>
            <div className="flex items-center gap-3">
              <span>{output.length} characters</span>
              <button
                type="button"
                onClick={handleCopy}
                disabled={!output}
                className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 hover:underline disabled:opacity-40 disabled:no-underline font-medium"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>
          <textarea
            readOnly
            rows={4}
            value={output}
            placeholder="Result will appear here..."
            className="w-full p-3.5 font-mono text-xs sm:text-sm bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none transition-all"
          />
        </div>
      </div>
    </ToolLayout>
  );
};
