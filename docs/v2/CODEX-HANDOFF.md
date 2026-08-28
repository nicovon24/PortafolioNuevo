# Handoff para Codex — terminar migración visual v2

Continuación de trabajo ya empezado por Claude Code en esta misma sesión de refactor.
Objetivo: que el sitio quede visualmente igual al PDF `Rediseño de portafolio.pdf` (el
usuario tiene el PDF, pedíselo si no lo tenés — es la referencia visual definitiva, más
específica que `docs/v2/v2-style-reference.html`).

**Regla de oro: el contenido/copy NO cambia salvo donde ya se migró (Hero y About).**
Todo lo demás (Proyectos, Experiencia, Stack, Contacto, Footer) mantiene su copy actual de
`src/data/portfolio.ts` y `public/locales/{es,en}/common.json` — solo se ajusta layout/estilo
si hace falta para calzar con el PDF, sin tocar textos.

Stack: Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion + react-i18next.
Ver `AGENTS.md` en la raíz del repo para convenciones completas antes de tocar nada.

---

## Ya hecho (no re-tocar salvo bug)

### Fase 1 — Sistema de tema (paleta + modo claro/oscuro)

- `src/styles/globals.css`: paleta navy/celeste reemplaza la roja vieja. 4 paletas de acento
  (blue/ocean/lime/pink) × 2 modos (dark/light) = 8 combinaciones vía `[data-palette][data-mode]`
  sobre `<html>`. Todos los `rgba(217,100,90,...)` / `rgba(255,107,94,...)` hardcodeados fueron
  convertidos a `color-mix(in srgb, var(--color-accent) X%, transparent)` para reaccionar a la
  paleta activa en vivo.
- `src/components/providers/ThemeProvider.tsx`: context `{ palette, mode, setPalette, toggleMode }`,
  persiste en `localStorage` (`theme_palette`, `theme_mode`), hook `useTheme()`.
- `src/components/ui/ThemeControls.tsx`: 4 swatches + toggle sol/luna, montado en `Navbar.tsx`.
- `src/app/layout.tsx`: inline script anti-FOUC que setea `data-palette`/`data-mode` antes de
  hidratar (mismo patrón que ya usaba `darkreader-lock`, que se sacó porque ya no aplica con
  modo claro propio). Fuentes cambiadas: Sora (display, reemplaza Space Grotesk) + Manrope
  (body, reemplaza Nunito Sans). JetBrains Mono se mantiene.
- Todos los hardcodes de color en componentes (`Navbar.tsx`, `Footer.tsx`, `LanguageToggle.tsx`,
  `Loader.tsx`, `HeroSection.tsx`, `ExperienceSection.tsx`) fueron limpiados a tokens o
  `color-mix()`. Verificado con `grep` que no queda ningún `rgba(217,100,90...)` / `#d9645a` etc.
  en `src/`.

### Fase 2 — Hero y About (contenido migrado 1:1 al PDF)

- `public/locales/es/common.json` y `en/common.json`: `hero.*` y `about.*` reescritos con el
  copy exacto del PDF (intro, 4 frases del typewriter, badges, 2 párrafos de about, 4 facts,
  4 personal-items: Star Wars / Better Call Saul / Rock / Fútbol).
- `src/data/portfolio.ts`: agregado `profile.heroFirstName = "Nicolás"` (nombre de pila con
  tilde/capitalización normal, separado de `profile.name` que sigue en mayúsculas para footer/alt).
- `src/components/sections/HeroSection.tsx`: agregado "Hola, soy" fijo arriba del nombre grande,
  badges "Disponible para nuevos proyectos" + "📍 Córdoba, ARG · Remoto" arriba del nombre,
  typewriter con prefijo `>` debajo del nombre.
- `src/components/sections/HeroScrambleName.tsx`: ahora soporta `lastName=""` (oculta la
  segunda línea) — se usa así porque el hero ahora solo muestra el nombre de pila grande.
- `src/components/sections/AboutSection.tsx`: reescrito completo — foto de perfil (reusa
  `/images/profile/profile.png`) + 2 párrafos + 4 facts en grid 2×2 (Code2/LayoutDashboard/
  Globe/Sparkles) + banda de 4 "datos personales" con separadores (Star Wars usa
  `TechIcon name="vader"` que ya existía; Better Call Saul usa `Tv`, Rock usa `Music`,
  Fútbol usa `Goal`, todos de `lucide-react`).

Todo esto pasa `npx tsc --noEmit` limpio y renderiza en dev (`npm run dev`) sin errores.

---

## Falta hacer (gaps reales, en orden sugerido)

### 1. Loader — reemplazar por el hexágono "NVM" del PDF/bundle

**Archivo:** `src/components/ui/Loader.tsx`

