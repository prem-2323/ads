# MasterTools

> **Free Tools. Simple. Fast. Useful.**  
> Official Domain: **[masterperi5.me](https://masterperi5.me)**

MasterTools is a high-performance, privacy-first web utility suite providing free online calculators, academic converters, developer tools, and productivity utilities. Designed without intrusive tracking, bloated dependencies, or paywalls, all calculations execute entirely within the client's browser.

---

## 🌟 Key Features

- **🎓 Academic & Student Tools:**
  - **CGPA Calculator:** Weighted grade point average calculation based on credits and standard 10-point college scales.
  - **Percentage Calculator:** Instant exam percentage computation, fraction ratio, and grade classifications.
  - **Attendance Calculator:** Proactive lecture attendance tracker informing students exactly how many classes can be safely missed or must be attended to meet minimum institutional cutoffs (e.g. 75% or 80%).
- **🔢 Calculator Utilities:**
  - **Age Calculator:** Precise chronological age breakdown (Years, Months, Days), total days lived, and countdown to next birthday.
- **💻 Developer Utilities:**
  - **JSON Formatter & Validator:** Client-side JSON beautifier, validator, and minifier with 2/4-space indentation and instant syntax error diagnostics.
- **📚 Productivity Utilities:**
  - **Word & Character Counter:** Real-time word, character (with and without spaces), sentence, paragraph, and reading time analyzer.
- **⚡ Performance & Privacy:**
  - 100% Client-side execution (no database, no backend logging, no external API latency).
  - Dark mode with persistent `localStorage` preference and system scheme fallback.
  - Full keyboard accessibility, semantic HTML, and responsive mobile breakpoints.
  - SEO-optimized with dynamic OpenGraph cards, Twitter cards, and Schema.org JSON-LD structured data.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript
- **Bundler / Build Tool:** Vite 8
- **Routing:** React Router v7 (`react-router-dom`)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons:** Lucide React (`lucide-react`)
- **Deployment Platform:** Vercel (or static hosting) with SPA rewrites

---

## 🚀 Getting Started

### Prerequisites

Ensure you have Node.js (version 18+ recommended) and npm installed.

### Installation

Clone the repository and install the dependencies:

```bash
npm install
```

### Local Development

Start the local development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000` (or the port specified by Vite).

### Production Build

To compile a production-ready static build:

```bash
npm run build
```

This generates optimized static HTML, CSS, and JS bundles inside the `dist/` directory.

To test the production build locally:

```bash
npm run preview
```

---

## 📁 Project Structure

```text
mastertools/
├── public/
│   ├── favicon.svg          # MasterTools brand initials SVG favicon
│   ├── robots.txt           # Search engine crawling rules
│   └── sitemap.xml          # XML Sitemap for search engines
├── src/
│   ├── components/
│   │   ├── AdSlot.tsx       # Reusable AdSense placeholder component
│   │   ├── Breadcrumb.tsx   # Accessible breadcrumb trail
│   │   ├── CategoryCard.tsx # Category link card
│   │   ├── FAQ.tsx          # Collapsible FAQ section with schema
│   │   ├── Footer.tsx       # Semantic footer with legal links
│   │   ├── Navbar.tsx       # Responsive navbar with search & dark mode toggle
│   │   ├── SearchBar.tsx    # Instant client-side search with keyboard nav
│   │   ├── SEO.tsx          # Dynamic title, OG, and JSON-LD injector
│   │   ├── ToolCard.tsx     # Clean unboxed tool directory card
│   │   ├── ToolIcon.tsx     # Lucide icon mapper
│   │   └── ToolLayout.tsx   # Reusable layout template for all tool pages
│   ├── context/
│   │   └── ThemeContext.tsx # Dark / Light theme provider with localStorage
│   ├── data/
│   │   ├── blogPosts.ts     # In-depth educational guides and articles
│   │   └── tools.ts         # Centralized registry of all tools and metadata
│   ├── pages/
│   │   ├── AboutPage.tsx    # Platform overview and mission
│   │   ├── BlogPage.tsx     # Blog directory and article reader
│   │   ├── ContactPage.tsx  # Contact info and mailto client integration
│   │   ├── Home.tsx         # Homepage with hero, categories, and popular tools
│   │   ├── NotFoundPage.tsx # 404 error page with quick links
│   │   ├── PrivacyPolicyPage.tsx # Compliant privacy policy
│   │   ├── TermsPage.tsx    # Terms of Service & calculation disclaimer
│   │   └── ToolsPage.tsx    # Filterable tool directory with search
│   ├── tools/
│   │   ├── AgeCalculator.tsx
│   │   ├── AttendanceCalculator.tsx
│   │   ├── CgpaCalculator.tsx
│   │   ├── JsonFormatter.tsx
│   │   ├── PercentageCalculator.tsx
│   │   └── WordCounter.tsx
│   ├── App.tsx              # Router definitions and layout wrapper
│   ├── index.css            # Tailwind CSS v4 directives & theme styles
│   └── main.tsx             # Application bootstrap
├── metadata.json
├── package.json
├── tsconfig.json
├── vercel.json              # SPA routing rewrites for Vercel
├── vite.config.ts
└── README.md
```

---

## 🌐 Deployment to Vercel

The application is pre-configured for one-click deployment to [Vercel](https://vercel.com):

1. **Push to Git:** Push this repository to GitHub, GitLab, or Bitbucket.
2. **Import Project:** In your Vercel Dashboard, click **Add New > Project** and import the repository.
3. **Build & Output Settings:**
   - **Framework Preset:** Vite
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. **Deploy:** Click **Deploy**. Vercel will automatically build and publish the website.
5. **SPA Rewrites:** The included `vercel.json` ensures that deep URLs (like `/tools/cgpa-calculator` or `/blog`) correctly resolve to `/index.html` without 404 errors on direct navigation or page refresh.

---

## 🔗 Custom Domain Setup: `masterperi5.me`

To link your custom domain `masterperi5.me` to your Vercel deployment:

1. **Open Domain Settings on Vercel:**
   - Navigate to your project on the Vercel Dashboard.
   - Go to **Settings > Domains**.
   - Enter `masterperi5.me` and click **Add**.
   - Also add `www.masterperi5.me` (Vercel will offer to set up an automatic 301 redirect to `masterperi5.me`).
2. **Configure DNS Records at Domain Registrar:**
   - Access your domain registrar's DNS management console (e.g. Namecheap, GoDaddy, Cloudflare, Hostinger).
   - Add the following DNS records:
     - **Apex / Root Domain (`@` or `masterperi5.me`):**
       - **Type:** `A`
       - **Name:** `@`
       - **Value:** `76.76.21.21` (Vercel Anycast IP)
       - **TTL:** Automatic or 3600
     - **Subdomain (`www`):**
       - **Type:** `CNAME`
       - **Name:** `www`
       - **Value:** `cname.vercel-dns.com`
       - **TTL:** Automatic or 3600
3. **SSL Certificate Provisioning:**
   - Once DNS records propagate (typically 5 to 30 minutes), Vercel automatically issues and renews a free Let's Encrypt SSL/TLS certificate for `masterperi5.me`.

---

## 📢 Future Google AdSense Integration

The website is architected for monetization via Google AdSense without degrading user experience or triggering policy violations.

### Where the Integration Goes

All advertising slots are isolated inside the reusable component:
`src/components/AdSlot.tsx`

When your Google AdSense account is approved:

1. **Add AdSense Script to `index.html`:**
   Insert your Google AdSense script into `<head>`:
   ```html
   <script
     async
     src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
     crossorigin="anonymous">
   </script>
   ```

2. **Update `src/components/AdSlot.tsx`:**
   Replace the dashed placeholder container with the official Google AdSense `<ins>` tag:
   ```tsx
   import React, { useEffect } from 'react';

   declare global {
     interface Window {
       adsbygoogle?: any[];
     }
   }

   export const AdSlot: React.FC<AdSlotProps> = ({ size = 'banner', slotId }) => {
     useEffect(() => {
       try {
         (window.adsbygoogle = window.adsbygoogle || []).push({});
       } catch (e) {
         console.error('AdSense error:', e);
       }
     }, []);

     return (
       <div className={`ad-wrapper ${sizeStyles[size]}`}>
         <ins
           className="adsbygoogle"
           style={{ display: 'block' }}
           data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
           data-ad-slot={slotId}
           data-ad-format="auto"
           data-full-width-responsive="true"
         />
       </div>
     );
   };
   ```

### Advertising Quality Guidelines Enforced

- No pop-ups or full-screen overlays.
- No fake download, start, or install buttons.
- No misleading system notifications or deceptive placements.
- Ample space between clickable calculator controls and ad units.

---

## 🗺️ Phase 2 Roadmap

- [ ] **SEO Expansion:** Dynamic sitemap generation during build, long-tail programmatic pages for academic grading scales by university.
- [ ] **Phase 2 Tools:**
  - GPA to Percentage Converter
  - Loan & EMI Calculator
  - Markdown to HTML Converter
  - Base64 Encoder / Decoder
  - Unix Timestamp Converter
- [ ] **Web Analytics:** Integration of lightweight, privacy-respecting analytics (e.g. Cloudflare Web Analytics or Plausible).
- [ ] **Legitimate Ad Monetization:** AdSense site review submission, `ads.txt` placement in `/public/ads.txt`, and placement yield testing.
