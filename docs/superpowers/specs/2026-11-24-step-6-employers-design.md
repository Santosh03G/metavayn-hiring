# Step 6: Employers / Hiring Partners Experience Design Specification

## Overview
The Employers Experience at `/employers` serves US engineering leaders, EPC firms, OEMs, and data center operators seeking skilled Indian engineering talent. It articulates Metavayn's value proposition: technical vetting against authentic US standards (ASHRAE, ASME, NFPA, IEEE), software mastery, and flexible remote engagement models.

## Invariants & Design Principles
1. **Strict Amber Isolation:** `#F59E0B` (`variant="amber-cta"`, `.glow-amber`) is reserved **EXCLUSIVELY** for candidate resume submission actions. All employer inquiry CTAs use `variant="primary"` (Royal/Electric Blue with `.glow-cyan`).
2. **Mandatory Honest Disclosure:** Operations are India-based; Metavayn is an Indian recruitment firm providing cross-border engineering talent for remote/offshore engagements. Zero false claims of US physical offices or direct employer partnerships.
3. **US Terminology:** "Compensation", "Candidate", "Engineering Recruiting Firm", "Submit Your Resume" (if referencing candidates).
4. **Mobile-First & Interactive:** Built with Angular 19+ standalone components, reactive forms/signals, shared UI primitives (`ButtonComponent`, `TiltCardDirective`, `RevealDirective`).

## Functional Components & Architecture
1. **Hero Header:**
   - Eyebrow: "For US Engineering Leaders & Hiring Teams"
   - Heading: "Scale US Engineering Capacity with Vetted Indian Talent"
   - Subtitle: "Deploy specialized mechanical, HVAC, electrical, data center, and simulation engineers trained in authentic US codes and CAD/BIM tooling."
   - Honest disclosure notice banner.
   - Primary CTA: "Request Engineering Talent" (anchors to inquiry form) and secondary "Explore Disciplines".

2. **Core Value Pillars:**
   - 4 value propositions: US Standard Mastery, Turnkey Tool Proficiency, Cost & Velocity Advantage, Timezone-Optimized Collaboration.

3. **Engineering Disciplines Capabilities:**
   - 5 discipline capability cards showing sample deliverables and US code alignment.

4. **Engagement Workflow:**
   - 4-step hiring process: Technical Discovery -> Rigorous Skill Screening -> Client Video Interviews -> Streamlined Remote Onboarding.

5. **Interactive Talent Request Intake Form (`EmployersComponent`):**
   - Company Name, Contact Name, Business Email, Phone.
   - Primary Discipline Needed (multi-select or dropdown).
   - Headcount Needed ("1-2 Engineers", "3-5 Engineers", "5+ Engineers / Full Team").
   - Engagement Model ("Dedicated Remote", "Project Surge", "Direct Placement").
   - Project / Specification Overview (textarea).
   - Submit button: `<app-button variant="primary" type="submit">Submit Talent Request</app-button>` (strictly `variant="primary"`!).
   - Confirmation State: Generated inquiry reference (`MV-EMP-[TIMESTAMP]`) and 24h follow-up expectation.

6. **Employer FAQs:**
   - Timezone overlap, IP security & confidentiality, billing models in USD, India-based recruitment firm structure.

7. **Candidate Secondary Card:**
   - Dual-conversion balance card at bottom: "Are you an engineer looking to work with US clients?" with `<app-button variant="amber-cta" href="/candidates">Submit Your Resume</app-button>` (Strict Amber Isolation preserved!).
