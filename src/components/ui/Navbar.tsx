"use client";

import { Github, Linkedin, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { navItems, profile } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const headerIconBtn =
  "grid size-9 place-items-center rounded-full border border-line bg-[rgba(100,255,218,0.08)] text-accent transition-colors hover:border-accent-2 hover:bg-[rgba(255,105,180,0.12)] hover:text-accent-2";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-1/2 z-40 flex w-[var(--layout-shell-width)] max-[560px]:w-[min(var(--layout-shell-width),calc(100vw-1rem))] -translate-x-1/2 items-center justify-between gap-[clamp(1rem,2vw,2.5rem)] overflow-hidden border border-transparent bg-[rgba(14,26,46,0.72)] px-page py-[1.05rem] backdrop-blur-[18px]",
        hasScrolled &&
          "rounded-full border-line bg-[rgba(8,17,31,0.86)] py-3 px-[clamp(1rem,3vw,2rem)] shadow-[0_18px_60px_rgba(0,0,0,0.34)]",
      )}
      initial={{ opacity: 0, y: -42 }}
      animate={{ opacity: 1, y: hasScrolled ? 16 : 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-[-1px] bg-[linear-gradient(110deg,transparent_0%,rgba(100,255,218,0.18)_36%,rgba(255,105,180,0.14)_48%,transparent_62%)] opacity-0 [transform:translateX(-55%)]",
          hasScrolled && "opacity-100 [animation:nav-shine_5s_ease-in-out_infinite]",
        )}
        aria-hidden="true"
      />
      <a
        className="group relative z-[1] flex items-center gap-[0.35rem] font-mono text-[clamp(0.78rem,1.1vw,0.98rem)] font-normal text-accent"
        href="#top"
        aria-label="Ir al inicio"
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
      <nav className="relative z-[1] hidden items-center gap-[clamp(0.75rem,2.2vw,2rem)] text-ink lg:flex" aria-label="Navegacion principal">
        {navItems.map((item, index) => (
          <a key={item.href} href={item.href} className="nav-link">
            <span>{String(index + 1).padStart(2, "0")}</span>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="relative z-[1] flex items-center gap-1.5">
        <a href={profile.socials[0].href} className={headerIconBtn} aria-label="GitHub" target="_blank" rel="noreferrer">
          <Github size={17} />
        </a>
        <a href={profile.socials[1].href} className={headerIconBtn} aria-label="LinkedIn" target="_blank" rel="noreferrer">
          <Linkedin size={17} />
        </a>
        <button type="button" className={cn(headerIconBtn, "lg:hidden")} onClick={() => setOpen((value) => !value)} aria-label="Abrir menu">
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
      {open && (
        <motion.nav
          className="absolute top-[calc(100%+10px)] right-0 grid w-[min(260px,88vw)] gap-3 rounded-[22px] border border-line bg-[rgba(8,17,31,0.96)] p-4 shadow-[0_24px_60px_rgba(25,25,25,0.14)] lg:hidden"
          aria-label="Navegacion mobile"
          initial={{ opacity: 0, y: -14, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="rounded-lg px-2 py-2 text-ink transition-colors hover:text-accent-2" onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </motion.nav>
      )}
    </motion.header>
  );
}
