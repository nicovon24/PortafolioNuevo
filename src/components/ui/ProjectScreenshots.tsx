"use client";

import Image from "next/image";
import { ZoomIn } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Lightbox from "@/components/ui/Lightbox";
import { Skeleton } from "@/components/ui/Skeleton";

type ProjectScreenshotsProps = {
  images: string[];
  title: string;
  compact?: boolean;
};

const PREVIEW_POSITION = [
  "inset-0 bottom-[16%] right-[18%] z-[12]",
  "inset-[22%_0_0_38%] z-[13]",
  "bottom-0 left-[8%] right-[48%] top-auto z-[14] h-[34%]",
];

export default function ProjectScreenshots({ images, title, compact = false }: ProjectScreenshotsProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [loadedMap, setLoadedMap] = useState<Record<number, boolean>>({});
  const count = images.length;

  if (count === 0) return null;

  const previews = images.slice(0, 3);

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <>
      <div className={cn("relative", compact ? "h-[200px]" : "h-[260px] sm:h-[310px] lg:h-[390px]")}>
        {!compact && (
          <Button
            size="sm"
            variant="subtle"
            onClick={() => openAt(0)}
            className="absolute right-2 top-2 z-[25] bg-panel-strong font-mono uppercase tracking-wide sm:right-3 sm:top-3"
            aria-label={t("gallery.openOf", { title })}
          >
            <ZoomIn size={14} className="shrink-0" />
            {t("gallery.open")}
          </Button>
        )}
        {previews.map((image, i) => (
          <button
            key={`${title}-preview-${i}`}
            type="button"
            suppressHydrationWarning
            onClick={() => openAt(i)}
            className={cn(
              "absolute overflow-hidden rounded-card-lg border border-accent/30 bg-canvas text-left shadow-pop transition-[transform,box-shadow] hover:brightness-[1.04] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              PREVIEW_POSITION[i],
            )}
            aria-label={t("gallery.openGalleryAt", { title, n: i + 1 })}
          >
            {!loadedMap[i] && <Skeleton className="absolute inset-0 rounded-card-lg" />}
            <Image
              src={image}
              alt=""
              fill
              sizes="(max-width: 768px) 80vw, 34vw"
              className={cn(
                "pointer-events-none object-cover transition-opacity duration-300",
                loadedMap[i] ? "opacity-100" : "opacity-0",
              )}
              onLoad={() => setLoadedMap((prev) => ({ ...prev, [i]: true }))}
            />
          </button>
        ))}
      </div>

      <Lightbox
        open={open}
        images={images}
        index={Math.min(index, count - 1)}
        title={title}
        onClose={() => setOpen(false)}
        onIndexChange={setIndex}
      />
    </>
  );
}
