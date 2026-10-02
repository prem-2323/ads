import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { analytics } from './tracker';

/**
 * Hook to track page views on route change.
 * Place once in App.tsx to enable automatic page view tracking.
 */
export function useAnalytics() {
  const location = useLocation();

  useEffect(() => {
    analytics.trackPageView(location.pathname);
  }, [location.pathname]);
}
