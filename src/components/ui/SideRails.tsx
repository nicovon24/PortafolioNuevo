import { FileDown, Github, Linkedin } from "lucide-react";
import { profile } from "@/data/portfolio";

const railLink =
  "grid size-9 place-items-center rounded-full border border-line bg-background-deep/80 text-muted shadow-[0_8px_24px_color-mix(in_srgb,var(--color-background-deep)_45%,transparent)] backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

export default function SideRails() {
  const github = profile.socials.find((social) => social.label === "GitHub")!;
  const linkedin = profile.socials.find((social) => social.label === "LinkedIn")!;
  const cv = profile.socials.find((social) => social.label === "CV")!;

  return (
    <div className="pointer-events-none fixed inset-0 z-200 hidden min-[1480px]:block" aria-label="Enlaces de contacto">
      <aside className="pointer-events-auto absolute bottom-0 left-[clamp(1.25rem,2vw,2.5rem)] flex flex-col items-center gap-3">
        <a href={github.href} target="_blank" rel="noreferrer" aria-label="GitHub" className={railLink}>
          <Github size={16} />
        </a>
        <a href={linkedin.href} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={railLink}>
          <Linkedin size={16} />
        </a>
        <a href={cv.href} target="_blank" rel="noreferrer" aria-label="Curriculum vitae" className={railLink}>
          <FileDown size={16} />
        </a>
        <span className="mt-1 h-24 w-px bg-gradient-to-b from-accent/70 to-transparent" aria-hidden />
      </aside>

      <aside className="pointer-events-auto absolute bottom-0 right-[clamp(1.25rem,2vw,2.5rem)] flex flex-col items-center gap-4">
        <a
          href={`mailto:${profile.email}`}
          className="font-mono text-micro font-semibold tracking-[0.14em] text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent [writing-mode:vertical-rl]"
        >
          {profile.email}
        </a>
        <span className="h-24 w-px bg-gradient-to-b from-accent/70 to-transparent" aria-hidden />
      </aside>
    </div>
  );
}
