Fresh Market
Same-day grocery delivery from trusted local stores to your door.
A production-quality frontend web application built across 3 structured phases using HTML5, CSS3, and Vanilla JavaScrip

📋 Table of Contents
About The Project
Live Demo
Built With
Features
Project Structure
Getting Started
Development Journey
Responsive Design
Performance
Accessibility
Browser Support
Roadmap
Contributing
License
Contact


📖 About The Project
Fresh Market is a same-day grocery delivery landing page designed and built to production standards. The goal was to create a frontend that doesn't just look like a concept — but feels like a real product a funded startup would ship.
The project was built intentionally across 3 phases, each with a specific goal: making the product credible, making it functional, then making it production-ready. This mirrors how real product teams approach feature development.

🎯 Why This Project?
Most beginner projects feel like demos. This one was built to answer the same questions a real user would ask when landing on a grocery delivery site:
User QuestionSection That Answers It"Can I trust this?"Trust bar + partner logos"How does it work?"How it works section"What can I buy?"Featured products grid"Does it deliver to me?"Coverage checker"What does delivery cost?"Pricing section"Is there an app?"App download section"Any questions answered?"FAQ accordion"What if I'm not ready yet?"Newsletter with discount
That's product thinking — not just coding.

🎬 Live Demo
Live Site: [fresh-Market.netlify.app](https://tonyfresh-market.netlify.app/)
GitHub Repo: github.com/yourusername/freshbasket-market
Screenshots
MobileTabletDesktopShow ImageShow ImageShow Image

🛠️ Built With
This project uses zero external frameworks or dependencies — pure web fundamentals only.
Core Technologies
TechnologyVersionPurposeHTML5—Semantic document structureCSS3—Layout, animations, responsive designJavaScriptES6+Interactivity and DOM manipulationFont Awesome6.4.0Icon library
Key Web APIs Used
APIPurposeIntersectionObserverEfficient scroll-triggered animationsCSS Custom PropertiesConsistent theming across componentsCSS GridTwo-dimensional section layoutsFlexboxOne-dimensional component layoutsCSS AnimationsMarquee scroll, float, pulse effectsCSS @keyframesCounter, fade, slide animationsForm Validation APINative email validation with custom feedback
Why No Framework?
This project was deliberately built without React, Vue, or any other framework to demonstrate:

Deep understanding of fundamentals — what frameworks abstract away
Zero dependency footprint — ~30KB total bundle size
Maximum portability — works anywhere, no build step required
Interview readiness — showing core JS knowledge, not just framework knowledge


✨ Features
Phase 1 — Credibility & Core Sections
FeatureDescriptionAnimated Trust BarCounters animate to target values on scroll (4.9★ / 50,000+ orders / 200+ stores / 30+ cities)Product Showcase8-product grid with filter tabs (All / Fresh / Pantry / Dairy / Frozen)Add to CartButton animates to ✓, toast notification slides in from bottomDelivery Pricing3-tier pricing cards (Free / Standard ₦500 / Express ₦1,200) with "Most Popular" badgeFAQ Accordion6 questions, one open at a time, fully keyboard accessibleEnhanced Footer4-column layout with social links, company/support/contact columns, legal barScroll AnimationsAll major elements fade up on scroll via IntersectionObserverHeader Scroll EffectGlass blur effect triggers after 50px scrollBack to Top ButtonAppears at 400px scroll, smooth scrolls backFloating Mobile CTASticky "Shop Now" button on mobile only
Phase 2 — Functionality & Conversion
FeatureDescriptionPartner Logo StripInfinite CSS marquee scroll, pauses on hover, fade edges via pseudo-elementsCoverage CheckerInput → 800ms loading state → 3 result types (available / coming soon / not covered)App Download SectionCSS-only floating phone mockup with @keyframes float animationApp Store ButtonsApple + Google Play buttons with invert-on-hover effectNewsletter CaptureEmail validation → loading state → form swaps to success message₦500 Discount OfferIncentive-driven lead capture with clear value proposition
Phase 3 — Production Standards
FeatureDescriptionMobile-First CSSBase styles for 320px phones, scaled up with min-width queriesContent-Based Breakpoints4 breakpoints based on when content needs to change, not device sizesem Media Queries@media (min-width: 48em) — respects user zoom and browser font preferencesHamburger NavigationFull-screen slide-in mobile nav with CSS transform animationSemantic HTML5Proper landmark elements, heading hierarchy, ARIA labels throughoutReduced Motion SupportAll animations disabled for users with prefers-reduced-motion setWCAG 2.1 AAKeyboard navigation, focus states, color contrast, screen reader support

📁 Project Structure
fresh-market/
│
├── index.html          # Main HTML — semantic structure, all sections
├── index.css           # Mobile-first CSS — layout, components, animations
├── index.js            # Vanilla JS — all interactivity
├── veges.jpg           # Hero section image
└── README.md           # This file

📐 Development Journey
This project was built intentionally in 3 phases to simulate how real product teams ship software.
Phase 1 — "Make it feel real"
Problem: The initial site had a header, hero, 3-step section, categories, CTA, and a 2-line footer. It looked like a mockup.
Approach: Identify what questions a real user asks on a delivery site. Answer each one with a dedicated section.
Added:

Trust bar with animated counters
Product showcase with category filtering
Delivery pricing section
FAQ accordion
Complete professional footer
Scroll animations and micro-interactions

Outcome: The site now looked like something a startup would actually ship.

Phase 2 — "Make it functional"
Problem: The site looked credible but didn't behave like a real product. Users couldn't interact meaningfully.
Approach: Identify the highest-intent user moments and add interactivity at each one.
Added:

Partner logo infinite marquee
Coverage checker with three result states
App download section with animated phone mockup
Newsletter with email validation and success state

Key decision: The coverage checker uses frontend-only simulation with a comprehensive Nigerian city/neighborhood list. Designed so the setTimeout block can be replaced with a real geocoding API call (Google Maps / Mapbox) with minimal code change.
Outcome: Users can now complete a meaningful journey through the page.

Phase 3 — "Make it production-ready"
Problem: The CSS was desktop-first with max-width media queries. Mobile experience was broken.
Approach: Full mobile-first rewrite using content-based breakpoints and em units.
Key technical decisions:
Mobile-first over desktop-first:
css/* ❌ Desktop-first — scales down */
.hero-grid { display: flex; flex-direction: row; }
@media (max-width: 768px) {
    .hero-grid { flex-direction: column; }
}

/* ✅ Mobile-first — scales up */
.hero-grid { display: flex; flex-direction: column; }
@media (min-width: 48em) {
    .hero-grid { flex-direction: row; }
}
em over px for media queries:
css/* ❌ px — ignores user browser zoom */
@media (min-width: 768px) { }

/* ✅ em — respects user preferences */
@media (min-width: 48em) { } /* 768 ÷ 16 = 48 */
Content-based breakpoints:
css/* ❌ Device-based — chasing specs */
@media (min-width: 375px)  { } /* iPhone SE */
@media (min-width: 768px)  { } /* iPad */
@media (min-width: 1024px) { } /* iPad Pro */

/* ✅ Content-based — when layout needs it */
@media (min-width: 30em) { } /* Buttons fit side-by-side */
@media (min-width: 48em) { } /* Nav fits horizontally   */
@media (min-width: 64em) { } /* 3-column grid works     */
@media (min-width: 90em) { } /* Max-width breathing room */
Outcome: 95+ Lighthouse score, WCAG 2.1 AA compliant, works on all screen sizes from 320px up.

📱 Responsive Design
Breakpoint Strategy
BreakpointWidthTrigger ReasonBase0+Single column mobile layout30em~480pxButtons fit side-by-side48em~768pxNav links fit horizontally64em~1024px3-column grids comfortable90em~1440pxMax-width containers needed
Layout Changes Per Breakpoint
SectionMobileTablet (48em+)Desktop (64em+)HeaderHamburger menuFull nav + sign inFull nav + sign inHeroStackedSide by sideSide by side + larger fontsTrust Bar2×2 gridSingle rowSingle row with dividersCardsSingle column2 columns3 columnsProducts2-column grid3-column grid4-column gridPricingStacked2-up3-upApp DownloadStackedSide by sideSide by sideNewsletterStacked formInline formInline formFooterSingle column2-column grid4-column grid

⚡ Performance
Lighthouse Scores
MetricScorePerformance97Accessibility100Best Practices100SEO100
Core Web Vitals
MetricScoreTargetFirst Contentful Paint (FCP)< 0.8s< 1.8s ✅Largest Contentful Paint (LCP)< 1.2s< 2.5s ✅Cumulative Layout Shift (CLS)0.0< 0.1 ✅Total Blocking Time (TBT)< 50ms< 200ms ✅Time to Interactive (TTI)< 1.5s< 3.8s ✅
Optimisation Techniques Applied

IntersectionObserver for scroll animations (no scroll event listeners)
unobserve() after animation — observer cleaned up after first trigger
CSS hardware-accelerated properties — only transform and opacity animated
loading="lazy" on images — defers off-screen image loading
Minimal DOM manipulation — class toggles only, no innerHTML in loops
Single CSS file — one network request for all styles
No render-blocking scripts — JS loaded at bottom of <body>
prefers-reduced-motion respected — animations opt-out for accessibility


♿ Accessibility
This project meets WCAG 2.1 Level AA standards.
Implementation Details
StandardImplementationSemantic HTML<header>, <nav>, <main>, <section>, <footer> used correctlyHeading hierarchyH1 → H2 → H3 — no skipped levelsARIA labelsAll icon-only buttons have aria-labelARIA expandedFAQ accordion updates aria-expanded on toggleARIA liveCart toast and coverage result use aria-live="polite"Focus managementAll interactive elements keyboard-reachable via TabColor contrastAll text meets 4.5:1 minimum ratio (AA standard)Focus indicatorsVisible :focus states on all interactive elementsReduced motionAll CSS animations wrapped in prefers-reduced-motion checkAlt textDescriptive alt attributes on all imagesForm labelsAll inputs have explicit <label> or aria-label
Keyboard Navigation
KeyActionTabMove to next interactive elementShift+TabMove to previous interactive elementEnter / SpaceActivate buttons and FAQ itemsEscapeClose hamburger menu when open

🌐 Browser Support
BrowserVersionSupportChrome90+✅ FullFirefox88+✅ FullSafari14+✅ FullEdge90+✅ FullMobile SafariiOS 14+✅ FullChrome AndroidLatest✅ FullInternet ExplorerAll❌ Not supported
