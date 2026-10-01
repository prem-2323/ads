import React from 'react';

export type AdSize = 'banner' | 'rectangle' | 'sidebar' | 'leaderboard';

interface AdSlotProps {
  size?: AdSize;
  className?: string;
  slotId?: string;
}

/**
 * AdSlot Component
 * 
 * Production-ready placeholder for future Google AdSense or compliant display ads.
 * When real ads are ready to integrate:
 * 1. Replace the inner placeholder with the standard Google AdSense `<ins className="adsbygoogle" ...>` tag.
 * 2. Load the Google AdSense script in index.html.
 * 3. Call `(window.adsbygoogle = window.adsbygoogle || []).push({});` inside a useEffect hook.
 */
export const AdSlot: React.FC<AdSlotProps> = ({
  size = 'banner',
  className = '',
  slotId
}) => {
  // Dimension styles mapping to standard IAB ad dimensions
  const sizeStyles: Record<AdSize, string> = {
    // 728x90 or responsive leaderboard banner
    banner: 'w-full min-h-[90px] max-w-[728px] my-6',
    // 300x250 medium rectangle
    rectangle: 'w-full max-w-[336px] min-h-[280px] my-4',
    // 300x600 or 160x600 skyscraper / sidebar unit
    sidebar: 'w-full min-h-[400px] my-4',
    // Full width responsive unit
    leaderboard: 'w-full min-h-[100px] max-w-[970px] my-6',
  };

  return (
    <div
      className={`mx-auto flex flex-col items-center justify-center transition-colors ${sizeStyles[size]} ${className}`}
      data-ad-slot={slotId || 'placeholder'}
      aria-label="Advertisement placeholder"
    >
      <div className="w-full h-full border border-dashed border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50/50 dark:bg-slate-900/40 p-4 flex flex-col items-center justify-center text-center">
        <span className="text-[11px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
          Advertisement
        </span>
        <span className="text-[12px] text-slate-400/80 dark:text-slate-500/80 mt-1">
          Ad placement space reserved for Google AdSense
        </span>
      </div>
    </div>
  );
};
