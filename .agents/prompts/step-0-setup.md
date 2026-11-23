STEP 0 - Setup.
Keep the Angular project in the opened folder root (do not create a nested metavayn/metavayn subfolder).

1. Give me the exact CLI commands to create the Angular app "metavayn" (standalone, routing, SCSS) and install Tailwind, gsap, lenis, lucide-angular.
2. Configure Tailwind theme with the Metavayn palette, fonts (Sora, Inter), and custom utilities: .glass, .glow-cyan, .blueprint-grid, .text-gradient.
3. Create global styles + CSS variables.
4. Create these reusable standalone components in /shared:
   - ButtonComponent (variants: primary, ghost, amber-cta; magnetic hover)
   - SectionHeadingComponent (eyebrow + title + subtitle, reveal animation)
   - RevealDirective ([appReveal] using GSAP ScrollTrigger, stagger option)
   - TiltCardDirective ([appTilt])
   - CounterComponent (animated number on scroll)
5. Create SmoothScrollService (Lenis + GSAP ticker sync).
6. Set up routes (lazy-loaded) with empty placeholder pages for: home, jobs, jobs/:id, categories, candidates, employers, resources, about, contact.

TEST: app runs, each route shows its placeholder, fonts and colours load, scroll feels smooth.
