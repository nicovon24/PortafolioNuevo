import type { FC, SVGProps } from "react";

import AngularIcon from "@/assets/svg/angular.svg";
import AwsIcon from "@/assets/svg/aws.svg";
import ClaudeIcon from "@/assets/svg/claude.svg";
import CssIcon from "@/assets/svg/css.svg";
import DockerIcon from "@/assets/svg/docker.svg";
import ExpressIcon from "@/assets/svg/express.svg";
import FastapiIcon from "@/assets/svg/fastapi.svg";
import FigmaIcon from "@/assets/svg/figma.svg";
import GeminiIcon from "@/assets/svg/gemini.svg";
import GitIcon from "@/assets/svg/git.svg";
import GraphqlIcon from "@/assets/svg/graphql.svg";
import GsdIcon from "@/assets/svg/gsd.svg";
import HtmlIcon from "@/assets/svg/html.svg";
import JavaIcon from "@/assets/svg/java.svg";
import JestIcon from "@/assets/svg/jest.svg";
import JiraIcon from "@/assets/svg/jira.svg";
import JsIcon from "@/assets/svg/js.svg";
import JwtIcon from "@/assets/svg/jwt.svg";
import LinuxIcon from "@/assets/svg/linux.svg";
import MercadopagoIcon from "@/assets/svg/mercadopago.svg";
import MongoIcon from "@/assets/svg/mongo.svg";
import NestjsIcon from "@/assets/svg/nestjs.svg";
import NextIcon from "@/assets/svg/next.svg";
import NodeIcon from "@/assets/svg/node.svg";
import OpenaiIcon from "@/assets/svg/openai.svg";
import PassportIcon from "@/assets/svg/passport.svg";
import PlaywrightIcon from "@/assets/svg/playwright.svg";
import PostgresqlIcon from "@/assets/svg/postgresql.svg";
import PostmanIcon from "@/assets/svg/postman.svg";
import ReactIcon from "@/assets/svg/react.svg";
import ReduxIcon from "@/assets/svg/redux.svg";
import SequelizeIcon from "@/assets/svg/sequelize.svg";
import SpringbootIcon from "@/assets/svg/springboot.svg";
import SqlIcon from "@/assets/svg/sql.svg";
import StripeIcon from "@/assets/svg/stripe.svg";
import SupertestIcon from "@/assets/svg/supertest.svg";
import TailwindIcon from "@/assets/svg/tailwind.svg";
import ThreejsIcon from "@/assets/svg/threejs.svg";
import TsIcon from "@/assets/svg/ts.svg";
import VaderIcon from "@/assets/svg/vader.svg";
import VercelIcon from "@/assets/svg/vercel.svg";
import ViteIcon from "@/assets/svg/vite.svg";
import VitestIcon from "@/assets/svg/vitest.svg";
import ZustandIcon from "@/assets/svg/zustand.svg";

/* Registry de iconos tech. Los .svg usan `currentColor`, asi que el color
   sale del CSS (text-accent, group-hover:text-accent-2, etc), no del archivo. */
const ICONS = {
  "angular": AngularIcon,
  "aws": AwsIcon,
  "claude": ClaudeIcon,
  "css": CssIcon,
  "docker": DockerIcon,
  "express": ExpressIcon,
  "fastapi": FastapiIcon,
  "figma": FigmaIcon,
  "gemini": GeminiIcon,
  "git": GitIcon,
  "graphql": GraphqlIcon,
  "gsd": GsdIcon,
  "html": HtmlIcon,
  "java": JavaIcon,
  "jest": JestIcon,
  "jira": JiraIcon,
  "js": JsIcon,
  "jwt": JwtIcon,
  "linux": LinuxIcon,
  "mercadopago": MercadopagoIcon,
  "mongo": MongoIcon,
  "nestjs": NestjsIcon,
  "next": NextIcon,
  "node": NodeIcon,
  "openai": OpenaiIcon,
  "passport": PassportIcon,
  "playwright": PlaywrightIcon,
  "postgresql": PostgresqlIcon,
  "postman": PostmanIcon,
  "react": ReactIcon,
  "redux": ReduxIcon,
  "sequelize": SequelizeIcon,
  "springboot": SpringbootIcon,
  "sql": SqlIcon,
  "stripe": StripeIcon,
  "supertest": SupertestIcon,
  "tailwind": TailwindIcon,
  "threejs": ThreejsIcon,
  "ts": TsIcon,
  "vader": VaderIcon,
  "vercel": VercelIcon,
  "vite": ViteIcon,
  "vitest": VitestIcon,
  "zustand": ZustandIcon,
} as const satisfies Record<string, FC<SVGProps<SVGSVGElement>>>;

/** Slugs validos. Un typo aca es error de compilacion, no un 404 silencioso. */
export type TechSlug = keyof typeof ICONS;

export const TECH_SLUGS = Object.keys(ICONS) as TechSlug[];

/** Color principal de marca. Los SVG son monocromos y heredan currentColor. */
export const TECH_COLORS: Record<TechSlug, string> = {
  angular: "#dd0031",
  aws: "#ff9900",
  claude: "#d97757",
  css: "#1572b6",
  docker: "#2496ed",
  express: "var(--color-ink)",
  fastapi: "#009688",
  figma: "#f24e1e",
  gemini: "#8e75b2",
  git: "#f05032",
  graphql: "#e10098",
  gsd: "var(--color-accent)",
  html: "#e34f26",
  java: "#e76f00",
  jest: "#c21325",
  jira: "#0052cc",
  js: "#f7df1e",
  jwt: "#d63aff",
  linux: "#fcc624",
  mercadopago: "#009ee3",
  mongo: "#47a248",
  nestjs: "#e0234e",
  next: "var(--color-ink)",
  node: "#5fa04e",
  openai: "#10a37f",
  passport: "#34e27a",
  playwright: "#2ead33",
  postgresql: "#4169e1",
  postman: "#ff6c37",
  react: "#61dafb",
  redux: "#764abc",
  sequelize: "#52b0e7",
  springboot: "#6db33f",
  sql: "#336791",
  stripe: "#635bff",
  supertest: "#22b573",
  tailwind: "#06b6d4",
  threejs: "var(--color-ink)",
  ts: "#3178c6",
  vader: "var(--color-ink)",
  vercel: "var(--color-ink)",
  vite: "#646cff",
  vitest: "#6e9f18",
  zustand: "#433e38",
};

type TechIconProps = SVGProps<SVGSVGElement> & { name: TechSlug };

export function TechIcon({ name, ...props }: TechIconProps) {
  const Icon = ICONS[name];
  return <Icon aria-hidden focusable="false" {...props} />;
}
