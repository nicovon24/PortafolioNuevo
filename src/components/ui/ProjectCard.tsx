"use client";

import { ExternalLink, Github, Images, Lock, Search } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
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

  const truncated =
    description.length > 110 ? description.slice(0, 110).trimEnd() + "…" : description;

  function openModal(e: React.MouseEvent) {
    e.stopPropagation();
    setStartLightbox(false);
    setModalOpen(true);
  }

  function openLightbox(e: React.MouseEvent) {
    e.stopPropagation();
    setStartLightbox(true);
    setModalOpen(true);
  }

  return (
    <>
      <article
        className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-panel shadow-[0_20px_56px_rgba(0,0,0,0.22)] backdrop-blur-[14px] transition-all duration-300 hover:-translate-y-1 hover:border-accent"
        onClick={() => { setStartLightbox(false); setModalOpen(true); }}
      >
        {/* Image area with hover overlay */}
        <div className="group relative cursor-pointer">
          <ProjectScreenshots images={images} title={title} compact />

          {/* Hover overlay — only over images */}
          <div className="pointer-events-none absolute inset-0 z-[20] flex items-center justify-center gap-2 bg-[rgba(5,10,20,0.60)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <button
              type="button"
              suppressHydrationWarning
              onClick={openModal}
              className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-accent/60 bg-[rgba(8,17,31,0.92)] px-4 py-2 font-mono text-xs font-bold text-accent shadow-[0_8px_28px_rgba(0,0,0,0.5)] backdrop-blur-sm transition-colors hover:border-accent hover:bg-accent/10"
            >
              <Search size={13} className="shrink-0" />
              {t("projects.inspectProject")}
            </button>
            <button
              type="button"
              suppressHydrationWarning
              onClick={openLightbox}
              className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-accent/60 bg-[rgba(8,17,31,0.92)] px-4 py-2 font-mono text-xs font-bold text-accent shadow-[0_8px_28px_rgba(0,0,0,0.5)] backdrop-blur-sm transition-colors hover:border-accent hover:bg-accent/10"
            >
              <Images size={13} className="shrink-0" />
              {t("projects.viewImages")}
            </button>
          </div>
        </div>

        <div className="flex flex-col flex-1 p-4 sm:p-5">
          <div className="flex flex-wrap items-center gap-2 gap-y-1">
            <h3 className="m-0 font-mono text-lg leading-tight">{title}</h3>
            {inDevelopment && (
              <span className="inline-flex items-center rounded-full border border-amber-400/45 bg-amber-400/10 px-2 py-0.5 font-mono text-[0.6rem] font-semibold uppercase tracking-wider text-amber-200">
                {t("projects.inDevelopment")}
              </span>
            )}
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted">{truncated}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {technologies.map((tech) => (
              <span key={tech} className="rounded-full bg-[rgba(100,255,218,0.1)] px-2 py-1 text-[0.65rem] font-bold text-accent">
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-auto flex gap-2 pt-4" onClick={(e) => e.stopPropagation()}>
            {/* When two live links + privateRepo: live buttons stacked left, badge right */}
            {live && live2 && privateRepo ? (
              <>
                <div className="flex w-1/2 flex-col gap-1.5">
                  <a href={live} target="_blank" rel="noreferrer"
                    className="inline-flex min-h-7 items-center justify-center gap-1.5 rounded-full bg-accent px-3 text-[0.65rem] font-bold text-[#08111f] transition-opacity hover:opacity-85">
                    {t("projects.live1")} <ExternalLink size={11} />
                  </a>
                  <a href={live2} target="_blank" rel="noreferrer"
                    className="inline-flex min-h-7 items-center justify-center gap-1.5 rounded-full bg-accent px-3 text-[0.65rem] font-bold text-[#08111f] transition-opacity hover:opacity-85">
                    {t("projects.live2")} <ExternalLink size={11} />
                  </a>
                </div>
                <span className="inline-flex w-1/2 min-h-8 items-center justify-center gap-1.5 rounded-full border border-line/50 bg-transparent px-3 text-[0.7rem] font-bold text-muted/60 cursor-default">
                  <Lock size={12} /> {t("projects.privateRepo")}
                </span>
              </>
            ) : (
              <>
                {live && (
                  <a href={live} target="_blank" rel="noreferrer"
                    className="inline-flex w-1/2 min-h-8 items-center justify-center gap-1.5 rounded-full bg-accent px-3 text-[0.7rem] font-bold text-[#08111f] transition-opacity hover:opacity-85">
                    {live2 ? `${t("projects.liveDeployment")} 1` : t("projects.liveDeployment")} <ExternalLink size={12} />
                  </a>
                )}
                {live2 && (
                  <a href={live2} target="_blank" rel="noreferrer"
                    className="inline-flex w-1/2 min-h-8 items-center justify-center gap-1.5 rounded-full bg-accent px-3 text-[0.7rem] font-bold text-[#08111f] transition-opacity hover:opacity-85">
                    {t("projects.liveDeployment")} 2 <ExternalLink size={12} />
                  </a>
                )}
                {code && (
                  <a href={code} target="_blank" rel="noreferrer"
                    className="inline-flex w-1/2 min-h-8 items-center justify-center gap-1.5 rounded-full border border-accent bg-transparent px-3 text-[0.7rem] font-bold text-accent transition-colors hover:bg-accent/10">
                    <Github size={12} /> {t("projects.sourceCode")}
                  </a>
                )}
                {!code && privateRepo && (
                  <span className="inline-flex w-1/2 min-h-8 items-center justify-center gap-1.5 rounded-full border border-line/50 bg-transparent px-3 text-[0.7rem] font-bold text-muted/60 cursor-default">
                    <Lock size={12} /> {t("projects.privateRepo")}
                  </span>
                )}
              </>
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
