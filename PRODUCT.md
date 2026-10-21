# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Home buyers, sellers, and property dealers who need to estimate property prices.

## Product Purpose

Predicts property prices so buyers, sellers, and dealers can make pricing decisions without relying on manual comps or broker estimates.

## Positioning

Property price prediction — the product estimates what a property is worth, giving users a data-driven price expectation rather than a listing or asking price.

## Operating Context

Web-based real-estate valuation tool accessed through a browser. Users enter property details and receive a price estimate. The incumbent UI includes a hero section ("True Value", estimate card) and navigation to a prediction flow.

## Capabilities and Constraints

- Property price estimation via prediction (mechanism not yet specified beyond "predicts property price")
- Data sources are a binding constraint — future work must preserve and work within whatever data sources feed the predictions
- Built with Next.js 16, React 19, Tailwind CSS v4, TypeScript (existing codebase answers stack)

## Brand Commitments

- Brand name: HousePrice
- Accent color: emerald #18794E (used in Hero, CTA buttons, and Navbar brand mark)
- Voice: direct, data-driven ("True Value", "Estimated property price")

## Evidence on Hand

- Existing codebase at `D:\Study\Projects\House Price Prediction\house-price-prediction\`
- `app/page.tsx` — hero landing with "True Value" headline and ₹75,00,000 illustrative estimate card
- `components/Hero.tsx` — premium real-estate hero with CTA to `/predict` and `/how-it-works`
- `components/Navbar.tsx` — sticky nav with brand mark and links to Home, Predict Price, How It Works, plus Get Estimate CTA
- `public/images/hero-house.jpg` — illustrative property image

## Product Principles

1. Price-first: every surface exists to surface a property price estimate quickly.
2. Data-bound: predictions are only as good as the sources behind them; never fabricate or guess data.
3. Direct: plain-language copy, no marketing fluff or invented testimonials.

## Accessibility & Inclusion

Omit — no product-specific requirement was established.
