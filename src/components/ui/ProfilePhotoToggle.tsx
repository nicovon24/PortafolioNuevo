"use client";

import { BriefcaseBusiness } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SoccerBallIcon } from "@/components/ui/SoccerBallIcon";
import { cn } from "@/lib/utils";

export type ProfilePhotoMode = "work" | "football";

export const PROFILE_PHOTOS: Record<ProfilePhotoMode, string> = {
  work: "/images/profile/hero-work.jpeg",
  football: "/images/profile/football.jpeg",
};

export default function ProfilePhotoToggle({
  mode,
  onChange,
}: {
  mode: ProfilePhotoMode;
  onChange: (mode: ProfilePhotoMode) => void;
}) {
  const { t } = useTranslation();

  return (
    <div
      className="control-surface-strong flex items-center gap-1 rounded-full border p-1 shadow-card-sm backdrop-blur-sm"
      role="group"
      aria-label={t("photoMode.label")}
    >
      <button
        type="button"
        onClick={() => onChange("work")}
        aria-pressed={mode === "work"}
        aria-label={t("photoMode.work")}
        title={t("photoMode.work")}
        className={cn(
          "grid size-8 place-items-center rounded-full text-muted transition-all hover:bg-accent/10 hover:text-accent",
          mode === "work" && "bg-accent text-accent-contrast shadow-card-sm hover:bg-accent hover:text-accent-contrast",
        )}
      >
        <BriefcaseBusiness size={16} />
      </button>
      <button
        type="button"
        onClick={() => onChange("football")}
        aria-pressed={mode === "football"}
        aria-label={t("photoMode.football")}
        title={t("photoMode.football")}
        className={cn(
          "grid size-8 place-items-center rounded-full text-muted transition-all hover:bg-accent/10 hover:text-accent",
          mode === "football" && "bg-accent text-accent-contrast shadow-card-sm hover:bg-accent hover:text-accent-contrast",
        )}
      >
        <SoccerBallIcon className="size-4" />
      </button>
    </div>
  );
}
