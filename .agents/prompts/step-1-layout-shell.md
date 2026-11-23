STEP 1 - Layout shell.
- Navbar: Metavayn logo (create a modern SVG wordmark with a small hexagonal "M" node icon in blue/cyan), links: Home, Search Jobs, Job Categories, For Candidates, For Employers, Career Resources, About Us, Contact. Transparent over hero, becomes glass blur with shadow after scrolling, hides on scroll down and shows on scroll up. Animated underline on hover, active-route indicator. Right side: "Submit Your Resume" amber CTA. Mobile: full-screen animated menu with staggered links.
- Footer: midnight background, blueprint grid, 4 columns (brand + disclosure, Candidates, Employers, Company), social icons, and the disclosure text: "Metavayn is an India-based engineering recruitment company serving employers and engineering professionals in the United States." Add links to Privacy Policy and Terms (placeholders).
- Route transition: blue gradient panel wipes across on navigation (~0.7s) using Angular router animations; scroll resets to top.
- Add a page-load intro: logo pulse then fade out (max 1.2s, skip on revisit).

TEST: navbar states work on scroll, mobile menu opens/closes, transitions play between all routes, no layout jump.
