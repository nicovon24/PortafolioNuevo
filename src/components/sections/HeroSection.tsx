"use client";

import Image from "next/image";
import { ArrowDown, Download, Github, Linkedin } from "lucide-react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useCallback, useState } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import { useTranslation } from "react-i18next";
import MotionFade from "@/components/motion/MotionFade";
import MotionSlide from "@/components/motion/MotionSlide";
import HeroScrambleName from "@/components/sections/HeroScrambleName";
import HeroRoleCycle from "@/components/sections/HeroRoleCycle";
import HeroTechCarousel from "@/components/sections/HeroTechCarousel";
import { profile } from "@/data/portfolio";

const HERO_CAROUSEL: Array<{ name: string; icon: string }> = [
  { name: "React", icon: "/images/svg/react.svg" },
  { name: "Next.js", icon: "/images/svg/next.svg" },
  { name: "Angular", icon: "/images/svg/angular.svg" },
  { name: "TypeScript", icon: "/images/svg/ts.svg" },
  { name: "Node.js", icon: "/images/svg/node.svg" },
  { name: "GraphQL", icon: "/images/svg/graphql.svg" },
  { name: "MongoDB", icon: "/images/svg/mongo.svg" },
  { name: "AWS", icon: "/images/svg/aws.svg" },
  { name: "TailwindCSS", icon: "/images/svg/tailwind.svg" },
  { name: "Docker", icon: "/images/svg/docker.svg" },
  { name: "Jira", icon: "/images/svg/jira.svg" },
  { name: "Claude Code", icon: "/images/svg/claude.svg" },
];

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

const nameLine2ScrambleClass =
  "bg-gradient-to-b from-accent-2 via-accent-2 to-[#ff85c0] bg-clip-text text-[clamp(2.35rem,calc(1rem+5.85vw),4.65rem)] leading-[0.92] text-transparent drop-shadow-[0_0_22px_rgba(255,105,180,0.25)] [-webkit-text-fill-color:transparent]";

const hudRow =
  "m-0 flex flex-wrap justify-end gap-x-1 font-mono text-[0.55rem] leading-snug sm:text-[0.6rem]";
const hudKey =
  "shrink-0 uppercase tracking-[0.2em] text-muted/55";
const hudValMuted =
  "text-right font-semibold uppercase tracking-[0.14em] text-muted/55";
const hudValAccent =
  "text-right font-semibold uppercase tracking-[0.14em] text-accent";

