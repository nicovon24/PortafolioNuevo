"use client";

import Image from "next/image";
import { ArrowDown, Download, Github, Linkedin, MapPin } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import { useTranslation } from "react-i18next";
import MotionFade from "@/components/motion/MotionFade";
import MotionSlide from "@/components/motion/MotionSlide";
import HeroScrambleName from "@/components/sections/HeroScrambleName";
import HeroRoleCycle from "@/components/sections/HeroRoleCycle";
import HeroTechCarousel from "@/components/sections/HeroTechCarousel";
import { TECH_COLORS, TechIcon, type TechSlug } from "@/components/ui/TechIcon";
import ProfilePhotoToggle, {
  PROFILE_PHOTOS,
  type ProfilePhotoMode,
} from "@/components/ui/ProfilePhotoToggle";
import { useLoaderReady } from "@/components/providers/LoaderProvider";
import { profile } from "@/data/portfolio";

const HERO_CAROUSEL: Array<{ name: string; icon: TechSlug }> = [
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "next" },
  { name: "Angular", icon: "angular" },
  { name: "TypeScript", icon: "ts" },
  { name: "Node.js", icon: "node" },
  { name: "GraphQL", icon: "graphql" },
  { name: "MongoDB", icon: "mongo" },
  { name: "AWS", icon: "aws" },
  { name: "TailwindCSS", icon: "tailwind" },
  { name: "Docker", icon: "docker" },
  { name: "Jira", icon: "jira" },
  { name: "Claude Code", icon: "claude" },
];

const btnPrimary =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-accent bg-accent px-5 font-mono text-sm font-bold uppercase tracking-wider text-accent-contrast shadow-[0_0_24px_color-mix(in_srgb,var(--color-accent)_18%,transparent)] transition-colors hover:border-accent-2 hover:bg-accent-2";

const btnSecondary =
  "control-surface inline-flex min-h-10 items-center justify-center gap-2 rounded-full border px-5 font-mono text-sm font-bold uppercase tracking-wider text-muted transition-colors hover:border-accent hover:bg-accent/8 hover:text-accent";

const iconBtn =
  "control-surface grid size-9 place-items-center rounded-full border text-accent transition-colors hover:border-accent-2 hover:bg-accent-2/12 hover:text-accent-2";

const nameLine2Class =
  "font-display font-bold text-accent text-[clamp(2.35rem,calc(1rem+5.85vw),4.65rem)] leading-[0.92] [text-shadow:0_0_30px_color-mix(in_srgb,var(--color-accent)_35%,transparent)]";

const nameLine2ScrambleClass =
  "font-display font-bold text-accent-2 text-[clamp(2.35rem,calc(1rem+5.85vw),4.65rem)] leading-[0.92] [text-shadow:0_0_30px_color-mix(in_srgb,var(--color-accent-2)_30%,transparent)]";

const hudRow =
  "m-0 flex flex-wrap justify-end gap-x-1 font-mono text-micro leading-snug";
const hudKey =
  "shrink-0 uppercase tracking-[0.2em] text-muted";
const hudValMuted =
  "text-right font-semibold uppercase tracking-[0.14em] text-muted";
const hudValAccent =
  "text-right font-semibold uppercase tracking-[0.14em] text-accent";

const HERO_TAGS = ["Fullstack", "Frontend", "Backend", "Dashboards"] as const;

// Etapas de entrada del hero tras el loader. Cada bloque arranca donde el
// anterior ya se leyo, para que el contenido aparezca por partes y no de golpe.
const STAGE_TEXT = 0.05;
const STAGE_PHOTO = 0.3;
const STAGE_HUD = 0.65;
const STAGE_STATS = 0.9;

const heroHudListVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: STAGE_HUD },
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
    transition: { staggerChildren: 0.16, delayChildren: STAGE_STATS },
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
      <span className="max-w-[5.5rem] text-center font-mono text-micro font-semibold uppercase leading-tight tracking-[0.14em] text-muted ">
        {label}
      </span>
      <div
        className="hero-ring-stat control-surface-strong relative grid size-[4.35rem] place-items-center rounded-full border-2 border-dashed border-accent/75 shadow-[0_0_28px_color-mix(in_srgb,var(--color-accent)_18%,transparent),inset_0_0_20px_color-mix(in_srgb,var(--color-accent)_8%,transparent)] backdrop-blur-sm sm:size-[4.85rem]"
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
  // El hero es lo primero en pantalla: sin esta guarda su entrada se consume
  // detras del loader y al levantarse ya esta todo quieto.
  const ready = useLoaderReady();

  const github = profile.socials.find((s) => s.label === "GitHub")!;
  const linkedin = profile.socials.find((s) => s.label === "LinkedIn")!;
  const cv = profile.socials.find((s) => s.label === "CV")!;

  const [isScrambling, setIsScrambling] = useState(false);
  const [badgeGlitch, setBadgeGlitch] = useState(false);
  const [photoMode, setPhotoMode] = useState<ProfilePhotoMode>("work");
  // Que modos ya terminaron de cargar al menos una vez. Al volver a un modo
  // ya visto (ida y vuelta del toggle) no vuelve a mostrar el skeleton.
  const [loadedModes, setLoadedModes] = useState<Partial<Record<ProfilePhotoMode, true>>>({});
  const photoLoaded = Boolean(loadedModes[photoMode]);

  // Acotado al hero: useScroll() global mantiene la suscripcion viva con la seccion fuera de pantalla.
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  // El bloque global de prefers-reduced-motion en CSS no frena transforms de framer-motion.
  const photoParallaxY = useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 55]);

  const handleScrambleChange = useCallback((active: boolean) => {
    setIsScrambling(active);
    if (active) {
      setBadgeGlitch(true);
    } else {
      setTimeout(() => setBadgeGlitch(false), 500);
    }
  }, []);

  // Solo el nombre de pila queda grande/scrambleado ("Hola, soy Nicolás"); el apellido
  // completo sigue disponible en el resto de la UI (footer, meta, aria-label, etc.).
  const heroFirstName = profile.heroFirstName;

  return (
    <section
      ref={sectionRef}
      id="top"
      className="section-bg-surface relative flex w-full flex-col items-start overflow-hidden px-page pb-12 pt-28 sm:pb-14 sm:pt-30 lg:min-h-screen lg:pb-28 lg:pt-28"
    >
      {/* Los HUD se alinean al contenedor centrado, no al borde de la pantalla:
          anclados a right-page quedaban fuera del shell y descentraban el hero. */}
      <div className="pointer-events-none absolute inset-x-page top-0 bottom-0 z-[2] mx-auto hidden max-w-shell lg:block">
      <aside
        className="pointer-events-none absolute right-0 top-[7.5rem] max-w-[14rem] text-right lg:top-[8.5rem]"
        aria-label={t("hero.profileSummary")}
      >
        <motion.div
          className="space-y-1.5"
          variants={heroHudListVariants}
          initial="hidden"
          animate={ready ? "visible" : "hidden"}
        >
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
          <motion.p className={hudRow} variants={heroHudRowVariants}>
            <span className={hudKey}>{t("hero.eduKey")}</span>
            <span className={hudValMuted}>{t("hero.eduVal")}</span>
          </motion.p>
        </motion.div>
      </aside>

      <motion.aside
        className="pointer-events-none absolute bottom-[4.25rem] right-0 hidden gap-8 sm:bottom-10 sm:gap-10 lg:flex"
        aria-label={t("hero.statsLabel")}
        variants={heroStatsListVariants}
        initial="hidden"
        animate={ready ? "visible" : "hidden"}
      >
        <motion.div variants={heroStatItemVariants}>
          <HeroRingStat label={t("hero.experienceStat")} value="3+" />
        </motion.div>
        <motion.div variants={heroStatItemVariants}>
          <HeroRingStat label={t("hero.projectsStat")} value="12+" />
        </motion.div>
      </motion.aside>
      </div>

      {/* Flex row at lg+: text left, photo right. Stacked below lg so the photo doesn't get cramped on tablets. */}
      <div className="relative z-0 mx-auto flex w-full min-w-0 max-w-[68rem] flex-col justify-start pt-1 text-left lg:flex-1 lg:-translate-y-2 lg:flex-row lg:items-center lg:justify-center lg:gap-10 lg:pt-0 xl:gap-12">

        {/* ── TEXT (DOM first → above on tablet/mobile / left on desktop) ── */}
        <div className="min-w-0 flex-1 lg:max-w-[38rem] xl:max-w-[44rem]">
          <MotionSlide direction="left" delay={STAGE_TEXT}>
            <div className="mb-5 flex flex-wrap items-center gap-2 font-mono text-micro font-bold tracking-[0.12em] sm:text-mini">
              <span
                className={`inline-flex w-fit shrink-0 items-center gap-2 rounded-full px-3 py-1 uppercase transition-colors duration-300 ${
                  badgeGlitch
                    ? "border border-accent-2/40 bg-accent-2/[0.07] text-accent-2"
                    : "border border-accent/40 bg-accent/[0.07] text-accent"
                }`}
              >
                <span className="relative flex h-2 w-2 shrink-0" aria-hidden>
                  <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-35 transition-colors duration-300 ${badgeGlitch ? "bg-accent-2" : "bg-accent"}`} />
                  <span className={`relative m-auto inline-flex h-[5px] w-[5px] rounded-full transition-all duration-300 ${badgeGlitch ? "bg-accent-2 shadow-[0_0_8px_color-mix(in_srgb,var(--color-accent-2)_85%,transparent)]" : "bg-accent shadow-[0_0_8px_color-mix(in_srgb,var(--color-accent)_85%,transparent)]"}`} />
                </span>
                {t("hero.available")}
              </span>
              <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-line px-3 py-1 text-muted">
                <MapPin size={11} aria-hidden />
                {t("hero.location")}
              </span>
            </div>
            <p className="m-0 font-sans text-[clamp(1.15rem,1rem+0.6vw,1.5rem)] font-semibold text-muted">
              {t("hero.greeting")}
            </p>
            <HeroScrambleName
              firstName={heroFirstName}
              lastName=""
              line1Class={nameLine2Class}
              line2Class={nameLine2Class}
              line2ScrambleClass={nameLine2ScrambleClass}
              onScrambleChange={handleScrambleChange}
            />
            <div className="mt-4 min-h-[1.5em] font-mono text-[clamp(0.75rem,0.65rem+0.6vw,0.95rem)] font-semibold text-muted">
              <span className="text-accent">&gt;</span> <HeroRoleCycle className="text-muted" />
            </div>
          </MotionSlide>
          <MotionFade delay={STAGE_TEXT + 0.18}>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label={t("hero.stackFocus")}>
              {HERO_TAGS.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-accent/25 bg-accent/[0.05] px-3 py-1.5 font-mono text-micro font-semibold uppercase tracking-[0.1em] text-accent/90 sm:text-mini"
                >
                  {tag}
                </li>
              ))}
            </ul>
          </MotionFade>
          <MotionFade delay={STAGE_TEXT + 0.3}>
            <p className="mt-5 font-sans text-[0.8rem] leading-relaxed text-muted sm:mt-6 sm:text-[0.95rem]">
              {t("hero.intro")}
            </p>
          </MotionFade>
          <MotionFade delay={STAGE_TEXT + 0.42} className="mt-6 flex flex-col gap-3 sm:mt-8">
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
          <MotionFade delay={STAGE_TEXT + 0.56} className="mt-6 sm:mt-8">
            <div
              className="hero-tech-mask group/hero-tech relative w-full overflow-x-clip overflow-y-visible py-3"
              aria-label={t("gallery.techCarousel")}
              role="region"
            >
              <HeroTechCarousel>
                {[...HERO_CAROUSEL, ...HERO_CAROUSEL].map((item, i) => {
                  const isEven = (i % HERO_CAROUSEL.length) % 2 === 0;
                  return (
                  <li
                    key={`${item.name}-${i}`}
                    className={`tech-surface-card group/hero-tech-item flex w-[5.75rem] shrink-0 flex-col items-center justify-center gap-1.5 rounded-lg border border-line/70 bg-panel-strong px-2 py-2.5 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 sm:w-[6.25rem] ${
                      isEven
                        ? "hover:border-accent hover:bg-accent/4 hover:shadow-[0_0_0_1px_color-mix(in_srgb,var(--color-accent)_40%,transparent)_inset,0_0_18px_color-mix(in_srgb,var(--color-accent)_22%,transparent)]"
                        : "hover:border-accent-2 hover:bg-accent-2/4 hover:shadow-[0_0_0_1px_color-mix(in_srgb,var(--color-accent-2)_40%,transparent)_inset,0_0_18px_color-mix(in_srgb,var(--color-accent-2)_22%,transparent)]"
                    }`}
                    aria-hidden={i >= HERO_CAROUSEL.length ? true : undefined}
                  >
                    <TechIcon
                      name={item.icon}
                      className="size-6 opacity-90 transition-[opacity,transform] duration-200 group-hover/hero-tech-item:scale-110 group-hover/hero-tech-item:opacity-100"
                      style={{ color: TECH_COLORS[item.icon] }}
                    />
                    <span className={`block w-full truncate text-center font-mono text-micro font-semibold uppercase tracking-[0.08em] text-muted transition-colors duration-200 sm:text-micro ${
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
          className="flex cursor-pointer flex-col items-center gap-4 pt-6 lg:order-2 lg:ml-auto lg:shrink-0 lg:pt-0"
          style={{ y: photoParallaxY }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.7, delay: STAGE_PHOTO, ease: [0.22, 1, 0.36, 1] }}
          // Una sacudida por hover. Antes era repeat: Infinity mientras el mouse estuviera encima.
          whileHover={{
            x: [0, 8, -8, 6, -6, 3, 0],
            transition: { duration: 1.4, ease: "easeInOut" },
          }}
        >
          <div
            className="relative size-[14rem] sm:size-[16rem] md:size-[18rem] lg:size-[22rem] xl:size-[26rem]"
            aria-hidden="false"
          >
            {/* Unico elemento de color alrededor de la foto: borde solido
                accent + sombra difusa (glow). Sin gradiente, sin rotacion:
                no depende de un padding-trick que se rompa si falta un bg. */}
            <div className="absolute inset-0 rounded-full">
              <div
                className="relative size-full overflow-hidden rounded-full bg-background-deep transition-shadow duration-500"
                style={{
                  boxShadow: isScrambling
                    ? "0 0 0 2.5px var(--color-accent-2), 0 0 32px color-mix(in srgb, var(--color-accent-2) 35%, transparent), 0 0 64px color-mix(in srgb, var(--color-accent-2) 15%, transparent), 0 18px 40px rgba(0, 0, 0, 0.35)"
                    : "0 0 0 2.5px var(--color-accent), 0 0 32px color-mix(in srgb, var(--color-accent) 35%, transparent), 0 0 64px color-mix(in srgb, var(--color-accent) 15%, transparent), 0 18px 40px rgba(0, 0, 0, 0.35)",
                }}
              >
                {/* Skeleton debajo de la foto: se tapa apenas la imagen
                    actual termina de cargar (la primera vez que se ve). */}
                {!photoLoaded && (
                  <Skeleton className="absolute inset-0 rounded-full" />
                )}

                {/* Una sola capa, siempre montada. Si el modo ya se cargo
                    antes queda opaca de entrada (sin parpadeo al ir y volver
                    en el toggle); si es la primera vez, hace fade + escala. */}
                <Image
                  key={photoMode}
                  src={PROFILE_PHOTOS[photoMode]}
                  alt={profile.name}
                  fill
                  sizes="(min-width: 1280px) 26rem, (min-width: 1024px) 22rem, (min-width: 768px) 18rem, (min-width: 640px) 16rem, 14rem"
                  className={`object-cover transition-[opacity,transform] duration-500 ease-out ${
                    photoMode === "work" ? "object-[56%_45%]" : "object-[center_30%]"
                  } ${photoLoaded ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"}`}
                  priority
                  onLoad={() =>
                    setLoadedModes((prev) => ({ ...prev, [photoMode]: true }))
                  }
                />
              </div>
            </div>
          </div>
          <ProfilePhotoToggle mode={photoMode} onChange={setPhotoMode} />
        </motion.div>
      </div>

    </section>
  );
}
