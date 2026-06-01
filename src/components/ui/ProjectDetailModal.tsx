"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink, Github, Lock, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/Skeleton";

const linkBtn =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-line bg-[rgba(100,255,218,0.06)] px-4 text-sm font-bold text-accent transition-colors hover:border-accent-2 hover:bg-[rgba(255,105,180,0.12)] hover:text-accent-2";

type ProjectDetailModalProps = {
  open: boolean;
  onClose: () => void;
  projectKey: string;
  title: string;
  description: string;
  technologies: string[];
  images: string[];
  live?: string;
  live2?: string;
  code?: string;
  privateRepo?: boolean;
  index?: number;
  initialLightbox?: boolean;
};

export default function ProjectDetailModal({
  open,
  onClose,
  title,
  description,
  technologies,
  images,
  live,
  live2,
  code,
  privateRepo = false,
  index = 0,
  initialLightbox = false,
}: ProjectDetailModalProps) {
  const { t } = useTranslation();
  const labelId = useId();
  const [imgIndex, setImgIndex] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const lightboxRef = useRef(false);
  // Track if modal was opened directly as lightbox (View Images) — closing lightbox should close everything
  const directLightboxRef = useRef(false);
  const count = images.length;

  useEffect(() => { lightboxRef.current = lightbox; }, [lightbox]);

  const closeLightbox = useCallback(() => {
    if (directLightboxRef.current) onClose();
    else setLightbox(false);
  }, [onClose]);

  const goPrev = useCallback(() => { setImgLoaded(false); setImgIndex((i) => (i - 1 + count) % count); }, [count]);
  const goNext = useCallback(() => { setImgLoaded(false); setImgIndex((i) => (i + 1) % count); }, [count]);

  useEffect(() => {
    if (!open) return;
    setImgIndex(0);
    setImgLoaded(false);
    setLightbox(initialLightbox);
    lightboxRef.current = initialLightbox;
    directLightboxRef.current = initialLightbox;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxRef.current) {
          if (directLightboxRef.current) onClose();
          else setLightbox(false);
        } else {
          onClose();
        }
      }
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose, goPrev, goNext, initialLightbox]);

  if (!open) return null;

  const year = new Date().getFullYear();
  const id = String(index + 1).padStart(3, "0");

  return createPortal(
    <>
      {/* Main modal */}
      <div
        className="fixed inset-0 z-[200] flex items-center justify-center bg-[rgba(0,0,0,0.80)] backdrop-blur-sm p-3 sm:p-5"
        onClick={onClose}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelId}
          onClick={(e) => e.stopPropagation()}
          className="relative flex w-full max-w-[72rem] flex-col overflow-hidden rounded-2xl border border-line bg-[#050a14] shadow-[0_32px_80px_rgba(0,0,0,0.75)] md:flex-row"
          style={{ height: "min(640px, 90vh)" }}
        >
          {/* Close */}
          <button
            type="button"
            suppressHydrationWarning
            onClick={onClose}
            className="absolute right-3 top-3 z-10 grid size-9 shrink-0 place-items-center rounded-full border border-line bg-[rgba(8,17,31,0.92)] text-accent transition-colors hover:border-accent-2 hover:text-accent-2"
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>

          {/* Left: image gallery */}
          <div className="relative flex h-[200px] w-full flex-col bg-[#08111f] md:h-full md:w-[55%]">
            <div className="relative flex-1 w-full overflow-hidden">
              {!imgLoaded && <Skeleton className="absolute inset-0 rounded-none" />}
              {images[imgIndex] && (
                <Image
                  src={images[imgIndex]}
                  alt={`${title} captura ${imgIndex + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 55vw"
                  className={cn("object-cover transition-opacity duration-300", imgLoaded ? "opacity-100" : "opacity-0")}
                  priority
                  onLoad={() => setImgLoaded(true)}
                />
              )}

              {/* Nav arrows */}
              {count > 1 && (
                <>
                  <button
                    type="button"
                    suppressHydrationWarning
                    onClick={goPrev}
                    className="absolute left-2 top-1/2 z-10 grid size-8 -translate-y-1/2 place-items-center rounded-full border border-line bg-[rgba(8,17,31,0.88)] text-accent transition-colors hover:border-accent-2 hover:text-accent-2"
                    aria-label="Imagen anterior"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    suppressHydrationWarning
                    onClick={goNext}
                    className="absolute right-2 top-1/2 z-10 grid size-8 -translate-y-1/2 place-items-center rounded-full border border-line bg-[rgba(8,17,31,0.88)] text-accent transition-colors hover:border-accent-2 hover:text-accent-2"
                    aria-label="Imagen siguiente"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
              {/* Counter */}
              {count > 1 && (
                <span className="absolute bottom-2 right-3 font-mono text-[0.65rem] text-muted/80">
                  {imgIndex + 1} / {count}
                </span>
              )}
            </div>
            {/* Thumbnail strip */}
            {count > 1 && (
              <div className="flex gap-1.5 overflow-x-auto bg-[#050a14] px-3 py-2 scrollbar-none">
                {images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    suppressHydrationWarning
                    onClick={() => setImgIndex(i)}
                    className={cn(
                      "relative size-10 shrink-0 overflow-hidden rounded border transition-colors",
                      i === imgIndex ? "border-accent" : "border-line/50 opacity-60 hover:opacity-90",
                    )}
                    aria-label={`Captura ${i + 1}`}
                  >
                    <Image src={img} alt={`thumb ${i + 1}`} fill sizes="40px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: details */}
          <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-5 md:p-7">
            {/* Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-[0.6rem] font-semibold uppercase tracking-widest text-accent/70">
                PRODUCTION BUILD
              </span>
              <span className="font-mono text-[0.6rem] text-muted/60">
                ID: {id} // {year}
              </span>
            </div>

            {/* Title */}
            <h2 id={labelId} className="m-0 font-mono text-xl font-bold leading-tight text-ink md:text-2xl">
              {title}
            </h2>

            {/* Description */}
            <p className="text-sm leading-relaxed text-muted/90">{description}</p>

            {/* Tech stack */}
            <div className="flex flex-col gap-2">
              <span className="font-mono text-[0.6rem] font-semibold uppercase tracking-widest text-muted/60">
                {t("projects.architectureStack")}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-[rgba(100,255,218,0.1)] px-2.5 py-1 font-mono text-[0.65rem] font-bold text-accent"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="mt-auto flex flex-wrap gap-2 pt-2">
              {live && (
                <a
                  href={live}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-bold text-[#08111f] transition-opacity hover:opacity-85"
                >
                  {live2 ? `${t("projects.liveDeployment")} 1` : t("projects.liveDeployment")} <ExternalLink size={15} />
                </a>
              )}
              {live2 && (
                <a
                  href={live2}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-5 text-sm font-bold text-[#08111f] transition-opacity hover:opacity-85"
                >
                  {t("projects.liveDeployment")} 2 <ExternalLink size={15} />
                </a>
              )}
              {code && (
                <a
                  href={code}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 min-h-11 items-center justify-center gap-2 rounded-full border border-line bg-[rgba(8,17,31,0.85)] px-5 text-sm font-bold text-ink transition-colors hover:border-accent/50 hover:text-accent"
                >
                  <Github size={15} /> {t("projects.sourceCode")}
                </a>
              )}
              {!code && privateRepo && (
                <span className="inline-flex flex-1 min-h-11 items-center justify-center gap-2 rounded-full border border-line/40 bg-transparent px-5 text-sm font-bold text-muted/50 cursor-default">
                  <Lock size={15} /> {t("projects.privateRepo")}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox fullscreen */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-[rgba(0,0,0,0.96)] p-6 sm:p-10"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full max-w-[72rem] overflow-hidden rounded-xl border border-line/40 bg-[#050a14]"
            style={{ height: "min(580px, 88vh)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close lightbox */}
            <button
              type="button"
              suppressHydrationWarning
              onClick={closeLightbox}
              className="absolute right-3 top-3 z-10 grid size-9 place-items-center rounded-full border border-line bg-[rgba(8,17,31,0.92)] text-accent transition-colors hover:border-accent-2 hover:text-accent-2"
              aria-label="Cerrar imagen"
            >
              <X size={18} />
            </button>

            {/* Image */}
            <div className="relative h-full w-full px-16 py-10 sm:px-24 sm:py-14">
              <Image
                src={images[imgIndex]}
                alt={`${title} captura ${imgIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Nav arrows */}
            {count > 1 && (
              <>
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={goPrev}
                  className="absolute left-2 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-[rgba(8,17,31,0.92)] text-accent transition-colors hover:border-accent-2 hover:text-accent-2"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={goNext}
                  className="absolute right-2 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-[rgba(8,17,31,0.92)] text-accent transition-colors hover:border-accent-2 hover:text-accent-2"
                  aria-label="Imagen siguiente"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}

            {/* Counter + title */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 rounded-full border border-line bg-[rgba(8,17,31,0.88)] px-4 py-1.5">
              <span className="font-mono text-xs text-accent">{title}</span>
              {count > 1 && (
                <span className="font-mono text-xs text-muted/70">{imgIndex + 1} / {count}</span>
              )}
            </div>
          </div>
        </div>
      )}
    </>,
    document.body,
  );
}
