"use client";

import { useTranslation } from "react-i18next";
import MotionFade from "@/components/motion/MotionFade";
import Section from "@/components/ui/Section";

export default function AboutSection() {
  const { t } = useTranslation();
  const services = t("about.services", { returnObjects: true }) as string[];

  return (
    <Section id="about" eyebrow={t("about.eyebrow")} title={t("about.title")}>
      <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[1fr_0.85fr] lg:gap-8">
        <MotionFade className="leading-relaxed text-muted text-base lg:text-[1.05rem]">
          <p>{t("about.description")}</p>
        </MotionFade>
        <div className="grid gap-3">
          {services.map((service, index) => (
            <MotionFade
              key={service}
              delay={index * 0.08}
              className="rounded-2xl border border-line bg-panel px-4 py-3.5 font-bold text-accent shadow-[0_20px_56px_rgba(0,0,0,0.22)] backdrop-blur-[14px]"
            >
              {service}
            </MotionFade>
          ))}
        </div>
      </div>
    </Section>
  );
}
