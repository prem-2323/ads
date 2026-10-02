# MasterTools Changelog

All notable changes to the MasterTools web utility platform will be documented in this file.

---

## [v1.0.0] - 2026-10-02

### Added
- **15 Client-Side Tools**: CGPA Calculator, GPA Calculator, Percentage Calculator, Attendance Calculator, Marks Calculator, Age Calculator, JSON Formatter, JSON Validator, Base64 Tool, URL Encoder, UUID Generator, Word Counter, Unit Converter, Date Calculator, and QR Code Generator.
- **Educational Blog System**: Comprehensive articles covering GPA calculation formulas, study strategies, JSON formatting, attendance thresholds, and date math.
- **Global Error Boundary**: React `ErrorBoundary` component to catch runtime exceptions and render a clean, friendly fallback UI without surfacing raw stack traces.
- **Privacy-First Google Analytics 4**: Dynamic GA4 integration with route-change tracking (`page_view`), tool open/complete events, and strict zero-PII safeguards.
- **Google AdSense Dual-State Manager**: Centralized configuration (`src/config/adsense.ts`) rendering placeholders in State A (unconfigured mode) and live responsive ad units in State B (approved mode).
- **Agentic AI Resource Discovery (ARD)**: Manifests at `ai-catalog.json`, `ard.json`, `llms.txt`, and `llms-full.txt` conforming to the ARD 1.0 specification.
- **Safe Local Storage Utility**: `src/utils/storage.ts` providing error-resilient storage wrappers for Favorites and Recently Used Tools.
- **Production Validation Suite**: `scripts/validate-project.js` verifying sitemap XML, robots.txt directives, AI catalog schemas, and environment security.
