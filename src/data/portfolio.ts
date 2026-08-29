import type { TechSlug } from "@/components/ui/TechIcon";

export const navItems = [
  { href: "#about", label: "nav.about" },
  { href: "#tech", label: "nav.tech" },
  { href: "#projects", label: "nav.projects" },
  { href: "#experience", label: "nav.experience" },
];

export const profile = {
  name: "NICOLAS VON MUHLINEN",
  // Nombre de pila con capitalizacion normal: usado en el hero ("Hola, soy Nicolás"),
  // separado de `name` (mayusculas, footer/alt) para no parsear/normalizar ahi.
  heroFirstName: "Nicolás",
  roleFirst: "Full-stack",
  roleSecond: "Developer",
  location: "Córdoba, Argentina",
  intro:
    "Soy desarrollador Full-stack y Analista de Sistemas con experiencia desde 2022. Construyo frontend y backend de aplicaciones web, dashboards y plataformas de datos con React, Node, Angular, React Native, Claude Code y AWS. He trabajado en proyectos para industrias diversas — software a medida, IoT industrial, plataformas deportivas y software electoral — para clientes en Latinoamérica y EE.UU.",
  about:
    "Radicado en Córdoba, Argentina. Soy desarrollador full-stack y Analista de Sistemas: trabajo tanto en frontend como en backend con React, Next.js, Node, TypeScript, Angular y bases de datos SQL/NoSQL. He entregado proyectos en industrias diversas — software a medida, plataformas deportivas, aplicaciones electorales y plataformas IoT industriales (aeropuertos, data centers, monitoreo ambiental) — para clientes en Latinoamérica y EE.UU. Hablo tres idiomas y uso herramientas de IA (Cursor, Claude, Gemini) como parte activa de mi flujo de trabajo.",
  email: "nicovon24@gmail.com",
  socials: [
    { label: "GitHub", href: "https://github.com/nicovon24" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/nicolas-von-muhlinen" },
    { label: "CV", href: "/pdf/Nicolas_Von_Muhlinen_CV.pdf" },
  ],
};

export const services = [
  "Full-stack: frontend y backend",
  "Dashboards y visualización de datos",
  "Proyectos en industrias diversas",
  "Fan de Star Wars y del deporte",
];

export const techGroups: Array<{
  title: string;
  items: ReadonlyArray<{ name: string; icon: TechSlug; primary?: boolean }>;
}> = [
  {
    title: "tech.groups.frontend",
    items: [
      { name: "Next.js", icon: "next" },
      { name: "React", icon: "react", primary: true },
      { name: "Angular", icon: "angular", primary: true },
      { name: "Vite.js", icon: "vite" },
      { name: "TypeScript", icon: "ts", primary: true },
      { name: "JavaScript", icon: "js" },
      { name: "Redux", icon: "redux" },
      { name: "Zustand", icon: "zustand" },
      { name: "HTML5", icon: "html" },
      { name: "CSS", icon: "css" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "Three.js", icon: "threejs" },
      { name: "Figma", icon: "figma" },
      { name: "Vercel", icon: "vercel" },
    ],
  },
  {
    title: "tech.groups.backend",
    items: [
      { name: "Java", icon: "java" },
      { name: "Spring Boot", icon: "springboot" },
      { name: "Node.js", icon: "node", primary: true },
      { name: "FastAPI", icon: "fastapi", primary: true },
      { name: "NestJS", icon: "nestjs" },
      { name: "Express.js", icon: "express" },
      { name: "JWT", icon: "jwt" },
      { name: "Passport.js", icon: "passport" },
      { name: "SQL", icon: "sql" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MongoDB", icon: "mongo" },
      { name: "Sequelize", icon: "sequelize" },
      { name: "Postman", icon: "postman" },
      { name: "Stripe", icon: "stripe" },
      { name: "Mercado Pago", icon: "mercadopago" },
      { name: "Docker", icon: "docker" },
      { name: "AWS", icon: "aws", primary: true },
      { name: "Git", icon: "git" },
      { name: "Linux", icon: "linux" },
    ],
  },
  {
    title: "tech.groups.testing",
    items: [
      { name: "Vitest", icon: "vitest" },
      { name: "Jest", icon: "jest" },
      { name: "Supertest", icon: "supertest" },
      { name: "Playwright", icon: "playwright" },
    ],
  },
  {
    title: "tech.groups.ia",
    items: [
      { name: "Claude Code", icon: "claude" },
      { name: "ChatGPT", icon: "openai" },
      { name: "Gemini", icon: "gemini" },
      { name: "Agentes GSD", icon: "gsd" },
    ],
  },
];

/** Tipo de vinculo, se muestra como etiqueta en la timeline. */
export type ExperienceKind = "professional" | "freelance" | "academic";

/** Productos y soluciones dentro de una experiencia (acordeon). */
export const senzaryProducts = [
  "iotlogiq",
  "airportiq",
  "workeriq",
  "iac",
  "industry",
  "trashcans",
  "ai",
] as const;

/** Freelance: politica primero, que es el foco principal. */
export const freelanceProducts = ["political", "iot", "delivery"] as const;

export const experiences: Array<{
  key: string;
  company: string;
  icon: string;
  iconBg?: string;
  kind: ExperienceKind;
  /** En curso: muestra el punto pulsante en la timeline. */
  current?: boolean;
  /** Entrada secundaria: resumen de 1-2 lineas en vez de bullets. */
  compact?: boolean;
  /** Claves de i18n en experience.products, renderizadas como acordeon. */
  products?: readonly string[];
}> = [
  {
    key: "senzary",
    company: "Senzary",
    icon: "/images/projects/senzary/logo/1.png",
    kind: "professional",
    current: true,
    products: senzaryProducts,
  },
  {
    key: "politicalFreelance",
    company: "Freelance · consultoría política e IoT",
    icon: "/images/company/freelance.png",
    iconBg: "#2a1414",
    kind: "freelance",
    current: true,
    products: freelanceProducts,
  },
  {
    key: "early2023",
    // Soy Henry ya va en el titulo: repetirlo aca era redundante.
    company: "No Country · GEN Consultores",
    icon: "/images/company/henry.png",
    iconBg: "#ffff00",
    kind: "academic",
    compact: true,
  },
];

/** Filtros de la seccion Proyectos. El orden define el orden de las tabs. */
export const projectCategories = [
  "work",
  "personal",
  "freelance",
  "iot",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

/** Origen del proyecto: se muestra como ultima etiqueta junto al role. */
export type ProjectOrg = "senzary" | "freelance" | "personal";

export type PortfolioProject = {
  key: string;
  title: string;
  technologies: string[];
  /** Un proyecto puede caer en varias: rubro + contexto a la vez. */
  categories: ProjectCategory[];
  /** Año o rango, se muestra como meta arriba del titulo. */
  year: string;
  /** Rol que cumpliste, junto al año. */
  role: string;
  /** Senzary (laboral), freelance o personal. Se muestra junto al role. */
  org: ProjectOrg;
  /** Ocupa dos columnas en la grilla de desktop. */
  featured?: boolean;
  images: string[];
  live?: string;
  live2?: string;
  code?: string;
  privateRepo?: boolean;
  inDevelopment?: boolean;
  hidden?: boolean;
};

export const projects: PortfolioProject[] = [
  {
    key: "iotarg",
    categories: ["iot", "personal"],
    year: "2026",
    role: "Full-stack",
    org: "personal",
    title: "IoTArg",
    technologies: [
      "React.js",
      "React Query",
      "Zod",
      "Tailwind CSS",
      "WebSockets",
      "NestJS",
      "Node.js",
      "TypeScript",
      "Fastify",
      "Prisma",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Thingsboard",
      "IOT",
      "Git",
    ],
    images: [
      "/images/projects/iotarg/1.png",
      "/images/projects/iotarg/2.png",
      "/images/projects/iotarg/3.png",
      "/images/projects/iotarg/4.png",
      "/images/projects/iotarg/5.png",
      "/images/projects/iotarg/6.png",
    ],
    code: "https://github.com/nicovon24/iot_app",
    live: "https://iotarg.vercel.app/",
  },
  {
    key: "trashcans",
    categories: ["iot", "work"],
    year: "2024",
    role: "Full-stack · IoT",
    org: "senzary",
    title: "TrashCans — Senzary",
    technologies: ["Angular", "Node.js", "IoT", "Dashboards"],
    images: [
      "/images/projects/senzary/vercel/trashcans/landing.png",
      "/images/projects/senzary/vercel/trashcans/map.png",
      "/images/projects/senzary/vercel/trashcans/analytics.png",
      "/images/projects/senzary/vercel/trashcans/tickets.png",
      "/images/projects/senzary/vercel/trashcans/onboarding.png",
    ],
    live: "https://trashcans.senzary.com/",
    privateRepo: true,
  },
  {
    key: "awsprep",
    categories: ["personal"],
    year: "2026",
    role: "Full-stack",
    org: "personal",
    title: "AWS Study App",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    images: [
      "/images/projects/awsprep/2.png",
      "/images/projects/awsprep/3.png",
      "/images/projects/awsprep/1.png",
      "/images/projects/awsprep/4.png",
      "/images/projects/awsprep/5.png",
    ],
    code: "https://github.com/nicovon24/aws_study",
    live: "https://aws-prep-26.vercel.app/",
  },
  {
    key: "prodeazo",
    categories: ["personal"],
    year: "2026",
    role: "Full-stack",
    org: "personal",
    title: "Prodeazo (Prode Mundial 2026)",
    technologies: ["Next.js", "TypeScript", "Supabase", "Tailwind", "NextUI"],
    images: [
      "/images/projects/prodeazo/home.jpg",
      "/images/projects/prodeazo/login.png",
      "/images/projects/prodeazo/inicio.jpg",
    ],
    code: "https://github.com/nicovon24/Prodeazo",
    live: "https://prodeazo.vercel.app",
  },
  {
    key: "scoutpanel",
    categories: ["personal"],
    year: "2025",
    role: "Full-stack",
    org: "personal",
    title: "Scout Panel",
    technologies: ["Next.js", "TypeScript", "Express", "Drizzle", "PostgreSQL", "Tailwind"],
    images: [
      "/images/projects/scoutpanel/home.png",
      "/images/projects/scoutpanel/compare.png",
      "/images/projects/scoutpanel/reports.png",
    ],
    code: "https://github.com/nicovon24/ScoutPanelLDP",
    live: "https://scout-panel-ldp.vercel.app",
  },
  {
    key: "queabuso",
    categories: ["work", "freelance"],
    year: "2025",
    role: "Full-stack",
    org: "freelance",
    title: "Apps políticas",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
    images: [
      "/images/projects/partido/queabuso/landing.png",
      "/images/projects/partido/queabuso/deja-denuncias.png",
      "/images/projects/partido/queabuso/denuncias.png",
      "/images/projects/partido/gabriel/sorteo.png",
      "/images/projects/partido/gabriel/home.png",
    ],
    live: "https://queabusocba.com/",
    live2: "https://gabrielbornoroni.com.ar/",
    privateRepo: true,
  },
  {
    key: "workeriq",
    categories: ["iot", "work"],
    year: "2024",
    role: "Full-stack",
    org: "senzary",
    featured: true,
    title: "WorkerIQ — ENI · Senzary",
    technologies: ["React", "Node.js", "IoT", "Tiempo real", "Mapas", "Dashboards"],
    images: [
      "/images/projects/senzary/vercel/workeriq/landing.png",
      "/images/projects/senzary/vercel/workeriq/map.png",
      "/images/projects/senzary/vercel/workeriq/map-v2.png",
    ],
    live: "https://workeriq-drill.iotlogiq.com/",
    privateRepo: true,
  },
  {
    key: "iotlogiq",
    categories: ["iot", "work"],
    year: "2023—2026",
    role: "Full-stack",
    org: "senzary",
    title: "IoTLogIQ — Senzary",
    technologies: [
      "Angular",
      "Node.js",
      "React",
      "ThingsBoard",
      "IoT",
      "Digital twin",
      "Dashboards",
      "Data visualization",
    ],
    images: [
      "/images/projects/senzary/demo/air-quality-1.png",
      "/images/projects/senzary/demo/gpio.png",
      "/images/projects/senzary/demo/doors-1.png",
      "/images/projects/senzary/smartindustry/smart-industry-1.png",
      "/images/projects/senzary/smartindustry/overview.png",
      "/images/projects/senzary/smartindustry/digitaltwin.png",
      "/images/projects/senzary/demo/predictive.png",
      "/images/projects/senzary/indiana/1.png",
      "/images/projects/senzary/demo/air-quality-2.png",
      "/images/projects/senzary/demo/temperature.png",
      "/images/projects/senzary/demo/ultrasound-1.png",
      "/images/projects/senzary/demo/doors-2.png",
      "/images/projects/senzary/demo/on-off-1.png",
      "/images/projects/senzary/demo/bob.png",
    ],
    live: "https://iotlogiq.com/",
    privateRepo: true,
  },
  {
    key: "fintrack",
    categories: ["personal"],
    year: "2026",
    role: "Full-stack",
    org: "personal",
    title: "Fintrack",
    technologies: [
      "Java",
      "Spring Boot",
      "AngularJS",
      "Maven",
      "Docker",
      "Spring Data",
      "Spring Security",
      "Passport.js",
      "Swagger",
    ],
    images: [
      "/images/projects/fintrack/1.png",
      "/images/projects/fintrack/2.png",
      "/images/projects/fintrack/3.png",
      "/images/projects/fintrack/4.png",
      "/images/projects/fintrack/5.png",
    ],
    code: "https://github.com/nicovon24/fintrack",
  },
  {
    key: "appfiscalizacion",
    categories: ["work", "freelance"],
    year: "2025",
    role: "Full-stack",
    org: "freelance",
    featured: true,
    title: "App Fiscalización",
    technologies: ["Next.js", "Framer Motion", "Redux Toolkit", "Vercel"],
    live: "https://fiscalizar.lalibertadavanzacba.com/",
    privateRepo: true,
    images: [
      "/images/projects/partido/app/dashboard1.png",
      "/images/projects/partido/app/dashboard2.png",
      "/images/projects/partido/app/dashboard3.png",
      "/images/projects/partido/app/seccionales.png",
      "/images/projects/partido/app/mesas.png",
    ],
  },
  {
    key: "cloudlab",
    categories: ["personal"],
    year: "2023",
    role: "Frontend",
    org: "personal",
    title: "Cloudlab - No Country",
    technologies: ["Next.js", "TypeScript", "Tailwind"],
    images: ["/images/projects/cloudlab/1.png", "/images/projects/cloudlab/2.png", "/images/projects/cloudlab/3.png"],
    code: "https://github.com/No-Country/s9-16-m-node-react",
    live: "https://cloudlab-s9-16.vercel.app/",
  },
  {
    key: "airportiq",
    categories: ["iot", "work"],
    year: "2024—2025",
    role: "Full-stack",
    org: "senzary",
    title: "AirportIQ — Jacksonville Airport · Senzary",
    technologies: [
      "Angular",
      "Node.js",
      "IoT",
      "Dashboards",
    ],
    images: [
      "/images/projects/senzary/airport/1.png",
      "/images/projects/senzary/airport/3.png",
      "/images/projects/senzary/airport/4.png",
      "/images/projects/senzary/airport/5.png",
      "/images/projects/senzary/airport/6.png",
      "/images/projects/senzary/airport/7.png",
    ],
    privateRepo: true,
  },
];
