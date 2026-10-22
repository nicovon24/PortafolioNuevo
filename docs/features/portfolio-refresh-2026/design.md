# Diseño de contenido y experiencia

## Lectura del estado actual

La homepage monta `Hero → About → Tech → Projects → Experience → Certifications → Footer` en `src/app/page.tsx`. En la revisión visual previa, a 390×844 el primer proyecto empezaba cerca de y=3692 y no había desborde horizontal. El CTA del hero salta a `#projects`, por lo que la demora afecta el recorrido natural; no bloquea el acceso. About sí contiene resultados profesionales antes de las tarjetas.

`ProjectsSection.tsx` muestra por defecto los 11 proyectos no ocultos. `featured` en `portfolio.ts` cambia la anchura de la tarjeta en escritorio, pero no crea una selección editorial. El título “Featured projects / Proyectos destacados” promete algo más acotado. Hoy Hermes y TrashCans están marcados como `featured`; IoTLogIQ y Polytics, con mayor respaldo en el CV principal, no lo están.

La identidad visual existente, el retrato, la disponibilidad y el tono personal funcionan. El cambio propuesto es de jerarquía y veracidad del contenido, conservando la dirección visual y la lógica del carrusel del hero. `docs/REVIEW.md` y `docs/v2/` registran etapas anteriores y contienen estados ya superados; esta feature es el plan vigente para este alcance.

## Fuentes y reglas editoriales

| Fuente | Uso en esta feature | Límite |
|---|---|---|
| `new/Nicolas_Von_Muhlinen_CV_EN.pdf` | Autoridad documental principal para perfil, experiencia, proyectos y logros | El usuario puede corregirlo; no convertir aproximaciones en cifras exactas |
| Confirmación directa de Nicolás en esta sesión | React + Node.js para migración de ThingsBoard; Senzary actual junto a AnyoneAI | Registrar fecha de la decisión: 2026-10-22 |
| `new/Linkedin_Profile.pdf` y variantes de `new/` | Contraste de fechas, posicionamiento y énfasis según rol | No resolver discrepancias por mayoría de archivos |
| `public/pdf/Nicolas_Von_Muhlinen_CV.pdf` | Artefacto que hoy descarga el sitio | Es una versión diferente; no usarla como autoridad del nuevo copy |
| `src/data/portfolio.ts`, locales ES/EN | Implementación actual y rutas de contenido | Mantener estructura y paridad de claves |

### Matriz de cambios de contenido

| Hecho o tema | Estado actual | Decisión de contenido |
|---|---|---|
| Migración | CV principal y LinkedIn: React + Node.js. PDF servido y `experience.items.senzary.points` / `experience.products.iotlogiq.detail` de ambos idiomas: Angular + Node.js. | Usar React + Node.js para esa migración, por confirmación directa. Mantener Angular donde describe otros trabajos reales. |
| Vigencia en Senzary | Antes de C-01, el CV y las fechas indicaban presente, pero `profile.about` decía “Fui Senior...”; la marca `current` también requería reconciliación. | C-01 la dejó en presente y aclaró AnyoneAI como contrato part-time paralelo. |
| Resultados Senzary | CV: 3 a 10+ clientes, carga aproximadamente a la mitad, tracking de 200 personas, MCP en producción con acceso por tenant. | Priorizar 2 o 3 pruebas visibles; atribuir el crecimiento a la evolución de las soluciones y mantener “aproximadamente”. |
| Polytics | CV y sitio: app para 20.000+ fiscales, aporte al sistema que centralizó 20.000+ actas, sin pérdida reportada durante el evento. | Conservar la diferencia entre “construí la app” y “ayudé a diseñar el sistema”. |
| Hermes | Demo de hackathon de equipo, 2.º puesto; backend e integración de agentes a cargo de Nicolás. | Rotular como demo premiada y explicar contribución personal; no presentarla como servicio en producción. |
| FinTrack | Aplicación de uso personal, herramientas de brokerage de solo lectura. | Mantener el alcance personal y el acceso de solo lectura. |
| Certificaciones | AWS AI Practitioner y tres cursos en el sitio; CV agrega AI Verified de TheFlock. | Publicar solo credenciales verificadas con emisor, fecha y enlace cuando aplique. D-007 pendiente. |
| LoRa Desk | En About y CV publicado anterior; ausente del CV principal nuevo. | No ampliar su presencia hasta resolver D-006; esta decisión no bloquea los primeros cortes. |
| Educación | El CV principal indica Analista de Sistemas, IES Córdoba, graduado en 2026, y bootcamp Henry. El sitio titula su sección “Certificaciones y educación” pero no presenta la formación. | Añadir una entrada breve de educación respaldada por el CV o renombrar la sección para que prometa solo lo que muestra. La opción propuesta es incluir la formación. |
| Descarga de CV | Hero/Footer apuntan al PDF público, diferente del CV principal nuevo. | Publicar el CV principal aprobado bajo la ruta estable actual y comprobar coincidencia de archivo y descarga. |

## Narrativa propuesta

