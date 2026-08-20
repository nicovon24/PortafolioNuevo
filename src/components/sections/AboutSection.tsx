"use client";

import { useTranslation } from "react-i18next";
import { Code2, LayoutDashboard, Globe } from "lucide-react";
import MotionFade from "@/components/motion/MotionFade";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionStagger";
import { ParallaxLayer } from "@/components/motion/Parallax";
import Section from "@/components/ui/Section";
import { TechIcon } from "@/components/ui/TechIcon";

// Emparejado por clave, no por indice: reordenar el JSON de locales ya no descoloca los iconos.
const SERVICES = [
  { key: "fullstack", icon: <Code2 className="size-7 text-accent" aria-hidden /> },
  { key: "dashboards", icon: <LayoutDashboard className="size-7 text-accent" aria-hidden /> },
  { key: "industries", icon: <Globe className="size-7 text-accent" aria-hidden /> },
  {
    key: "starwars",
    icon: <TechIcon name="vader" className="size-7 text-accent" />,
  },
] as const;

export default function AboutSection() {
  const { t } = useTranslation();

  return (
    <Section id="about" index="01" eyebrow={t("about.eyebrow")} title={t("about.title")} parallax>
      <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[1fr_0.85fr] lg:gap-8">
        <ParallaxLayer speed={22}>
          <MotionFade className="text-base leading-relaxed text-muted lg:text-lg">
            <p>{t("about.description")}</p>
          </MotionFade>
        </ParallaxLayer>
        <ParallaxLayer speed={-18}>
        <MotionStagger className="grid grid-cols-2 gap-3">
          {SERVICES.map((service) => (
            <MotionStaggerItem
              key={service.key}
              className="flex flex-col items-start gap-2.5 rounded-card border border-line bg-panel px-4 py-4 shadow-card"
            >
              <div className="rounded-xl bg-accent/10 p-2">{service.icon}</div>
              <span className="text-sm font-bold leading-snug text-accent">
                {t(`about.services.${service.key}`)}
              </span>
            </MotionStaggerItem>
          ))}
        </MotionStagger>
        </ParallaxLayer>
      </div>
    </Section>
  );
}
