# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**House Price Prediction** — A Next.js 16 web application that predicts property prices using machine learning. Users enter property details and receive data-driven price estimates.

**Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, ESLint 9

**Brand:** HousePrice | Accent: emerald `#18794E` | Voice: direct, data-driven

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Architecture

### App Router Structure
```
app/
├── layout.tsx          # Root layout with Geist fonts, Navbar
├── page.tsx            # Home page (Hero + About)
├── globals.css         # Tailwind v4 + CSS animations
└── about/
    └── page.tsx        # About page (renders About component)
```

### Components
```
components/
├── Navbar.tsx          # Sticky nav with brand, links, mobile menu
├── Hero.tsx            # Landing hero with CTAs, floating price card
├── HeroHouseImage.tsx  # Image with graceful fallback placeholder
└── About.tsx           # 6-section about page (all server components)
```

### Key Patterns

**Path Aliases:** `@/*` maps to project root (configured in tsconfig.json)

**Fonts:** Geist Sans & Geist Mono via `next/font/google` with CSS variables

**Animations:** Pure CSS (no Framer Motion), respects `prefers-reduced-motion`
- `.animate-fade-up` (globals.css)
- Inline keyframes in Hero.tsx (fadeInUp, fadeIn, float)

**Color System:** CSS custom properties in globals.css
- `--background`, `--foreground` (light/dark)
- Emerald `#18794E` used directly in components for brand elements

**Image Handling:** `HeroHouseImage` provides graceful fallback if `/images/hero-house.jpg` missing

## Product Context (from PRODUCT.md)

- **Users:** Home buyers, sellers, property dealers
- **Purpose:** Predict property prices for data-driven pricing decisions
- **Constraint:** Data sources are binding — predictions only as good as sources
- **Pages:** Home (hero + estimate card), Predict Price (`/predict`), How It Works (`/how-it-works`), About

## Current State

- ✅ Landing page with Hero, About page complete
- ✅ Navbar with responsive mobile menu
- ✅ Brand styling (emerald accent, typography)
- ❌ `/predict` and `/how-it-works` routes not yet implemented
- ❌ ML prediction backend/model integration not implemented

## Development Notes

- **Next.js 16** has breaking changes — check `node_modules/next/dist/docs/` for current APIs
- **Turbopack** enabled for CSS via `@tailwindcss/turbopack`
- **Experimental features:** `agentFeedback`, `cacheComponents`, `partialPrefetching`
- **ESLint:** Uses `eslint-config-next` (core-web-vitals + typescript configs)
- **TypeScript:** Strict mode, bundler module resolution, path aliases

## File Conventions

- Components use inline CSS animations via `<style>` blocks (Hero) or globals.css (About)
- All components are server components except Navbar (client for mobile menu state) and HeroHouseImage (client for error handling)
- Icons are inline SVGs, no icon library dependency