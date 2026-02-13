# CLAUDE.md — Nexlume Website Development

## Project Overview
Nexlume is a fiber optic cable assembly e-commerce platform built with Next.js 15, BigCommerce B2B (headless), and AI-powered plan analysis.

## Tech Stack
- **Framework:** Next.js 15+ (App Router, TypeScript strict)
- **Styling:** Tailwind CSS v4 + Radix UI + Framer Motion
- **E-Commerce:** BigCommerce B2B Edition (headless, GraphQL API)
- **Search:** Algolia
- **AI:** Claude Vision API + Unstructured.io
- **Testing:** Vitest + Testing Library
- **Hosting:** Vercel (frontend) + BigCommerce (API)

## Design System
- **Background:** #0A0A0A
- **Cards:** #141414
- **Borders:** #262626
- **Accent:** #5E6AD2 (Indigo)
- **Typography:** Geist font family, 13-14px body
- **Dark mode only** (professional B2B aesthetic)

## Commands
- `npm run dev` — Dev server (PORT=3002)
- `npm run build` — Production build (must pass with zero errors)
- `npm run lint` — ESLint check
- `npx vitest run` — Run all tests

## Development Rules
1. **Every commit must build** — Run `npm run build` before committing
2. **TypeScript strict** — No `any` types, no `@ts-ignore`
3. **Tests required** — Write tests for new components and utilities
4. **Conventional commits** — `feat:`, `fix:`, `refactor:`, `test:`, `docs:`
5. **Component-first** — Reusable components in `src/components/`, page-specific in page files
6. **Server components by default** — Only use `"use client"` when needed (interactivity)
7. **No hardcoded data** — Use constants, environment variables, or API calls

## Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── configurator/       # Cable assembly configurator
│   ├── upload-plans/       # AI plan analysis & auto-quote
│   ├── products/           # Product catalog & detail
│   ├── solutions/          # Industry solutions
│   ├── resources/          # Technical resources
│   ├── account/            # Customer portal
│   └── api/                # API routes
├── components/
│   ├── ui/                 # Design system (Button, Card, Badge, Input)
│   ├── layout/             # Header, Footer, MobileNav
│   ├── configurator/       # Configurator wizard steps
│   ├── ai-quote/           # AI plan analysis components
│   ├── products/           # Product grid, cards, filters
│   └── home/               # Homepage sections
├── lib/                    # Utilities, API clients, business logic
└── types/                  # TypeScript type definitions
```

## Key Features (Priority Order)
1. **Product Configurator** — 6-step guided cable assembly builder
2. **AI Plan Analysis** — Upload plans → instant fiber quote
3. **Product Catalog** — Algolia search, faceted filtering
4. **Customer Portal** — Orders, quotes, saved configs
5. **Content Engine** — Programmatic SEO, resources, blog

## Ports
- 3000: Mission Control (Docker)
- 3001: Sales Intelligence Dashboard
- 3002: **This project (Nexlume)**
