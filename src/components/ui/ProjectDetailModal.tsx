"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink, Github, Lock, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import Button, { IconButton, TechChip } from "@/components/ui/Button";
import Lightbox from "@/components/ui/Lightbox";
import { Skeleton } from "@/components/ui/Skeleton";
import { useFocusTrap } from "@/hooks/useFocusTrap";

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
  const panelRef = useRef<HTMLDivElement>(null);
  const [imgIndex, setImgIndex] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  // Abierto directo como lightbox ("Ver imagenes"): cerrarlo debe cerrar todo.
  const directLightboxRef = useRef(false);
  const count = images.length;

  useFocusTrap(panelRef, open && !lightbox);

  const closeLightbox = useCallback(() => {
    if (directLightboxRef.current) onClose();
    else setLightbox(false);
  }, [onClose]);

  const goPrev = useCallback(() => {
    setImgLoaded(false);
    setImgIndex((i) => (i - 1 + count) % count);
  }, [count]);

  const goNext = useCallback(() => {
    setImgLoaded(false);
    setImgIndex((i) => (i + 1) % count);
  }, [count]);

  useEffect(() => {
    if (!open) return;
    setImgIndex(0);
    setImgLoaded(false);
    setLightbox(initialLightbox);
    directLightboxRef.current = initialLightbox;
  }, [open, initialLightbox]);

  useEffect(() => {
    // Con el lightbox arriba, el teclado lo maneja el propio Lightbox.
    if (!open || lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
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
  }, [open, lightbox, onClose, goPrev, goNext]);

  if (!open) return null;

  const year = new Date().getFullYear();
  const id = String(index + 1).padStart(3, "0");

  return createPortal(
    <>
      <div
        className="fixed inset-0 z-200 flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm sm:p-5"
        onClick={onClose}
      >
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelId}
          onClick={(e) => e.stopPropagation()}
          // Una sola columna: en dos columnas la imagen quedaba chica y el texto cortado.
          className="relative flex w-full max-w-4xl flex-col overflow-y-auto rounded-card border border-line bg-background-deep shadow-[0_32px_80px_rgba(0,0,0,0.75)]"
          style={{ maxHeight: "92vh" }}
        >
          <IconButton
            label={t("gallery.closeDialog")}
            onClick={onClose}
            className="absolute right-3 top-3 z-10 size-9"
          >
            <X size={18} />
          </IconButton>

          {/* Galeria arriba, a lo ancho del modal. */}
          <div className="relative flex w-full shrink-0 flex-col bg-canvas">
            <div className="relative h-[42vh] max-h-104 min-h-56 w-full overflow-hidden">
              {!imgLoaded && <Skeleton className="absolute inset-0 rounded-none" />}
              {images[imgIndex] && (
                <Image
                  src={images[imgIndex]}
                  alt={t("gallery.screenshotOf", { title, n: imgIndex + 1 })}
                  fill
                  sizes="(max-width: 896px) 100vw, 896px"
                  // contain y no cover: son capturas de pantalla, recortarlas pierde la UI.
                  className={cn(
                    "cursor-zoom-in object-contain transition-opacity duration-300",
                    imgLoaded ? "opacity-100" : "opacity-0",
                  )}
                  onClick={() => setLightbox(true)}
                  onLoad={() => setImgLoaded(true)}
                />
              )}

              {count > 1 && (
                <>
                  <IconButton
                    label={t("gallery.previous")}
                    onClick={goPrev}
                    className="absolute left-2 top-1/2 z-10 size-8 -translate-y-1/2"
                  >
                    <ChevronLeft size={18} />
                  </IconButton>
                  <IconButton
                    label={t("gallery.next")}
                    onClick={goNext}
                    className="absolute right-2 top-1/2 z-10 size-8 -translate-y-1/2"
                  >
                    <ChevronRight size={18} />
                  </IconButton>
                  <span className="absolute bottom-2 right-3 font-mono text-mini text-muted">
                    {imgIndex + 1} / {count}
                  </span>
                </>
              )}
            </div>

            {count > 1 && (
              <div className="scrollbar-none flex gap-1.5 overflow-x-auto bg-background-deep px-3 py-2">
                {images.map((img, i) => (
                  <button
                    key={img}
                    type="button"
                    suppressHydrationWarning
                    onClick={() => setImgIndex(i)}
                    className={cn(
                      "relative size-10 shrink-0 overflow-hidden rounded border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                      i === imgIndex ? "border-accent" : "border-line/50 opacity-60 hover:opacity-90",
                    )}
                    aria-label={t("gallery.thumbnail", { n: i + 1 })}
                    aria-current={i === imgIndex}
                  >
                    <Image src={img} alt="" fill sizes="40px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Detalle: el scroll lo maneja el panel entero, no esta columna. */}
          <div className="flex flex-col gap-4 p-5 md:p-7">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-micro font-semibold uppercase tracking-widest text-accent">
                {t("gallery.productionBuild")}
              </span>
              <span className="font-mono text-micro text-muted">
                ID: {id} // {year}
              </span>
            </div>

            <h2 id={labelId} className="m-0 font-mono text-xl font-bold leading-tight text-ink md:text-2xl">
              {title}
            </h2>

            <p className="text-sm leading-relaxed text-muted">{description}</p>

            <div className="flex flex-col gap-2">
              <span className="font-mono text-micro font-semibold uppercase tracking-widest text-muted">
                {t("projects.architectureStack")}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {technologies.map((tech) => (
                  <TechChip key={tech}>{tech}</TechChip>
                ))}
              </div>
            </div>

            <div className="mt-auto flex flex-wrap gap-2 pt-2">
              {live && (
                <Button as="a" size="lg" href={live} target="_blank" rel="noreferrer" className="flex-1">
                  {live2 ? `${t("projects.liveDeployment")} 1` : t("projects.liveDeployment")}
                  <ExternalLink size={15} />
                </Button>
              )}
              {live2 && (
                <Button as="a" size="lg" href={live2} target="_blank" rel="noreferrer" className="flex-1">
                  {t("projects.liveDeployment")} 2 <ExternalLink size={15} />
                </Button>
              )}
              {code && (
                <Button
                  as="a"
                  size="lg"
                  variant="subtle"
                  href={code}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1"
                >
                  <Github size={15} /> {t("projects.sourceCode")}
                </Button>
              )}
              {!code && privateRepo && (
                <Button as="span" size="lg" variant="muted" className="flex-1">
                  <Lock size={15} /> {t("projects.privateRepo")}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Lightbox
        open={lightbox}
        images={images}
        index={imgIndex}
        title={title}
        onClose={closeLightbox}
        onIndexChange={setImgIndex}
      />
    </>,
    document.body,
  );
}
