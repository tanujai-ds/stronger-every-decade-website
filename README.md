# Stronger Every Decade — Website Project

## Project Overview
Full brand website for Stronger Every Decade, a longevity-focused fitness brand for women in midlife.

## Deliverables in this package

### Documents
- `Phase3_Philosophy_Page.docx` — Full philosophy page copy with strategic annotations
- `Phase4_UX_Design_System.docx` — UX wireframes, typography, colour palette, component system

### React Site (`/src`)
- Fully componentised React + Tailwind CSS site
- 6 pages: Home, Philosophy, Programmes, About, Resources, Work With Me
- Scroll reveal animations, mobile navigation, FAQ accordion, email capture
- WCAG 2.1 AA compliant (focus states, aria attributes, reduced-motion support)

## File structure
```
src/
  components/
    NavBar.jsx        — Fixed nav with scroll transparency + mobile menu
    Footer.jsx        — 4-column footer with newsletter capture
    UI.jsx            — All shared components (cards, buttons, forms, etc.)
  pages/
    HomePage.jsx      — 8-section homepage
    PhilosophyPage.jsx — Full philosophy page with reading progress bar
    ProgrammesPage.jsx — Programme grid + comparison table
    OtherPages.jsx    — About, Resources, Work With Me, 404
  data/
    siteData.js       — All content data (programmes, principles, testimonials, blog, FAQs)
  hooks/
    useScrollReveal.js — Intersection Observer scroll animation hook
  styles/
    index.css         — Design tokens, global styles, Tailwind utilities
  App.js              — React Router setup
  index.js            — Entry point
```

## Design System
- **Fonts**: Cormorant Garamond (display) + DM Sans (body/UI)
- **Palette**: Navy #1B2B4B · Teal #2E7D7D · Gold #C8952A · Sand #F8F4EF
- **Aesthetic**: Editorial luxury minimalism
- **Breakpoints**: Mobile <768px · Tablet 768–1024px · Desktop >1024px

## How to run
```bash
npm install
npm start
```

## How to add a new programme
1. Add programme object to `src/data/siteData.js` programs array
2. It auto-populates on ProgrammesPage and HomePage cards
3. Create a new page at `src/pages/programmes/[slug].jsx` if a detail page is needed
4. Add route to `App.js`

## How to add a blog post
1. Add post object to `src/data/siteData.js` blogPosts array
2. It auto-populates on ResourcesPage
3. Create a new page at `src/pages/blog/[slug].jsx` for the full article

