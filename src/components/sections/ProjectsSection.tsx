"use client";

import { useTranslation } from "react-i18next";
import MotionSlide from "@/components/motion/MotionSlide";
import ProjectCard from "@/components/ui/ProjectCard";
import Section from "@/components/ui/Section";
import { projects } from "@/data/portfolio";

export default function ProjectsSection() {
  const { t } = useTranslation();
  const visible = projects.filter((p) => !p.hidden);

  return (
    <Section id="projects" eyebrow={t("projects.eyebrow")} title={t("projects.title")}>
      <div className="grid gap-9 lg:gap-10">
        {visible.map((project, index) => (
          <MotionSlide key={project.key} direction={index % 2 === 0 ? "left" : "right"}>
            <ProjectCard
              projectKey={project.key}
              title={project.title}
              technologies={project.technologies}
              images={project.images}
              live={project.live}
              code={project.code}
              inDevelopment={project.inDevelopment}
              reversed={index % 2 !== 0}
            />
          </MotionSlide>
        ))}
      </div>
    </Section>
  );
}
