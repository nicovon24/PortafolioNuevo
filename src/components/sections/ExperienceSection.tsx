"use client";

import Image from "next/image";
import { GraduationCap, Monitor } from "lucide-react";
import { useTranslation } from "react-i18next";
import Section from "@/components/ui/Section";
import { experiences } from "@/data/portfolio";
import { cn } from "@/lib/utils";

function TimelineDot({ kind }: { kind: "work" | "study" }) {
  const isWork = kind === "work";
  return (
    <div
      className={cn(
        "relative z-[1] flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-background shadow-[0_4px_14px_rgba(0,0,0,0.45)]",
        isWork ? "bg-accent text-background-deep" : "bg-accent-2 text-background-deep",
      )}
      aria-hidden
    >
      {isWork ? (
        <Monitor className="size-[22px]" strokeWidth={2} aria-hidden />
      ) : (
        <GraduationCap className="size-[22px]" strokeWidth={2} aria-hidden />
      )}
    </div>
  );
}

function ExperienceCard({
  company,
  title,
  icon,
  iconBg,
  points,
}: {
  company: string;
  title: string;
  icon: string;
  iconBg?: string;
  points: string[];
}) {
  return (
    <article className="rounded-2xl border border-line bg-panel p-5 shadow-[0_20px_56px_rgba(0,0,0,0.22)] md:p-6">
      <div className="flex gap-4">
        <Image
          src={icon}
          alt=""
          width={44}
          height={44}
          loading="lazy"
          className="size-11 shrink-0 rounded object-contain p-1"
          style={{ backgroundColor: iconBg ?? "#f5f5f5" }}
        />
        <div className="min-w-0 flex-1">
          <h3 className="mb-3 text-center font-mono text-base font-bold tracking-tight text-ink md:text-lg md:tracking-normal">
            {title}
          </h3>
          <ul className="m-0 list-disc space-y-1.5 pl-5 text-sm leading-snug text-muted">
            {points.map((pt, idx) => (
              <li key={idx}>{pt}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default function ExperienceSection() {
  const { t } = useTranslation();

  return (
    <Section id="experience" eyebrow={t("experience.eyebrow")} title={t("experience.title")}>
      <div className="relative w-full">
        <div
          className="pointer-events-none absolute left-[21px] top-3 bottom-3 hidden w-px bg-accent/35 md:left-1/2 md:block md:-translate-x-1/2"
          aria-hidden
        />

        <ul className="relative m-0 list-none space-y-12 p-0 md:space-y-16">
          {experiences.map((exp, i) => {
            const cardLeft = i % 2 === 0;
            const isLast = i === experiences.length - 1;
            const title = t(`experience.items.${exp.key}.title`);
            const date = t(`experience.items.${exp.key}.date`);
            const points = t(`experience.items.${exp.key}.points`, { returnObjects: true }) as string[];

            return (
              <li key={`${exp.company}-${exp.key}`}>
                {/* Mobile */}
                <div className="flex gap-5 md:hidden">
                  <div className="flex shrink-0 flex-col items-center pt-2">
                    <TimelineDot kind={exp.kind} />
                    {!isLast && (
                      <div className="mt-3 mb-1 min-h-10 w-px flex-1 bg-accent/28" aria-hidden />
                    )}
                  </div>
                  <div className="min-w-0 flex-1 pb-2">
                    <ExperienceCard
                      company={exp.company}
                      title={title}
                      icon={exp.icon}
                      iconBg={exp.iconBg}
                      points={points}
                    />
                    <p className="mt-3 font-mono text-[0.8125rem] text-muted">{date}</p>
                  </div>
                </div>

                {/* Desktop: alternado */}
                <div className="relative hidden md:flex md:flex-row md:items-start md:justify-between md:gap-0">
                  {cardLeft ? (
                    <>
                      <div className="w-[calc(50%-2rem)] shrink-0 pr-8">
                        <ExperienceCard
                          company={exp.company}
                          title={title}
                          icon={exp.icon}
                          iconBg={exp.iconBg}
                          points={points}
                        />
                      </div>
                      <div className="relative flex w-16 shrink-0 justify-center pt-6">
                        <TimelineDot kind={exp.kind} />
                      </div>
                      <div className="flex w-[calc(50%-2rem)] shrink-0 items-start pl-8 pt-8">
                        <p className="m-0 font-mono text-[0.8125rem] text-muted">{date}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex w-[calc(50%-2rem)] shrink-0 justify-end pr-8 pt-8">
                        <p className="m-0 text-right font-mono text-[0.8125rem] text-muted">{date}</p>
                      </div>
                      <div className="relative flex w-16 shrink-0 justify-center pt-6">
                        <TimelineDot kind={exp.kind} />
                      </div>
                      <div className="w-[calc(50%-2rem)] shrink-0 pl-8">
                        <ExperienceCard
                          company={exp.company}
                          title={title}
                          icon={exp.icon}
                          iconBg={exp.iconBg}
                          points={points}
                        />
                      </div>
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
