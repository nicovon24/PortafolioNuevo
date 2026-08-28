"use client";

import { useTranslation } from "react-i18next";
import MotionFade from "@/components/motion/MotionFade";
import Section from "@/components/ui/Section";

const panel =
  "rounded-3xl border border-line bg-panel p-6 shadow-[0_20px_56px_rgba(0,0,0,0.22)] backdrop-blur-[14px] md:p-8";

export default function ContactSection() {
  const { t } = useTranslation();

  return (
    <Section
      id="contact"
      index="05"
      className="scroll-mt-24"
      eyebrow={t("contact.eyebrow")}
      title={t("contact.title")}
      variant="surface"
    >
      <div className={`${panel} flex flex-col justify-center gap-4`}>
        <MotionFade className="flex flex-col justify-center gap-4">
          <p className="m-0 leading-relaxed text-muted lg:text-[1.02rem]">
            {t("contact.description")}
          </p>
        </MotionFade>
      </div>
    </Section>
  );
}
