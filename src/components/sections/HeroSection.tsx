import { ArrowDown, Download, Github, Linkedin } from "lucide-react";
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
  "grid size-9 place-items-center border border-line bg-[rgba(8,17,31,0.88)] text-accent transition-colors hover:border-accent hover:text-accent-2";

const nameLine1Class =
  "leading-[0.95] text-ink text-[clamp(2.05rem,calc(0.88rem+5.2vw),4rem)]";

const nameLine2Class =
  "bg-gradient-to-b from-accent via-accent to-[#3edcc4] bg-clip-text text-[clamp(2.35rem,calc(1rem+5.85vw),4.65rem)] leading-[0.92] text-transparent drop-shadow-[0_0_22px_rgba(100,255,218,0.2)] [-webkit-text-fill-color:transparent]";

export default function HeroSection() {
  const github = profile.socials.find((s) => s.label === "GitHub")!;
  const linkedin = profile.socials.find((s) => s.label === "LinkedIn")!;
  const cv = profile.socials.find((s) => s.label === "CV")!;

  const nameParts = profile.name.trim().split(/\s+/);
  const heroFirstName = nameParts[0] ?? profile.name;
  const heroLastName = nameParts.slice(1).join(" ") || profile.roleSecond;

  return (
    <section
      id="top"
      className="relative flex min-h-screen w-full flex-col items-start overflow-hidden px-page pb-10 pt-[4.5rem] max-lg:pt-[4.75rem] sm:pt-20 lg:pt-24"
    >
      <div className="relative z-0 flex w-full max-w-[48rem] flex-1 flex-col justify-center text-left lg:max-w-[52rem]">
        <div>
          <MotionSlide direction="left">
            <HeroScrambleName
              firstName={heroFirstName}
              lastName={heroLastName}
              line1Class={nameLine1Class}
              line2Class={nameLine2Class}
            />
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line/60 pb-4 font-sans text-[clamp(0.65rem,0.55rem+1vw,0.8rem)] font-semibold uppercase tracking-[0.22em]">
              <HeroRoleCycle className="text-muted" />
              <span className="inline-flex items-center gap-1.5 text-accent sm:ml-auto">
                <span className="text-[0.55rem] leading-none text-accent" aria-hidden>
                  ▲
                </span>
                Disponible
              </span>
            </div>
          </MotionSlide>
          <MotionFade delay={0.1}>
            <p className="mt-5 max-w-2xl font-sans text-[0.8rem] leading-relaxed text-muted sm:text-[0.95rem]">{profile.intro}</p>
          </MotionFade>
          <MotionFade delay={0.2} className="mt-6 flex flex-col gap-3 sm:mt-8">
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <a className={btnPrimary} href="#projects">
                Ver proyectos <ArrowDown size={16} />
              </a>
              <a className={btnSecondary} href={cv.href} target="_blank" rel="noreferrer">
                CV.PDF <Download size={16} />
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
    </section>
  );
}
