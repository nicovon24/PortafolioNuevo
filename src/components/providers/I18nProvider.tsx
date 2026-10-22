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

    // Next puede insertar metadatos en head o body después de hidratar.
    // Mantener todas las copias alineadas con el idioma activo.
    const syncDescription = () => {
      const description = i18n.t("seo.description", { lng: i18n.language });
      document.querySelectorAll<HTMLMetaElement>('meta[name="description"]').forEach((meta) => {
        if (meta.content !== description) meta.content = description;
      });
    };
    const syncLang = (lng: string) => {
      document.documentElement.lang = lng;
      syncDescription();
    };

    const observer = new MutationObserver((records) => {
      const metadataChanged = records.some((record) => {
        if (record.type === "attributes") {
          return record.target instanceof HTMLMetaElement && record.target.name === "description";
        }
        return Array.from(record.addedNodes).some(
          (node) =>
            node instanceof Element &&
            (node.matches('meta[name="description"]') ||
              node.querySelector('meta[name="description"]') !== null),
        );
      });
      if (metadataChanged) syncDescription();
    });
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["content", "name"],
    });
    syncLang(i18n.language);
    i18n.on("languageChanged", syncLang);
    return () => {
      i18n.off("languageChanged", syncLang);
      observer.disconnect();
    };
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
