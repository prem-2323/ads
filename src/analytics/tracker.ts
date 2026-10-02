/**
 * MasterTools Privacy-First Analytics
 * 
 * Tracks essential metrics without cookies or personal data:
 * - Page views (which pages are visited)
 * - Tool usage (which tools are used)
 * - Traffic sources (how visitors found you)
 * - Device type (mobile/desktop/tablet)
 * 
 * All data is stored locally in localStorage and can be exported
 * or sent to a backend endpoint when ready.
 */

export interface AnalyticsEvent {
  type: 'page_view' | 'tool_use' | 'search' | 'copy_result';
  page: string;
  tool?: string;
  query?: string;
  timestamp: number;
  referrer: string;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  sessionId: string;
}

export interface AnalyticsSummary {
  totalPageViews: number;
  totalToolUses: number;
  totalSearches: number;
  totalCopies: number;
  topPages: Record<string, number>;
  topTools: Record<string, number>;
  topReferrers: Record<string, number>;
  deviceBreakdown: Record<string, number>;
  dailyViews: Record<string, number>;
}

const STORAGE_KEY = 'mt_analytics';
const SESSION_KEY = 'mt_session';
const MAX_EVENTS = 500; // Keep last 500 events to avoid localStorage bloat

function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

function getSessionId(): string {
  let session = localStorage.getItem(SESSION_KEY);
  if (!session) {
    session = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    localStorage.setItem(SESSION_KEY, session);
  }
  return session;
}

function getEvents(): AnalyticsEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveEvents(events: AnalyticsEvent[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events.slice(-MAX_EVENTS)));
  } catch {
    // localStorage full or unavailable — silently fail
  }
}

function trackEvent(event: Omit<AnalyticsEvent, 'timestamp' | 'referrer' | 'deviceType' | 'sessionId'>): void {
  try {
    const events = getEvents();
    events.push({
      ...event,
      timestamp: Date.now(),
      referrer: document.referrer || 'direct',
      deviceType: getDeviceType(),
      sessionId: getSessionId(),
    });
    saveEvents(events);
  } catch {
    // Silently fail — analytics should never break the app
  }
}

export const analytics = {
  /** Track a page view */
  trackPageView(page: string): void {
    trackEvent({ type: 'page_view', page });
  },

  /** Track tool usage (when user interacts with a tool) */
  trackToolUse(tool: string): void {
    trackEvent({ type: 'tool_use', page: window.location.pathname, tool });
  },

  /** Track search queries */
  trackSearch(query: string): void {
    if (query.trim()) {
      trackEvent({ type: 'search', page: window.location.pathname, query: query.trim() });
    }
  },

  /** Track copy-to-clipboard actions */
  trackCopy(tool?: string): void {
    trackEvent({ type: 'copy_result', page: window.location.pathname, tool });
  },

  /** Get analytics summary for dashboard display */
  getSummary(): AnalyticsSummary {
    const events = getEvents();
    const summary: AnalyticsSummary = {
      totalPageViews: 0,
      totalToolUses: 0,
      totalSearches: 0,
      totalCopies: 0,
      topPages: {},
      topTools: {},
      topReferrers: {},
      deviceBreakdown: {},
      dailyViews: {},
    };

    for (const event of events) {
      switch (event.type) {
        case 'page_view':
          summary.totalPageViews++;
          summary.topPages[event.page] = (summary.topPages[event.page] || 0) + 1;
          const day = new Date(event.timestamp).toISOString().split('T')[0];
          summary.dailyViews[day] = (summary.dailyViews[day] || 0) + 1;
          break;
        case 'tool_use':
          summary.totalToolUses++;
          if (event.tool) {
            summary.topTools[event.tool] = (summary.topTools[event.tool] || 0) + 1;
          }
          break;
        case 'search':
          summary.totalSearches++;
          break;
        case 'copy_result':
          summary.totalCopies++;
          break;
      }

      // Device breakdown
      summary.deviceBreakdown[event.deviceType] = (summary.deviceBreakdown[event.deviceType] || 0) + 1;

      // Referrer breakdown (only for page views)
      if (event.type === 'page_view') {
        const ref = event.referrer || 'direct';
        summary.topReferrers[ref] = (summary.topReferrers[ref] || 0) + 1;
      }
    }

    return summary;
  },

  /** Export all events as JSON */
  exportData(): string {
    return JSON.stringify(getEvents(), null, 2);
  },

  /** Clear all analytics data */
  clearData(): void {
    localStorage.removeItem(STORAGE_KEY);
  },

  /** Get raw events (for debugging) */
  getRawEvents(): AnalyticsEvent[] {
    return getEvents();
  },
};
