# Step 8: Final Deployment Readiness & Production Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the complete production deployment configuration, including SEO meta tags, social graph tags, `robots.txt`, XML `sitemap.xml`, and Vercel cloud deployment specification (`vercel.json`) with SPA routing rewrites and caching headers.

**Tech Stack:** Angular 19+ SPA, Vercel Build Platform, OpenGraph / Twitter Cards.

**Spec:** `docs/superpowers/specs/2026-11-24-step-8-deployment-design.md`

## Global Constraints

- **SPA Rewrites:** All paths must resolve to `/index.html` on Vercel.
- **Strict Amber Isolation & Honest Disclosures:** Meta copy reinforces Metavayn's honest positioning as an India-based engineering recruitment firm.
- **Production Build:** `npm run build` must succeed with zero errors.

---

### Task 1: Production Meta Tags, Robots.txt & Sitemap.xml

**Files:**
- Modify: `src/index.html`
- Create: `public/robots.txt`
- Create: `public/sitemap.xml`

- [ ] **Step 1: Update `src/index.html` with production SEO & OpenGraph tags**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Metavayn | Engineering Recruitment Firm Connecting Indian Talent with US Industry</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Metavayn connects skilled Indian engineers across HVAC, Mechanical, Electrical, Data Center, and Simulation engineering with active US client opportunities.">
  <meta name="keywords" content="Engineering recruitment, HVAC engineers India, Mechanical design US standards, Electrical power distribution engineers, Data center infrastructure, FEA CFD simulation India">
  <meta name="theme-color" content="#0A0F1D">

  <!-- OpenGraph -->
  <meta property="og:title" content="Metavayn | Engineering Recruitment Firm Connecting Indian Talent with US Industry">
  <meta property="og:description" content="Deploy specialized mechanical, HVAC, electrical, data center, and simulation engineers vetted for authentic US codes and CAD/BIM tooling.">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Metavayn">
  <meta property="og:locale" content="en_US">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Metavayn | Engineering Recruitment Firm Connecting Indian Talent with US Industry">
  <meta name="twitter:description" content="Connecting Indian engineering talent with US companies across HVAC, Mechanical, Electrical, and Simulation sectors.">

  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Sora:wght@500;600;700&display=swap" rel="stylesheet">
</head>
<body class="bg-midnight text-white antialiased selection:bg-cyan selection:text-midnight">
  <app-root></app-root>
</body>
</html>
```

- [ ] **Step 2: Create `public/robots.txt`**

```txt
User-agent: *
Allow: /

Sitemap: https://metavayn.com/sitemap.xml
```

- [ ] **Step 3: Create `public/sitemap.xml`**

Listing all 17 routes:
- `/`
- `/jobs`
- `/jobs/hvac-lead-design`
- `/jobs/mechanical-machine-design`
- `/jobs/electrical-power-distribution`
- `/jobs/datacenter-electrical-lead`
- `/jobs/mechanical-fea-cfd`
- `/categories`
- `/categories/hvac-thermal`
- `/categories/mechanical`
- `/categories/electrical`
- `/categories/data-center`
- `/categories/engineering-analysis`
- `/candidates`
- `/employers`
- `/about`
- `/resources`
- `/contact`

- [ ] **Step 4: Commit Task 1 changes**

```powershell
git add src/index.html public/
git commit -m "feat(seo): add production meta tags, OpenGraph social graph, robots.txt, and sitemap.xml"
```

---

### Task 2: Vercel Deployment Configuration (`vercel.json`)

**Files:**
- Create: `vercel.json`

- [ ] **Step 1: Create `vercel.json`**

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "buildCommand": "npm run build",
  "outputDirectory": "dist/metavayn/browser",
  "cleanUrls": true,
  "trailingSlash": false,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)\\.(js|css)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*)\\.(ico|png|jpg|jpeg|svg|webp|woff|woff2)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=86400, stale-while-revalidate=604800"
        }
      ]
    }
  ]
}
```

- [ ] **Step 2: Verify `npm run build` output bundle**

```powershell
npm run build
```
Confirm `dist/metavayn/browser` contains `index.html`, `robots.txt`, `sitemap.xml`, `favicon.ico`, and hashed bundle assets.

- [ ] **Step 3: Commit Task 2 changes**

```powershell
git add vercel.json
git commit -m "feat(deploy): add vercel.json deployment configuration with SPA rewrites and caching headers"
```

---

### Task 3: End-to-End Verification, Whole-Branch Review & Remote Push

**Files:**
- Verification only

- [ ] **Step 1: Run full unit test suite**

```powershell
npm test -- --watch=false
```
Expected: 100% pass across all test suites.

- [ ] **Step 2: Run production build**

```powershell
npm run build
```
Expected: Production build succeeds with 0 errors.

- [ ] **Step 3: Whole-branch review and merge**

```powershell
git checkout main
git merge --ff-only step-8-deployment
git push origin main step-8-deployment
```
