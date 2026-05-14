"use client";

import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FlagAr, FlagUs } from "@/components/ui/FlagIcons";

const LANGS = {
  es: { Flag: FlagAr, label: "Es" },
  en: { Flag: FlagUs, label: "En" },
} as const;

export default function LanguageToggle() {
  const { i18n } = useTranslation();
  const lang = i18n.language === "en" ? "en" : "es";
  const current = LANGS[lang];
  const next = lang === "es" ? "en" : "es";
  const Flag = current.Flag;

  const toggle = () => {
    i18n.changeLanguage(next);
    localStorage.setItem("i18n_lang", next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={lang === "es" ? "Switch to English" : "Cambiar a Español"}
      className="flex items-center gap-1.5 rounded-full border border-line bg-[rgba(100,255,218,0.08)] px-2.5 py-1.5 font-mono text-[0.72rem] font-semibold text-accent transition-colors hover:border-accent-2 hover:bg-[rgba(255,105,180,0.12)] hover:text-accent-2"
    >
      <Flag className="h-[0.9rem] w-[1.35rem] shrink-0 rounded-[2px] ring-1 ring-white/15" />
      <span>{current.label}</span>
      <ChevronDown size={12} strokeWidth={2.5} />
    </button>
  );
}
