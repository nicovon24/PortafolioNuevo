"use client";

import { useEffect, useState } from "react";

const HOLD_MS = 1300;
const FADE_MS = 450;

/**
 * Cortina de carga: spinner cian + "LOADING...", se desvanece a los 1.3s.
 * Monta oculto para usuarios con prefers-reduced-motion y para quienes ya
 * navegaron en esta sesion, de modo que no se repite en cada vuelta atras.
 */
export default function Loader() {
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("loader-seen") === "1";

    if (reduced || seen) {
      setDone(true);
      return;
    }

    sessionStorage.setItem("loader-seen", "1");
    // Bloquea el scroll mientras la cortina esta arriba.
    document.body.style.overflow = "hidden";

    const fadeAt = window.setTimeout(() => setLeaving(true), HOLD_MS);
    const removeAt = window.setTimeout(() => setDone(true), HOLD_MS + FADE_MS);

    return () => {
      window.clearTimeout(fadeAt);
      window.clearTimeout(removeAt);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  if (done) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] grid place-items-center bg-background-deep transition-opacity duration-[450ms] ease-out ${
        leaving ? "opacity-0" : "opacity-100"
      }`}
      role="status"
      aria-live="polite"
      aria-label="Cargando"
    >
      <div className="flex flex-col items-center gap-5">
        <span className="loader-spinner" aria-hidden />
        <span className="loader-text font-mono text-mini font-bold uppercase tracking-[0.35em] text-accent">
          Loading...
        </span>
      </div>
    </div>
  );
}
