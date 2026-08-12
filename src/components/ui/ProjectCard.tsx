"use client";

import { ExternalLink, Github, Images, Lock, Search } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button, { TechChip } from "@/components/ui/Button";
import ProjectScreenshots from "@/components/ui/ProjectScreenshots";
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
  index?: number;
};

export default function ProjectCard({
  projectKey,
  title,
  technologies,
  images,
  live,
  live2,
  code,
  privateRepo = false,
  inDevelopment = false,
  index = 0,
}: ProjectCardProps) {
  const { t } = useTranslation();
  const description = t(`projects.items.${projectKey}.description`);
  const [modalOpen, setModalOpen] = useState(false);
  const [startLightbox, setStartLightbox] = useState(false);

  function open(lightbox: boolean) {
    setStartLightbox(lightbox);
    setModalOpen(true);
  }

  const twoLivesAndPrivate = Boolean(live && live2 && privateRepo);

  return (
    <>
      <article className="group/card relative flex h-full flex-col overflow-hidden rounded-card-lg border border-line bg-panel shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent focus-within:border-accent">
        <div className="group/media relative">
          <ProjectScreenshots images={images} title={title} compact />

          {/* Overlay de acciones. focus-within lo revela para quien navega con teclado. */}
          <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity duration-300 group-hover/media:opacity-100 group-focus-within/card:opacity-100">
            <Button
              size="sm"
              variant="subtle"
              onClick={() => open(false)}
              className="pointer-events-auto bg-panel-strong font-mono"
            >
              <Search size={13} className="shrink-0" />
              {t("projects.inspectProject")}
            </Button>
            <Button
              size="sm"
              variant="subtle"
              onClick={() => open(true)}
              className="pointer-events-auto bg-panel-strong font-mono"
            >
              <Images size={13} className="shrink-0" />
              {t("projects.viewImages")}
            </Button>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-2 gap-y-1">
            <h3 className="m-0 font-mono text-lg leading-tight">
              {/* El titulo es el disparador accesible: antes el click vivia en el <article>. */}
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => open(false)}
                className="text-left transition-colors before:absolute before:inset-0 before:content-[''] hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                aria-label={t("gallery.openProject", { title })}
              >
                {title}
              </button>
            </h3>
            {inDevelopment && (
              <span className="inline-flex items-center rounded-full border border-amber-400/45 bg-amber-400/10 px-2 py-0.5 font-mono text-micro font-semibold uppercase tracking-wider text-amber-200">
                {t("projects.inDevelopment")}
              </span>
            )}
          </div>

          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{description}</p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {technologies.map((tech) => (
              <TechChip key={tech}>{tech}</TechChip>
            ))}
          </div>

          {/* z-10: los links deben quedar por encima del ::before del titulo. */}
          <div className="relative z-10 mt-auto flex gap-2 pt-4">
            {twoLivesAndPrivate ? (
              <>
                <div className="flex w-1/2 flex-col gap-1.5">
                  <Button as="a" size="sm" href={live} target="_blank" rel="noreferrer" className="min-h-7">
                    {t("projects.live1")} <ExternalLink size={11} />
                  </Button>
                  <Button as="a" size="sm" href={live2} target="_blank" rel="noreferrer" className="min-h-7">
                    {t("projects.live2")} <ExternalLink size={11} />
                  </Button>
                </div>
                <Button as="span" size="sm" variant="muted" className="w-1/2">
                  <Lock size={12} /> {t("projects.privateRepo")}
                </Button>
              </>
            ) : (
              <>
                {live && (
                  <Button as="a" size="sm" href={live} target="_blank" rel="noreferrer" className="w-1/2">
                    {live2 ? `${t("projects.liveDeployment")} 1` : t("projects.liveDeployment")}
                    <ExternalLink size={12} />
                  </Button>
                )}
                {live2 && (
                  <Button as="a" size="sm" href={live2} target="_blank" rel="noreferrer" className="w-1/2">
                    {t("projects.liveDeployment")} 2 <ExternalLink size={12} />
                  </Button>
                )}
                {code && (
                  <Button
                    as="a"
                    size="sm"
                    variant="outline"
                    href={code}
                    target="_blank"
                    rel="noreferrer"
                    className="w-1/2"
                  >
                    <Github size={12} /> {t("projects.sourceCode")}
                  </Button>
                )}
                {!code && privateRepo && (
                  <Button as="span" size="sm" variant="muted" className="w-1/2">
                    <Lock size={12} /> {t("projects.privateRepo")}
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </article>

      <ProjectDetailModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setStartLightbox(false);
        }}
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
