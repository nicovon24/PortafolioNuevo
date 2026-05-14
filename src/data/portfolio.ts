export const navItems = [
  { href: "#about", label: "nav.about" },
  { href: "#tech", label: "nav.tech" },
  { href: "#projects", label: "nav.projects" },
  { href: "#experience", label: "nav.experience" },
  { href: "#contact", label: "nav.contact" },
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
    title: "tech.groups.frontend",
    items: [
      { name: "Next.js", icon: "/images/svg/next.svg" },
      { name: "React", icon: "/images/svg/react.svg" },
      { name: "Vite.js", icon: "/images/svg/vite.svg" },
      { name: "TypeScript", icon: "/images/svg/ts.svg" },
      { name: "JavaScript", icon: "/images/svg/js.svg" },
      { name: "Redux", icon: "/images/svg/redux.svg" },
      { name: "Zustand", icon: "/images/svg/zustand.svg" },
      { name: "HTML5", icon: "/images/svg/html.svg" },
      { name: "CSS", icon: "/images/svg/css.svg" },
      { name: "Tailwind CSS", icon: "/images/svg/tailwind.svg" },
      { name: "Three.js", icon: "/images/svg/threejs.svg" },
      { name: "Figma", icon: "/images/svg/figma.svg" },
      { name: "Vercel", icon: "/images/svg/vercel.svg" },
    ],
  },
  {
    title: "tech.groups.backend",
    items: [
      { name: "Node.js", icon: "/images/svg/node.svg" },
      { name: "Express.js", icon: "/images/svg/express.svg" },
      { name: "JWT", icon: "/images/svg/jwt.svg" },
      { name: "Passport.js", icon: "/images/svg/passport.svg" },
      { name: "SQL", icon: "/images/svg/sqlSvg.svg" },
      { name: "PostgreSQL", icon: "/images/svg/postgresql.svg" },
      { name: "MongoDB", icon: "/images/svg/mongo.svg" },
      { name: "Sequelize", icon: "/images/svg/sequelize.svg" },
      { name: "Postman", icon: "/images/svg/postman.svg" },
      { name: "Stripe", icon: "/images/svg/stripe.svg" },
      { name: "Mercado Pago", icon: "/images/svg/mercadopago.svg" },
      { name: "Docker", icon: "/images/svg/docker.svg" },
      { name: "Git", icon: "/images/svg/git.svg" },
      { name: "Linux", icon: "/images/svg/linux.svg" },
    ],
  },
  {
    title: "tech.groups.testing",
    items: [
      { name: "Vitest", icon: "/images/svg/vitest.svg" },
      { name: "Jest", icon: "/images/svg/jest.svg" },
      { name: "Supertest", icon: "/images/svg/supertest.svg" },
      { name: "Playwright", icon: "/images/svg/playwright.svg" },
    ],
  },
  {
    title: "tech.groups.ia",
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
  key: string;
  company: string;
  icon: string;
  iconBg?: string;
  kind: ExperienceKind;
}> = [
  {
    key: "senzary",
    company: "Senzary",
    icon: "/images/projects/senzary/logo/1.png",
    kind: "work",
  },
  {
    key: "freelance",
    company: "Freelance en Gen Consultores",
    icon: "/images/company/freelance.png",
    iconBg: "#1a3a6b",
    kind: "work",
  },
  {
    key: "nocountry",
    company: "No Country",
    icon: "/images/company/no_country.png",
    kind: "study",
  },
  {
    key: "henry",
    company: "Soy Henry",
    icon: "/images/company/henry.png",
    iconBg: "#ffff00",
    kind: "study",
  },
];

export type PortfolioProject = {
  key: string;
  title: string;
  technologies: string[];
  images: string[];
  live?: string;
  code?: string;
  inDevelopment?: boolean;
  hidden?: boolean;
};

export const projects: PortfolioProject[] = [
  {
    key: "prodeazo",
    title: "Prodeazo (Prode Mundial 2026)",
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
    key: "scoutpanel",
    title: "Scout Panel",
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
    key: "gabriel",
    title: "Gabriel Bornoroni — Sitio oficial",
    hidden: true,
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    images: ["/images/projects/partido/gabriel/sorteo.png", "/images/projects/partido/gabriel/home.png"],
    live: "https://gabrielbornoroni.com.ar/",
  },
  {
    key: "appfiscalizacion",
    title: "App Fiscalización",
    technologies: ["Next.js", "Framer Motion", "Redux Toolkit", "Vercel"],
    images: [
      "/images/projects/partido/app/dashboard1.png",
      "/images/projects/partido/app/dashboard2.png",
      "/images/projects/partido/app/dashboard3.png",
      "/images/projects/partido/app/seccionales.png",
      "/images/projects/partido/app/mesas.png",
    ],
  },
  {
    key: "iotlogiq",
    title: "IoTLogIQ - Senzary",
    technologies: ["Angular", "ThingsBoard", "IoT", "Dashboards", "Data visualization"],
    images: [
      "/images/projects/senzary/demo/air-quality-1.png",
      "/images/projects/senzary/demo/gpio.png",
      "/images/projects/senzary/demo/doors-1.png",
      "/images/projects/senzary/smartindustry/smart-industry-1.png",
      "/images/projects/senzary/smartindustry/overview.png",
      "/images/projects/senzary/smartindustry/digitaltwin.png",
      "/images/projects/senzary/demo/predictive.png",
      "/images/projects/senzary/airport/1.png",
      "/images/projects/senzary/airport/3.png",
      "/images/projects/senzary/airport/4.png",
      "/images/projects/senzary/airport/5.png",
      "/images/projects/senzary/indiana/1.png",
      "/images/projects/senzary/demo/air-quality-2.png",
      "/images/projects/senzary/demo/temperature.png",
      "/images/projects/senzary/demo/ultrasound-1.png",
      "/images/projects/senzary/demo/doors-2.png",
      "/images/projects/senzary/demo/on-off-1.png",
      "/images/projects/senzary/demo/bob.png",
      "/images/projects/senzary/airport/6.png",
      "/images/projects/senzary/airport/7.png",
    ],
  },
  {
    key: "cloudlab",
    title: "Cloudlab - No Country",
    technologies: ["Next.js", "TypeScript", "Tailwind"],
    images: ["/images/projects/cloudlab/1.png", "/images/projects/cloudlab/2.png", "/images/projects/cloudlab/3.png"],
    code: "https://github.com/No-Country/s9-16-m-node-react",
    live: "https://cloudlab-s9-16.vercel.app/",
  },
];
