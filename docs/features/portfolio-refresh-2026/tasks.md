# Plan de implementación

Estado: C-01 a C-06 implementados y revisados.

## Avance

| Tarea | Estado | Evidencia |
|---|---|---|
| C-01A | Hecha | `portfolio.ts` y locales ES/EN actualizados; 195 claves terminales equivalentes, `git diff --check` limpio. |
| C-01B | Hecha | PDF público igual al CV principal: SHA-256 `BA42183099FFBCD876A8E69D47A558C9318A4C8E1BB05E96F68F2E564B7F4E74`; ruta HTTP 200. |
| C-01R | Aprobada | `/root/c01_reviewer`, lectura independiente, sin defectos atribuibles a C-01. |
| C-02A | Implementada | DOM y nav: Hero → About → Projects → Tech → Experience → Certifications; footer sigue `navItems`. El implementador fue interrumpido y el coordinador integró sus cambios. |
| C-02B | Implementada | Hero/About, experiencia y educación alineados con CV principal; IES Córdoba y Henry visibles; corrección de trayectoria y Henry 2023 tras revisión. |
| C-02C | Implementada | Skip link en ES/EN enfoca `#main`; metadatos y `<html lang>` cambian con el idioma. Playwright confirmó ambas metas en inglés al restaurar preferencia. |
| C-05A | Implementada | Playwright: ArrowRight mueve foco y selección; seis tabs con 44 px de alto. |
| C-05B | Implementada | Playwright: primer Escape desde zoom devuelve foco al botón del modal; segundo Escape devuelve foco a la tarjeta. Entrada directa por imagen deja foco dentro del modal al cerrar zoom; controles medidos en 44×44 px. |
| C-03A/B | Implementadas | Playwright: IoTLogIQ, Polytics y Hermes aparecen primero; archivo conserva 11 proyectos y filtro Trabajo muestra 5. Casos ES/EN con problema, aporte y resultado/estado; sin desborde a 390 px. |
| C-04 | Implementada | Playwright: hero y footer contienen `mailto:nicovon24@gmail.com`, textos traducidos y 44 px de alto a 390/1280 px. |
| C-06 | Aprobada | Reviewer independiente aprobó tras corregir claims y fuente de selección; Playwright confirmó orden 3+11, filtros, ES/EN, teclado, zoom, contacto y ausencia de overflow. `npx tsc --noEmit` y `npm run lint` terminaron sin errores. |

## Orden y dependencias

```text
CV principal + hechos (C-01) ─> Mensaje/orden (C-02) ─> Destacados y casos (C-03) ─> Contacto (C-04)
Accesibilidad (C-05) puede avanzar tras C-01 con archivos propios.
Revisión integral (C-06) cierra cada corte que cambie experiencia o contenido público.
D-004 (titular) y D-005 (casos) están confirmados. D-006 (LoRa Desk) y D-007 (AI Verified) se resuelven aparte antes de publicar esos contenidos; no bloquean C-01 a C-05.
```

## Corte 1 — Veracidad y descarga, primero

| ID | Requisitos | Dependencia | Propiedad de archivos | Entrega y cierre observable |
|---|---|---|---|---|
| C-01A | REQ-001, REQ-002 | D-001 a D-003 resueltos | Un implementador Sol medium: `src/data/portfolio.ts`, `public/locales/en/common.json`, `public/locales/es/common.json` | Senzary se describe como actual; la migración se atribuye a React + Node.js en ambos idiomas y en todos los lugares pertinentes; no se cambian otras menciones válidas de Angular; claves ES/EN equivalentes; se conserva la estructura de `portfolio.ts`. |
| C-01B | REQ-001 | CV principal confirmado | Coordinador u otro implementador con propiedad exclusiva de `public/pdf/Nicolas_Von_Muhlinen_CV.pdf` | La ruta existente descarga el mismo contenido binario que el CV principal aprobado de `new/`; Hero y Footer siguen apuntando a la ruta estable. El nombre público puede mantenerse. |
| C-01R | REQ-006 | C-01A y C-01B | Reviewer Sol high, solo lectura | Contrasta PDF descargado, copy ES/EN y confirmación directa del usuario; registra veredicto y hallazgos. |

Estas tareas pueden prepararse en paralelo porque sus archivos son disjuntos. El coordinador integra y evita escritores simultáneos de `portfolio.ts` o de un mismo locale. El primer corte termina cuando el usuario puede descargar el CV principal desde ambas acciones y leer los hechos confirmados en ambos idiomas.

## Corte 2 — Jerarquía de contenido

