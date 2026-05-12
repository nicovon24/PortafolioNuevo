export const navItems = [
  { href: "#about", label: "Sobre mi" },
  { href: "#tech", label: "Tech" },
  { href: "#projects", label: "Proyectos" },
  { href: "#experience", label: "Experiencia" },
  { href: "#contact", label: "Contacto" },
];

export const profile = {
  name: "NICOLAS VON MUHLINEN",
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
    { label: "CV", href: "/pdf/Nicolas_Von_Muhlinen_CV.pdf" },
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
      { name: "Next.js", icon: "/images/svg/next.svg" },
      { name: "React", icon: "/images/svg/react.svg" },
      { name: "TypeScript", icon: "/images/svg/ts.svg" },
      { name: "JavaScript", icon: "/images/svg/js.svg" },
      { name: "Redux", icon: "/images/svg/redux.svg" },
      { name: "Zustand", icon: "/images/svg/zustand.svg" },
      { name: "HTML 5", icon: "/images/svg/html.svg" },
      { name: "CSS 3", icon: "/images/svg/css.svg" },
      { name: "Tailwind", icon: "/images/svg/tailwind.svg" },
      { name: "Vercel", icon: "/images/svg/vercel.svg" }
    ],
  },
  {
    title: "Backend y herramientas",
    items: [
      { name: "Node.js", icon: "/images/svg/node.svg" },
      { name: "SQL", icon: "/images/svg/sqlSvg.svg" },
      { name: "MongoDB", icon: "/images/svg/mongo.svg" },
      { name: "Docker", icon: "/images/svg/docker.svg" },
      { name: "Git", icon: "/images/svg/git.svg" },
      { name: "Linux", icon: "/images/svg/linux.svg" },
    ],
  },
  {
    title: "IA",
    items: [
      { name: "Claude Code", icon: "/images/svg/claude.svg" },
      { name: "ChatGPT", icon: "/images/svg/openai.svg" },
      { name: "Gemini", icon: "/images/svg/gemini.svg" },
      { name: "Agentes GSD", icon: "/images/svg/gsd.svg" },
    ],
  },
];

export type ExperienceKind = "work" | "study";

export const experiences: Array<{
  company: string;
  title: string;
  date: string;
  icon: string;
  iconBg?: string;
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
    iconBg: "#1a3a6b",
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
    iconBg: "#f5a623",
    kind: "study",
    points: [
      "Coordinar el grupo de estudiantes con el objetivo de lograr su adaptación al programa",
      "Proponer ideas para la mejora de los procesos del Bootcamp",
      "Promover la cohesión grupal y generar comunidad",
    ],
  },
];

export type PortfolioProject = {
  title: string;
  description: string;
  technologies: string[];
  images: string[];
  live?: string;
  code?: string;
  /** Si es true, el proyecto sigue en desarrollo activo */
  inDevelopment?: boolean;
  /** No listar en la sección de proyectos */
  hidden?: boolean;
};

export const projects: PortfolioProject[] = [
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
    code: "https://github.com/nicovon24/Prodeazo",
    live: "https://prodeazo.vercel.app",
    inDevelopment: true,
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
    code: "https://github.com/nicovon24/ScoutPanelLDP",
    live: "https://scout-panel-ldp.vercel.app",
    inDevelopment: true,
  },
  {
    title: "Gabriel Bornoroni — Sitio oficial",
    hidden: true,
    description:
      "Landing institucional y espacio del sorteo de la dieta del Diputado Nacional Gabriel Bornoroni (Córdoba). Resume su rol desde 2023 y el trabajo legislativo en el equipo del Presidente Javier Milei y Karina Milei; comunica que la política debe estar al servicio de la sociedad y presenta el sorteo de la dieta como gesto de transparencia («no vine a vivir de la política sino a cambiar las cosas»). Guía el registro para participantes mayores de 18 años con domicilio en la provincia de Córdoba —una vez registrados entran en todos los sorteos futuros—, destaca la cuenta regresiva del próximo sorteo y enlaza participación y bases y condiciones.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    images: ["/images/projects/partido/gabriel/sorteo.png", "/images/projects/partido/gabriel/home.png",],
    live: "https://gabrielbornoroni.com.ar/",
  },
  {
    title: "App Fiscalización",
    description:
      "Web para fiscales generales de Córdoba en las legislativas de octubre de 2025: dashboard, login, fiscales, incidencias, preguntas y escrutinio por mesas, consumiendo una API REST. Next.js (App Router), Redux Toolkit y Tailwind; feedback con toasts y alertas. Deploy en Vercel.",
    technologies: [
      "Next.js",
      "Framer Motion",
      "Redux Toolkit",
      "Vercel",
    ],
    images: [
      "/images/projects/partido/app/dashboard1.png",
      "/images/projects/partido/app/dashboard2.png",
      "/images/projects/partido/app/dashboard3.png",
      "/images/projects/partido/app/seccionales.png",
      "/images/projects/partido/app/mesas.png",
    ],
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
