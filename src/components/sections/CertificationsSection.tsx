"use client";

import Image from "next/image";
import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import MotionFade from "@/components/motion/MotionFade";
import Section from "@/components/ui/Section";
import { aiCertification, professionalCourses } from "@/data/portfolio";

export default function CertificationsSection() {
  const { t, i18n } = useTranslation();
  const locale = i18n.resolvedLanguage?.startsWith("en") ? "en-US" : "es-AR";
  const dateFormatter = new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  const earnedDate = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${aiCertification.earnedOn}T12:00:00Z`));

  return (
    <Section id="certifications">
      <h2 className="mb-9 flex items-baseline gap-4 font-mono text-section text-ink">
        <span className="shrink-0 text-base tabular-nums text-accent md:text-xl">05.</span>
        <span className="min-w-0">{t("certifications.title")}</span>
      </h2>

      <MotionFade className="grid items-center gap-6 border-y border-line py-8 sm:grid-cols-[10rem_1fr] sm:gap-8 md:py-10">
        <div className="relative size-32 sm:size-40">
          <Image
            src={aiCertification.badge}
            alt={t("certifications.badgeAlt", { name: aiCertification.name })}
            fill
            sizes="(min-width: 640px) 160px, 128px"
            className="object-contain"
          />
        </div>
        <div>
          <h3 className="m-0 font-mono text-xl font-bold leading-snug text-ink md:text-2xl">
            {aiCertification.name}
          </h3>
          <p className="mt-2 text-sm text-muted">{aiCertification.issuer}</p>
          <p className="mt-4 flex items-start gap-2 text-sm text-muted">
            <BadgeCheck className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
            <span>
              {t("certifications.earned")} <time dateTime={aiCertification.earnedOn}>{earnedDate}</time>
            </span>
          </p>
          <a
            href={aiCertification.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-11 items-center gap-2 rounded font-mono text-sm font-bold text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
            aria-label={t("certifications.credentialLabel", { name: aiCertification.name })}
          >
            {t("certifications.viewCredential")}
            <ArrowUpRight className="size-4" aria-hidden />
          </a>
        </div>
      </MotionFade>

      <div className="mt-10">
        <h3 className="mb-3 font-mono text-base font-bold text-ink">{t("certifications.coursesTitle")}</h3>
        <ul className="divide-y divide-line">
          {professionalCourses.map((course) => (
            <li key={course.name} className="flex flex-col gap-2 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
              <div className="min-w-0">
                <h4 className="text-base font-medium leading-relaxed text-ink">{course.name}</h4>
                <p className="mt-1 text-sm text-muted">{course.issuer}</p>
              </div>
              <time dateTime={course.completedOn} className="shrink-0 font-mono text-xs text-muted">
                {dateFormatter.format(new Date(`${course.completedOn}-01T12:00:00Z`))}
              </time>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
