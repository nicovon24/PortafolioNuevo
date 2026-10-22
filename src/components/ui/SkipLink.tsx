"use client";

import { useTranslation } from "react-i18next";

export default function SkipLink() {
  const { t } = useTranslation();

  return (
    <a
      href="#main"
      onClick={() => {
        const main = document.getElementById("main");
        main?.setAttribute("tabindex", "-1");
        main?.focus();
      }}
      className="sr-only rounded-card border border-accent bg-background-deep px-4 py-2 font-mono text-sm text-accent focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-400"
    >
      {t("nav.skipToContent")}
    </a>
  );
}
