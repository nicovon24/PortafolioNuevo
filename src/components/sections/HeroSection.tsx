"use client";

import { ArrowDown, Download, Github, Linkedin } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { useTranslation } from "react-i18next";
import MotionFade from "@/components/motion/MotionFade";
import MotionSlide from "@/components/motion/MotionSlide";
import HeroScrambleName from "@/components/sections/HeroScrambleName";
import HeroRoleCycle from "@/components/sections/HeroRoleCycle";
import { profile } from "@/data/portfolio";

const btnPrimary =
  "inline-flex min-h-10 items-center justify-center gap-2 border border-accent bg-accent px-3.5 font-mono text-sm font-bold uppercase tracking-wider text-background-deep shadow-[0_0_0_1px_rgba(100,255,218,0.35)_inset,0_0_24px_rgba(100,255,218,0.12)] transition-colors hover:border-accent-2 hover:bg-[rgba(255,105,180,0.12)] hover:text-accent-2";

const btnSecondary =
  "inline-flex min-h-10 items-center justify-center gap-2 border border-line bg-transparent px-3.5 font-mono text-sm font-bold uppercase tracking-wider text-muted transition-colors hover:border-accent hover:text-accent";

const iconBtn =
  "grid size-9 place-items-center border border-line bg-[rgba(8,17,31,0.88)] text-accent transition-colors hover:border-accent-2 hover:bg-[rgba(255,105,180,0.12)] hover:text-accent-2";

const nameLine1Class =
  "leading-[0.95] text-ink text-[clamp(2.05rem,calc(0.88rem+5.2vw),4rem)]";

const nameLine2Class =
  "bg-gradient-to-b from-accent via-accent to-[#3edcc4] bg-clip-text text-[clamp(2.35rem,calc(1rem+5.85vw),4.65rem)] leading-[0.92] text-transparent drop-shadow-[0_0_22px_rgba(100,255,218,0.2)] [-webkit-text-fill-color:transparent]";

const hudRow =
  "m-0 flex flex-wrap justify-end gap-x-1 font-mono text-[0.55rem] leading-snug sm:text-[0.6rem]";
const hudKey =
  "shrink-0 uppercase tracking-[0.2em] text-muted/55";
const hudValMuted =
  "text-right font-semibold uppercase tracking-[0.14em] text-muted/55";
const hudValAccent =
  "text-right font-semibold uppercase tracking-[0.14em] text-accent";

const HERO_TAGS = ["IoT", "Sports tech", "Dashboards"] as const;

const heroHudViewport = { once: true as const, margin: "-80px" as const };

const heroHudListVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.14 },
  },
};

const heroHudRowVariants: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const heroStatsListVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.16, delayChildren: 0.22 },
  },
};

const heroStatItemVariants: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

function HeroRingStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="max-w-[5.5rem] text-center font-mono text-[0.58rem] font-semibold uppercase leading-tight tracking-[0.14em] text-muted/70 sm:text-[0.6rem]">
        {label}
      </span>
      <div
        className="relative grid size-[4.35rem] place-items-center rounded-full border-2 border-dashed border-accent/75 bg-[rgba(8,17,31,0.75)] shadow-[0_0_28px_rgba(100,255,218,0.12),inset_0_0_20px_rgba(100,255,218,0.06)] sm:size-[4.85rem]"
        aria-hidden
      >
        <div className="pointer-events-none absolute inset-0 rounded-full border border-accent/20" />
        <span className="relative font-mono text-[clamp(1rem,2.4vw,1.25rem)] font-bold tabular-nums text-accent">{value}</span>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const { t } = useTranslation();

  const github = profile.socials.find((s) => s.label === "GitHub")!;
  const linkedin = profile.socials.find((s) => s.label === "LinkedIn")!;
  const cv = profile.socials.find((s) => s.label === "CV")!;

  const nameParts = profile.name.trim().split(/\s+/);
  const heroFirstName = nameParts[0] ?? profile.name;
  const heroLastName = nameParts.slice(1).join(" ") || "";

  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full flex-col items-start overflow-hidden px-page pb-32 pt-[4.5rem] max-lg:pt-[4.75rem] sm:pb-36 sm:pt-20 lg:pt-24"
    >
      <aside
        className="pointer-events-none absolute right-1 z-[2] hidden max-w-[14rem] text-right sm:right-2 md:block md:right-3 lg:right-4 top-[5.75rem] lg:top-[6.75rem]"
        aria-label={t("hero.profileSummary")}
      >
        <motion.div
          className="space-y-1.5"
          variants={heroHudListVariants}
          initial="hidden"
          whileInView="visible"
          viewport={heroHudViewport}
        >
          <motion.p className={hudRow} variants={heroHudRowVariants}>
            <span className={hudKey}>{t("hero.locKey")}</span>
            <span className={hudValMuted}>{t("hero.locVal")}</span>
          </motion.p>
          <motion.p className={hudRow} variants={heroHudRowVariants}>
            <span className={hudKey}>{t("hero.stackKey")}</span>
            <span className={hudValMuted}>{t("hero.stackVal")}</span>
          </motion.p>
          <motion.p className={hudRow} variants={heroHudRowVariants}>
            <span className={hudKey}>{t("hero.roleKey")}</span>
            <span className={hudValMuted}>{t("hero.roleVal")}</span>
          </motion.p>
          <motion.p className={hudRow} variants={heroHudRowVariants}>
            <span className={hudKey}>{t("hero.statusKey")}</span>
            <span className={hudValAccent}>{t("hero.statusVal")}</span>
          </motion.p>
        </motion.div>
      </aside>

      <div className="relative z-0 flex w-full max-w-[56rem] flex-1 flex-col justify-center text-left lg:max-w-[64rem] xl:max-w-[70rem]">
        <div>
          <MotionSlide direction="left">
            <HeroScrambleName
              firstName={heroFirstName}
              lastName={heroLastName}
              line1Class={nameLine1Class}
              line2Class={nameLine2Class}
            />
            <div className="mt-4 flex w-full max-w-3xl flex-col gap-3 font-mono text-[clamp(0.65rem,0.55rem+1vw,0.78rem)] font-semibold uppercase tracking-[0.14em] text-muted sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div className="min-h-[1.5em] min-w-0 flex-1 sm:mr-2">
                <HeroRoleCycle className="text-muted" />
              </div>
              <span
                className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-accent/40 bg-accent/[0.07] px-3 py-1 text-[0.62rem] font-bold tracking-[0.12em] text-accent sm:text-[0.65rem]"
                title={t("hero.available")}
              >
                <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-35" />
                  <span className="relative m-auto inline-flex h-[5px] w-[5px] rounded-full bg-accent shadow-[0_0_8px_rgba(100,255,218,0.85)]" />
                </span>
                {t("hero.available")}
              </span>
            </div>
          </MotionSlide>
          <MotionFade delay={0.08}>
            <ul
              className="mt-6 flex max-w-3xl flex-wrap gap-2"
              aria-label={t("hero.stackFocus")}
            >
              {HERO_TAGS.map((tag) => (
                <li
                  key={tag}
                  className="rounded border border-accent/25 bg-accent/[0.05] px-3 py-1.5 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-accent/90 sm:text-[0.65rem]"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </MotionFade>
          <MotionFade delay={0.1}>
            <p className="mt-5 max-w-3xl font-sans text-[0.8rem] leading-relaxed text-muted sm:mt-6 sm:text-[0.95rem]">
              {t("hero.intro")}
            </p>
          </MotionFade>
          <MotionFade delay={0.2} className="mt-6 flex flex-col gap-3 sm:mt-8">
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <a className={btnPrimary} href="#projects">
                {t("hero.viewProjects")} <ArrowDown size={16} />
              </a>
              <a className={btnSecondary} href={cv.href} target="_blank" rel="noreferrer">
                {t("hero.cv")} <Download size={16} />
              </a>
            </div>
            <div className="flex flex-wrap gap-2 border-t border-line/40 pt-4">
              <a href={github.href} target="_blank" rel="noreferrer" aria-label="GitHub" className={iconBtn}>
                <Github size={17} />
              </a>
              <a href={linkedin.href} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={iconBtn}>
                <Linkedin size={17} />
              </a>
            </div>
          </MotionFade>
        </div>
      </div>

      <motion.aside
        className="pointer-events-none absolute bottom-[4.25rem] right-1 z-[2] flex gap-8 sm:bottom-10 sm:right-2 sm:gap-10 md:right-3 lg:right-4"
        aria-label={t("hero.statsLabel")}
        variants={heroStatsListVariants}
        initial="hidden"
        whileInView="visible"
        viewport={heroHudViewport}
      >
        <motion.div variants={heroStatItemVariants}>
          <HeroRingStat label={t("hero.experienceStat")} value="3+" />
        </motion.div>
        <motion.div variants={heroStatItemVariants}>
          <HeroRingStat label={t("hero.projectsStat")} value="12+" />
        </motion.div>
      </motion.aside>
    </section>
  );
}
