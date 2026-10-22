# Revisión de la especificación

## Orquestación observada

| Paso | Agente real | Perfil solicitado | Resultado |
|---|---|---|---|
| Investigación T-001 | `/root/content_sources` | `sdd_researcher`: gpt-6-luna, high | Entregó matriz de fuentes y discrepancias; solo lectura. |
| Investigación T-002 | `/root/site_structure` | `sdd_researcher`: gpt-6-luna, high | Entregó análisis de componentes y tareas; solo lectura. No reprodujo navegador. |
| Integración T-003 | `/root` | Coordinador: Astra medium según configuración declarada por el usuario | Escribió `requirements.md`, `design.md`, `tasks.md` y este registro; único escritor de estos documentos. El runtime no informó aquí el modelo/efuerzo real del coordinador. |
| Revisión T-004 | `/root/plan_reviewer`, `/root/plan_recheck`, `/root/plan_final_check` | `sdd_reviewer`: gpt-6-sol, high solicitado en cada creación | Primera revisión, segunda lectura y comprobación final independiente; solo lectura. Veredicto final aprobado. |

Los nombres anteriores son los identificadores devueltos por `spawn_agent`; ambos investigadores y el reviewer devolvieron una entrega. Los perfiles/modelos son los solicitados al crear agentes; la herramienta no expuso una medición independiente del modelo ejecutado.

## Primera revisión y correcciones

Veredicto inicial de `/root/plan_reviewer`: REQ-001, REQ-003 y REQ-004 cubiertos; REQ-002/REQ-005 parciales; REQ-006 pendiente de registro. No aprobó la especificación para implementar hasta corregir:

| Severidad | Hallazgo | Corrección en documentos |
|---|---|---|
| Alta | Mover Projects solo en `page.tsx` deja `navItems` en orden anterior; `Navbar` calcula activo según ese orden. | `C-02A` ahora incluye `portfolio.ts` (`navItems`), números de secciones, footer y criterio de sección activa; va después de C-01A para evitar escritor simultáneo. |
| Media | La formación de Analista de Sistemas del CV no aparece bajo el título “Certifications & education”. | D-008, matriz editorial y `C-02B` incluyen educación, institución y año, o título veraz si se omite. |
| Media | Un cambio de titular no alcanzaría el título y descripción de `layout.tsx`. | `C-02C` cubre metadata y estrategia de idioma; `C-02R` la revisa. |
| Media | Diagrama de dependencias bloqueaba fases con D-006/D-007 sin tareas posteriores. | Diagrama y decisiones los declaran independientes y no bloqueantes. |
| Baja | Estado y próximo paso SDD obsoletos. | `requirements.md` actualiza T-003, T-004, revisión y próximo paso. |

## Evidencia y límites

- Base Git inspeccionada: `master` en `9832e9c`; había cambios locales preexistentes en archivos de contenido, PDFs e imágenes. Esta especificación solo agrega/edita archivos bajo `docs/features/portfolio-refresh-2026/`.
- Reviewer comparó textos de PDFs, código y documentos. Informó SHA-256 distinto para CV principal y PDF publicado; confirmó 15 entradas de proyecto, cuatro ocultas y 11 visibles. No ejecutó navegador, build ni tests.
- Las medidas visuales de 390×844 y 1280×720 proceden de la revisión previa, no de esta ejecución de agentes.
- Segunda lectura: `/root/plan_recheck` (perfil `sdd_reviewer`, gpt-6-sol high solicitado) confirmó que los cinco hallazgos iniciales estaban corregidos y que C-01 podía iniciarse. Señaló tres criterios faltantes: traducción del skip link y menú móvil, separación explícita MCP Senzary / IoTLogIQ, y dependencia de C-04 frente a C-03B. `tasks.md` y `design.md` se corrigieron; el diagrama ahora coincide con la tabla.
- Comprobación final: `/root/plan_final_check` (perfil `sdd_reviewer`, gpt-6-sol high solicitado) leyó los cuatro documentos y comprobó esos tres criterios, las decisiones D-004/D-005 y la continuidad de REQ-001..006. Veredicto **aprobado**, sin defectos críticos remanentes. No editó archivos ni ejecutó navegador o pruebas.

## C-01 — veracidad y CV

- Implementador `/root/c01_content` (`sdd_implementer`, gpt-6-sol medium solicitado) editó solo `src/data/portfolio.ts` y los locales ES/EN; informó 195 claves terminales equivalentes y `git diff --check` limpio.
- El coordinador copió el CV principal a `public/pdf/Nicolas_Von_Muhlinen_CV.pdf` tras conservar el PDF público anterior en `tmp/Nicolas_Von_Muhlinen_CV_public_before_C01_20261022.pdf`. Hash SHA-256 del nuevo origen y del PDF público: `BA42183099FFBCD876A8E69D47A558C9318A4C8E1BB05E96F68F2E564B7F4E74`.
- El servidor local respondió 200 en la homepage y en la ruta PDF; la respuesta PDF indicó `application/pdf` y 79856 bytes. Playwright CLI vio tres enlaces a `/pdf/Nicolas_Von_Muhlinen_CV.pdf` (hero, footer y rail). El servidor queda activo en `http://localhost:3000`.
- Reviewer `/root/c01_reviewer` (`sdd_reviewer`, gpt-6-sol high solicitado) contrastó cambios, fuentes, paridad de locales, PDF y hrefs. Veredicto **aprobado** para C-01A/B, sin defectos atribuibles al corte. No repitió HTTP/Playwright. Fuente de código y aceptación: `master` `9832e9c`, `requirements.md` REQ-001/002 y `tasks.md` C-01A/B.

