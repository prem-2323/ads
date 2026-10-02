import React, { useState, useEffect, useRef } from 'react';
import { QrCode, Download, Trash2, Copy, Check, Sparkles, AlertCircle } from 'lucide-react';
import qrcode from 'qrcode-generator';
import { ToolLayout } from '../components/ToolLayout';
import { getToolBySlug } from '../data/tools';

type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export const QrGenerator: React.FC = () => {
  const tool = getToolBySlug('qr-generator')!;
  const [inputText, setInputText] = useState<string>('https://masterperi5.me');
  const [errorLevel, setErrorLevel] = useState<ErrorCorrectionLevel>('M');
  const [cellSize, setCellSize] = useState<number>(8);
  const [dataUrl, setDataUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const generateQr = (text = inputText, ecLevel = errorLevel, size = cellSize) => {
    setError(null);
    if (!text.trim()) {
      setDataUrl('');
      return;
    }

    try {
      // typeNumber 0 = auto-size based on payload length
      const qr = qrcode(0, ecLevel);
      qr.addData(text);
      qr.make();
      const generatedUrl = qr.createDataURL(size, 4);
      setDataUrl(generatedUrl);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Text payload is too large for standard QR matrix';
      setError(`QR Code generation failed: ${msg}. Try shortening the text or choosing a lower error-correction level.`);
      setDataUrl('');
    }
  };

  useEffect(() => {
    generateQr();
  }, []);

  const handleDownload = () => {
    if (!dataUrl) return;
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `mastertools-qr-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyLink = async () => {
    if (!inputText) return;
    try {
      await navigator.clipboard.writeText(inputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleClear = () => {
    setInputText('');
    setDataUrl('');
    setError(null);
  };

  return (
    <ToolLayout tool={tool}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Client-Side QR Code Generator
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Create offline scannable QR codes for URLs, text, or Wi-Fi configurations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleClear}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Input Text Area */}
        <div className="space-y-2">
          <label htmlFor="qr-input-text" className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
            QR Content (URL or Text)
          </label>
          <textarea
            id="qr-input-text"
            rows={3}
            value={inputText}
            onChange={e => {
              setInputText(e.target.value);
              generateQr(e.target.value, errorLevel, cellSize);
            }}
            placeholder="Enter website URL (https://...) or any text message to encode into the QR code..."
            className="w-full p-3.5 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
          />
        </div>

        {/* Configuration Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800 text-xs">
          <div className="space-y-1.5">
            <label className="block font-semibold text-slate-700 dark:text-slate-300">
              Error Correction Level
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {(['L', 'M', 'Q', 'H'] as ErrorCorrectionLevel[]).map(lvl => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => {
                    setErrorLevel(lvl);
                    generateQr(inputText, lvl, cellSize);
                  }}
                  className={`py-1.5 text-xs font-medium rounded-lg border transition-all ${
                    errorLevel === lvl
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  {lvl} ({lvl === 'L' ? '7%' : lvl === 'M' ? '15%' : lvl === 'Q' ? '25%' : '30%'})
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Higher levels resist wear and tear when printed.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="block font-semibold text-slate-700 dark:text-slate-300">
              Resolution Scale ({cellSize * 30}px)
            </label>
            <div className="flex items-center gap-3 pt-1">
              <input
                type="range"
                min="4"
                max="14"
                value={cellSize}
                onChange={e => {
                  const val = Number(e.target.value);
                  setCellSize(val);
                  generateQr(inputText, errorLevel, val);
                }}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <span className="font-mono text-slate-600 dark:text-slate-300 w-8 text-right">
                {cellSize}x
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Controls image export density and canvas resolution.
            </p>
          </div>
        </div>

        {/* Error Notification */}
        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-900 flex items-start gap-2.5 text-xs text-red-700 dark:text-red-300">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* QR Preview & Download Action Card */}
        {dataUrl && (
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col items-center justify-center space-y-5 shadow-xs">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center">
              <img
                src={dataUrl}
                alt="Generated QR Code"
                className="max-w-[280px] max-h-[280px] w-auto h-auto object-contain image-rendering-pixelated"
              />
            </div>

            <div className="text-center max-w-sm">
              <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                {inputText}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors"
              >
                <Download className="h-4 w-4" />
                <span>Download PNG</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-semibold rounded-xl transition-colors"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? 'Payload Copied!' : 'Copy Text'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
};
