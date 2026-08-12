# Plan de review — animaciones, rendimiento y UI

## Contexto

El portfolio funciona y se ve bien, pero acumuló deuda en tres frentes: loops de animación que nunca se detienen, assets sin optimizar, y un sistema de diseño que existe a medias (hay tokens de color, no hay componentes). Este documento registra lo ya corregido y prioriza lo que queda.

Stack: Next.js 15.5.9 / React 19 / Tailwind v4 (CSS-first, sin `tailwind.config`) / framer-motion / react-i18next.

---

## Ya aplicado

| Cambio | Archivo | Impacto |
|---|---|---|
| Iconos Java y Spring Boot pasados a `fill="#64ffda"` en el root (patrón de `docker.svg`) | `public/images/svg/{java,springboot}.svg` | Consistencia visual con los otros 38 iconos |
| Grilla de proyectos a 3 columnas | `ProjectsSection.tsx:15` | Faltaba `lg:grid-cols-3` |
| Imágenes recomprimidas y redimensionadas | `public/images/**` + `scripts/optimize-images.mjs` | **27.7 MB → 8.3 MB (-70%)** |
| `scrollWidth` cacheado con `ResizeObserver` | `HeroTechCarousel.tsx` | Eliminado un forced reflow **por frame** |
| Loops del hero pausan fuera de pantalla / pestaña oculta | `HeroScrambleName.tsx`, `HeroRoleCycle.tsx`, `hooks/useActiveOnScreen.ts` | Antes: ~60 re-renders de React por segundo, para siempre |
| Cursor HUD con `translate3d` + coalescing por rAF; `elementFromPoint` reemplazado por delegación de `pointerover` | `TrailingCursor.tsx`, `globals.css` | Movía con `left/top` (layout) y hacía hit-testing sincrónico en cada movimiento |
| `HeroRoleCycle`: `phrases` estabilizado con `useMemo` | `HeroRoleCycle.tsx` | `t(…, {returnObjects:true})` devolvía array nuevo por render, estaba en el dep array del efecto |
| Bug de Rules of Hooks | `ProjectScreenshots.tsx` | `useState` estaba **después** de `if (count === 0) return null` |
| ExperienceSection unificada al tema dark + usa `<Section>` | `ExperienceSection.tsx` | Eran cards `bg-white` con esquinas rectas, y un header que invertía las convenciones de `Section` |
| Código muerto eliminado | — | `gsap`, `next-themes`, `@emailjs/browser`, `ContactForm.tsx`, `ProjectCardSkeleton.tsx`, `.hero-tech-track` |

Baseline actual: **195 kB First Load JS**, build limpio.

---

## Mi lectura de la UI actual

**Lo que está bien.** La dirección estética es coherente y tiene personalidad: navy profundo + un solo acento turquesa, tipografía mono para chrome y sans para contenido, densidad tipo "HUD técnico". El hero con scramble + typewriter + carrusel es memorable sin ser molesto. El layout de las cards de proyecto (tres capturas superpuestas en diagonal) es la mejor idea visual del sitio — comunica "esto tiene varias pantallas" sin gastar espacio.

**Lo que lo frena.**

1. **No hay componentes, hay copy-paste.** El panel canónico (`rounded-* border-line bg-panel shadow-[0_20px_56px_...] backdrop-blur-[14px]`) está repetido en 5 lugares **con un radio distinto cada vez**. El botón primario del hero y el del formulario son el mismo string duplicado. Las flechas de carrusel están 6 veces. Hay `cn()` con `clsx` + `tailwind-merge` y ni un `Button`, `Card` o `IconButton`. Todo el design system está atrapado dentro de `HeroSection.tsx` como constantes locales (`btnPrimary`, `iconBtn`, `hudRow`…).

2. **La escala tipográfica no existe.** Conviven `text-[0.55rem]`, `[0.58rem]`, `[0.6rem]`, `[0.62rem]`, `[0.65rem]`, `[0.7rem]`, `[0.72rem]`… Nada de eso vive en `@theme`. Los tamaños por debajo de `0.62rem` (≈10px) son además demasiado chicos para leerse cómodo.

3. **`--font-mono` apunta a Cascadia Code / Consolas**, que son fuentes de Windows. En Mac, Linux y Android cae a la mono genérica del sistema — y `font-mono` se usa en navbar, títulos, badges y botones. **Buena parte de la tipografía del sitio se ve distinta según el SO.** Es el bug de UI más invisible y más grave que tenés.

