"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import ProjectCard from "@/components/ui/ProjectCard";
import Section from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { projectCategories, projects, type ProjectCategory } from "@/data/portfolio";

type Filter = ProjectCategory | "all";

export default function ProjectsSection() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(() => projects.filter((p) => !p.hidden), []);

  // Solo se ofrecen categorias que tengan al menos un proyecto.
  const tabs = useMemo(() => {
    const counts = new Map<Filter, number>([["all", visible.length]]);
    for (const category of projectCategories) {
      const n = visible.filter((p) => p.categories.includes(category)).length;
      if (n > 0) counts.set(category, n);
    }
    return [...counts.entries()];
  }, [visible]);

  const filtered = useMemo(
    () => (filter === "all" ? visible : visible.filter((p) => p.categories.includes(filter))),
    [filter, visible],
  );

  return (
    <Section
      id="projects"
      index="03"
      eyebrow={t("projects.eyebrow")}
      title={t("projects.title")}
      parallax
      variant="tech"
    >
      <div
        role="tablist"
        aria-label={t("projects.filters.filterLabel")}
        className="mb-5 flex flex-wrap items-center gap-1.5"
      >
        {tabs.map(([value, count]) => {
          const active = filter === value;
          return (
            <button
              key={value}
              role="tab"
              type="button"
              suppressHydrationWarning
              aria-selected={active}
              onClick={() => setFilter(value)}
              className={cn(
                "rounded-full border px-2 py-0.5 font-mono text-micro transition-colors",
                active
                  ? "border-accent bg-accent/10 text-accent"
                  : "border-line/60 text-muted hover:border-accent/60 hover:text-accent",
              )}
            >
              {t(`projects.filters.${value}`)}
              <span className="ml-1 opacity-50">{count}</span>
            </button>
          );
        })}

        <span aria-live="polite" className="ml-auto font-mono text-micro text-muted">
          {t(filtered.length === 1 ? "projects.filters.countOne" : "projects.filters.countOther", {
            count: filtered.length,
          })}
        </span>
      </div>

      <motion.div layout={!reduced} className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        <AnimatePresence mode="popLayout" initial={false}>
          {filtered.map((project, index) => (
            <motion.div
              key={project.key}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <ProjectCard
                projectKey={project.key}
                title={project.title}
                technologies={project.technologies}
                images={project.images}
                live={project.live}
                live2={project.live2}
                code={project.code}
                privateRepo={project.privateRepo}
                inDevelopment={project.inDevelopment}
                year={project.year}
                role={project.role}
                org={project.org}
                featured={project.featured}
                index={index}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-10 text-center font-mono text-sm text-muted">{t("projects.filters.empty")}</p>
      )}
    </Section>
  );
}
