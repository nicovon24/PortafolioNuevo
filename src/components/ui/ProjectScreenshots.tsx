"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

type ProjectScreenshotsProps = {
  images: string[];
  title: string;
  compact?: boolean;
};

export default function ProjectScreenshots({ images, title, compact = false }: ProjectScreenshotsProps) {
  const labelId = useId();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const count = images.length;
  const safeIndex = count > 0 ? Math.min(index, count - 1) : 0;

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  const close = useCallback(() => setOpen(false), []);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + count) % count);
  }, [count]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % count);
  }, [count]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, goPrev, goNext]);

  useEffect(() => {
    if (open && count > 0) setIndex((i) => Math.min(i, count - 1));
  }, [open, count]);

  if (count === 0) return null;

  const previews = images.slice(0, 3);

  return (
    <>
      <div className={cn("relative", compact ? "h-[200px]" : "h-[260px] sm:h-[310px] lg:h-[390px]")}>
        {!compact && (
          <button
            type="button"
            suppressHydrationWarning
            onClick={() => openAt(0)}
            className="absolute right-2 top-2 z-[25] inline-flex items-center gap-1.5 rounded-full border border-[rgba(100,255,218,0.45)] bg-[rgba(8,17,31,0.92)] px-2.5 py-1.5 font-mono text-[0.7rem] font-bold uppercase tracking-wide text-accent shadow-[0_8px_24px_rgba(0,0,0,0.35)] backdrop-blur-sm transition-colors hover:border-accent-2 hover:text-accent-2 sm:right-3 sm:top-3 sm:px-3 sm:text-xs"
            aria-label={`Ampliar galería de ${title}`}
          >
            <ZoomIn size={14} className="shrink-0 sm:size-4" />
            Galería
          </button>
        )}
        {previews.map((image, i) => (
          <button
            key={`${title}-preview-${i}`}
            type="button"
            suppressHydrationWarning
            onClick={() => openAt(i)}
            className={cn(
              "absolute overflow-hidden rounded-[22px] border border-[rgba(100,255,218,0.32)] bg-canvas text-left shadow-[0_20px_48px_rgba(0,0,0,0.32)] transition-[transform,box-shadow] hover:brightness-[1.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              i === 0 && "inset-0 bottom-[16%] right-[18%] z-[12]",
              i === 1 && "inset-[22%_0_0_38%] z-[13]",
              i === 2 && "bottom-0 left-[8%] right-[48%] top-auto z-[14] h-[34%]",
            )}
            aria-label={`${title} captura ${i + 1} — abrir galería`}
          >
            <Image
              src={image}
              alt={`${title} captura ${i + 1}`}
              fill
              sizes="(max-width: 768px) 80vw, 34vw"
              className="pointer-events-none object-cover"
            />
          </button>
        ))}
      </div>

      {open && createPortal(
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[rgba(0,0,0,0.75)] backdrop-blur-sm p-4 sm:p-6"
          onClick={close}
        >
          <div
            className="relative flex flex-col overflow-hidden rounded-2xl border border-line bg-[#050a14] shadow-[0_32px_80px_rgba(0,0,0,0.7)] w-[90vw] h-[80vh] sm:w-[80vw] sm:h-[75vh] md:w-[72vw] md:h-[72vh]"
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelId}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-line/80 px-3 py-2 sm:px-4">
              <p id={labelId} className="min-w-0 truncate font-mono text-xs font-semibold text-accent sm:text-sm">
                {title}{" "}
                <span className="font-normal text-muted">
                  ({safeIndex + 1} / {count})
                </span>
              </p>
              <button
                type="button"
                suppressHydrationWarning
                onClick={close}
                className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-accent transition-colors hover:border-accent-2 hover:bg-[rgba(100,255,218,0.08)] hover:text-accent-2 sm:size-10"
                aria-label="Cerrar galería"
              >
                <X size={20} />
              </button>
            </div>

            <div className="relative min-h-0 flex-1 w-full">
              <button
                type="button"
                suppressHydrationWarning
                onClick={goPrev}
                className="absolute left-1 top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-line bg-[rgba(8,17,31,0.92)] text-accent shadow-[0_8px_24px_rgba(0,0,0,0.45)] transition-colors hover:border-accent-2 hover:text-accent-2 sm:left-3 sm:size-10"
                aria-label="Imagen anterior"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                suppressHydrationWarning
                onClick={goNext}
                className="absolute right-1 top-1/2 z-10 grid size-9 -translate-y-1/2 place-items-center rounded-full border border-line bg-[rgba(8,17,31,0.92)] text-accent shadow-[0_8px_24px_rgba(0,0,0,0.45)] transition-colors hover:border-accent-2 hover:text-accent-2 sm:right-3 sm:size-10"
                aria-label="Imagen siguiente"
              >
                <ChevronRight size={22} />
              </button>

              <div className="relative h-full w-full px-10 py-2 sm:px-12">
                <Image
                  src={images[safeIndex]}
                  alt={`${title} captura ${safeIndex + 1}`}
                  fill
                  sizes="80vw"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
