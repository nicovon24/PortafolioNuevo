"use client";

import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { navItems } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import LanguageToggle from "@/components/ui/LanguageToggle";

const headerIconBtn =
  "grid size-9 place-items-center rounded-full border border-line bg-[rgba(119,236,208,0.08)] text-accent transition-colors hover:border-accent-2 hover:bg-[rgba(236,124,180,0.12)] hover:text-accent-2";

function useActiveSectionHref() {
  const ids = useMemo(() => navItems.map((item) => item.href.replace(/^#/, "")), []);

  const [activeHref, setActiveHref] = useState("");

  useEffect(() => {
    let raf = 0;

    const compute = () => {
      raf = 0;
      const probe = Math.min(132, Math.max(76, window.innerHeight * 0.11));
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= probe) {
          current = id;
        }
      }

      const doc = document.documentElement;
      const atBottom = window.scrollY + window.innerHeight >= doc.scrollHeight - 40;
      if (atBottom && ids.length > 0) {
        const lastId = ids[ids.length - 1];
        const lastEl = document.getElementById(lastId);
        if (lastEl && lastEl.getBoundingClientRect().top < window.innerHeight - 32) {
          current = lastId;
        }
      }

      const next = current ? `#${current}` : "";
      setActiveHref((prev) => (prev === next ? prev : next));
    };

    const onScrollOrResize = () => {
      if (!raf) raf = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ids]);

  return activeHref;
}

export default function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const activeHref = useActiveSectionHref();

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-1/2 z-40 w-full -translate-x-1/2 border border-transparent bg-[rgba(14,26,46,0.72)] backdrop-blur-[18px] px-page",
        open ? "overflow-visible" : "overflow-hidden",
        hasScrolled &&
          "w-[min(94vw,84rem)] rounded-full border-line bg-panel-strong shadow-[0_18px_60px_rgba(0,0,0,0.34)]",
      )}
      initial={{ opacity: 0, y: -42 }}
      animate={{ opacity: 1, y: hasScrolled ? 16 : 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-[-1px] bg-[linear-gradient(110deg,transparent_0%,rgba(119,236,208,0.18)_36%,rgba(236,124,180,0.14)_48%,transparent_62%)] opacity-0 [transform:translateX(-55%)]",
          hasScrolled && "opacity-100 [animation:nav-shine_5s_ease-in-out_infinite]",
        )}
        aria-hidden="true"
      />
      {/* bottom accent line — visible only when not scrolled */}
      <span
        className={cn(
          "navbar-border-animated pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left opacity-100 transition-all duration-500",
          hasScrolled && "opacity-0 scale-x-0",
        )}
        aria-hidden="true"
      />
      <div className={cn(
        "mx-auto flex w-full max-w-shell items-center justify-between gap-[clamp(1rem,2vw,2.5rem)] py-[1.05rem]",
        hasScrolled && "py-3",
      )}>
      <a
        className="group relative z-[1] flex items-center gap-[0.35rem] font-mono text-[clamp(0.78rem,1.1vw,0.98rem)] font-normal text-accent"
        href="#top"
        aria-label={t("nav.home")}
        onClick={() => setOpen(false)}
      >
        <span className="text-[clamp(1.15rem,2.3vw,2.35rem)] text-muted transition-[color,transform] duration-300 ease-out group-hover:text-ink group-hover:rotate-[4deg]">
          &lt;
        </span>
        <strong className="leading-tight font-normal">
          Nicolas
          <br />
          Von Muhlinen
        </strong>
        <span className="text-[clamp(1.15rem,2.3vw,2.35rem)] text-muted transition-[color,transform] duration-300 ease-out group-hover:text-ink group-hover:rotate-[4deg]">
          /&gt;
        </span>
      </a>
      <nav className="relative z-[1] hidden items-center gap-[clamp(0.75rem,2.2vw,2rem)] text-ink lg:flex" aria-label={t("nav.mainNav")}>
        {navItems.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            className={cn("nav-link", activeHref === item.href && "nav-link--active")}
            aria-current={activeHref === item.href ? "location" : undefined}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {t(item.label)}
          </a>
        ))}
      </nav>
      <div className="relative z-[1] flex items-center gap-1.5">
        <LanguageToggle />
        <button
          type="button"
          className={cn(headerIconBtn, "lg:hidden")}
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Cerrar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
      {open && (
        <motion.nav
          className="absolute top-[calc(100%+10px)] right-0 z-50 grid w-[min(260px,88vw)] gap-3 rounded-[22px] border border-line bg-panel-strong p-4 shadow-[0_24px_60px_rgba(25,25,25,0.14)] lg:hidden"
          aria-label={t("nav.mobileNav")}
          initial={{ opacity: 0, y: -14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-2 py-2 text-ink transition-colors hover:text-accent-2",
                activeHref === item.href && "bg-[rgba(119,236,208,0.14)] text-accent",
              )}
              aria-current={activeHref === item.href ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              {t(item.label)}
            </a>
          ))}
        </motion.nav>
      )}
      </div>
    </motion.header>
  );
}
