import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initGA, trackPageView } from './gtag';

/**
 * Hook to initialize Google Analytics and track page views on route change.
 * Place once in App.tsx inside BrowserRouter.
 */
export function useAnalytics() {
  const location = useLocation();

  useEffect(() => {
    // Initialize GA4 script if VITE_GA_MEASUREMENT_ID is configured
    initGA();
  }, []);

  useEffect(() => {
    // Track page views on React Router route change
    trackPageView(location.pathname);
  }, [location.pathname]);
}
