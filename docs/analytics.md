# MasterTools — Analytics & Search Performance Setup Guide

This guide provides step-by-step instructions for configuring **Google Analytics 4 (GA4)** and verifying **Google Search Console** for MasterTools (`https://masterperi5.me/`).

---

## 1. Setting Up Google Analytics 4 (GA4)

### Step 1: Create a GA4 Property
1. Go to [Google Analytics](https://analytics.google.com/).
2. Log in with your Google account.
3. Click **Admin** (gear icon in the bottom left corner).
4. Click **+ Create Account** (or select your existing account and click **+ Create Property**).
5. Enter Property Name: `MasterTools`.
6. Set your reporting time zone and currency.
7. Click **Next** and select your business category (`Technology / Online Utilities`).
8. Click **Create**.

### Step 2: Set Up a Web Data Stream & Get Measurement ID
1. Choose platform: **Web**.
2. Enter Website URL: `https://masterperi5.me`
3. Enter Stream Name: `MasterTools Production`.
4. Click **Create stream**.
5. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`).

---

## 2. Environment Configuration

### Step 3: Add Measurement ID to Vercel Environment Variables
1. Log into your [Vercel Dashboard](https://vercel.com/).
2. Select the **MasterTools** project (`ads`).
3. Navigate to **Settings** → **Environment Variables**.
4. Add a new variable:
   - **Key**: `VITE_GA_MEASUREMENT_ID`
   - **Value**: `G-XXXXXXXXXX` (Replace with your actual GA4 Measurement ID)
   - **Environment**: Check `Production`, `Preview`, and `Development` (or Production only).
5. Click **Save**.

### Step 4: Local Testing (.env.local)
For local testing, create a file named `.env.local` in your project root:
```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```
> Note: `.env.local` is automatically ignored by Git to ensure credentials are never committed.

---

## 3. Verification & Deployment

### Step 5: Redeploy Application
On Vercel, trigger a new deployment or push a commit to apply the environment variable changes.

### Step 6: Verify Live Realtime Traffic
1. Open `https://masterperi5.me/` in your browser.
2. In Google Analytics, navigate to **Reports** → **Realtime**.
3. Confirm that your active session appears on the map and in the active users card.
4. Navigate to `/tools/cgpa-calculator` or `/blog` and verify `page_view` and `tool_open` events register in real time.

---

## 4. Viewing Reports in GA4

- **Page Views & Popular Content**: Navigate to **Reports** → **Engagement** → **Pages and screens**.
- **Custom Events (Tool Use, Copy, Downloads)**: Navigate to **Reports** → **Engagement** → **Events**.
- **Traffic Sources (Organic Search, Direct, Referrals)**: Navigate to **Reports** → **Acquisition** → **Traffic acquisition**.
- **Device & Browser Breakdown**: Navigate to **Reports** → **Tech** → **Tech details**.

---

## 5. Google Search Console & GA4 Integration

### How Search Console Connects
Google Search Console tracks organic search visibility, impressions, clicks, keyword rankings, and indexing status.

### Linking GSC to GA4 (Conceptual Setup)
1. Ensure `https://masterperi5.me/` is verified in Google Search Console.
2. In Google Analytics 4, go to **Admin** → **Product Links** → **Search Console Links**.
3. Click **Link**.
4. Select your verified Search Console property for `https://masterperi5.me/`.
5. Select your Web Stream (`MasterTools Production`).
6. Click **Submit**.

Once linked, GA4 will feature dedicated **Google Organic Search Traffic** and **Search Console** queries reports under the Acquisition menu.
