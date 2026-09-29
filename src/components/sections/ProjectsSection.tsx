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

  const visible = useMemo(
    () => projects.filter((project) => !project.hidden),
    [],
  );

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
      variant="surface"
    >
      <div className="mb-8 max-w-2xl">
        <h2 className="font-display text-section font-semibold tracking-[-0.03em] text-ink">{t("projects.title")}</h2>
        <p className="mt-4 text-base leading-relaxed text-muted">{t("projects.intro")}</p>
      </div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
        <div
          role="group"
          aria-label={t("projects.filters.filterLabel")}
          className="flex flex-wrap items-center gap-2"
        >
          {tabs.map(([value, count]) => {
            const active = filter === value;
            return (
              <button
                key={value}
                type="button"
                aria-pressed={active}
                aria-controls="project-results"
                onClick={() => setFilter(value)}
                className={cn(
                  "flex min-h-11 items-center gap-2.5 rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                  active ? "border-accent bg-accent text-accent-contrast" : "border-line text-ink hover:border-accent"
                )}
              >
                <span>{t(`projects.filters.${value}`)}</span>
                <span className="font-mono text-xs tabular-nums">{count}</span>
              </button>
            );
          })}
        </div>

        <span aria-live="polite" aria-atomic="true" className="text-sm text-muted">
          {t(filtered.length === 1 ? "projects.filters.countOne" : "projects.filters.countOther", {
            count: filtered.length,
          })}
        </span>
      </div>

      <motion.div id="project-results" layout={!reduced} className="grid grid-cols-6 items-stretch gap-x-6 gap-y-8 lg:gap-y-10">
        <AnimatePresence mode="popLayout" initial={false}>
          {filtered.map((project) => (
            <motion.div
              key={project.key}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={cn("col-span-6 h-full", project.featured ? "lg:col-span-3" : "sm:col-span-3 lg:col-span-2")}
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
                index={projects.indexOf(project)}
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
