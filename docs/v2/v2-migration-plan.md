# Plan de migración visual v1 → v2

**Objetivo:** adoptar la dirección visual de `v2-style-reference.html` (paleta, tipografía,
layout, animaciones) sobre los componentes reales de v1, **sin tocar contenido/copy**
(`src/data/portfolio.ts`, `public/locales/`). Stack se mantiene: Next.js 15 + Tailwind v4 +
Framer Motion + react-i18next.

## Estado actual (v1)

- Paleta: carbón/rojo (`--color-background: #0a0808`, `--color-accent: #d9645a`)
- Fuentes: Space Grotesk (display), Nunito Sans (body), JetBrains Mono
- Ya tiene: HUD cursor custom, grid de fondo por sección, marquee de tech (`hero-tech-mask`),
  photo border ring animado, navbar con shine/sweep, i18n ES/EN funcional
- Secciones: HeroSection, AboutSection, TechSection, ProjectsSection, ExperienceSection,
  ContactSection — ya modulares en `src/components/sections/`

## Estado destino (v2 reference)

- Paleta: navy oscuro/claro con acento celeste (4 paletas seleccionables: blue/ocean/lime/pink)
- Fuentes: Sora (display), Manrope (body), JetBrains Mono (ya coincide)
- Toggle claro/oscuro + selector de paleta de acento
- Reveal on-scroll con stagger, typewriter en rol, marquee de tech con filtros por categoría,
  timeline de experiencia con acordeón

## Alcance y orden sugerido (por riesgo/impacto creciente)

### Fase 1 — Fundaciones de tema (bajo riesgo, alto impacto)
1. `globals.css` `@theme`: reemplazar paleta rojo/carbón por paleta navy/celeste de v2
   (mantener nombres de tokens: `--color-background`, `--color-accent`, etc. — solo cambian valores)
2. Cambiar fuentes: swap Space Grotesk → Sora, Nunito Sans → Manrope (mantener JetBrains Mono)
3. Decidir: ¿mantener 1 paleta fija (como v1 hoy) o sumar selector de 4 paletas + toggle claro/oscuro?
   → **Requiere confirmación del usuario** antes de implementar el selector (cambio de alcance)

### Fase 2 — Hero
4. Ajustar `HeroSection.tsx` / `HeroRoleCycle.tsx`: el typewriter de rol ya existe en v1
   (`HeroRoleCycle`) — solo ajustar estilos visuales (colores, tipografía), lógica se mantiene
5. Fondo hero: adoptar grid de puntos + gradientes radiales estilo v2 en vez del grid de líneas actual
6. Revisar si el layout 2 columnas (texto + foto circular + stats) calza con contenido real de v1

### Fase 3 — Secciones de contenido
7. `AboutSection.tsx`: layout 2 columnas + banda de "datos personales" — v1 ya tiene datos
   personales? Verificar `portfolio.ts` antes de asumir estructura
8. `TechSection.tsx`: adoptar filtros por categoría (Core/All/Frontend/Backend/Testing/AI) sobre
   el marquee ya existente — v1 ya tiene marquee, solo sumar UI de filtros
9. `ProjectsSection.tsx` / `ProjectCard.tsx`: adoptar layout de card "featured" + grid, filtros por
   categoría — v1 ya tiene `ProjectDetailModal` y `Lightbox`, evaluar si se mantienen o v2 los reemplaza
10. `ExperienceSection.tsx`: adoptar acordeón expandible por sub-item dentro de cada bloque de experiencia

### Fase 4 — Nav / Footer / detalles
11. `Navbar.tsx`: ajustar estilos al nuevo layout (logo, links, toggles), mantener `LanguageToggle`
    existente
12. `Footer.tsx` / `ContactSection.tsx`: ajustar estilos, mantener contenido
13. Rails laterales fijos (nuevo en v2, no existe en v1) — evaluar si se agrega o se omite
    (nice-to-have, requiere decisión)
14. `HUDCorners.tsx`: v1 ya tiene cursor HUD custom con estética propia — v2 tiene una versión
    similar (ring+dot+ticks+click burst). Evaluar si se ajustan solo colores o se rediseña

## Decisiones confirmadas (2026-08-28)

- **Paletas:** selector de 4 paletas de acento (blue/ocean/lime/pink) + toggle claro/oscuro,
  como en v2. Implica armar modo claro para todos los componentes, no solo swap de valores.
- **Rails laterales:** SÍ se agregan (iconos sociales + email vertical, solo desktop ancho
  >= 1480px, como en v2).
- **Modal/Lightbox de proyectos:** se MANTIENEN. Solo se les ajusta el estilo visual (paleta,
  tipografía), no se elimina la funcionalidad.
- Ningún texto de `portfolio.ts` / `public/locales/` cambia — solo estilos/layout.

## Impacto de las decisiones en el alcance de cada fase

- **Fase 1** crece: además de portar la paleta navy/celeste como default, hay que definir las
  otras 3 paletas (ocean/lime/pink) en ambos modos (claro/oscuro) = 8 combinaciones de tokens,
  más el state/persistencia del selector (recomendado: localStorage) y el toggle de modo.
- **Fase 4** crece: sumar rails laterales como componente nuevo (`ui/SideRails.tsx` o similar),
  con media query de visibilidad y sin duplicar los iconos sociales que ya están en Navbar/Footer
  (definir cuál se retira o si coexisten).

## Estado (actualizado)

- **Fase 1 (tema)**: HECHA. Ver `src/styles/globals.css`, `ThemeProvider.tsx`, `ThemeControls.tsx`.
- **Fase 2 (Hero + About)**: HECHA — contenido migrado 1:1 al PDF `Rediseño de portafolio.pdf`
  que pasó el usuario (más específico que este doc para Hero/About).
- **Fase 3 (Stack/Proyectos/Experiencia)**: estructura ya calza (tabs, filtros, timeline) desde
  antes de este refactor — solo heredó la paleta nueva vía tokens. Pendiente: comparación visual
  fina contra el PDF.
- **Fase 4 (Nav/Footer/Loader/Rails)**: parcial. Navbar y Footer limpios de hardcodes. Faltan:
  Loader con hexágono "NVM" y rails laterales fijos (nuevos, no existían).

Ver `docs/v2/CODEX-HANDOFF.md` para el detalle de lo que falta, con rutas
exactas y contexto para continuar en otra sesión/herramienta.
