import React, { useState } from 'react';
import { Binary, Copy, Check, Trash2, ArrowLeftRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';
import { getToolBySlug } from '../data/tools';

/** Unicode-safe base64 encode using browser TextEncoder */
function utf8ToBase64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/** Unicode-safe base64 decode using browser TextDecoder */
function base64ToUtf8(b64: string): string {
  // Remove whitespace/newlines that users might paste
  const cleanB64 = b64.replace(/\s+/g, '');
  const binary = atob(cleanB64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

export const Base64Tool: React.FC = () => {
  const tool = getToolBySlug('base64')!;
  const [tab, setTab] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState<string>('Hello, MasterTools! 🚀');
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleProcess = (overrideInput?: string, overrideTab?: 'encode' | 'decode') => {
    const textToProcess = overrideInput !== undefined ? overrideInput : input;
    const activeTab = overrideTab !== undefined ? overrideTab : tab;

    setError(null);
    if (!textToProcess) {
      setOutput('');
      return;
    }

    try {
      if (activeTab === 'encode') {
        const encoded = utf8ToBase64(textToProcess);
        setOutput(encoded);
      } else {
        const decoded = base64ToUtf8(textToProcess);
        setOutput(decoded);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid Base64 sequence';
      setError(
        activeTab === 'decode'
          ? `The provided string is not valid Base64: ${msg}. Please ensure characters are within A-Z, a-z, 0-9, +, / and properly padded with =.`
          : `Encoding error: ${msg}`
      );
      setOutput('');
    }
  };

  // Run on initial load
  React.useEffect(() => {
    handleProcess(input, tab);
  }, []);

  const handleTabChange = (newTab: 'encode' | 'decode') => {
    setTab(newTab);
    setError(null);
    if (output) {
      // Convenient swap if user switches tabs
      const prevOutput = output;
      setInput(prevOutput);
      handleProcess(prevOutput, newTab);
    } else {
      handleProcess(input, newTab);
    }
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard fallback
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
    handleProcess(output, newTab);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        {/* Header & Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Base64 {tab === 'encode' ? 'Encoder' : 'Decoder'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Converts text to/from Base64 with full Unicode &amp; emoji support.
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

        {/* Input Area */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <label htmlFor="base64-input" className="font-semibold text-slate-700 dark:text-slate-300">
              {tab === 'encode' ? 'Input Text (Plain UTF-8)' : 'Input Base64 String'}
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
            id="base64-input"
            rows={5}
            value={input}
            onChange={e => {
              setInput(e.target.value);
              handleProcess(e.target.value, tab);
            }}
            placeholder={
              tab === 'encode'
                ? 'Type or paste plain text here to encode...'
                : 'Paste a Base64 string here (e.g. SGVsbG8=)...'
            }
            className="w-full p-3.5 font-mono text-xs sm:text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
          />
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => handleProcess()}
            className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
          >
            <Binary className="h-4 w-4" />
            <span>{tab === 'encode' ? 'Encode to Base64' : 'Decode to Text'}</span>
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

        {/* Error Notification */}
        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 flex items-start gap-2.5 text-xs text-red-700 dark:text-red-300">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Output Area */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              {tab === 'encode' ? 'Base64 Result' : 'Decoded Text Result'}
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
            rows={5}
            value={output}
            placeholder="Result will appear here..."
            className="w-full p-3.5 font-mono text-xs sm:text-sm bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none transition-all"
          />
        </div>
      </div>
    </ToolLayout>
  );
};
