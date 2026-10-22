# Portfolio refresh 2026

Estado: especificación aprobada; C-01 implementado y revisado, siguientes cortes en progreso

## Objetivo y alcance

- Objetivo: planificar una mejora del portfolio que priorice la evidencia de trabajo y alinee su contenido con el CV principal `new/Nicolas_Von_Muhlinen_CV_EN.pdf`.
- Incluye: narrativa profesional, selección y orden de proyectos, experiencia, tecnologías, contacto, descarga del CV, consistencia ES/EN y accesibilidad de los controles que acompañen estos cambios.
- Excluye en esta fase: implementar cambios en la aplicación, reescribir logros sin evidencia, alterar la lógica del carrusel infinito, rediseñar por completo la identidad visual y publicar o desplegar.
- Ruta SDD: especificación delegada. Dos investigadores de solo lectura cubren fuentes independientes; el coordinador integra documentos; un reviewer independiente contrasta aceptación y evidencia. Un solo escritor de `docs/features/portfolio-refresh-2026/`.

## Contratos compartidos

1. El CV principal indicado por Nicolás es `new/Nicolas_Von_Muhlinen_CV_EN.pdf`. Las otras versiones de `new/`, LinkedIn y el PDF servido por la web son fuentes de contraste, no autoridades automáticas para resolver discrepancias.
2. Cualquier afirmación sobre fechas, cargo vigente, métricas, clientes o tecnologías de una migración debe rastrearse a una fuente y marcarse como pendiente si las fuentes difieren.
3. Los textos visibles se mantienen equivalentes en `public/locales/en/common.json` y `public/locales/es/common.json`; `src/data/portfolio.ts` conserva su estructura salvo decisión posterior explícita.
4. Las recomendaciones de interfaz preservan las convenciones de `AGENTS.md`, incluida la lógica de duplicación del carrusel del hero, y parten de la identidad visual ya existente.
5. La propuesta separa una primera entrega acotada y entregas posteriores con dependencias, archivos responsables y criterios observables.
6. Confirmación directa de Nicolás en esta sesión: la migración de ThingsBoard fue a **React + Node.js**; Senzary continúa vigente junto con el contrato part-time en AnyoneAI. Esta confirmación prevalece sobre PDFs o textos antiguos que indiquen Angular para esa migración.

## Aceptación de la especificación

- **REQ-001 — Fuentes y veracidad:** el plan identifica el CV principal, el archivo PDF servido actualmente, los datos coincidentes y las discrepancias que requieren confirmación; no elige una versión de un hecho discutido sin evidencia.
- **REQ-002 — Narrativa y contenido:** define una propuesta concreta de posicionamiento, jerarquía del hero, About, experiencia, proyectos, tecnologías, certificaciones y contacto, con mensajes que puedan sostenerse con las fuentes.
- **REQ-003 — Selección de trabajo:** define qué mostrar primero, cómo distinguir proyectos destacados del archivo completo y qué casos merecen relato de problema, contribución y resultado.
- **REQ-004 — UX accesible:** incluye medidas observables para recorrido móvil, objetivos táctiles, teclado del selector de tecnologías y zoom de capturas, sin modificar el código en esta fase.
- **REQ-005 — Entregas implementables:** descompone los cambios en tareas con dependencias, archivos, propietario propuesto, criterio de cierre y evidencia requerida; establece una primera entrega de bajo riesgo.
- **REQ-006 — Revisión:** un reviewer con contexto nuevo contrasta los documentos con las fuentes y registra hallazgos, correcciones y próximo paso.

## Decisiones y hechos pendientes

