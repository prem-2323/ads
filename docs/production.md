# MasterTools — Production Deployment, Security & Reliability Guide

This document outlines deployment procedures, error handling, security auditing, and reliability controls implemented across MasterTools (`https://masterperi5.me/`).

---

## 1. Production Error Boundaries & Reliability

- **Global React Error Boundary**: Located at [`src/components/ErrorBoundary.tsx`](file:///c:/Users/premk/OneDrive/Documents/mastertools/src/components/ErrorBoundary.tsx).
- **User Experience**: If an unhandled React rendering exception occurs, users are presented with a friendly fallback screen ("Something Went Wrong. Try Again or Return to Homepage") without exposing raw JavaScript stack traces, internal paths, or file names.
- **Input Robustness**: All calculators incorporate numerical checks (`isNaN`, `isFinite`, non-negative credit/mark constraints) to prevent `NaN` or `Infinity` from rendering in the UI.

---

## 2. Environment Variables & Security Rules

1. **Client-Visible Scope (`VITE_*`)**:
   - `VITE_GA_MEASUREMENT_ID`: Google Analytics 4 Measurement ID (`G-XXXXXXXXXX`).
   - `VITE_ADSENSE_PUBLISHER_ID`: Google AdSense Publisher ID (`ca-pub-XXXXXXXXXXXXXXXX`).
   - `VITE_AD_SLOT_*`: Ad slot IDs for responsive ad placements.
2. **Secrets Protection**:
   - Never place API secret keys, database credentials, or OAuth secrets in `VITE_*` variables.
   - All `.env*` files are strictly ignored by `.gitignore` (except `.env.example`).

---

## 3. Build & Deployment Commands

- **Build Production Bundle**:
  ```bash
  npm run build
  ```
- **Type Checking & Linting**:
  ```bash
  npm run lint
  ```
- **Run Validation Suite**:
  ```bash
  node scripts/validate-project.js
  ```
