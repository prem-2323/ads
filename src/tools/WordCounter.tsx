import React, { useState, useMemo } from 'react';
import { FileText, Copy, Check, RotateCcw, Clock, Type, AlignLeft } from 'lucide-react';
import { ToolLayout } from '../components/ToolLayout';
import { getToolBySlug } from '../data/tools';

const SAMPLE_TEXT = `MasterTools is a modern, fast, and completely free web utility platform designed to make calculations and text processing straightforward. Whether you are a college student calculating your semester CGPA, a software engineer validating JSON payloads, or an author tracking word limits, MasterTools gives you accurate results without annoying sign-ups or invasive cookies.`;

export const WordCounter: React.FC = () => {
  const tool = getToolBySlug('word-counter')!;

  const [text, setText] = useState<string>(SAMPLE_TEXT);
  const [copied, setCopied] = useState<boolean>(false);

  // Live metrics calculations
  const stats = useMemo(() => {
    const trimmed = text.trim();

    // Characters
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;

    // Words
    const words = trimmed.length === 0 ? 0 : trimmed.split(/\s+/).filter(Boolean).length;

    // Sentences (split by punctuation . ! ? followed by space or newline)
    const sentences = trimmed.length === 0
      ? 0
      : (trimmed.match(/[.!?]+(?=\s|$)/g) || []).length || (trimmed.length > 0 ? 1 : 0);

    // Paragraphs (non-empty blocks split by newlines)
    const paragraphs = trimmed.length === 0
      ? 0
      : text.split(/\n+/).filter(p => p.trim().length > 0).length;

    // Reading time: standard adult benchmark ~ 200 words per minute
    const readingTimeMinutes = Math.ceil(words / 200);

    return {
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      readingTimeMinutes,
    };
  }, [text]);

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleClear = () => {
    setText('');
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        {/* Metric Summary Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div className="p-3.5 rounded-xl border border-blue-100 dark:border-blue-900/60 bg-blue-50/50 dark:bg-blue-950/40 text-center">
            <span className="text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400 block">
              {stats.words.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Words
            </span>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
            <span className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100 block">
              {stats.characters.toLocaleString()}
            </span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Characters
            </span>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
            <span className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100 block">
              {stats.charactersNoSpaces.toLocaleString()}
            </span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              No Spaces
            </span>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
            <span className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100 block">
              {stats.sentences.toLocaleString()}
            </span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Sentences
            </span>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
            <span className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100 block">
              {stats.paragraphs.toLocaleString()}
            </span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Paragraphs
            </span>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
            <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 block">
              ~{stats.readingTimeMinutes}m
            </span>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Read Time
            </span>
          </div>
        </div>

        {/* Text Area Toolbar */}
        <div className="flex items-center justify-between pt-2">
          <label htmlFor="wordCounterInput" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Write or Paste Text
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              disabled={!text}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" />
                  <span className="text-emerald-600">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={handleClear}
              disabled={!text}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 disabled:opacity-40 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Live Input Textarea */}
        <textarea
          id="wordCounterInput"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Start typing or paste your content here to inspect words, characters, and reading statistics..."
          rows={12}
          className="w-full p-4 text-sm bg-slate-50/70 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-slate-900 transition-all resize-y leading-relaxed"
        />

        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span>Reading estimate based on standard 200 words per minute.</span>
          </div>
          <span>Automatic real-time calculation</span>
        </div>
      </div>
    </ToolLayout>
  );
};
