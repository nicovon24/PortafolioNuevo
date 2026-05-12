import MotionSlide from "@/components/motion/MotionSlide";
import ProjectCard from "@/components/ui/ProjectCard";
import Section from "@/components/ui/Section";
import { projects } from "@/data/portfolio";

export default function ProjectsSection() {
  return (
    <Section id="projects" eyebrow="../Proyectos" title="Proyectos destacados">
      <div className="grid gap-9 lg:gap-10">
        {projects.filter((p) => !p.hidden).map((project, index) => (
          <MotionSlide key={project.title} direction={index % 2 === 0 ? "left" : "right"}>
            <ProjectCard {...project} reversed={index % 2 !== 0} />
          </MotionSlide>
        ))}
      </div>
    </Section>
  );
}
