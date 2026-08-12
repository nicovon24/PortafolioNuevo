"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionStagger";
import Section from "@/components/ui/Section";
import { techGroups } from "@/data/portfolio";

export default function TechSection() {
  const { t } = useTranslation();

  return (
    <Section
      id="tech"
      eyebrow={t("tech.eyebrow")}
      title={t("tech.title")}
      className="py-10 md:py-12 lg:py-14 [&>div:first-child]:mb-5 md:[&>div:first-child]:mb-6 [&_h2]:text-[clamp(1.25rem,3vw,2rem)]"
    >
      <div className="grid gap-4 lg:gap-5">
        {techGroups.map((group) => (
          <div key={group.title}>
            <h3 className="m-0 mb-2 font-mono text-sm font-semibold text-accent">{t(group.title)}</h3>
            <MotionStagger className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {group.items.map((item) => (
                <MotionStaggerItem
                  key={item.name}
                  className="flex items-start gap-2 rounded-lg border border-line bg-panel px-2 py-2 shadow-card-sm"
                >
                  <Image
                    src={item.icon}
                    alt=""
                    width={22}
                    height={22}
                    className="mt-0.5 shrink-0 object-contain opacity-95"
                  />
                  <div className="min-w-0 flex-1 leading-tight">
                    <span className="block text-sm font-semibold text-ink">{item.name}</span>
                  </div>
                </MotionStaggerItem>
              ))}
            </MotionStagger>
          </div>
        ))}
      </div>
    </Section>
  );
}
