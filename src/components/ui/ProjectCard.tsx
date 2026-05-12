import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import ProjectScreenshots from "@/components/ui/ProjectScreenshots";

const linkBtn =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-line bg-[rgba(100,255,218,0.06)] px-3.5 text-sm font-bold text-accent transition-colors hover:border-accent-2 hover:bg-[rgba(255,105,180,0.12)] hover:text-accent-2";

type ProjectCardProps = {
  title: string;
  description: string;
  technologies: string[];
  images: string[];
  live?: string;
  code?: string;
  reversed?: boolean;
  inDevelopment?: boolean;
};

export default function ProjectCard({
  title,
  description,
  technologies,
  images,
  live,
  code,
  reversed = false,
  inDevelopment = false,
}: ProjectCardProps) {
  return (
    <article
      className={cn(
        "grid grid-cols-1 items-center gap-7 rounded-3xl border border-line bg-panel p-4 shadow-[0_20px_56px_rgba(0,0,0,0.22)] backdrop-blur-[14px] sm:p-5 lg:grid-cols-[1fr_0.86fr] lg:gap-8",
        reversed && "lg:grid-cols-[0.86fr_1fr]",
      )}
    >
      <div className={cn(reversed && "lg:order-2")}>
        <ProjectScreenshots images={images} title={title} />
      </div>
      <div className={cn("flex flex-col", reversed && "lg:order-1")}>
        <div className="flex flex-wrap items-center gap-2 gap-y-1">
          <h3 className="m-0 font-mono text-[clamp(1.25rem,2.5vw,2rem)]">{title}</h3>
          {inDevelopment && (
            <span className="inline-flex items-center rounded-full border border-amber-400/45 bg-amber-400/10 px-2.5 py-0.5 font-mono text-[0.65rem] font-semibold uppercase tracking-wider text-amber-200">
              En desarrollo
            </span>
          )}
        </div>
        <p className="mt-2 leading-relaxed text-muted">{description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span key={tech} className="rounded-full bg-[rgba(100,255,218,0.1)] px-2.5 py-1.5 text-xs font-bold text-accent">
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-2.5">
          {live && (
            <a href={live} target="_blank" rel="noreferrer" className={linkBtn}>
              <ExternalLink size={15} /> Demo
            </a>
          )}
          {code && (
            <a href={code} target="_blank" rel="noreferrer" className={linkBtn}>
              <Github size={15} /> Codigo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
