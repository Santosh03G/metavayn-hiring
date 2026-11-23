# Metavayn - Engineering Recruitment Firm

> **Connecting exceptional Indian engineering talent with US companies shaping the future.**

Metavayn is an India-based engineering recruitment firm specializing in sourcing, screening, and placing premier Indian engineering professionals with innovative companies across the United States. We bridge the transatlantic talent gap in critical technical disciplines including HVAC & Thermal Engineering, Mechanical Systems, Electrical Engineering, Data Center Infrastructure, and Advanced Engineering Analysis.

---

## Technical Stack & Architecture

- **Framework**: [Angular 21](https://angular.dev/) (Standalone components, Zoneless-compatible architecture, Signals)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) with custom design system variables, glassmorphism utilities, and blueprint grid textures
- **Typography**: [Sora](https://fonts.google.com/specimen/Sora) (Headings) and [Inter](https://fonts.google.com/specimen/Inter) (Body & UI)
- **Animation & Motion**:
  - [GSAP (GreenSock)](https://greensock.com/gsap/) with [ScrollTrigger](https://greensock.com/scrolltrigger/)
  - [Lenis](https://lenis.darkroom.engineering/) for 60fps smooth scrolling synchronized to GSAP's ticker
  - Interactive magnetic buttons and 3D perspective tilt directives
  - Full `prefers-reduced-motion` compliance and SSR-safe execution
- **Testing**: [Vitest](https://vitest.dev/) via `@analogjs/vite-plugin-angular`
- **Language & Routing**: Strict TypeScript 5.9, 100% lazy-loaded route architecture

---

## Design System & Color Tokens

Metavayn adheres to a dark, immersive midnight theme transitioning into clean ice/white sections with electric cyan accents:

| Token | Hex Value | Usage |
| :--- | :--- | :--- |
| `midnight` | `#0A1330` | Core background, deep night atmosphere |
| `navy` | `#0F1E4A` | Secondary background, card surfaces |
| `royal` | `#1D4ED8` | Structural accents, deep badges |
| `electric`| `#3B82F6` | Primary interactive highlights, focus rings, links |
| `cyan` | `#22D3EE` | Glow effects, subheadings, decorative gradients |
| `ice` | `#EAF2FF` | Light section backgrounds, high-contrast panels |
| `ink` | `#0F172A` | Primary typography on light surfaces |
| `slate` | `#475569` | Secondary typography, metadata |
| **`amber`** | **`#F59E0B`** | **Strictly isolated exclusively for the primary "Submit Your Resume" CTA** |

---

## Route Skeleton & Living Sandbox

The application contains 10 lazy-loaded routes designed for maximum performance and minimal initial bundle size:

- `/` — **Home / Living Sandbox**: Showcases design tokens, magnetic CTA buttons, 3D tilt cards, animated stat counters, and typography hierarchy.
- `/jobs` — **Job Listings**: Illustrative technical role listings across engineering domains.
- `/jobs/:id` — **Job Details**: In-depth role descriptions, requirements, and US candidate application pathways.
- `/categories` — **Job Categories**: Specialized engineering disciplines (HVAC, Mechanical, Electrical, Data Center, Analysis).
- `/candidates` — **Candidates**: Application workflows, resume submissions, and candidate resources.
- `/employers` — **Employers**: US employer engagement, hiring solutions, and talent partnership models.
- `/resources` — **Resources**: Industry insights, interview preparation, and technical whitepapers.
- `/about` — **About**: Metavayn mission, core values, leadership, and honest India-to-US placement positioning.
- `/contact` — **Contact**: Inquiries, office location in India, and direct communication channels.
- `/**` — **Not Found**: Branded 404 error page with safe navigation fallback.

---

## Getting Started

### Prerequisites

- Node.js (v20+ recommended)
- npm (v10+)

### Installation

```bash
git clone https://github.com/Santosh03G/metavayn-hiring.git
cd metavaynhiring
npm install
```

### Development Server

Run the local development server at `http://localhost:4200/`:

```bash
npm start
# or
ng serve
```

### Unit Tests

Run the full Vitest test suite:

```bash
npm test -- --watch=false
```

### Production Build

Compile the production bundle with ahead-of-time (AOT) optimizations:

```bash
npm run build
```

Artifacts are output to the `dist/metavayn` directory.

---

## Brand & Recruitment Terminology Standards

To maintain authentic US recruitment industry positioning:
- Always use **"Submit Your Resume"** (never "CV").
- Always use **"Candidate"** and **"Engineering Recruiting Firm"**.
- Always use **"Apply Now"**, **"Compensation"**, and **"Talent Acquisition Specialist"**.
- Metavayn is transparently positioned as an India-based recruitment firm connecting skilled candidates with US companies. No false claims of US offices, visa sponsorship guarantees, or direct employer affiliations.

---

## License

Private and confidential — Metavayn. All rights reserved.