4. **Demasiado movimiento infinito compitiendo.** El anillo cónico de la foto (repaint completo cada frame), el shine del navbar, el border-sweep, el ping del badge, el pulse del cursor del typewriter y el marquee — todos corriendo a la vez en el hero. Individualmente están bien; juntos, el ojo no sabe dónde posarse y la GPU tampoco.

5. **`backdrop-blur` en todo.** Navbar a 18px, cada una de las 10 cards de proyecto a 14px, About, Contact, Footer, overlays. Blur sobre elementos que además se trasladan en scroll (`MotionSlide` mueve las cards ±80px) es la combinación más cara que existe en CSS.

**Mejoras de UI que propondría, por retorno.**

- Cargar una mono real con `next/font` (JetBrains Mono o IBM Plex Mono pegan con la estética). Arregla el punto 3 de una.
- Extraer `Button`, `IconButton`, `Card` y `Modal`. Elimina ~150 líneas de duplicación y hace que los radios y las sombras dejen de ser aleatorios.
- Definir una escala tipográfica en `@theme` y prohibirse los `text-[Xrem]` arbitrarios. Piso de 11px.
- Bajar el movimiento infinito del hero a **uno solo** (yo dejaría el anillo de la foto y quitaría el resto, o al revés). El scramble del nombre cada 8 segundos es un distractor permanente: lo haría una sola vez al entrar y listo.
- Sacar `backdrop-blur` de las cards de proyecto: sobre un fondo sólido no se nota la diferencia y es donde más cuesta.
- Unificar radios en dos valores (`rounded-2xl` para superficies, `rounded-full` para pills/botones).

---

## Fase 1 — Animaciones ✅ completada

**Objetivo:** que nada se anime cuando no se ve, y que todo respete `prefers-reduced-motion`.

- [x] `MotionFade` / `MotionSlide` no consultan `useReducedMotion()` de framer-motion. Dos líneas, alto retorno de accesibilidad.
- [x] `TechSection.tsx:25-40` monta **un `MotionFade` (= un `motion.div` + un IntersectionObserver) por cada ítem de tech**. Son decenas de observers para un stagger que se resuelve con un contenedor `variants` + `staggerChildren`. Mismo patrón en `AboutSection.tsx:56-65`.
- [x] `HeroSection.tsx:123` usa `useScroll()` global sin `target`: la suscripción sigue viva con el hero fuera de pantalla. Acotar con `useScroll({ target, offset })`.
- [x] `HeroSection.tsx:289` tiene un `whileHover` con `repeat: Infinity` — sacudida eterna mientras el mouse esté encima. Limitar a 1-2 repeticiones.
- [x] Reducir las animaciones CSS infinitas de `globals.css` (`nav-shine` 5s, `navbar-border-sweep` 3s, `photo-border-ring` 4s). El anillo cónico repinta un gradiente de ~416px cada frame.
- [x] Reconsiderar el ciclo infinito de scramble del nombre (`HOLD_MS = 8000`): una sola pasada al montar.

## Fase 2 — Rendimiento

- [ ] **`next.config.ts` está prácticamente vacío.** Configurar `images.formats` (AVIF/WebP), `deviceSizes`, `qualities` y `minimumCacheTTL`.
- [ ] **i18n: se bundlean los dos idiomas.** `src/lib/i18n.ts:3-4` importa ambos JSON estáticamente (~21 kB) aunque ya están servidos desde `/public/locales/`. Cargar sólo el activo, el otro bajo demanda.
- [ ] `ProjectDetailModal` (~340 líneas) se importa estático en cada `ProjectCard`. Pasar a `next/dynamic`.
- [x] `TrailingCursor` se descarga y ejecuta también en mobile, donde se auto-desactiva. Envolver en `dynamic(..., { ssr: false })`.
- [ ] framer-motion se importa completo en 4 archivos. Migrar a `LazyMotion` + `domAnimation`, o reemplazar `MotionFade`/`MotionSlide` por un hook con `IntersectionObserver` + clases CSS y sacar framer del critical path.
- [ ] Cada card renderiza **3 imágenes apiladas** → ~30 requests en la grilla. Evaluar cargar 1 y las otras en hover/apertura.
- [ ] `profile.png` (319 kB) es la imagen del LCP y es un PNG: pasarla a JPEG/WebP de origen.
- [ ] `Navbar.tsx` tiene **dos** listeners de scroll independientes (`:19-61` y `:73-77`) y llama `getBoundingClientRect()` por sección en cada frame. Fusionar y reemplazar por `IntersectionObserver`.

## Fase 3 — UI y design system ✅ completada

