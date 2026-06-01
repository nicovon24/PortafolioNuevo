# Agents — Portfolio Nicolas Von Muhlinen

Instructions for AI agents (Claude Code and others) working in this repository.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"` in globals.css) |
| Animations | Framer Motion |
| i18n | react-i18next |
| Icons | lucide-react |
| Images | next/image |

---

## Project structure

```
src/
  app/           — Next.js App Router (layout.tsx, page.tsx)
  components/
    sections/    — Page sections (Hero, About, Tech, Projects, Experience, Contact)
    ui/          — Reusable UI (Navbar, Footer, ProjectCard, etc.)
    motion/      — Animation wrappers (MotionFade, MotionSlide)
    providers/   — Context providers (I18nProvider)
  data/          — Static data (portfolio.ts) — single source of truth for content
  styles/        — globals.css (Tailwind theme + custom keyframes)
  lib/           — Utilities (cn, etc.)
public/
  images/        — Profile photo, SVG icons, background patterns
  locales/       — i18n JSON files (en/, es/)
```

---

## Conventions

### Styling
- Use Tailwind utility classes. Only write CSS in `globals.css` for keyframes, custom properties (`@property`), or things Tailwind can't express inline.
- CSS custom properties for colors are defined in `@theme {}` — use them via Tailwind tokens (`text-accent`, `bg-background`, etc.).
- Never use hardcoded hex values in component files when a token exists.
- `cn()` from `@/lib/utils` for conditional class merging.

### Components
- All client components start with `"use client"` at the top.
- Prefer converting existing wrappers (like `MotionFade`) to `motion.div` with equivalent props when adding animation behavior, rather than adding nested wrappers.
- `MotionFade` and `MotionSlide` are thin wrappers — reuse them for entrance animations.

### Animations
- Framer Motion for interactive/JS-driven animations.
- CSS keyframes in `globals.css` for looping/continuous animations (marquee, shine, border sweep, border spin).
- Always add `@media (prefers-reduced-motion: reduce)` overrides for looping CSS animations.
- Spring config default: `damping: 30, stiffness: 120` (smooth, no bounce).

### Content / Data
- All portfolio content (name, bio, projects, experience, socials, etc.) lives in `src/data/portfolio.ts`.
- Text that needs translation goes through `useTranslation()` — keys are in `public/locales/`.
- Never hardcode user-visible strings directly in components.

### Images
- Always use `next/image` with `fill` + `sizes` for responsive images.
- Profile image: `/images/profile/profile.png`, centered at `object-[center_18%]`.

---

## What NOT to touch

- `src/data/portfolio.ts` — content changes only, no structural refactors without discussing first
- `public/locales/` — translation key structure must stay consistent across `en/` and `es/`
- The carousel loop logic in `HeroSection.tsx` — it doubles the array for seamless infinite scroll
- `next.config.ts` and `postcss.config.mjs` — build config, don't modify without a reason

---

## Running the project

```bash
npm run dev      # Development server
npm run build    # Production build
npm run lint     # ESLint check
```

---

## Planning

See `.planning/` directory for GSD phase plans, milestones, and roadmap.
See `ANIMATIONS_PLAN.md` for the animations roadmap.
See `VISION.md` for project goals and long-term direction.
