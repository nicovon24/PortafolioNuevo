"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import HUDCorners from "@/components/ui/HUDCorners";
import Section from "@/components/ui/Section";
import { experiences, type ExperienceKind } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const KIND_STYLE: Record<ExperienceKind, string> = {
  professional: "border-accent/50 text-accent",
  freelance: "border-accent-2/50 text-accent-2",
  academic: "border-line text-muted",
};

function TimelineDot({ current, compact }: { current?: boolean; compact?: boolean }) {
  return (
    <span
      className="absolute left-0 top-1.5 flex size-3.5 -translate-x-1/2 items-center justify-center"
      aria-hidden
    >
      {current && (
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-40" />
      )}
      <span
        className={cn(
          "relative size-3 rounded-full border-2 border-background",
          compact ? "bg-muted" : "bg-accent",
        )}
      />
    </span>
  );
}

/** Acordeon de productos: desglosa la experiencia sin inflar la card. */
function ProductAccordion({ products }: { products: readonly string[] }) {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<string | null>(products[0] ?? null);

  return (
    <div className="mt-4 flex flex-col gap-1.5">
      {products.map((key) => {
        const isOpen = open === key;
        return (
          <div key={key}>
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => setOpen(isOpen ? null : key)}
              aria-expanded={isOpen}
              className={cn(
                "flex w-full items-center gap-2.5 rounded border px-3 py-2 text-left transition-colors",
                isOpen ? "border-accent/45 bg-accent/5" : "border-line/60 hover:border-accent/40",
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "size-1.5 shrink-0 rounded-full transition-colors",
                  isOpen ? "bg-accent" : "bg-muted",
                )}
              />
              <span
                className={cn(
                  "min-w-0 flex-1 font-mono text-mini font-bold",
                  isOpen ? "text-accent" : "text-ink",
                )}
              >
                {t(`experience.products.${key}.name`)}
              </span>
              <Plus
                size={13}
                aria-hidden
                className={cn(
                  "shrink-0 text-muted transition-transform duration-200",
                  isOpen && "rotate-45 text-accent",
                )}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={reduced ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduced ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="m-0 px-3 pb-3 pt-2.5 text-sm leading-relaxed text-muted">
                    {t(`experience.products.${key}.detail`)}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function ExperienceSection() {
  const { t } = useTranslation();

  return (
    <Section
      id="experience"
      index="04"
      eyebrow={t("experience.eyebrow")}
      title={t("experience.title")}
      parallax
      variant="surface"
    >
      {/* Timeline unica alineada a la izquierda: mismo layout en mobile y desktop. */}
      <ol className="relative m-0 list-none border-l border-line/70 p-0 pl-7 sm:pl-9">
        {experiences.map((exp) => {
          const title = t(`experience.items.${exp.key}.title`);
          const date = t(`experience.items.${exp.key}.date`);
          const kindLabel = t(`experience.kinds.${exp.kind}`);

          const header = (
            <div className="flex items-start gap-3">
              <Image
                src={exp.icon}
                alt=""
                width={40}
                height={40}
                loading="lazy"
                className={cn(
                  "shrink-0 rounded object-contain p-1",
                  exp.compact ? "size-8" : "size-10",
                )}
                style={{
                  backgroundColor: exp.iconBg ?? "#f5f5f5",
                  // Duotone rojo: neutraliza el color de marca original y lo
                  // recalibra al hue del accent (#d9645a, ~7deg).
                  filter: "grayscale(1) sepia(1) saturate(4) hue-rotate(-28deg) brightness(0.95)",
                }}
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3
                    className={cn(
                      "m-0 font-mono font-bold leading-snug",
                      exp.compact ? "text-sm text-muted" : "text-base text-ink md:text-lg",
                    )}
                  >
                    {title}
                  </h3>
                  <span
                    className={cn(
                      "rounded-full border px-2 py-0.5 font-mono text-micro",
                      KIND_STYLE[exp.kind],
                    )}
                  >
                    {kindLabel}
                  </span>
                </div>
                <p className="m-0 mt-1 flex flex-wrap items-center gap-2 font-mono text-micro uppercase tracking-wider text-muted">
                  <span>{exp.company}</span>
                  <span aria-hidden className="h-px w-3 bg-line" />
                  <span className={exp.compact ? undefined : "text-accent"}>{date}</span>
                </p>
              </div>
            </div>
          );

          if (exp.compact) {
            // Academica: misma card que el resto, pero sin bullets ni acordeon.
            return (
              <li key={exp.key} className="relative pb-2">
                <TimelineDot compact />
                <HUDCorners className="rounded-card border border-line/60 bg-panel/60 p-5 shadow-card-sm md:p-6">
                  {header}
                  <p className="m-0 mt-3 text-sm leading-relaxed text-muted">
                    {t("experience.summaryEarly2023")}
                  </p>
                </HUDCorners>
              </li>
            );
          }

          const points = t(`experience.items.${exp.key}.points`, {
            returnObjects: true,
          }) as string[];

          return (
            <li key={exp.key} className="relative pb-9 sm:pb-11">
              <TimelineDot current={exp.current} />
              <HUDCorners className="rounded-card border border-line bg-panel p-5 shadow-card md:p-6">
                {header}

                {exp.products ? (
                  <ProductAccordion products={exp.products} />
                ) : (
                  <ul className="m-0 mt-4 list-disc space-y-1.5 pl-5 text-sm leading-snug text-muted">
                    {points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}
              </HUDCorners>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
