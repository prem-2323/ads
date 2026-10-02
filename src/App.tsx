import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { useAnalytics } from './analytics/useAnalytics';

// Core pages
import { Home } from './pages/Home';

// Lazy-loaded pages
const ToolsPage = lazy(() => import('./pages/ToolsPage').then(m => ({ default: m.ToolsPage })));
const CategoryPage = lazy(() => import('./pages/CategoryPage').then(m => ({ default: m.CategoryPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(m => ({ default: m.BlogPage })));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage').then(m => ({ default: m.BlogPostPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));
const TermsPage = lazy(() => import('./pages/TermsPage').then(m => ({ default: m.TermsPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage').then(m => ({ default: m.AnalyticsPage })));

// Lazy-loaded 15 tools
const CgpaCalculator = lazy(() => import('./tools/CgpaCalculator').then(m => ({ default: m.CgpaCalculator })));
const GpaCalculator = lazy(() => import('./tools/GpaCalculator').then(m => ({ default: m.GpaCalculator })));
const PercentageCalculator = lazy(() => import('./tools/PercentageCalculator').then(m => ({ default: m.PercentageCalculator })));
const AttendanceCalculator = lazy(() => import('./tools/AttendanceCalculator').then(m => ({ default: m.AttendanceCalculator })));
const MarksCalculator = lazy(() => import('./tools/MarksCalculator').then(m => ({ default: m.MarksCalculator })));
const AgeCalculator = lazy(() => import('./tools/AgeCalculator').then(m => ({ default: m.AgeCalculator })));
const JsonFormatter = lazy(() => import('./tools/JsonFormatter').then(m => ({ default: m.JsonFormatter })));
const JsonValidator = lazy(() => import('./tools/JsonValidator').then(m => ({ default: m.JsonValidator })));
const Base64Tool = lazy(() => import('./tools/Base64Tool').then(m => ({ default: m.Base64Tool })));
const UrlEncoderTool = lazy(() => import('./tools/UrlEncoderTool').then(m => ({ default: m.UrlEncoderTool })));
const UuidGenerator = lazy(() => import('./tools/UuidGenerator').then(m => ({ default: m.UuidGenerator })));
const WordCounter = lazy(() => import('./tools/WordCounter').then(m => ({ default: m.WordCounter })));
const UnitConverter = lazy(() => import('./tools/UnitConverter').then(m => ({ default: m.UnitConverter })));
const DateCalculator = lazy(() => import('./tools/DateCalculator').then(m => ({ default: m.DateCalculator })));
const QrGenerator = lazy(() => import('./tools/QrGenerator').then(m => ({ default: m.QrGenerator })));

function PageLoader() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 flex flex-col items-center justify-center space-y-3">
      <div className="h-8 w-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
        Loading tool...
      </span>
    </div>
  );
}

// Scroll to top & analytics helper on route change (must be inside BrowserRouter)
function RouterAppSetup() {
  const { pathname } = useLocation();

  useAnalytics();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <RouterAppSetup />
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
          <Navbar />
          <main className="flex-1">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Main Pages */}
                <Route path="/" element={<Home />} />
                <Route path="/tools" element={<ToolsPage />} />
                <Route path="/categories/:categorySlug" element={<CategoryPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:postSlug" element={<BlogPostPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsPage />} />

                {/* 15 Working Tools */}
                {/* 1. CGPA Calculator */}
                <Route path="/tools/cgpa-calculator" element={<CgpaCalculator />} />
                {/* 2. GPA Calculator */}
                <Route path="/tools/gpa-calculator" element={<GpaCalculator />} />
                {/* 3. Percentage Calculator */}
                <Route path="/tools/percentage-calculator" element={<PercentageCalculator />} />
                {/* 4. Attendance Calculator */}
                <Route path="/tools/attendance-calculator" element={<AttendanceCalculator />} />
                {/* 5. Marks Calculator */}
                <Route path="/tools/marks-calculator" element={<MarksCalculator />} />
                {/* 6. Age Calculator */}
                <Route path="/tools/age-calculator" element={<AgeCalculator />} />
                {/* 7. JSON Formatter */}
                <Route path="/tools/json-formatter" element={<JsonFormatter />} />
                {/* 8. JSON Validator */}
                <Route path="/tools/json-validator" element={<JsonValidator />} />
                {/* 9. Base64 Encoder / Decoder */}
                <Route path="/tools/base64" element={<Base64Tool />} />
                <Route path="/tools/base64-encoder-decoder" element={<Navigate to="/tools/base64" replace />} />
                {/* 10. URL Encoder / Decoder */}
                <Route path="/tools/url-encoder" element={<UrlEncoderTool />} />
                <Route path="/tools/url-encoder-decoder" element={<Navigate to="/tools/url-encoder" replace />} />
                {/* 11. UUID Generator */}
                <Route path="/tools/uuid-generator" element={<UuidGenerator />} />
                {/* 12. Word Counter */}
                <Route path="/tools/word-counter" element={<WordCounter />} />
                {/* 13. Unit Converter */}
                <Route path="/tools/unit-converter" element={<UnitConverter />} />
                {/* 14. Date Calculator */}
                <Route path="/tools/date-calculator" element={<DateCalculator />} />
                {/* 15. QR Code Generator */}
                <Route path="/tools/qr-generator" element={<QrGenerator />} />
                <Route path="/tools/qr-code-generator" element={<Navigate to="/tools/qr-generator" replace />} />

                {/* Analytics Dashboard */}
                <Route path="/admin/analytics" element={<AnalyticsPage />} />

                {/* 404 Fallback */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}
