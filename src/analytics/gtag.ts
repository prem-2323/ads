import { analytics } from './tracker';

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

// Get Measurement ID from environment variables
const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

let isInitialized = false;

/**
 * Initialize Google Analytics 4 script dynamically.
 * Safe to call multiple times — script will only load once.
 */
export function initGA(): void {
  if (isInitialized) return;
  if (typeof window === 'undefined') return;

  // Verify valid measurement ID format (e.g., G-XXXXXXXXXX)
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === 'G-XXXXXXXXXX' || !GA_MEASUREMENT_ID.startsWith('G-')) {
    // GA Measurement ID not configured — fallback to local browser analytics only
    return;
  }

  try {
    // Prevent duplicate script tag injection
    if (document.getElementById('ga-gtag-script')) {
      isInitialized = true;
      return;
    }

    // Create script tag asynchronously
    const script = document.createElement('script');
    script.id = 'ga-gtag-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
    document.head.appendChild(script);

    // Initialize dataLayer and gtag function
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());
    // Disable automatic page view tracking in config since React Router handles SPAs
    window.gtag('config', GA_MEASUREMENT_ID, {
      send_page_view: false,
    });

    isInitialized = true;
  } catch (err) {
    // Silently handle any script loading error to prevent app crashes
    console.warn('Google Analytics script failed to initialize:', err);
  }
}

/**
 * Track route change / page view.
 */
export function trackPageView(path: string, title?: string): void {
  const pageTitle = title || document.title;

  // 1. Send to GA4 if active
  if (isInitialized && typeof window.gtag === 'function' && GA_MEASUREMENT_ID) {
    try {
      window.gtag('event', 'page_view', {
        page_path: path,
        page_title: pageTitle,
        page_location: window.location.href,
      });
    } catch {
      // Ignore
    }
  }

  // 2. Local fallback tracker (for /admin/analytics dashboard)
  try {
    analytics.trackPageView(path);
  } catch {
    // Ignore
  }
}

/**
 * Generic safe event tracking helper.
 * Never send sensitive user inputs.
 */
export function trackEvent(eventName: string, parameters: Record<string, unknown> = {}): void {
  // Send to GA4 if active
  if (isInitialized && typeof window.gtag === 'function') {
    try {
      window.gtag('event', eventName, parameters);
    } catch {
      // Ignore
    }
  }
}

/**
 * Convenience Helpers for MasterTools Event Schema
 */

export function trackToolOpen(toolName: string, category: string): void {
  trackEvent('tool_open', {
    tool_name: toolName,
    tool_category: category,
  });
}

export function trackToolUse(toolName: string, category: string): void {
  trackEvent('tool_use', {
    tool_name: toolName,
    tool_category: category,
  });
  try {
    analytics.trackToolUse(toolName);
  } catch {
    // Ignore
  }
}

export function trackToolComplete(toolName: string, category: string): void {
  trackEvent('tool_complete', {
    tool_name: toolName,
    tool_category: category,
  });
}

export function trackArticleView(articleSlug: string, category: string): void {
  trackEvent('article_view', {
    article_slug: articleSlug,
    article_category: category,
  });
}

export function trackCategoryView(categoryName: string): void {
  trackEvent('category_view', {
    category_name: categoryName,
  });
}

export function trackDownload(contentType: string, toolName: string): void {
  trackEvent('download', {
    content_type: contentType,
    tool_name: toolName,
  });
}

export function trackCopyResult(toolName: string): void {
  trackEvent('copy_result', {
    tool_name: toolName,
  });
  try {
    analytics.trackCopy(toolName);
  } catch {
    // Ignore
  }
}

export function trackRelatedToolClick(toolName: string, source: 'article' | 'sidebar' | 'footer' | 'tool'): void {
  trackEvent('related_tool_click', {
    tool_name: toolName,
    source,
  });
}

export function trackSiteSearch(): void {
  // Privacy safe: do not transmit exact search text to prevent accidental PII leaks
  trackEvent('site_search');
  try {
    analytics.trackSearch('performed');
  } catch {
    // Ignore
  }
}
