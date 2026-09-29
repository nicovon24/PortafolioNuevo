"use client";

import Image from "next/image";
import { ArrowDown, Download, Github, Linkedin, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import HeroTechCarousel from "@/components/sections/HeroTechCarousel";
import { TECH_COLORS, TechIcon, type TechSlug } from "@/components/ui/TechIcon";
import Button from "@/components/ui/Button";
import { useLoaderReady } from "@/components/providers/LoaderProvider";
import { profile } from "@/data/portfolio";

const HERO_CAROUSEL: Array<{ name: string; icon: TechSlug }> = [
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "next" },
  { name: "Angular", icon: "angular" },
  { name: "TypeScript", icon: "ts" },
  { name: "Node.js", icon: "node" },
  { name: "GraphQL", icon: "graphql" },
  { name: "MongoDB", icon: "mongo" },
  { name: "AWS", icon: "aws" },
  { name: "TailwindCSS", icon: "tailwind" },
  { name: "Docker", icon: "docker" },
  { name: "Jira", icon: "jira" },
  { name: "Claude Code", icon: "claude" },
];

export default function HeroSection() {
  const { t } = useTranslation();
  const ready = useLoaderReady();
  const reduced = useReducedMotion();
  const github = profile.socials.find((social) => social.label === "GitHub")!;
  const linkedin = profile.socials.find((social) => social.label === "LinkedIn")!;
  const cv = profile.socials.find((social) => social.label === "CV")!;

  return (
    <section id="top" className="section-bg-surface relative overflow-hidden px-page pb-12 pt-28 sm:pb-16 lg:pt-36">
      <motion.div
        className="mx-auto grid max-w-shell grid-cols-1 items-center gap-x-5 gap-y-7 md:grid-cols-[minmax(0,1fr)_11rem] md:gap-x-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.85fr)] lg:gap-x-20 lg:gap-y-8"
        initial={false}
        animate={{ opacity: ready ? 1 : 0, y: ready || reduced ? 0 : 12 }}
        transition={{ duration: reduced ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="col-start-1 row-start-1 min-w-0">
          <h1 className="m-0" aria-label={profile.name}>
            <span className="mb-2 block text-base font-medium text-muted sm:text-xl">{t("hero.greeting")}</span>
            <span className="block font-display text-[clamp(2.5rem,6vw,5.5rem)] font-bold leading-[1.08] tracking-[-0.04em] text-accent">
              {profile.heroFirstName}
            </span>
          </h1>
          <p className="mt-4 text-base font-semibold leading-relaxed text-ink sm:text-xl lg:text-2xl">
            {t("hero.roleVal")}
          </p>
        </div>

        <div className="relative col-start-2 row-start-1 hidden aspect-4/5 w-full overflow-hidden rounded-card bg-background-deep md:block lg:row-span-2">
          <Image
            src="/images/profile/profile.png?v=day"
            alt={profile.name}
            fill
            sizes="(min-width: 1280px) 404px, (min-width: 1024px) 35vw, (min-width: 768px) 176px, 0px"
            className="object-cover object-[center_18%]"
            priority
          />
        </div>

        <div className="min-w-0 md:col-span-2 lg:col-span-1 lg:col-start-1 lg:row-start-2">
          <p className="m-0 max-w-[49ch] text-base leading-relaxed text-ink/85 sm:text-lg">
            {t("hero.introShort")}
          </p>
          <p className="mt-5 flex items-center gap-2.5 text-sm text-ink">
            <span className="size-2 shrink-0 rounded-full bg-accent" aria-hidden />
            {t("hero.available")}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
            <Button as="a" href="#projects" size="lg" className="gap-2 px-5 text-sm sm:px-6 sm:text-base">
              {t("hero.viewProjects")} <ArrowDown size={17} aria-hidden />
            </Button>
            <Button as="a" href={cv.href} size="lg" variant="outline" target="_blank" rel="noreferrer" className="gap-2 px-5 text-sm sm:px-6 sm:text-base">
              {t("hero.cv")} <Download size={17} aria-hidden />
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-x-5 gap-y-2 border-t border-line pt-4">
            <p className="flex items-center gap-2 text-sm text-muted">
              <MapPin size={16} aria-hidden /> {t("hero.location")}
            </p>
            <div className="flex items-center gap-1">
              {[{ social: github, Icon: Github }, { social: linkedin, Icon: Linkedin }].map(({ social, Icon }) => (
                <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label}
                  className="grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-accent/10 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                  <Icon size={19} aria-hidden />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 min-w-0 border-t border-line pt-6 md:col-span-2 lg:mt-8">
          <div className="hero-tech-mask group/hero-tech relative w-full overflow-x-clip overflow-y-visible py-2" aria-label={t("gallery.techCarousel")} role="region">
              <HeroTechCarousel>
                {[...HERO_CAROUSEL, ...HERO_CAROUSEL].map((item, i) => {
                  const isEven = (i % HERO_CAROUSEL.length) % 2 === 0;
                  return (
                  <li
                    key={`${item.name}-${i}`}
                    className={`tech-surface-card group/hero-tech-item flex w-[5.75rem] shrink-0 flex-col items-center justify-center gap-1.5 rounded-lg border border-line/70 bg-panel-strong px-2 py-2.5 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 sm:w-[6.25rem] ${
                      isEven
                        ? "hover:border-accent hover:bg-accent/4 hover:shadow-[0_0_0_1px_color-mix(in_srgb,var(--color-accent)_40%,transparent)_inset,0_0_18px_color-mix(in_srgb,var(--color-accent)_22%,transparent)]"
                        : "hover:border-accent-2 hover:bg-accent-2/4 hover:shadow-[0_0_0_1px_color-mix(in_srgb,var(--color-accent-2)_40%,transparent)_inset,0_0_18px_color-mix(in_srgb,var(--color-accent-2)_22%,transparent)]"
                    }`}
                    aria-hidden={i >= HERO_CAROUSEL.length ? true : undefined}
                  >
                    <TechIcon
                      name={item.icon}
                      className="size-6 opacity-90 transition-[opacity,transform] duration-200 group-hover/hero-tech-item:scale-110 group-hover/hero-tech-item:opacity-100"
                      style={{ color: TECH_COLORS[item.icon] }}
                    />
                    <span className={`block w-full truncate text-center font-mono text-micro font-semibold uppercase tracking-[0.08em] text-muted transition-colors duration-200 sm:text-micro ${
                      isEven ? "group-hover/hero-tech-item:text-accent" : "group-hover/hero-tech-item:text-accent-2"
                    }`}>
                      {item.name}
                    </span>
                  </li>
                );
                })}
              </HeroTechCarousel>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