Actual: anillo de progreso circular SVG + contador % + texto "Loading".
Target (ver `docs/v2/v2-style-reference.html`, sección "Loader inicial"):
overlay full-screen con SVG hexágono (`path` tipo `M64 26 L96 44 L96 84 L64 102 L32 84 L32 44 Z`),
anillo circular con stroke-dasharray animándose alrededor, texto "NVM" en el centro, contador
de % debajo, fade+scale out al terminar.

Mantené la lógica existente de `Loader.tsx` (sessionStorage para no repetir en cada vuelta,
`prefers-reduced-motion`, timing HOLD_MS/FADE_MS) — solo cambiá el markup SVG interno del
anillo circular actual por el hexágono + anillo + texto NVM. Usá `var(--color-accent)` y
`color-mix()` para los colores, no hardcodees hex (ver cómo quedó el resto del archivo
después de la Fase 1 para el patrón).

### 2. Rails laterales fijos (iconos social izquierda + email vertical derecha)

**Archivo nuevo:** `src/components/ui/SideRails.tsx` (o el nombre que prefieras)

No existe todavía. En el PDF se ven en desktop ancho: rail izquierdo con iconos sociales
(GitHub/LinkedIn/CV) verticales, rail derecho con el email en `writing-mode: vertical-rl`.
Ambos con una línea vertical decorativa debajo. Ver referencia completa (estilos, breakpoint,
positioning) en `docs/v2/v2-style-reference.html`, sección "Rails laterales" —
ahí está el layout casi 1:1 usable como pseudocódigo.

Detalles importantes:

- Solo visibles en desktop ancho (el v2 original usaba `viewport width >= 1480px`; en v1 no
  hay ese breakpoint en Tailwind por defecto — agregalo como variante custom o usá una media
  query en CSS, tu criterio).
- **No duplicar** los iconos sociales que ya están en `Footer.tsx` — coexisten sin conflicto
  porque estos son fijos/laterales y el footer sigue al final de la página, pero confirmá que
  no se pisan visualmente con el HUD del Hero (`HeroSection.tsx` ya tiene un HUD lateral
  derecho con stack/rol/foco/formación posicionado `absolute right-0`).
- Usar `profile.socials` (github/linkedin/cv) y `profile.email` de `src/data/portfolio.ts`,
  no hardcodear los links.
- Montar en `src/app/layout.tsx` o en un layout de página, fuera del flujo de `<Navbar>`/
  secciones (son `position: fixed`).

### 3. Revisión visual general contra el PDF

Una vez 1 y 2 estén, correr `npm run dev` y comparar cada sección contra el PDF:

- Stack (`TechSection.tsx`): ya tiene tabs con contador (Core/All/Frontend/Backend/Testing/AI)
  y grid de tech cards — estructura ya calza, solo confirmar que los números de conteo y el
  estilo de card coinciden visualmente con el PDF (cards más redondeadas, ícono a la izquierda).
- Proyectos (`ProjectsSection.tsx` + `ui/ProjectCard.tsx`): ya tiene filtros con contador y
  grid — confirmar que el card "featured" (proyecto grande arriba) se ve como en el PDF.
  **v1 mantiene el modal/lightbox de detalle (`ProjectDetailModal.tsx`, `Lightbox.tsx`)** —
  decisión ya tomada con el usuario de NO sacarlos, solo ajustarles el estilo si hace falta.
- Experiencia (`ExperienceSection.tsx`): ya migrada de hardcodes en Fase 1, layout de
  timeline con acordeón por producto ya existe — comparar espaciados/tipografía contra PDF.
- Footer / Contacto: confirmar que hereda bien la paleta nueva, sin ajustes de contenido.

### 4. Nota sobre el ícono duotone de Experiencia

`src/components/sections/ExperienceSection.tsx` tiene un `filter: hue-rotate(167deg)` fijo
para recalibrar los logos de empresa (Senzary, etc.) del hue rojo viejo al celeste nuevo.
Ese valor está calibrado SOLO para la paleta "blue" (default). Si cambiás de paleta con el
selector, el logo no recalibra — es un detalle menor conocido, no hace falta arreglarlo salvo
que el usuario lo pida explícitamente (requeriría filter dinámico por paleta, que CSS `filter`
no soporta bien con custom properties calculadas — dejarlo así fue decisión consciente).

---

## Cómo verificar tu trabajo

```bash
npx tsc --noEmit    # sin errores de tipos
npm run dev         # levanta en :3000 (o :3001 si el puerto está ocupado)
```

Abrí el sitio, probá:

- Cambiar las 4 paletas + toggle claro/oscuro — todo debe reaccionar sin recargar.
- Comparar Hero/About/Loader/Rails contra el PDF lado a lado.
- Confirmar que ningún texto cambió fuera de Hero/About (usá `git diff` contra
  `src/data/portfolio.ts` y los `common.json` para verificar que solo `hero.*`/`about.*`
  se tocaron).

No hay lint corriendo limpio todavía (`npm run lint` pide configurar ESLint interactivo la
primera vez — usá `npx tsc --noEmit` como chequeo principal, o configurá el lint si hace falta).
