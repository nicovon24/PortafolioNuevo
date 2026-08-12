"use client";

import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n, { DEFAULT_I18N_LANG } from "@/lib/i18n";

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const saved = localStorage.getItem("i18n_lang") ?? DEFAULT_I18N_LANG;
    if (saved !== i18n.language) {
      void i18n.changeLanguage(saved);
    }

    // <html lang> es estatico en el layout: sin esto sigue diciendo "es" en ingles (WCAG 3.1.1).
    const syncLang = (lng: string) => {
      document.documentElement.lang = lng;
    };
    syncLang(i18n.language);
    i18n.on("languageChanged", syncLang);
    return () => {
      i18n.off("languageChanged", syncLang);
    };
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
