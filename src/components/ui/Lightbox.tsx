"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { IconButton } from "@/components/ui/Button";
import { useFocusTrap } from "@/hooks/useFocusTrap";

type LightboxProps = {
  open: boolean;
  images: string[];
  index: number;
  title: string;
  onClose: () => void;
  onIndexChange: (next: number) => void;
  /** z-index del overlay: permite apilarlo sobre un modal ya abierto. */
  z?: string;
};

/**
 * Visor a pantalla completa. Antes existian dos implementaciones separadas
 * (ProjectScreenshots y ProjectDetailModal) con su propio portal, teclado y bloqueo de scroll.
 */
export default function Lightbox({
  open,
  images,
  index,
  title,
  onClose,
  onIndexChange,
  z = "z-300",
}: LightboxProps) {
  const { t } = useTranslation();
  const panelRef = useRef<HTMLDivElement>(null);
  const count = images.length;

  useFocusTrap(panelRef, open);

  const goPrev = useCallback(() => onIndexChange((index - 1 + count) % count), [index, count, onIndexChange]);
  const goNext = useCallback(() => onIndexChange((index + 1) % count), [index, count, onIndexChange]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
      }
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
  }, [open, onClose, goPrev, goNext]);

  if (!open || count === 0) return null;

  return createPortal(
    <div
      className={`fixed inset-0 ${z} flex items-center justify-center bg-overlay p-6 sm:p-10`}
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative w-full max-w-[72rem] overflow-hidden rounded-card-lg border border-line/40 bg-background-deep"
        style={{ height: "min(580px, 88vh)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <IconButton
          label={t("gallery.closeImage")}
          onClick={onClose}
          className="absolute right-3 top-3 z-10 size-9"
        >
          <X size={18} />
        </IconButton>

        <div className="relative h-full w-full px-16 py-10 sm:px-24 sm:py-14">
          <Image
            src={images[index]}
            alt={t("gallery.screenshotOf", { title, n: index + 1 })}
            fill
            sizes="100vw"
            className="object-contain"
          />
        </div>

        {count > 1 && (
          <>
            <IconButton
              label={t("gallery.previous")}
              onClick={goPrev}
              className="absolute left-2 top-1/2 z-10 size-10 -translate-y-1/2"
            >
              <ChevronLeft size={22} />
            </IconButton>
            <IconButton
              label={t("gallery.next")}
              onClick={goNext}
              className="absolute right-2 top-1/2 z-10 size-10 -translate-y-1/2"
            >
              <ChevronRight size={22} />
            </IconButton>
          </>
        )}

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-line bg-panel-strong px-4 py-1.5">
          <span className="font-mono text-mini text-accent">{title}</span>
          {count > 1 && (
            <span className="font-mono text-mini text-muted">
              {index + 1} / {count}
            </span>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