## C-02 y C-05 — implementación y revisión

- C-02A fue delegado a `/root/c02_order` (Sol medium solicitado). El agente quedó interrumpido antes de entregar respuesta; el coordinador inspeccionó e integró sus cambios de orden en `page.tsx`, `navItems` y numeración. Playwright CLI confirmó el orden Hero → About → Projects → Tech → Experience → Certifications y el mismo orden en navbar/footer.
- C-02B fue implementado por `/root/c02b_copy` (Sol medium solicitado). El reviewer independiente `/root/c02_c05_review` (Sol high solicitado, solo lectura) encontró dos discrepancias con el CV principal: el inicio de la progresión decía Junior Frontend y Henry mostraba 2022–2023. El implementador corrigió a Junior Full-Stack Developer y 2023 en datos y locales. La educación IES Córdoba/Henry aparece bajo “Certificaciones y formación”. Queda pendiente la segunda lectura de estas correcciones.
- C-02C fue implementado por `/root/c02c_meta` (Sol medium solicitado). La estrategia SSR español + actualización cliente de `<html lang>` y meta description está registrada en `design.md`. Playwright detectó dos metas de descripción durante la hidratación de Next; el implementador ajustó la sincronización para ambas. Al restaurar `i18n_lang=en`, Playwright confirmó `lang=en`, ambas descripciones en inglés, skip link “Skip to content” como primer Tab y Enter con foco en `#main`; a 390×844 el menú se anuncia “Open menu”.
- C-05A fue implementado por `/root/c05_tabs` (Sol medium solicitado). Playwright confirmó roving tabindex, ArrowRight con foco/selección en el tab siguiente y altura de 44 px en los seis tabs.
- C-05B fue implementado por `/root/c05_zoom` (Sol medium solicitado) y corregido tras un hallazgo de navegador: Escape cerraba a la vez zoom y modal. La segunda verificación confirmó que el primer Escape deja el modal abierto y devuelve foco al botón de zoom, y el segundo devuelve foco al botón de la tarjeta. Si se abre la galería directamente desde la imagen de la tarjeta, Escape deja el foco en el botón Cerrar dentro del modal. Los controles del modal y lightbox se midieron en 44×44 px.
- A 390×844, Playwright midió `scrollWidth=390`, sin desborde horizontal. La sesión de desarrollo mostró un aviso de hidratación de Framer Motion en el hero (`opacity`/`transform`). El coordinador localizó la causa en el estado inicial de `LoaderProvider`, que dependía de `sessionStorage` solo en el cliente, e hizo coincidir el primer render servidor/cliente con `ready=false`. Una recarga posterior en inglés mostró cero errores de consola. No se añadieron tests.

## C-03 y C-04 — casos y contacto

- `/root/c03_cases` (Sol medium solicitado) separó IoTLogIQ/Senzary, Polytics y Hermes del archivo sin retirar proyectos. Los tres casos muestran desafío, aporte propio y resultado/estado en ES/EN; Hermes se describe como demo de equipo, y el MCP general de Senzary no se atribuye al caso IoTLogIQ. El implementador informó 15 entradas totales, 11 visibles y paridad de 214 claves terminales en ES/EN en ese momento.
- La revisión de claims detectó tres detalles de trazabilidad en los destacados. El outcome de IoTLogIQ usaba una cifra general de Senzary como “proyectos”; se reemplazó por el uso de la plataforma en monitoreo industrial a medida y el enlace público. El outcome de Polytics afirmaba trabajo actual en una app nueva y CRM sin respaldo en el CV principal; se quitó. La contribución de Hermes se ajustó a “en equipo” sin afirmar el tamaño del equipo. Ninguna corrección cambia enlaces o capturas.
- Playwright confirmó en móvil la secuencia IoTLogIQ → Polytics → Hermes, los 11 proyectos en el archivo, filtro Trabajo con 5 resultados y los tres destacados persistentes, y `scrollWidth=390` a 390 px. Se inspeccionaron capturas móviles y de escritorio; el archivo tiene título y filtros separados visualmente. En inglés se vieron etiquetas “The challenge”, “My contribution” y “Outcome / status”.
- `/root/c04_contact` (Sol medium solicitado) agregó un tercer CTA de email al hero y ajustó el contacto del footer. Playwright confirmó en ES/EN `mailto:nicovon24@gmail.com`; ambos enlaces miden 44 px de alto a 390 y 1280 px, y no generan desborde horizontal.
- `/root/final_review` (Sol high solicitado, solo lectura) aprobó C-01 a C-05 tras las correcciones de claims. Observó una duplicación menor de la selección destacada: `featuredKeys` en el componente y `project.featured` en datos. El coordinador cambió el componente para que la pertenencia dependa solo de `project.featured`; el mapa de claves fija únicamente el orden confirmado. El mismo reviewer hizo una revisión puntual posterior y dio veredicto **aprobado**, sin hallazgos abiertos. El reviewer no repitió navegador, pruebas ni hash del PDF; esas evidencias corresponden al coordinador y a C-01.
- Cierre C-06: Playwright volvió a confirmar IoTLogIQ → Polytics → Hermes, 11 tarjetas en el archivo y cero desborde horizontal tras el último ajuste. El zoom abrió con Tab + Enter y Escape devolvió foco en dos pasos. `npx tsc --noEmit` pasó; `npm run lint` pasó sin advertencias ni errores de ESLint (Next mostró solo un aviso de deprecación del comando). `git diff --check` pasó (avisos de conversión LF/CRLF sin errores de espacios). La homepage y la ruta del CV respondieron HTTP 200. El servidor local sigue en `http://localhost:3000`.
