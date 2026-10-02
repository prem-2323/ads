# MasterTools — Manual Google AdSense Application Guide

This guide outlines the step-by-step procedure for submitting MasterTools (`https://masterperi5.me/`) for official Google AdSense review and approval.

---

## Step-by-Step Application Workflow

### Step 1: Create or Sign In to a Google AdSense Account
1. Visit the [Google AdSense Homepage](https://www.google.com/adsense/start/).
2. Click **Get Started** and log in with your primary Google account.

### Step 2: Add Your Website Domain
1. In the AdSense console, click **Sites** → **New Site**.
2. Enter your exact production URL: `https://masterperi5.me`.
3. Click **Save and Continue**.

### Step 3: Complete Site Verification
1. AdSense will display a snippet or verification method.
2. If using the HTML header code option:
   - Obtain your Publisher ID (`ca-pub-XXXXXXXXXXXXXXXX`).
   - Add `VITE_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXXXXXXXX` to Vercel Environment Variables.
   - Trigger a redeploy on Vercel.
3. Click **Verify** in the AdSense console.

### Step 4: Submit Site for Review
1. Ensure all payee details, address verification, and tax forms (if required) are filled in under **Payments** -> **Payments info**.
2. Click **Request Review**.

### Step 5: Wait for Google Editorial & Policy Review
- Google will automatically crawl and review `https://masterperi5.me/`.
- Review typically takes anywhere from a few days to two weeks.
- Do not make major structural modifications or remove core content while the site is under review.

### Step 6: Post-Approval Setup
Once approved:
1. Obtain your official Publisher ID (`ca-pub-XXXXXXXXXXXXXXXX`) and optional responsive Ad Slot IDs from the AdSense dashboard.
2. Update Vercel Environment Variables as detailed in [`docs/adsense-live-setup.md`](file:///c:/Users/premk/OneDrive/Documents/mastertools/docs/adsense-live-setup.md).
3. Generate and deploy `public/ads.txt` with your verified publisher ID.
