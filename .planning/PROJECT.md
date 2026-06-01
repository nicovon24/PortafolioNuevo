# PROJECT.md — Portfolio Nicolas Von Muhlinen

## Project overview

Personal portfolio website for Nicolas Von Muhlinen, a Fullstack developer. Built with Next.js 15, TypeScript, Tailwind CSS v4, and Framer Motion. Supports i18n (ES/EN) and features a polished animated UI.

**Live purpose:** Attract recruiters and clients, showcase projects and experience, communicate technical and design skills.

## Tech stack

- **Framework:** Next.js 15 App Router
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion + CSS keyframes
- **i18n:** react-i18next
- **Deploy:** Vercel

## Repository structure

See `AGENTS.md` for full structure breakdown and conventions.

## Current milestone

**Milestone 1 — Animations & Polish**
Adding interactive animations, click effects, hover behaviors, and animated borders to elevate the UI quality.

See `ANIMATIONS_PLAN.md` for the full roadmap of planned animations.

## Key files

| File | Role |
|---|---|
| `src/data/portfolio.ts` | Single source of truth for all content |
| `src/styles/globals.css` | Tailwind theme + CSS keyframes |
| `src/components/sections/HeroSection.tsx` | Hero — main landing area |
| `src/components/ui/Navbar.tsx` | Navigation bar |
| `ANIMATIONS_PLAN.md` | Animations roadmap |
| `VISION.md` | Project goals |
| `AGENTS.md` | AI agent instructions |

## Constraints

- Performance: keep bundle lean, use CSS animations for looping effects
- Accessibility: `prefers-reduced-motion` overrides required for all looping animations
- i18n: all user-visible text must go through translation keys
