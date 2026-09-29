"use client";

import Image from "next/image";
import { ArrowUpRight, ExternalLink, Github, Images, Lock } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import ProjectDetailModal from "@/components/ui/ProjectDetailModal";

type ProjectCardProps = {
  projectKey: string;
  title: string;
  technologies: string[];
  images: string[];
  live?: string;
  live2?: string;
  code?: string;
  privateRepo?: boolean;
  inDevelopment?: boolean;
  year?: string;
  role?: string;
  org?: string;
  featured?: boolean;
  index?: number;
};

export default function ProjectCard({
  projectKey, title, technologies, images, live, live2, code,
  privateRepo = false, inDevelopment = false, year, role, org,
  featured = false, index = 0,
}: ProjectCardProps) {
  const { t } = useTranslation();
  const description = t(`projects.items.${projectKey}.description`);
  const summary = t(`projects.items.${projectKey}.summary`, { defaultValue: description });
  const [modalOpen, setModalOpen] = useState(false);
  const [startLightbox, setStartLightbox] = useState(false);
  const orgLabel = org ? t(`projects.org.${org}`) : undefined;
  const technologyLimit = featured ? 5 : 4;
  const remainingTechnologies = technologies.length - technologyLimit;

  function open(lightbox: boolean) {
    setStartLightbox(lightbox);
    setModalOpen(true);
  }

  return (
    <>
      <article className="group/card flex h-full min-w-0 flex-col overflow-hidden rounded-card border border-line bg-panel">
        {images.length > 0 && (
          <button
            type="button"
            onClick={() => open(true)}
            aria-label={t("gallery.openOf", { title })}
            className="relative block aspect-16/10 w-full overflow-hidden bg-canvas focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-accent"
          >
            <Image
              src={images[0]}
              alt={t("gallery.screenshotOf", { title, n: 1 })}
              fill
              sizes={featured ? "(min-width: 1280px) 564px, (min-width: 1024px) 46vw, 92vw" : "(min-width: 1280px) 368px, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"}
              className="object-contain transition-transform duration-300 motion-safe:group-hover/card:scale-[1.02]"
            />
            <span className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full bg-background-deep px-3 py-2 text-xs font-semibold text-ink">
              <Images size={15} aria-hidden />
              {t("projects.imageCount", { count: images.length })}
            </span>
          </button>
        )}

        <div className={cn("flex flex-1 flex-col p-5", featured && "sm:p-7")}>
          <h3 className={cn("m-0 text-xl font-semibold leading-snug text-ink", featured && "sm:text-2xl")}>
            {title}
          </h3>
          <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs leading-relaxed text-muted">
            {year && <span className="font-mono tabular-nums">{year}</span>}
            {year && (role || orgLabel) && <span aria-hidden>/</span>}
            {[role, orgLabel].filter(Boolean).join(" / ")}
          </p>
          {inDevelopment && <p className="mt-2 text-sm font-semibold text-accent">{t("projects.inDevelopment")}</p>}
          <p className={cn("mt-4 text-sm leading-relaxed text-ink/85", featured ? "text-base" : "line-clamp-3")}>
            {summary}
          </p>
          <ul className="mt-5 flex flex-wrap gap-x-3 gap-y-2" aria-label={t("projects.architectureStack")}>
            {technologies.slice(0, technologyLimit).map((tech) => (
              <li key={tech} className="font-mono text-xs text-muted">{tech}</li>
            ))}
            {remainingTechnologies > 0 && (
              <li className="font-mono text-xs text-muted" aria-label={t("projects.moreTechnologies", { count: remainingTechnologies })}>
                +{remainingTechnologies}
              </li>
            )}
          </ul>
          <div className="mt-auto pt-6">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4">
              <Button size="lg" variant={featured ? "primary" : "outline"} onClick={() => open(false)} aria-label={t("gallery.openProject", { title })}>
                {t("projects.viewProject")} <ArrowUpRight size={16} aria-hidden />
              </Button>
              {[live, live2].map((href, linkIndex) => href && (
                <a key={href} href={href} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-1.5 rounded-sm text-sm font-semibold text-ink underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                  {t("projects.demo")}{live2 ? ` ${linkIndex + 1}` : ""} <ExternalLink size={14} aria-hidden />
                </a>
              ))}
              {code && (
                <a href={code} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-1.5 rounded-sm text-sm font-semibold text-ink underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
                  <Github size={15} aria-hidden /> {t("projects.code")}
                </a>
              )}
            </div>
            {!code && privateRepo && (
              <p className="mt-3 flex items-center gap-1.5 text-xs text-muted"><Lock size={12} aria-hidden />{t("projects.privateRepo")}</p>
            )}
          </div>
        </div>
      </article>

      <ProjectDetailModal
        open={modalOpen}
        onClose={() => { setModalOpen(false); setStartLightbox(false); }}
        projectKey={projectKey}
        title={title}
        description={description}
        technologies={technologies}
        images={images}
        live={live}
        live2={live2}
        code={code}
        privateRepo={privateRepo}
        index={index}
        initialLightbox={startLightbox}
      />
    </>
  );
}
