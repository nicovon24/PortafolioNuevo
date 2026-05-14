"use client";

import Image from "next/image";
import { GraduationCap, Monitor } from "lucide-react";
import { useTranslation } from "react-i18next";
import { experiences } from "@/data/portfolio";
import { cn } from "@/lib/utils";

function TimelineDot({ kind }: { kind: "work" | "study" }) {
  const isWork = kind === "work";
  return (
    <div
      className={cn(
        "relative z-[1] flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-white shadow-[0_4px_14px_rgba(0,0,0,0.25)]",
        isWork ? "bg-accent text-[#08111f]" : "bg-amber-500 text-white",
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
    <article className="rounded-none border border-black/[0.06] bg-white p-5 shadow-[0_18px_42px_-14px_rgba(0,0,0,0.38)] md:p-6">
      <div className="flex gap-4">
        <Image
          src={icon}
          alt={`Logo ${company}`}
          width={44}
          height={44}
          className="size-11 shrink-0 rounded object-contain p-1"
          style={{ backgroundColor: iconBg ?? "#f5f5f5" }}
        />
        <div className="min-w-0 flex-1">
          <h3 className="mb-3 text-center font-mono text-base font-bold tracking-tight text-neutral-900 md:text-lg md:tracking-normal">
            {title}
          </h3>
          <ul className="m-0 list-disc space-y-1.5 pl-5 text-sm leading-snug text-neutral-700">
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
    <section
      id="experience"
      className="w-full px-page py-14 md:py-16 lg:py-[4.25rem]"
    >
      <header className="mb-10 grid max-w-[900px] gap-2 md:mb-11 lg:mb-12">
        <p className="m-0 font-mono text-sm uppercase tracking-[0.08em] text-muted">
          {t("experience.eyebrow")}
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <h2 className="m-0 font-mono text-[clamp(1.65rem,4.2vw,3rem)] leading-tight tracking-normal text-accent">
            {t("experience.title")}
          </h2>
          <span className="hidden h-px min-w-[4rem] flex-1 max-w-[11rem] bg-accent/65 sm:block" aria-hidden />
        </div>
      </header>

      <div className="relative mx-auto max-w-[72rem]">
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
    </section>
  );
}
