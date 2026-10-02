# MasterTools — System Architecture & Data Model

MasterTools (`https://masterperi5.me/`) is a high-performance, privacy-first web utility platform built with React 19, TypeScript, Vite 8, React Router v7, and Tailwind CSS v4.

---

## 1. Core Architectural Principles

1. **100% Client-Side Processing**: All calculations, grade averages, string formatting, conversions, and barcode generations execute entirely within local browser memory. Zero user inputs, marks, text, or dates of birth are transmitted to remote servers.
2. **Zero Mandatory Accounts**: All personalization (Favorites, Recently Used Tools, Theme Preferences) is managed via browser `localStorage` with safe fallback handling.
3. **Asynchronous & Non-Blocking Extensibility**: Third-party integrations (Google Analytics 4, AdSense) load asynchronously with single-script injection controls and fail silently if blocked or unconfigured.

---

## 2. Centralized Data Architecture

- **Tools Registry**: [`src/data/tools.ts`](file:///c:/Users/premk/OneDrive/Documents/mastertools/src/data/tools.ts) — Defines tool metadata (`id`, `name`, `slug`, `path`, `category`, `categories`, `iconName`, `metaTitle`, `metaDescription`, `about`, `howTo`, `formula`, `example`, `faqs`, `tags`, `relatedSlugs`).
- **Blog Content System**: [`src/data/blogPosts.ts`](file:///c:/Users/premk/OneDrive/Documents/mastertools/src/data/blogPosts.ts) — Contains educational guides, articles, structured FAQs, and related tool linkages.
- **Analytics Utility**: [`src/analytics/gtag.ts`](file:///c:/Users/premk/OneDrive/Documents/mastertools/src/analytics/gtag.ts) — Privacy-focused GA4 event dispatcher.
- **AdSense Configuration**: [`src/config/adsense.ts`](file:///c:/Users/premk/OneDrive/Documents/mastertools/src/config/adsense.ts) — Dual-state manager handling placeholder mode vs live AdSense mode.
- **Local Storage Utility**: [`src/utils/storage.ts`](file:///c:/Users/premk/OneDrive/Documents/mastertools/src/utils/storage.ts) — Safe storage wrappers for Favorites and History with fallback error handling.

---

## 3. Directory Layout

```text
mastertools/
├── docs/                      # Architectural & Maintenance Documentation
├── public/
│   ├── .well-known/           # Standard ARD and LLM discovery files
│   ├── ai-catalog.json        # Agentic Resource Discovery manifest
│   ├── ard.json               # ARD spec catalog
│   ├── llms.txt               # LLM markdown summary
│   ├── llms-full.txt          # Extended LLM documentation
│   ├── robots.txt             # Search crawler directives
│   └── sitemap.xml            # Production XML sitemap
├── scripts/
│   └── validate-project.js    # Production validation suite
├── src/
│   ├── analytics/             # Privacy-preserving GA4 analytics
│   ├── components/            # Reusable UI components & Error Boundary
│   ├── config/                # Centralized AdSense & environment configs
│   ├── context/               # Theme Context (Light / Dark mode)
│   ├── data/                  # Centralized tools and blog post data
│   ├── pages/                 # Public pages (Home, Tools, Blog, Legal, 404)
│   ├── tools/                 # Interactive client-side tool components
│   └── utils/                 # Safe storage & helper functions
└── vite.config.ts             # Vite build configuration
```