const HERO_TAGS = ["Fullstack", "Frontend", "Backend", "Dashboards"] as const;

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
      <span className="max-w-[5.5rem] text-center font-mono text-[0.58rem] font-semibold uppercase leading-tight tracking-[0.14em] text-muted/85 sm:text-[0.6rem]">
        {label}
      </span>
      <div
        className="relative grid size-[4.35rem] place-items-center rounded-full border-2 border-dashed border-accent/75 bg-[rgba(8,17,31,0.85)] shadow-[0_0_28px_rgba(100,255,218,0.18),inset_0_0_20px_rgba(100,255,218,0.08)] backdrop-blur-sm sm:size-[4.85rem]"
        aria-hidden
      >
        <div className="pointer-events-none absolute inset-0 rounded-full border border-accent/25" />
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

  const [isScrambling, setIsScrambling] = useState(false);
  const [badgeGlitch, setBadgeGlitch] = useState(false);
  const [photoLoaded, setPhotoLoaded] = useState(false);

  const { scrollY } = useScroll();
  const photoParallaxY = useTransform(scrollY, [0, 600], [0, 55]);
  const handleScrambleChange = useCallback((active: boolean) => {
    setIsScrambling(active);
    if (active) {
      setBadgeGlitch(true);
    } else {
      setTimeout(() => setBadgeGlitch(false), 500);
    }
  }, []);

  const nameParts = profile.name.trim().split(/\s+/);
  const heroFirstName = nameParts[0] ?? profile.name;
  const heroLastName = nameParts.slice(1).join(" ") || "";

  return (
    <section
      id="top"
      className="relative flex w-full flex-col items-start overflow-hidden px-page pb-12 pt-28 sm:pb-14 sm:pt-32 lg:min-h-screen lg:pb-36 lg:pt-24"
    >
      <aside
        className="pointer-events-none absolute right-page top-[5.75rem] z-[2] hidden max-w-[14rem] text-right lg:top-[6.75rem] lg:block"
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

      {/* Flex row at lg+: text left, photo right. Stacked below lg so the photo doesn't get cramped on tablets. */}
      <div className="relative z-0 mx-auto flex w-full min-w-0 max-w-[84rem] flex-col justify-start pt-1 text-left lg:flex-1 lg:flex-row lg:items-center lg:justify-center lg:gap-10 lg:pt-0 xl:gap-12">

        {/* ── TEXT (DOM first → above on tablet/mobile / left on desktop) ── */}
        <div className="min-w-0 flex-1 lg:max-w-[38rem] xl:max-w-[44rem]">
          <MotionSlide direction="left">
            <HeroScrambleName
              firstName={heroFirstName}
              lastName={heroLastName}
              line1Class={nameLine1Class}
              line2Class={nameLine2Class}
              line2ScrambleClass={nameLine2ScrambleClass}
              onScrambleChange={handleScrambleChange}
            />
            <div className="mt-4 flex w-full flex-col gap-3 font-mono text-[clamp(0.65rem,0.55rem+1vw,0.78rem)] font-semibold uppercase tracking-[0.14em] text-muted sm:flex-row sm:items-center sm:justify-between sm:gap-4">
              <div className="min-h-[1.5em] min-w-0 flex-1 sm:mr-2">
                <HeroRoleCycle className="text-muted" />
              </div>
              <span
                className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-full px-3 py-1 text-[0.62rem] font-bold tracking-[0.12em] transition-colors duration-300 sm:text-[0.65rem] ${
                  badgeGlitch
                    ? "border border-accent-2/40 bg-accent-2/[0.07] text-accent-2"
                    : "border border-accent/40 bg-accent/[0.07] text-accent"
                }`}
              >
                <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
                  <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-35 transition-colors duration-300 ${badgeGlitch ? "bg-accent-2" : "bg-accent"}`} />
                  <span className={`relative m-auto inline-flex h-[5px] w-[5px] rounded-full transition-all duration-300 ${badgeGlitch ? "bg-accent-2 shadow-[0_0_8px_rgba(255,105,180,0.85)]" : "bg-accent shadow-[0_0_8px_rgba(100,255,218,0.85)]"}`} />
                </span>
                {t("hero.available")}
              </span>
            </div>
          </MotionSlide>
          <MotionFade delay={0.08}>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label={t("hero.stackFocus")}>
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
            <p className="mt-5 font-sans text-[0.8rem] leading-relaxed text-muted sm:mt-6 sm:text-[0.95rem]">
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
          <MotionFade delay={0.28} className="mt-6 sm:mt-8">
            <div
              className="hero-tech-mask group/hero-tech relative w-full overflow-x-clip overflow-y-visible py-3"
              aria-label="Tech and tools carousel"
              role="region"
            >
              <HeroTechCarousel>
                {[...HERO_CAROUSEL, ...HERO_CAROUSEL].map((item, i) => {
                  const isEven = (i % HERO_CAROUSEL.length) % 2 === 0;
                  return (
                  <li
                    key={`${item.name}-${i}`}
                    className={`group/hero-tech-item flex w-[5.75rem] shrink-0 flex-col items-center justify-center gap-1.5 rounded-lg border border-line/70 bg-[rgba(8,17,31,0.7)] px-2 py-2.5 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 sm:w-[6.25rem] ${
                      isEven
                        ? "hover:border-accent hover:bg-[rgba(100,255,218,0.06)] hover:shadow-[0_0_0_1px_rgba(100,255,218,0.4)_inset,0_0_18px_rgba(100,255,218,0.22)]"
                        : "hover:border-accent-2 hover:bg-[rgba(255,105,180,0.06)] hover:shadow-[0_0_0_1px_rgba(255,105,180,0.4)_inset,0_0_18px_rgba(255,105,180,0.22)]"
                    }`}
                    aria-hidden={i >= HERO_CAROUSEL.length ? true : undefined}
                  >
                    <Image
                      src={item.icon}
                      alt=""
                      width={24}
                      height={24}
                      className={`size-6 object-contain opacity-90 transition-all duration-200 group-hover/hero-tech-item:opacity-100 ${
                        isEven ? "hero-tech-icon-even" : "hero-tech-icon-odd"
                      }`}
                    />
                    <span className={`block w-full truncate text-center font-mono text-[0.58rem] font-semibold uppercase tracking-[0.08em] text-muted transition-colors duration-200 sm:text-[0.62rem] ${
                      isEven ? "group-hover/hero-tech-item:text-accent" : "group-hover/hero-tech-item:text-accent-2"
                    }`}>
                      {item.name}
                    </span>
                  </li>
                );
                })}
              </HeroTechCarousel>
            </div>
          </MotionFade>
        </div>

        {/* ── PHOTO (DOM last → below carousel on tablet/mobile / right on desktop) ── */}
        <motion.div
          className="flex cursor-pointer justify-center pt-6 lg:order-2 lg:ml-auto lg:shrink-0 lg:pt-0"
          style={{ y: photoParallaxY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{
            x: [0, 8, -8, 6, -6, 3, 0],
            transition: { duration: 1.4, ease: "easeInOut", repeat: Infinity, repeatType: "loop" },
          }}
        >
          <div
            className="relative size-[14rem] sm:size-[16rem] md:size-[18rem] lg:size-[22rem] xl:size-[26rem]"
            aria-hidden="false"
          >
            <span
              className={`pointer-events-none absolute -inset-4 rounded-full blur-3xl transition-colors duration-500 ${isScrambling ? "bg-accent-2/10" : "bg-accent/15"}`}
              aria-hidden
            />
            <span className="pointer-events-none absolute inset-0 animate-pulse rounded-full ring-1 ring-accent/25" aria-hidden />
            <div className={`photo-border-ring absolute inset-0 ${isScrambling ? "photo-border-ring--glitch" : ""}`}>
              <div
                className="relative size-full overflow-hidden rounded-full transition-shadow duration-500"
                style={{
                  boxShadow: isScrambling
                    ? "0 0 0 3px rgba(8,17,31,0.85), 0 0 32px rgba(255,105,180,0.22), 0 0 80px rgba(255,105,180,0.08), inset 0 0 36px rgba(255,105,180,0.07)"
                    : "0 0 0 3px rgba(8,17,31,0.85), 0 0 32px rgba(100,255,218,0.45), 0 0 80px rgba(100,255,218,0.18), inset 0 0 36px rgba(100,255,218,0.12)",
                }}
              >
                {!photoLoaded && (
                  <Skeleton className="absolute inset-0 rounded-full" />
                )}
                <Image
                  src="/images/profile/profile.png"
                  alt={profile.name}
                  fill
                  sizes="(min-width: 1280px) 26rem, (min-width: 1024px) 22rem, (min-width: 768px) 18rem, (min-width: 640px) 16rem, 14rem"
                  className={`object-cover object-[center_18%] transition-opacity duration-500 ${photoLoaded ? "opacity-100" : "opacity-0"}`}
                  priority
                  onLoad={() => setPhotoLoaded(true)}
                />
                <span
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(100,255,218,0.08),transparent_60%),linear-gradient(180deg,rgba(8,17,31,0.05)_0%,rgba(8,17,31,0.55)_100%)]"
                  aria-hidden
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.aside
        className="pointer-events-none absolute bottom-[4.25rem] right-page z-[2] hidden gap-8 sm:bottom-10 sm:gap-10 lg:flex"
        aria-label={t("hero.statsLabel")}
        variants={heroStatsListVariants}
        initial="hidden"
        whileInView="visible"
        viewport={heroHudViewport}
      >
        <motion.div variants={heroStatItemVariants}>
          <HeroRingStat label={t("hero.experienceStat")} value="4+" />
        </motion.div>
        <motion.div variants={heroStatItemVariants}>
          <HeroRingStat label={t("hero.projectsStat")} value="12+" />
        </motion.div>
      </motion.aside>
    </section>
  );
}
