export const navItems = [
  { href: "#about", label: "Sobre mi" },
  { href: "#tech", label: "Tech" },
  { href: "#projects", label: "Proyectos" },
  { href: "#experience", label: "Experiencia" },
  { href: "#contact", label: "Contacto" },
];

export const profile = {
  name: "Nicolas Von Muhlinen",
  roleFirst: "Full-stack",
  roleSecond: "Developer",
  location: "Córdoba, Argentina",
  intro:
    "Soy desarrollador Full-stack y Analista de Sistemas, con experiencia desde 2022. He trabajado en plataformas IoT industriales y dashboards con tecnologías Javascript, Typescript, SQL y NoSQL, y me estoy orientando hacia el software aplicado al deporte y el machine learning.",
  about:
    "Radicado en Córdoba, Argentina, soy desarrollador full-stack y Analista de Sistemas. Trabajo con React, Node, TypeScript, Angular, bases de datos SQL y NoSQL, con experiencia en ThingsBoard y plataformas IoT industriales. He entregado soluciones para aeropuertos, data centers y monitoreo ambiental para clientes en Latinoamérica y EE.UU. Hablo tres idiomas y uso herramientas de IA (Cursor, Claude, Gemini) como parte activa de mi flujo de trabajo. Mi foco actual está en el cruce entre software, datos y deporte — especialmente el fútbol profesional — y en incorporar machine learning a proyectos con impacto real.",
  email: "nicovon24@gmail.com",
  socials: [
    { label: "GitHub", href: "https://github.com/nicovon24" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/nicolas-von-muhlinen" },
    { label: "CV", href: "/pdf/Nicolas_Von_Muhlinen_CV_EN.pdf" },
  ],
};

export const services = [
  "Desarrollador IoT",
  "Full-stack con experiencia frontend y backend",
  "Dashboards y visualizacion de datos",
  "Fan de Star Wars y del deporte",
];

export const techGroups = [
  {
    title: "Frontend",
    items: [
      { name: "HTML 5", level: "Avanzado", icon: "/images/svg/html.svg" },
      { name: "CSS 3", level: "Avanzado", icon: "/images/svg/css.svg" },
      { name: "JavaScript", level: "Avanzado", icon: "/images/svg/js.svg" },
      { name: "TypeScript", level: "Intermedio", icon: "/images/svg/ts.svg" },
      { name: "React", level: "Avanzado", icon: "/images/svg/react.svg" },
      { name: "Redux", level: "Avanzado", icon: "/images/svg/redux.svg" },
      { name: "Tailwind", level: "Avanzado", icon: "/images/svg/tailwind.svg" },
      { name: "Next.js", level: "Intermedio", icon: "/images/svg/next.svg" },
    ],
  },
  {
    title: "Backend y herramientas",
    items: [
      { name: "Node.js", level: "Intermedio", icon: "/images/svg/node.svg" },
      { name: "SQL", level: "Intermedio", icon: "/images/svg/sqlSvg.svg" },
      { name: "MongoDB", level: "Intermedio", icon: "/images/svg/mongo.svg" },
      { name: "Git", level: "Avanzado", icon: "/images/svg/git.svg" },
      { name: "Linux", level: "Basico", icon: "/images/svg/linux.svg" },
      { name: "C#", level: "Intermedio", icon: "/images/svg/c-sharp.svg" }
    ],
  },
];

export type ExperienceKind = "work" | "study";

export const experiences: Array<{
  company: string;
  title: string;
  date: string;
  icon: string;
  points: string[];
  kind: ExperienceKind;
}> = [
  {
    company: "Senzary",
    title: "Full-stack IoT Developer",
    date: "Agosto 2023 - Actualidad",
    icon: "/images/projects/senzary/logo/1.png",
    kind: "work",
    points: [
      "Desarrollo y diseño de dashboards para diversos casos de uso",
      "Análisis de casos de uso, estableciendo offsets y thresholds",
      "Implementación de rule chains y procesamiento avanzado de datos",
      "Implementación de metodologías ágiles",
      "Capacitación a otros desarrolladores",
    ],
  },
  {
    company: "Freelance en Gen Consultores",
    title: "Full-stack Developer",
    date: "Abril 2023 - Julio 2023",
    icon: "/images/company/freelance.png",
    kind: "work",
    points: [
      "Renderizado de componentes y estilos en diferentes secciones",
      "Mantenimiento y optimización de la app",
      "Trabajo en equipo y propuestas de mejora",
    ],
  },
  {
    company: "No Country",
    title: "Full-stack Developer",
    date: "Abril 2023 - Julio 2023",
    icon: "/images/company/no_country.png",
    kind: "study",
    points: [
      "Liderar el armado de la base de datos y del servidor (back-end)",
      "Desarrollar las rutas y controladores de empleados",
      "Asistir en el frontend y el armado de componentes",
    ],
  },
  {
    company: "Soy Henry",
    title: "Asistente de enseñanza / Tutor",
    date: "Enero 2023 - Abril 2023",
    icon: "/images/company/henry.png",
    kind: "study",
    points: [
      "Coordinar el grupo de estudiantes con el objetivo de lograr su adaptación al programa",
      "Proponer ideas para la mejora de los procesos del Bootcamp",
      "Promover la cohesión grupal y generar comunidad",
    ],
  },
];

export const projects = [
  {
    title: "Prodeazo (Prode Mundial 2026)",
    description:
      "Plataforma de pronósticos y estadísticas de fútbol pensada para el Mundial 2026 y escalar a otros torneos: fixtures y resultados en tiempo real, predicciones antes del inicio del partido, puntos por aciertos y rankings generales y por ligas. MVP con fixture, predicciones, ranking, comparativa usuario a usuario y picks especiales (campeón, goleador, etc.); roadmap en fases para miniligas con administración y un módulo estadístico reutilizable (grupos, llaves, métricas y perfiles). Stack inicial: Next.js y TypeScript, Supabase con PostgreSQL, Tailwind y NextUI; fixtures y resultados vía Bzzoiro BSD.",
    technologies: ["Next.js", "TypeScript", "Supabase", "Tailwind", "NextUI"],
    images: [
      "/images/projects/prodeazo/home.jpg",
      "/images/projects/prodeazo/login.png",
      "/images/projects/prodeazo/inicio.jpg",
    ],
    live: "https://prodeazo.vercel.app",
  },
  
  {
    title: "Scout Panel",
    description:
      "Proyecto desarrollado para un challenge y que sigue en proceso: planeo seguir trabajándolo hasta cerrarlo. El diseño del frontend, del backend y de la base de datos es propio. Los datos son inventados y cargados por seed; la app no está conectada a ninguna API externa de estadísticas ni jugadores reales. Funcionalidades: búsqueda y filtros (posición, nacionalidad, club, edad), comparador hasta tres jugadores con radar y tablas, historial de lesiones ligado al rating, shortlist con auth JWT, clubes, reportes exportables PDF/Excel, heatmaps y vista de mercado. UI oscura inspirada en LDP y Sofascore. Stack: Next.js 14 (App Router), TypeScript, Tailwind, HeroUI (NextUI), Zustand y Recharts; API Express, Drizzle, Zod y PostgreSQL 16; tests Vitest, Supertest y Playwright; Docker y deploy Vercel + Render + Supabase.",
    technologies: ["Next.js", "TypeScript", "Express", "Drizzle", "PostgreSQL", "Tailwind"],
    images: [
      "/images/projects/scoutpanel/home.png",
      "/images/projects/scoutpanel/compare.png",
      "/images/projects/scoutpanel/reports.png",
    ],
    live: "https://scout-panel-ldp.vercel.app",
  },
  {
    title: "IoTLogIQ Demo - Senzary",
    description:
      "Demo para mostrar casos de uso y potencial de la plataforma Senzary, incluyendo monitoreo en tiempo real y analisis predictivo.",
    technologies: ["IoT", "Dashboards", "Data visualization"],
    images: ["/images/projects/senzary/demo/1.png", "/images/projects/senzary/demo/2.png", "/images/projects/senzary/demo/3.png"],
  },
  {
    title: "Cloudlab - No Country",
    description:
      "Plataforma para laboratorios clinicos orientada a agilizar la gestion de estudios, resultados y pacientes.",
    technologies: ["Next.js", "TypeScript", "Tailwind"],
    images: ["/images/projects/cloudlab/1.png", "/images/projects/cloudlab/2.png", "/images/projects/cloudlab/3.png"],
    code: "https://github.com/No-Country/s9-16-m-node-react",
    live: "https://cloudlab-s9-16.vercel.app/",
  }
];
