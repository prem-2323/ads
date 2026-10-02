import React, { useEffect } from 'react';
import { adsenseConfig, initAdSense } from '../config/adsense';

export type AdSize = 'banner' | 'rectangle' | 'sidebar' | 'leaderboard';

interface AdSlotProps {
  size?: AdSize;
  className?: string;
  slotId?: string;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

/**
 * AdSlot Component
 * 
 * Supports State A (Placeholder Mode) and State B (Live AdSense Mode):
 * - If VITE_ADSENSE_PUBLISHER_ID is missing or unconfigured, displays a clean reserved placeholder.
 * - If VITE_ADSENSE_PUBLISHER_ID is valid, dynamically loads the Google AdSense script and initializes responsive ad units.
 */
export const AdSlot: React.FC<AdSlotProps> = ({
  size = 'banner',
  className = '',
  slotId
}) => {
  const sizeStyles: Record<AdSize, string> = {
    banner: 'w-full min-h-[90px] max-w-[728px] my-6',
    rectangle: 'w-full max-w-[336px] min-h-[280px] my-4',
    sidebar: 'w-full min-h-[400px] my-4',
    leaderboard: 'w-full min-h-[100px] max-w-[970px] my-6',
  };

  useEffect(() => {
    if (adsenseConfig.isEnabled) {
      initAdSense();
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        // Silently handle ad push initialization errors
      }
    }
  }, [slotId]);

  // State B: Live AdSense Mode
  if (adsenseConfig.isEnabled && adsenseConfig.publisherId) {
    return (
      <div
        className={`mx-auto overflow-hidden flex flex-col items-center justify-center transition-colors ${sizeStyles[size]} ${className}`}
        aria-label="Advertisement"
      >
        <div className="text-[10px] uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
          Advertisement
        </div>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={adsenseConfig.publisherId}
          data-ad-slot={slotId || adsenseConfig.slots.home || ''}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // State A: Unconfigured Placeholder Mode
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
