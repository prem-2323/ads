# MasterTools — Live AdSense Integration & Deployment Guide

This guide details how to transition MasterTools from **Placeholder Mode (State A)** to **Live AdSense Mode (State B)** once your website is officially approved by Google AdSense.

---

## Technical Architecture Overview

MasterTools uses a centralized AdSense configuration system located at [`src/config/adsense.ts`](file:///c:/Users/premk/OneDrive/Documents/mastertools/src/config/adsense.ts).

- **State A (Unconfigured / Placeholder)**: If `VITE_ADSENSE_PUBLISHER_ID` is absent or unconfigured, all `<AdSlot />` components display subtle, responsive placeholders without injecting third-party scripts or making external network calls.
- **State B (Live Mode)**: Once `VITE_ADSENSE_PUBLISHER_ID` is set to a valid Publisher ID (`ca-pub-XXXXXXXXXXXXXXXX`), the system dynamically loads the official Google AdSense script (`gtag / adsbygoogle.js`) once and renders active responsive `<ins className="adsbygoogle" ...>` units.

---

## Deployment Instructions

### 1. Configure Vercel Environment Variables
In your Vercel Dashboard, navigate to **Project Settings** → **Environment Variables** and add:

```env
VITE_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXXXXXXXX
VITE_AD_SLOT_HOME=XXXXXXXXXX
VITE_AD_SLOT_TOOL=XXXXXXXXXX
VITE_AD_SLOT_ARTICLE=XXXXXXXXXX
VITE_AD_SLOT_SIDEBAR=XXXXXXXXXX
```

### 2. Configure `ads.txt`
Once your AdSense account is active, create `public/ads.txt` in your project root with your verified Publisher ID:

```text
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
```

> **IMPORTANT**: Replace `pub-XXXXXXXXXXXXXXXX` with your exact numeric AdSense Publisher ID (without the `ca-` prefix).

### 3. Deploy & Verify Live Ad Serving
1. Trigger a production deployment on Vercel (`git push` or Manual Redeploy).
2. Open `https://masterperi5.me/ads.txt` in your browser and verify it returns your publisher line.
3. Open `https://masterperi5.me/` and check browser Developer Tools to confirm responsive AdSense units load cleanly without console errors or layout shifts.