1. **Hero:** nombre, rol “AI Engineer · Full-Stack” confirmado por Nicolás, una frase sobre productos full-stack e IA aplicada, disponibilidad, dos acciones claras: ver casos y contactar/descargar CV. El mensaje debe caber en el primer viewport móvil. El CV general usa un titular más amplio; ambos deben describir la misma experiencia comprobable.
2. **Prueba temprana:** una selección confirmada de tres casos con contexto distinto: plataforma IoTLogIQ/Senzary, escala operativa en Polytics y demo de agentes premiada en Hermes. Cada caso usa la misma estructura: problema, contribución concreta, resultado/estado y enlace. El MCP se atribuye a la experiencia general en Senzary salvo prueba de que corresponde directamente a IoTLogIQ.
3. **Trayectoria:** About y Experience sostienen la progresión Junior → Semi-Senior → Senior, liderazgo, trabajo actual simultáneo y logros con atribución precisa. Reducir repetición entre ambas secciones.
4. **Stack:** mostrar un núcleo corto que respalde los casos y desplazar el inventario completo a una posición posterior. La cinta del hero puede mantenerse; la propuesta no altera su algoritmo.
5. **Archivo, educación y contacto:** conservar el catálogo filtrable como archivo; mostrar la formación de IES Córdoba junto a AWS y cursos bajo un título veraz; ofrecer email accesible desde la zona inicial además del footer. La inclusión de AI Verified es independiente y espera D-007.

### Borrador de microcopy para validar

- EN: “I build full-stack products and applied AI for real-world operations. At Senzary, I built a production MCP server and helped move the ThingsBoard frontend to React and Node.js.”
- ES: “Construyo productos full-stack e IA aplicada para operaciones reales. En Senzary desarrollé un servidor MCP usado en producción y participé en la migración del frontend de ThingsBoard a React y Node.js.”
- Nota: este borrador usa una atribución conservadora para la migración; el CV principal dice que Nicolás la lideró. La redacción final debe elegir un solo nivel de atribución consistente con el CV aprobado.

## Recorrido y accesibilidad

- Entrega de bajo riesgo: corregir datos y PDF primero; después acercar Projects antes de Tech sin alterar IDs, CTA ni filtros. Esto reduce la distancia en el scroll mientras se prepara la selección editorial.
- Entrega editorial posterior: colocar tres casos seleccionados cerca del hero y diferenciar explícitamente la sección “archivo / all projects” de los destacados. Todos los proyectos actuales siguen disponibles por filtros; no se pierden enlaces ni capturas.
- `TechSection.tsx` usa `role=tab` y `aria-selected`, pero no navegación con flechas, Home/End ni roving tabindex. Los botones se activan con Tab/Enter; la implementación posterior completará el patrón y comprobará objetivos táctiles de al menos 44×44 CSS px en móvil.
- En el modal de proyecto, la captura amplía con clic sobre la imagen y requiere acción enfocables equivalente. Conservar foco atrapado, Escape, flechas y restauración del foco que ya existen en modal/lightbox. Revisar también el tamaño de sus controles móviles.
- No declarar un problema de foco invisible sin reproducirlo: `globals.css` contiene una regla global de `:focus-visible`; el efecto de `outline-none` de los tabs requiere inspección visual.

## Navegación y metadatos al cambiar la jerarquía

Mover `Projects` antes de `Tech` también exige reordenar `navItems` en `src/data/portfolio.ts`: `Navbar.tsx` usa ese arreglo para el orden, la numeración y el cálculo de sección activa al desplazarse. Revisar asimismo los números visibles de los encabezados de sección y el footer para que coincidan con el nuevo recorrido. No basta con cambiar `src/app/page.tsx`.

D-004 quedó confirmado como “AI Engineer · Full-Stack”. C-02C conserva un título neutral para ambos idiomas y el español como idioma canónico del HTML y la descripción en el render del servidor. El sitio cambia de idioma en el cliente con i18next y recuerda la preferencia en `localStorage`; `I18nProvider` sincroniza `<html lang>` y todas las etiquetas `meta[name="description"]` con el idioma activo, incluidas las que Next inserta durante la hidratación. No hay rutas separadas por idioma ni alternates `hreflang` hasta que exista una estrategia de URLs bilingües. En navegador se comprobó que al restaurar inglés ambas etiquetas de descripción muestran el texto inglés, y que el skip link también se traduce.

Hay dos nombres accesibles que también se deben localizar: el skip link “Saltar al contenido” está en `layout.tsx`, fuera del `I18nProvider`, y el botón móvil del menú usa “Abrir/Cerrar menu” hardcodeado en `Navbar.tsx`. El plan propone un skip link cliente bajo el provider si hace falta y las claves de menú ya existentes `nav.openMenu` / `nav.closeMenu`; comprobar ambos en la vista inglesa y la española.

## Criterios de decisión para la selección de casos

1. Evidencia de uso real y resultado verificable.
2. Contribución personal identificable.
3. Cobertura del posicionamiento elegido (full-stack, IA aplicada y operaciones a escala).
4. Capturas y enlace que permitan comprobar el caso sin revelar código privado.

La selección confirmada por Nicolás es IoTLogIQ/Senzary, Polytics y Hermes; TrashCans y FinTrack permanecen en el archivo. No se cambiarán las etiquetas `featured` hasta definir en implementación el tratamiento visual que separe realmente los tres casos del archivo.
