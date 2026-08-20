"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionStagger";
import Section from "@/components/ui/Section";
import { TechIcon } from "@/components/ui/TechIcon";
import { cn } from "@/lib/utils";
import { techGroups } from "@/data/portfolio";

/** Pseudo-grupo: junta el stack principal de todos los grupos. */
const PRIMARY = "primary";

export default function TechSection() {
  const { t } = useTranslation();
  const [active, setActive] = useState<string>(PRIMARY);

  const primaryItems = techGroups.flatMap((g) => g.items.filter((i) => "primary" in i && i.primary));
  const items = active === PRIMARY ? primaryItems : (techGroups.find((g) => g.title === active)?.items ?? []);

  const tabs = [
    { key: PRIMARY, label: t("tech.primary"), count: primaryItems.length },
    ...techGroups.map((g) => ({ key: g.title, label: t(g.title), count: g.items.length })),
  ];

  return (
    <Section
      id="tech"
      index="02"
      eyebrow={t("tech.eyebrow")}
      title={t("tech.title")}
      parallax
      className="py-10 md:py-12 lg:py-14 [&>div:first-child]:mb-5 md:[&>div:first-child]:mb-6 [&_h2]:text-[clamp(1.25rem,3vw,2rem)]"
    >
      {/* Tabs por grupo: antes eran 4 grupos apilados, mucho alto y todo con el mismo peso. */}
      <div
        role="tablist"
        aria-label={t("tech.groupLabel")}
        className="mb-4 flex flex-wrap items-center gap-1.5"
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
                "rounded-full border px-2 py-0.5 font-mono text-micro transition-colors",
                isActive
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-line/60 text-muted hover:border-accent/60 hover:text-accent",
              )}
            >
              {tab.label}
              <span className="ml-1 opacity-50">{tab.count}</span>
            </button>
          );
        })}
      </div>

      <MotionStagger
        key={active}
        className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        {items.map((item) => {
          const isPrimary = "primary" in item && item.primary;
          return (
            <MotionStaggerItem
              key={item.name}
              className={cn(
                "flex items-center gap-2.5 rounded-lg border bg-panel px-2.5 py-2 shadow-card-sm transition-colors",
                isPrimary ? "border-accent/45" : "border-line",
              )}
            >
              <TechIcon
                name={item.icon}
                className="size-6.5 shrink-0 text-accent"
              />
              <span className="min-w-0 flex-1 text-sm font-semibold leading-tight text-ink">
                {item.name}
              </span>
            </MotionStaggerItem>
          );
        })}
      </MotionStagger>
    </Section>
  );
}
