/**
 * MasterTools Centralized AdSense Configuration
 * 
 * Supports two operational states:
 * - State A (Unconfigured / Placeholder mode): When VITE_ADSENSE_PUBLISHER_ID is missing or placeholder.
 *   Renders clean, non-intrusive placeholders without loading external scripts or throwing errors.
 * - State B (Live AdSense mode): When VITE_ADSENSE_PUBLISHER_ID is valid (starts with 'ca-pub-').
 *   Dynamically loads official Google AdSense script once and renders live responsive ad units.
 */

export interface AdSenseConfig {
  publisherId: string | undefined;
  isEnabled: boolean;
  slots: {
    home: string | undefined;
    tool: string | undefined;
    article: string | undefined;
    sidebar: string | undefined;
  };
}

const rawPublisherId = import.meta.env.VITE_ADSENSE_PUBLISHER_ID;

const isValidPublisherId = (id: string | undefined): boolean => {
  if (!id) return false;
  if (id === 'ca-pub-XXXXXXXXXXXXXXXX') return false;
  return id.startsWith('ca-pub-') && id.length > 10;
};

export const adsenseConfig: AdSenseConfig = {
  publisherId: isValidPublisherId(rawPublisherId) ? rawPublisherId : undefined,
  isEnabled: isValidPublisherId(rawPublisherId),
  slots: {
    home: import.meta.env.VITE_AD_SLOT_HOME,
    tool: import.meta.env.VITE_AD_SLOT_TOOL,
    article: import.meta.env.VITE_AD_SLOT_ARTICLE,
    sidebar: import.meta.env.VITE_AD_SLOT_SIDEBAR,
  },
};

let isScriptLoaded = false;

/**
 * Dynamically initialize the official Google AdSense script if a valid publisher ID is present.
 * Prevents duplicate script tag injection across SPA navigations.
 */
export function initAdSense(): void {
  if (isScriptLoaded || typeof window === 'undefined') return;
  if (!adsenseConfig.isEnabled || !adsenseConfig.publisherId) return;

  try {
    if (document.getElementById('adsense-script')) {
      isScriptLoaded = true;
      return;
    }

    const script = document.createElement('script');
    script.id = 'adsense-script';
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(adsenseConfig.publisherId)}`;
    document.head.appendChild(script);

    window.adsbygoogle = window.adsbygoogle || [];
    isScriptLoaded = true;
  } catch (err) {
    console.warn('AdSense script failed to load asynchronously:', err);
  }
}
