"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import HeroTechCarousel from "@/components/sections/HeroTechCarousel";
import Section from "@/components/ui/Section";
import { TECH_COLORS, TechIcon } from "@/components/ui/TechIcon";
import { cn } from "@/lib/utils";
import { techGroups } from "@/data/portfolio";

/** Pseudo-grupo: junta el stack principal de todos los grupos. */
const PRIMARY = "primary";
/** Pseudo-grupo: junta todas las tecnologias de todos los grupos. */
const ALL = "all";

export default function TechSection() {
  const { t } = useTranslation();
  const [active, setActive] = useState<string>(PRIMARY);

  const primaryItems = techGroups.flatMap((g) => g.items.filter((i) => "primary" in i && i.primary));
  const allItems = techGroups.flatMap((g) => g.items);
  const items =
    active === PRIMARY ? primaryItems : active === ALL ? allItems : (techGroups.find((g) => g.title === active)?.items ?? []);

  const tabs = [
    { key: PRIMARY, label: t("tech.primary"), count: primaryItems.length },
    { key: ALL, label: t("tech.all"), count: allItems.length },
    ...techGroups.map((g) => ({ key: g.title, label: t(g.title), count: g.items.length })),
  ];

  return (
    <Section
      id="tech"
      index="02"
      eyebrow={t("tech.eyebrow")}
      title={t("tech.title")}
      parallax
      variant="surface"
      className="py-10 md:py-12 lg:py-14 [&>div:first-child]:mb-6 [&_h2]:text-[clamp(1.25rem,3vw,2rem)]"
    >
      {/* Segmented Filter Bar con animacion de pill deslizante */}
      <div
        role="tablist"
        aria-label={t("tech.groupLabel")}
        className="mb-6 inline-flex flex-wrap items-center gap-1.5 rounded-full border border-line/40 bg-panel/50 p-1.5 backdrop-blur-md shadow-card-sm"
      >
        {tabs.map((tab) => {
          const isActive = active === tab.key;
          return (
            <button
              key={tab.key}
              role="tab"
              type="button"
              suppressHydrationWarning
              aria-selected={isActive}
              onClick={() => setActive(tab.key)}
              className={cn(
                "relative flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-xs font-semibold transition-colors duration-200 outline-none select-none",
                isActive ? "text-accent-contrast font-bold" : "text-muted hover:text-ink"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="tech-filter-active-pill"
                  className="absolute inset-0 rounded-full bg-accent shadow-[0_2px_12px_color-mix(in_srgb,var(--color-accent)_35%,transparent)]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
              <span
                className={cn(
                  "relative z-10 rounded-full px-2 py-0.5 text-micro font-bold transition-colors",
                  isActive ? "bg-black/20 dark:bg-black/30 text-accent-contrast" : "bg-line/40 text-muted"
                )}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="hero-tech-mask group/hero-tech relative w-full overflow-x-clip overflow-y-visible py-4" aria-live="polite">
        <HeroTechCarousel key={active}>
          {[...items, ...items].map((item, index) => {
            const isPrimary = "primary" in item && item.primary;
            return (
              <li
                key={`${item.name}-${index}`}
                aria-hidden={index >= items.length ? true : undefined}
                className={cn(
                  "group/tech-card relative flex w-36 sm:w-40 shrink-0 flex-col items-center justify-center gap-2.5 rounded-2xl border p-4 text-center backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_28px_-6px_color-mix(in_srgb,var(--color-accent)_22%,transparent)]",
                  isPrimary
                    ? "border-accent/40 bg-panel-strong/80 hover:border-accent"
                    : "border-line/40 bg-panel/50 hover:border-accent/50"
                )}
              >
                {/* Accent indicator dot for primary items */}
                {isPrimary && (
                  <span className="absolute top-2.5 right-2.5 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                  </span>
                )}

                <div className="relative flex size-12 items-center justify-center rounded-xl border border-line/30 bg-background/40 group-hover/tech-card:border-accent/40 group-hover/tech-card:bg-accent/[0.08] transition-all duration-300">
                  <TechIcon
                    name={item.icon}
                    className="size-7 sm:size-8 transition-transform duration-300 group-hover/tech-card:scale-110 group-hover/tech-card:rotate-3"
                    style={{ color: TECH_COLORS[item.icon] }}
                  />
                </div>
                <span className="w-full truncate font-sans text-xs sm:text-sm font-bold text-ink group-hover/tech-card:text-accent transition-colors duration-200">
                  {item.name}
                </span>
              </li>
            );
          })}
        </HeroTechCarousel>
      </div>
    </Section>
  );
}
