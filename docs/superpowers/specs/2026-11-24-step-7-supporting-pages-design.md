# Step 7: Supporting Pages Experience (`/about`, `/resources`, `/contact`) Design Specification

## Overview
Step 7 implements the three supporting destination pages that complete Metavayn's corporate narrative, educational thought leadership, and direct inquiry channels:
1. **About Page (`/about`):** Articulates the firm's origin, India-based engineering roots, authentic US code standards, and transparent operations disclosures.
2. **Resources Page (`/resources`):** Features technical guides, US code compliance whitepapers (ASHRAE, ASME, NFPA, IEEE), compensation benchmarks, and remote engineering collaboration playbooks.
3. **Contact Page (`/contact`):** Provides transparent communication channels, operational hours (IST/EST overlap), location transparency (India hubs), interactive general inquiry form with validation, and direct candidate/employer pathways.

## Invariants & Design Principles
1. **Strict Amber Isolation:** `#F59E0B` (`variant="amber-cta"`, `.glow-amber`) is reserved **EXCLUSIVELY** for the candidate conversion "Submit Your Resume" button. All employer/general contact buttons use `variant="primary"` (Royal/Electric Blue).
2. **Mandatory Honest Disclosure:** Operations are based in India; Metavayn is an engineering recruitment firm. No claims of physical US branch offices, no visa sponsorship claims.
3. **US Terminology:** "Compensation", "Candidate", "Engineering Recruiting Firm", "Submit Your Resume".
4. **Mobile-First & Interactive:** Built with Angular 19+ standalone components, signals, shared UI primitives (`ButtonComponent`, `TiltCardDirective`, `RevealDirective`).

## Functional Components & Architecture

### 1. About (`AboutComponent` at `/about`)
- Hero with mission statement and transparent operations notice.
- 4 Core Principles: Technical Depth, Cross-Border Transparency, US Code Rigor, Mutual Respect.
- Operations & Delivery model (India tech hubs, EST/PST overlap).
- Dual conversion CTA (Amber isolated candidate button, Primary employer button).

### 2. Resources (`ResourcesComponent` at `/resources`)
- Hero with educational positioning.
- Category filter tabs (`all`, `us-codes`, `remote-work`, `compensation`).
- Curated technical guides across HVAC, Mechanical, Electrical, Simulation, and Compensation.
- Dual conversion CTA (Amber isolated candidate button, Primary employer button).

### 3. Contact (`ContactComponent` at `/contact`)
- Hero with communication channels and honest operating location details.
- Direct contact cards (Candidates: `hiring@metavayn.com`, Employers: `partners@metavayn.com`, Hours: 9 AM - 8 PM IST with US overlap).
- Interactive General Inquiry Form (Name, Email, Inquiry Type, Message) with real-time validation and confirmation reference (`MV-MSG-[TIMESTAMP]`).
- Fast-track direct pathway cards (Amber isolated candidate button, Primary employer button).

## Test Coverage
- Unit tests for all three components:
  - `AboutComponent`: Honest operations notice, core principles rendering, strict Amber isolation.
  - `ResourcesComponent`: Resource cards rendering, category tab filtering, reading times/tags.
  - `ContactComponent`: Contact info rendering, inquiry form validation, confirmation state, strict Amber isolation.