- [x] Cargar `--font-mono` con `next/font` (hoy depende de fuentes de Windows).
- [x] Extraer `Button`, `IconButton`, `Card`, `Modal`. Ver duplicaciones: panel ×5, icon-button ×6, flecha de carrusel ×6, botón "live" ×6.
- [x] Tokenizar radios, sombras y la escala tipográfica en `@theme`.
- [x] Usar el token `--color-panel-strong` (está definido y no se usa): hay 10 sitios con `bg-[rgba(8,17,31,0.92)]` literal, que es exactamente ese valor. Ídem `text-[#08111f]` → `text-background-deep`.
- [x] **Unificar los dos lightboxes.** `ProjectScreenshots.tsx` (176 líneas) y `ProjectDetailModal.tsx` (341) implementan cada uno su portal, su manejo de Escape/flechas y su bloqueo de scroll. Además pueden apilarse: hay z-index 200 / 200 / 300 compitiendo.
- [x] Mover el SVG de Darth Vader embebido en `AboutSection.tsx:8-35` a `/public/images/svg/`.
- [x] `AboutSection.tsx:62` mapea iconos **por índice** contra el array de traducciones: reordenar `about.services` en el JSON rompe la correspondencia. Pasar a claves.

## Fase 4 — Accesibilidad ✅ completada

Es el frente más flojo del proyecto.

- [x] **`ProjectCard.tsx:53` es un `<article>` con `onClick`**, sin `role`, sin `tabIndex`, sin handler de teclado. Ninguna card de proyecto es alcanzable con Tab. Los dos botones internos viven en un overlay `opacity-0 group-hover:opacity-100`: reciben foco pero son invisibles (falta `group-focus-within:opacity-100`).
- [x] **Casi no hay focus states.** Un grep de `focus-visible|focus:|outline` en todo `src/` devuelve 2 resultados, y uno estaba en el componente muerto que ya borramos. Sumado a `cursor: none !important` (`globals.css:100`), quien navega con teclado no tiene ni cursor ni anillo de foco.
- [x] Modales sin focus trap ni restauración de foco al cerrar; el fondo no queda `inert`.
- [x] `<html lang="es">` está fijo en `layout.tsx:25` y nunca cambia al pasar a inglés (falla WCAG 3.1.1).
- [x] Contraste: `text-muted/55` a `text-[0.55rem]` (`HeroSection.tsx:52`) da ≈3.4:1 — no pasa AA. Revisar todos los `text-muted/50`–`/70`.
- [x] Carrusel del hero sin acceso por teclado (`HeroTechCarousel.tsx:66`): sólo pointer events, sin `tabIndex` ni controles.
- [x] Falta skip link, y `scroll-mt` sólo existe en Contact — las otras secciones quedan tapadas por el navbar fijo al navegar por anchor.
- [x] ~20 strings hardcodeados en español fuera de i18n (`aria-label="Cerrar"`, `alt="thumb 1"`, `"Galería"`, `© 2026`…).

## Fase 5 — SEO y metadata

- [ ] `layout.tsx:13-21` sólo define `title` y `description`. Faltan `metadataBase`, `openGraph`, `twitter`, `icons`, `alternates.languages` (el sitio es bilingüe), `sitemap.ts`, `robots.ts` y `opengraph-image`. Para un portfolio que se comparte por LinkedIn, la card de OpenGraph es de lo que más rinde.
- [ ] Hay `suppressHydrationWarning` esparcido en ~12 botones: son mismatches SSR/cliente tapados en vez de resueltos. Vienen de que i18n resuelve en cliente. Se arregla con cookie de idioma leída en el Server Component — que además elimina el flash de contenido en español para usuarios en inglés.

---

## Cómo verificar

```bash
npx tsc --noEmit          # tipos
npx next build            # build + tamaño de bundle (baseline: 196 kB First Load JS)
npm run dev               # revisión visual
```

Para animaciones y rendimiento, con la app corriendo:

1. DevTools → Performance → grabar 5s con el hero en pantalla y otros 5s con la página scrolleada abajo. **Con el hero fuera de vista el gráfico debería quedar casi plano** — ese es el criterio de éxito de la Fase 1.
2. DevTools → Rendering → activar *Paint flashing* y *Frame rendering stats* para ver qué repinta de más.
3. Lighthouse en modo mobile: LCP, TBT y CLS antes/después.
4. Probar con `prefers-reduced-motion: reduce` forzado (DevTools → Rendering → Emulate CSS media).
5. Recorrer el sitio **sólo con Tab** — hoy no se llega a ninguna card de proyecto.

Los originales de las imágenes sin comprimir están respaldados en el scratchpad de la sesión; si alguna se ve degradada, se restaura de ahí. Para futuras imágenes: `node scripts/optimize-images.mjs`.
