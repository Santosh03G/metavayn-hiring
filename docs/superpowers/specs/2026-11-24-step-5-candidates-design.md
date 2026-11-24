# Step 5: Candidates Experience & Application Funnel Design Specification

## Overview
The Candidate Experience at `/candidates` is the primary conversion engine of Metavayn. It empowers skilled Indian engineers to present their engineering qualifications, CAD/FEA/CFD proficiencies, and familiarity with US standards (ASHRAE, ASME, NFPA, IEEE) to connect with US client companies.

## Invariants & Design Principles
1. **Strict Amber Isolation:** `#F59E0B` (`variant="amber-cta"`, `.glow-amber`) is reserved **EXCLUSIVELY** for candidate resume submission actions.
2. **Mandatory Honest Disclosure:** Clear statements that Metavayn operates as an India-based recruitment firm connecting Indian talent with US clients. No US physical office claims, no visa sponsorship claims.
3. **US Terminology:** "Submit Your Resume" (never "CV"), "Candidate", "Engineering Recruiting Firm", "Compensation".
4. **URL Parameter Pre-Population:** Supports `?role=[roleId]` and `?discipline=[disciplineSlug]` query parameters to automatically pre-populate the applicant's target role or discipline.
5. **Mobile-First & Interactive:** Built with Angular 19+ reactive forms, signals, and shared UI primitives (`ButtonComponent`, `TiltCardDirective`, `RevealDirective`).

## Functional Components & Architecture
1. **Hero Header:**
   - Eyebrow: "Engineering Talent Network"
   - Heading: "Connect with US Engineering Teams from India"
   - Subtitle: "Match your technical skills in HVAC, Mechanical, Electrical, Data Center, and Simulation engineering with active US client opportunities."
   - Honest disclosure banner.

2. **Interactive Multi-Stage Application Funnel (`CandidatesComponent`):**
   - **Stage 1: Contact & Discipline:** Name, Email, Phone, Indian City/Location, Target Discipline (dropdown/radio), Target Specific Role (optional, prefilled from `?role=`).
   - **Stage 2: Technical Expertise & US Standards:** Experience tier (1-3y, 3-5y, 5-8y, 8+y), primary software tools (multi-select pills), US code familiarity checkboxes (ASHRAE, ASME, NFPA, IEEE, Uptime Institute).
   - **Stage 3: Resume, Portfolio & Declarations:** LinkedIn/Portfolio URL, Resume summary/file input, mandatory honest disclosures agreement.
   - **Action Buttons:** Back button (`variant="ghost"`), Next button (`variant="primary"`), Final submit button (`variant="amber-cta"`).
   - **Success State:** Instant reference code confirmation, timeline expectation (48-72h technical review), and link to browse illustrative roles.

3. **Candidate Journey & Vetting Process Section:**
   - 4-step timeline: Technical Profiling, US Standard Assessment, Direct Client Interview, High-Compensation Engagement.

4. **Candidate FAQ Section:**
   - Honest disclosures on visa status, remote engagement, US code training, and compensation.

## Test Coverage
- Initial form state and validation.
- Query param pre-population (`?role=hvac-lead-design`, `?discipline=mechanical`).
- Multi-step validation and stage transitions.
- Strict Amber CTA isolation.
- Honest disclosure checkbox enforcement.
- Submission handling and confirmation state.
