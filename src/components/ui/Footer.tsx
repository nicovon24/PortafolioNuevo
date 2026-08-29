"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Download, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { navItems, profile } from "@/data/portfolio";

const iconBtn =
  "control-surface grid size-9 place-items-center rounded-full border text-accent transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10";

const actionPrimary =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-accent bg-accent px-5 font-mono text-mini font-bold uppercase tracking-[0.12em] text-accent-contrast transition-colors hover:border-accent-2 hover:bg-accent-2";

const actionSecondary =
  "control-surface inline-flex min-h-10 items-center justify-center gap-2 rounded-full border px-5 font-mono text-mini font-bold uppercase tracking-[0.12em] text-ink transition-colors hover:border-accent hover:text-accent";

export default function Footer() {
  const { t } = useTranslation();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const github = profile.socials.find((social) => social.label === "GitHub")!;
  const linkedin = profile.socials.find((social) => social.label === "LinkedIn")!;
  const cv = profile.socials.find((social) => social.label === "CV")!;

  useEffect(() => {
    const updateVisibility = () => setShowBackToTop(window.scrollY > 700);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <>
      <footer className="w-full px-page pb-10 pt-8 sm:pt-12">
        <div className="mx-auto w-full max-w-shell rounded-card-lg border border-line bg-panel px-6 py-8 shadow-card backdrop-blur-[16px] md:px-9 md:py-10">
          <div className="grid gap-9 md:grid-cols-[1.25fr_0.8fr_1fr] md:items-start md:gap-10">
            <div>
              <a href="#top" className="inline-flex items-center gap-2 font-mono text-accent" aria-label={t("nav.home")}>
                <span className="text-2xl text-muted" aria-hidden>&lt;</span>
                <span className="text-sm font-bold uppercase leading-tight tracking-[0.12em]">
                  Nicolas<br />Von Muhlinen
                </span>
                <span className="text-2xl text-muted" aria-hidden>/&gt;</span>
              </a>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
                {t("footer.tagline")}
              </p>
              <div className="mt-5 flex items-center gap-2">
                <a href={github.href} target="_blank" rel="noreferrer" aria-label="GitHub" className={iconBtn}>
                  <Github size={17} />
                </a>
                <a href={linkedin.href} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={iconBtn}>
                  <Linkedin size={17} />
                </a>
              </div>
            </div>

            <nav aria-label={t("footer.navigation")}>
              <p className="mb-4 font-mono text-micro font-bold uppercase tracking-[0.18em] text-accent">
                {t("footer.navigation")}
              </p>
              <ul className="grid gap-2.5">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="text-sm text-muted transition-colors hover:text-accent">
                      {t(item.label)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-col gap-3 md:items-end">
              <p className="mb-1 font-mono text-micro font-bold uppercase tracking-[0.18em] text-accent">
                {t("footer.available")}
              </p>
              <a href={`mailto:${profile.email}`} className={actionPrimary}>
                <Mail size={16} /> {t("footer.writeMe")}
              </a>
              <a href={cv.href} target="_blank" rel="noreferrer" className={actionSecondary}>
                <Download size={16} /> {t("footer.downloadCv")}
              </a>
            </div>
          </div>

          <div className="mt-9 flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="m-0 font-mono text-micro uppercase tracking-[0.14em] text-muted">
              © 2026 {profile.name}
            </p>
            <a href="#top" className="inline-flex items-center gap-2 font-mono text-micro font-bold uppercase tracking-[0.14em] text-muted transition-colors hover:text-accent">
              {t("footer.backToTop")} <ArrowUp size={14} />
            </a>
          </div>
        </div>
      </footer>

      <AnimatePresence>
        {showBackToTop && (
          <motion.a
            href="#top"
            aria-label={t("footer.backToTop")}
            className="fixed bottom-6 right-6 z-210 grid size-11 place-items-center rounded-full border border-accent bg-accent text-background shadow-[0_10px_30px_color-mix(in_srgb,var(--color-accent)_30%,transparent)] transition-colors hover:bg-accent-2 min-[1480px]:right-24"
            initial={{ opacity: 0, y: 14, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.85 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <ArrowUp size={18} />
          </motion.a>
        )}
      </AnimatePresence>
    </>
  );
}
