# Step 8: Final Deployment Readiness & Production Polish Design Specification

## Overview
Step 8 prepares Metavayn for turnkey cloud deployment on Vercel. It guarantees that the Single Page Application (SPA) routing, search engine optimization (SEO), social media sharing graph (OpenGraph), caching headers, sitemap, and robots directives are configured for production readiness.

## Invariants & Design Principles
1. **SPA Route Handling:** All client-side routes (`/jobs`, `/jobs/:id`, `/categories`, `/categories/:slug`, `/candidates`, `/employers`, `/about`, `/resources`, `/contact`) must seamlessly resolve via SPA rewrites to `/index.html` on Vercel without 404 errors on direct navigation or refresh.
2. **SEO & Social Graph:** Proper title, description, OpenGraph tags, and Twitter Cards to represent Metavayn as a recruitment firm connecting Indian talent with US industry.
3. **Strict Amber Isolation & US Terminology:** All meta descriptions and tags preserve honest disclosures and US terminology.
4. **Performance & Caching:** Static hashed assets (`.js`, `.css`) configured with long-term immutable caching (`max-age=31536000`), while HTML/media assets use sensible revalidation policies.

## Deliverables
1. **`src/index.html`:** Complete meta tags (title, description, keywords, viewport, OpenGraph, Twitter card, theme-color).
2. **`public/robots.txt`:** Crawl rules pointing to sitemap.
3. **`public/sitemap.xml`:** Full XML sitemap indexing all 17 public routes.
4. **`vercel.json`:** Vercel deployment specification with `outputDirectory: dist/metavayn/browser`, SPA rewrites, cleanUrls, and cache headers.