| ID | Tema | Estado | Evidencia o resolución |
|---|---|---|---|
| D-001 | CV principal | Confirmado | Nicolás designó `new/Nicolas_Von_Muhlinen_CV_EN.pdf`. El sitio descarga otro PDF desde `public/pdf/Nicolas_Von_Muhlinen_CV.pdf`. |
| D-002 | Migración de ThingsBoard | Confirmado | Nicolás confirmó React + Node.js. El PDF servido y varios textos ES/EN del sitio todavía dicen Angular + Node.js para esa migración. Angular permanece válido en otros trabajos. |
| D-003 | Vigencia laboral | Confirmado | Nicolás confirmó que Senzary sigue actual junto con AnyoneAI; este último es un contrato part-time según CV y textos actuales. |
| D-004 | Titular del portfolio | Confirmado | Nicolás eligió “AI Engineer · Full-Stack”. El CV general conserva por ahora su titular más amplio; los hechos y el alcance de ambos deben coincidir. |
| D-005 | Selección de casos destacados | Confirmada | Nicolás eligió IoTLogIQ/Senzary, Polytics y Hermes. El caso IoTLogIQ debe atribuir solo hechos propios de la plataforma; el MCP de Senzary se presentará como logro de la experiencia si no se acredita su relación directa con IoTLogIQ. |
| D-006 | LoRa Desk | Pendiente, no bloqueante | Aparece como proyecto en desarrollo en About y en el PDF publicado anterior, pero no en el CV principal nuevo ni en la grilla visible. Confirmar si sigue activo antes de destacarlo. |
| D-007 | AI Verified / TheFlock | Pendiente, no bloqueante | El CV principal lo enumera; el sitio muestra AWS y tres cursos. Confirmar vigencia, tipo de credencial y enlace antes de sumarlo. |
| D-008 | Educación | Confirmada en CV; presentación propuesta | El CV principal incluye Analista de Sistemas, IES Córdoba, graduado en 2026, y bootcamp Henry. La sección del sitio se titula “Certifications & education” pero solo muestra AWS y cursos; agregar la formación o cambiar el título si se decide omitirla. |

## Tareas de esta especificación

| ID | Requisito | Dependencias | Archivos | Estado | Comprobación |
|---|---|---|---|---|---|
| T-001 | REQ-001, REQ-002 | Ninguna | Lectura: `new/`, `public/pdf/`, `src/data/portfolio.ts`, `public/locales/` | Hecha | Matriz de afirmaciones y discrepancias con fuentes; retorno de `/root/content_sources` |
| T-002 | REQ-003, REQ-004 | Ninguna | Lectura: `src/app/`, `src/components/`, documentación y evidencia visual existente | Hecha | Prioridades de contenido y UX con rutas concretas; retorno de `/root/site_structure` |
| T-003 | REQ-001 a REQ-005 | T-001, T-002 | `docs/features/portfolio-refresh-2026/` | Hecha | `requirements.md`, `design.md`, `tasks.md` integrados por el coordinador |
| T-004 | REQ-006 | T-003 | Solo lectura: documentos y fuentes | Hecha | Revisiones de `/root/plan_reviewer` y `/root/plan_recheck`; cierre aprobado por `/root/plan_final_check` |

## Evidencia y próximo paso

- Referencia Git: `master` en `9832e9c`. El repositorio contenía cambios locales preexistentes en contenido, PDFs, imágenes y carpetas temporales. Los cortes de implementación conservaron esos cambios y trabajaron sobre los archivos asignados.
- Evidencia inicial: review visual previo a 1280×720 y 390×844; detector Impeccable sin hallazgos; lectura del CV principal y las variantes de `new/`. Los investigadores trabajaron en lectura: `/root/content_sources` (Luna high solicitado) y `/root/site_structure` (Luna high solicitado). Ambos entregaron hallazgos; el segundo no reprodujo las medidas de navegador.
- Revisión y vigencia: hallazgos y correcciones registrados en `review.md`. `/root/plan_final_check` emitió veredicto **aprobado** tras comprobar navegación, educación, metadata, localización accesible, atribución del MCP y dependencias.
- Implementación C-01: C-01A actualizó `portfolio.ts` y locales ES/EN; C-01B publicó el CV principal en la ruta estable. Hash SHA-256 de ambos PDF: `BA42183099FFBCD876A8E69D47A558C9318A4C8E1BB05E96F68F2E564B7F4E74`. HTTP `/` y `/pdf/Nicolas_Von_Muhlinen_CV.pdf` devolvió 200; Playwright encontró tres enlaces al mismo PDF. Reviewer `/root/c01_reviewer` aprobó C-01A/B sin defectos atribuibles al corte.
- Implementación C-02 a C-06: jerarquía, contenido, casos destacados, contacto y accesibilidad están implementados y revisados. `tasks.md` y `review.md` registran agentes, evidencia de navegador, correcciones y checks finales. D-004 y D-005 quedaron confirmados por Nicolás; D-006/D-007 siguen como decisiones editoriales independientes para una iteración posterior.
