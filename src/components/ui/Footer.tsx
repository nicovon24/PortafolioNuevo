"use client";

import { FileDown, Github, Linkedin, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { profile } from "@/data/portfolio";

const iconBtn =
  "grid size-9 place-items-center rounded-full border border-line bg-[rgba(100,255,218,0.08)] text-accent transition-colors hover:border-accent-2 hover:bg-[rgba(255,105,180,0.12)] hover:text-accent-2";

const panel =
  "rounded-2xl border border-line bg-panel px-6 py-8 shadow-[0_20px_56px_rgba(0,0,0,0.22)] backdrop-blur-[14px] md:px-8 md:py-9";

export default function Footer() {
  const { t } = useTranslation();
  const github = profile.socials.find((s) => s.label === "GitHub")!;
  const linkedin = profile.socials.find((s) => s.label === "LinkedIn")!;
  const cv = profile.socials.find((s) => s.label === "CV")!;

  return (
    <footer className="mt-16 w-full px-page pb-10 pt-2">
      <div className={panel}>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <a href={github.href} target="_blank" rel="noreferrer" aria-label="GitHub" className={iconBtn}>
                <Github size={17} />
              </a>
              <a href={linkedin.href} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={iconBtn}>
                <Linkedin size={17} />
              </a>
              <a href={cv.href} target="_blank" rel="noreferrer" aria-label={t("footer.downloadCv")} className={iconBtn}>
                <FileDown size={17} />
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Email" className={iconBtn}>
                <Mail size={17} />
              </a>
            </div>
            <p className="m-0 font-sans text-[clamp(0.8125rem,0.72rem+0.35vw,0.95rem)] font-semibold uppercase tracking-[0.16em] text-ink">
              {profile.name}
            </p>
          </div>
          <p className="m-0 max-w-[28rem] font-mono text-[0.65rem] font-semibold uppercase leading-relaxed tracking-[0.18em] text-muted sm:text-right">
            © 2026 {profile.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