| ID | Requisitos | Dependencia | Propiedad de archivos | Entrega y cierre observable |
|---|---|---|---|---|
| C-02A | REQ-002, REQ-003 | C-01 | Un implementador Sol medium: `src/app/page.tsx`, `src/data/portfolio.ts` (solo orden de `navItems`), encabezados numerados de `src/components/sections/` y `Footer.tsx` si muestra el orden | Projects aparece antes de Tech; navbar y footer siguen el nuevo orden, la sección activa corresponde al scroll, números/anchors/CTA son coherentes. Inspección móvil y escritorio en ES/EN. |
| C-02B | REQ-002 | C-01, D-004, C-02A | Implementador con propiedad exclusiva de `HeroSection.tsx`, `AboutSection.tsx`, `ExperienceSection.tsx`, `CertificationsSection.tsx`, `Navbar.tsx`, `src/data/portfolio.ts` (solo contenido), y locales ES/EN; no paralelo con otras tareas que editen esos archivos | Titular, intro, trayectoria y formación cuentan el mismo perfil que el CV aprobado; Senzary y AnyoneAI son claros; la sección de educación cumple su título; los nombres accesibles de abrir/cerrar menú usan `nav.openMenu`/`nav.closeMenu` en ES/EN; claves equivalentes; no se toca el algoritmo del carrusel. |
| C-02C | REQ-002, REQ-004 | D-004 y C-02B | `src/app/layout.tsx`, un componente cliente de skip link si hace falta, y locales ES/EN en secuencia tras C-02B | Se conserva el título ya alineado con “AI Engineer · Full-Stack”; la descripción y estrategia de metadatos para ES/EN se deciden y documentan antes de editar. El skip link anuncia una etiqueta traducida en ambos idiomas sin perder foco ni destino `#main`; la vista inglesa no queda con textos accesibles o metadatos contradictorios. |
| C-02R | REQ-006 | C-02A, C-02B y C-02C | Reviewer Sol high, solo lectura | Confirma que jerarquía, educación, metadata y copy responden al CV, y que la interfaz conserva rutas y acciones. |

La reordenación simple se hace antes del tratamiento de destacados para obtener una mejora visible con poco riesgo. `C-02A` se ejecuta después de `C-01A` porque ambos tocan `portfolio.ts`; `C-02B` sigue después y espera el copy canónico. D-008 se implementa en `C-02B`.

## Corte 3 — Selección editorial y casos

| ID | Requisitos | Dependencia | Propiedad de archivos | Entrega y cierre observable |
|---|---|---|---|---|
| C-03A | REQ-003 | C-02, D-005 confirmada | Un implementador Sol medium: `ProjectsSection.tsx`, `ProjectCard.tsx`, `src/data/portfolio.ts`, locales ES/EN | IoTLogIQ/Senzary, Polytics y Hermes se distinguen del archivo; el resto de los 11 proyectos no ocultos permanece accesible. Título, conteos y filtros describen correctamente el conjunto mostrado. |
| C-03B | REQ-002, REQ-003 | C-03A; textos respaldados por fuentes | El mismo implementador o tarea secuencial sobre locales ES/EN y datos | Cada caso elegido explica problema, contribución propia, resultado o estado y enlace. Hermes sigue indicado como demo de equipo; Polytics conserva atribución limitada; IoTLogIQ no promete métricas no sustentadas ni se atribuye el MCP general de Senzary sin evidencia directa de vínculo con esa plataforma. |
| C-03R | REQ-006 | C-03A y C-03B | Reviewer Sol high | Contrasta cada claim con la matriz de fuentes y el comportamiento del archivo/filtros. |

`C-03A` y `C-03B` se ejecutan en secuencia porque comparten locales y datos. No se hará un refactor estructural de `portfolio.ts` sin discutirlo antes, según `AGENTS.md`.

## Corte 4 — Contacto y accesibilidad

| ID | Requisitos | Dependencia | Propiedad de archivos | Entrega y cierre observable |
|---|---|---|---|---|
| C-04 | REQ-002 | C-03B | `HeroSection.tsx`, `Footer.tsx`, locales ES/EN; un escritor | Email/contacto está disponible junto a acciones tempranas y en el footer; `mailto:` funciona con texto y nombre accesible en móvil/escritorio. Espera a C-03B para evitar editores simultáneos de locales. |
| C-05A | REQ-004 | C-01 | `TechSection.tsx`; un implementador Sol medium | Tabs responden a flechas, Home/End, Tab y Enter/Space; foco y selección se anuncian; objetivos táctiles alcanzan 44×44 CSS px en móvil. |
| C-05B | REQ-004 | C-01 | `ProjectDetailModal.tsx`, `Lightbox.tsx`; implementador distinto o secuencial | Zoom de captura tiene control enfocable; Escape, flechas, trampa/restauración de foco funcionan; controles móviles tienen tamaño táctil suficiente. |
| C-06 | REQ-006 | C-04 y C-05 | Reviewer Sol high, solo lectura | Recorrido de teclado, ES/EN, móvil/escritorio y apertura/cierre de imágenes aceptados; hallazgos corregidos y registrados. |

`C-05A` y `C-05B` tienen archivos disjuntos; pueden delegarse en paralelo con un máximo de dos agentes activos. `C-04` comparte locales con C-03A/B y se agenda después de C-03B.

## Comprobaciones previstas al implementar

- Revisión visual con Playwright CLI a 390×844 y 1280×720, como exige `AGENTS.md`; revisar orden, CTA, scroll, filtros, modal y ausencia de overflow.
- Comparar hash del PDF público y el CV principal aprobado; abrir la ruta `/pdf/Nicolas_Von_Muhlinen_CV.pdf` desde Hero y Footer.
- Revisar equivalencia de claves ES/EN y copy visible en ambos idiomas; recorrer con teclado tabs, card/modal/lightbox y enlaces de contacto.
- Ejecutar los checks pertinentes del repositorio según el alcance del corte; registrar resultado y limitaciones reales. No asumir que un documento anterior marcado “✅” valida el estado nuevo.
- Antes de cada corte, conservar cambios locales preexistentes y registrar diff de los archivos asignados. Después del reviewer, actualizar `requirements.md`/`tasks.md` con evidencia y siguiente corte.
