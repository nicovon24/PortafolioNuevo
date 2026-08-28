"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Music, Tv } from "lucide-react";
import MotionFade from "@/components/motion/MotionFade";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionStagger";
import { ParallaxLayer } from "@/components/motion/Parallax";
import Section from "@/components/ui/Section";
import { TechIcon } from "@/components/ui/TechIcon";
import ProfilePhotoToggle, {
  PROFILE_PHOTOS,
  type ProfilePhotoMode,
} from "@/components/ui/ProfilePhotoToggle";
import { SoccerBallIcon } from "@/components/ui/SoccerBallIcon";
import { profile } from "@/data/portfolio";

// Emparejado por clave, no por indice: reordenar el JSON de locales ya no descoloca los iconos.
const SERVICES = [
  { key: "fullstack" },
  { key: "dashboards" },
  { key: "industries" },
  { key: "ai" },
] as const;

const PERSONAL = [
  { key: "futbol", icon: <SoccerBallIcon className="size-4.5 text-accent" aria-hidden /> },
  { key: "rock", icon: <Music className="size-4.5 text-accent" aria-hidden /> },
  { key: "starwars", icon: <TechIcon name="vader" className="size-4.5 text-accent" /> },
  { key: "bettercallsaul", icon: <Tv className="size-4.5 text-accent" aria-hidden /> },
] as const;

const ABOUT_PHOTOS: Record<ProfilePhotoMode, string> = {
  work: "/images/profile/profile.png",
  football: PROFILE_PHOTOS.football,
};

export default function AboutSection() {
  const { t } = useTranslation();
  const [photoMode, setPhotoMode] = useState<ProfilePhotoMode>("work");

  return (
    <Section id="about" parallax variant="surface">
      <div className="mx-auto w-full max-w-[58rem]">
        <ParallaxLayer speed={18}>
          <MotionFade className="mb-10 flex items-center gap-7 md:mb-12">
            <h2 className="m-0 shrink-0 font-mono text-xl font-bold uppercase tracking-[0.04em] text-ink md:text-2xl">
              <span className="text-accent">01.</span> {t("about.sectionLabel")}
            </h2>
            <span className="h-px max-w-64 flex-1 bg-line" aria-hidden />
          </MotionFade>
        </ParallaxLayer>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.45fr_0.9fr] lg:gap-14">
          <ParallaxLayer speed={22}>
            <MotionFade className="text-sm leading-relaxed text-muted md:text-base">
              <p>{t("about.descriptionP1")}</p>
              <p className="mt-4">{t("about.descriptionP2")}</p>
            </MotionFade>
            <MotionStagger className="mt-7 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {SERVICES.map((service) => (
                <MotionStaggerItem key={service.key} className="flex items-start gap-2.5">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  <span className="font-mono text-xs leading-relaxed text-muted md:text-sm">
                    {t(`about.services.${service.key}`)}
                  </span>
                </MotionStaggerItem>
              ))}
            </MotionStagger>
          </ParallaxLayer>

          <ParallaxLayer speed={-18}>
            <MotionFade className="flex flex-col items-center gap-3.5">
              <div className="relative aspect-4/5 w-full max-w-[19.25rem] overflow-hidden rounded-card border border-line shadow-card">
                <Image
                  key={photoMode}
                  src={ABOUT_PHOTOS[photoMode]}
                  alt={profile.name}
                  fill
                  sizes="(min-width: 1024px) 19.25rem, 80vw"
                  className={photoMode === "work" ? "object-cover object-[center_18%]" : "object-cover object-[center_30%]"}
                />
              </div>
              <ProfilePhotoToggle mode={photoMode} onChange={setPhotoMode} />
              <p className="max-w-[19.25rem] text-center text-xs leading-relaxed text-muted">
                {t(photoMode === "work" ? "about.photoCaption" : "about.photoCaptionFootball")}
              </p>
            </MotionFade>
          </ParallaxLayer>
        </div>

        <MotionStagger className="mt-14 grid grid-cols-1 divide-y divide-line border-t border-line sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:mt-16 lg:grid-cols-4">
          {PERSONAL.map((item) => (
            <MotionStaggerItem key={item.key} className="flex flex-col gap-2.5 px-1 py-6 sm:px-5">
              <div className="flex items-center gap-2.5">
                {item.icon}
                <p className="m-0 font-mono text-micro font-bold uppercase tracking-[0.16em] text-accent">
                  {t(`about.personal.${item.key}.label`)}
                </p>
              </div>
              <p className="m-0 text-sm leading-relaxed text-muted">
                {t(`about.personal.${item.key}.text`)}
              </p>
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </div>
    </Section>
  );
}
