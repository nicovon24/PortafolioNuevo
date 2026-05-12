import Image from "next/image";
import { ArrowDown, Download, Github, Linkedin } from "lucide-react";
import MotionFade from "@/components/motion/MotionFade";
import MotionSlide from "@/components/motion/MotionSlide";
import { profile } from "@/data/portfolio";

const btnPrimary =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-accent bg-accent px-3.5 text-sm font-bold text-background-deep transition-colors hover:border-accent-2 hover:bg-[rgba(255,105,180,0.12)] hover:text-accent-2";

const btnSecondary =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-line bg-[rgba(100,255,218,0.06)] px-3.5 text-sm font-bold text-accent transition-colors hover:border-accent-2 hover:bg-[rgba(255,105,180,0.12)] hover:text-accent-2";

export default function HeroSection() {
  return (
    <section id="top" className="flex min-h-screen w-full flex-col overflow-hidden px-page pb-6 pt-16 max-lg:pt-[4.75rem] lg:pt-20">
      <div className="grid flex-1 grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1.05fr)_auto] lg:items-center lg:gap-12">
        <div>
          <MotionSlide direction="left">
            <p className="m-0 mb-2.5 font-mono text-xs font-semibold tracking-wide text-accent sm:text-sm">{profile.location}</p>
            <h1 className="m-0 grid max-w-[22ch] font-mono text-[clamp(1.65rem,calc(0.45rem+3.2vw),2.65rem)] leading-[1.02] tracking-tight sm:max-w-none">
              <span>{profile.roleFirst}</span>
              <span className="text-transparent [-webkit-text-stroke:1.25px_var(--color-accent)]">{profile.roleSecond}</span>
            </h1>
          </MotionSlide>
          <MotionFade delay={0.1}>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted sm:text-[0.95rem] lg:max-w-lg">{profile.intro}</p>
          </MotionFade>
          <MotionFade delay={0.2} className="mt-5 flex flex-wrap gap-2.5 sm:mt-6 sm:gap-3">
            <a className={btnPrimary} href="#projects">
              Ver proyectos <ArrowDown size={16} />
            </a>
            <a className={btnSecondary} href="/pdf/CV Nicolas Von Muhlinen Spanish.pdf" target="_blank">
              Descargar CV <Download size={16} />
            </a>
          </MotionFade>
        </div>
        <MotionSlide direction="right" className="flex w-full justify-center lg:justify-end">
          <div className="relative shrink-0">
            {/* Retrato único en hero (la otra imagen del duo se quitó) */}
            <div
              className="relative mx-auto aspect-[9/16] max-h-[min(60vh,42rem)] w-[min(15rem,82vw)] max-w-[248px] overflow-hidden rounded-2xl border border-[rgba(100,255,218,0.4)] bg-canvas shadow-[0_20px_48px_rgba(0,0,0,0.4)] sm:rounded-[22px]"
            >
              <Image
                src="/images/new-me/IMG_4939.JPEG"
                alt={profile.name}
                fill
                sizes="(max-width:1024px) 240px, 260px"
                priority
                style={{ objectFit: "cover", objectPosition: "center 22%" }}
              />
            </div>
            <div className="absolute bottom-1 right-0 z-10 flex gap-2 sm:bottom-2">
            <a
              href={profile.socials[0].href}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="grid size-9 place-items-center rounded-full border border-line bg-[rgba(8,17,31,0.88)] text-accent"
            >
              <Github size={17} />
            </a>
            <a
              href={profile.socials[1].href}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="grid size-9 place-items-center rounded-full border border-line bg-[rgba(8,17,31,0.88)] text-accent"
            >
              <Linkedin size={17} />
            </a>
          </div>
          </div>
        </MotionSlide>
      </div>
      <div className="mt-6 flex w-max max-w-full select-none gap-3 font-mono text-[clamp(0.85rem,calc(0.2rem+2vw),1.85rem)] font-extrabold whitespace-nowrap text-accent/[0.09] [animation:marquee_24s_linear_infinite] sm:mt-8 sm:gap-4" aria-hidden="true">
        <span>Nicolas Von Muhlinen</span>
        <span>Full-stack IoT Developer</span>
        <span>Dashboards</span>
      </div>
    </section>
  );
}
