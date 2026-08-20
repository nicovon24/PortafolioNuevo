"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const HOLD_MS = 1300;
const FADE_MS = 450;

const RADIUS = 34;
const STROKE = 3;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Cortina de carga: anillo de progreso SVG + contador de % + "LOADING",
 * con la misma paleta y tipografia del navbar/hero. El % avanza en sync
 * con HOLD_MS (no hay carga de red real que trackear en esta pagina).
 * Monta oculto para prefers-reduced-motion y para quienes ya navegaron
 * en esta sesion, de modo que no se repite en cada vuelta atras.
 */
export default function Loader() {
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const seen = sessionStorage.getItem("loader-seen") === "1";

    if (reducedMotion || seen) {
      setDone(true);
      return;
    }

    sessionStorage.setItem("loader-seen", "1");
    // Bloquea el scroll mientras la cortina esta arriba.
    document.body.style.overflow = "hidden";

    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const pct = Math.min(100, Math.round(((now - start) / HOLD_MS) * 100));
      setProgress(pct);
      if (pct < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const fadeAt = window.setTimeout(() => setLeaving(true), HOLD_MS);
    const removeAt = window.setTimeout(() => setDone(true), HOLD_MS + FADE_MS);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(fadeAt);
      window.clearTimeout(removeAt);
      document.body.style.overflow = "";
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  if (done) return null;

  const dashOffset = CIRCUMFERENCE * (1 - progress / 100);

  return (
    <motion.div
      className="fixed inset-0 z-10000 grid place-items-center bg-background-deep"
      style={{
        backgroundImage:
          "radial-gradient(28rem 28rem at 50% 50%, rgba(217,100,90,0.16) 0%, transparent 68%)",
      }}
      role="status"
      aria-live="polite"
      aria-label="Cargando"
      initial={{ opacity: 0 }}
      animate={{ opacity: leaving ? 0 : 1, scale: leaving ? 1.04 : 1 }}
      transition={{ duration: (leaving ? FADE_MS : 300) / 1000, ease: "easeOut" }}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative grid size-20 place-items-center">
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            className="absolute inset-0 -rotate-90"
            style={{ filter: "drop-shadow(0 0 8px rgba(217,100,90,0.6))" }}
            aria-hidden
          >
            <circle
              cx="40"
              cy="40"
              r={RADIUS}
              fill="none"
              stroke="rgba(217,100,90,0.15)"
              strokeWidth={STROKE}
            />
            <motion.circle
              cx="40"
              cy="40"
              r={RADIUS}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth={STROKE}
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              animate={{ strokeDashoffset: dashOffset }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </svg>
          <span className="font-mono text-base font-bold tabular-nums text-accent">
            {progress}
          </span>
        </div>
        <span className="font-mono text-mini font-bold uppercase tracking-[0.2em] text-muted">
          Loading
        </span>
      </div>
    </motion.div>
  );
}
