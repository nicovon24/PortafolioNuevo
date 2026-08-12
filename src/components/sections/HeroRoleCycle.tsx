"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useActiveOnScreen } from "@/hooks/useActiveOnScreen";

const TYPE_DELAY = 68;
const HOLD_DELAY = 2400;
const ERASE_DELAY = 38;

export default function HeroRoleCycle({ className }: { className?: string }) {
  const { t } = useTranslation();
  const raw = t("hero.phrases", { returnObjects: true });
  // t() devuelve un array nuevo en cada render: estabilizarlo evita re-disparar el efecto en loop.
  const joined = Array.isArray(raw) ? (raw as string[]).join("|") : "";
  const phrases = useMemo(() => (joined ? joined.split("|") : []), [joined]);

  const [display, setDisplay] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "hold" | "erasing">("typing");
  const [reduced, setReduced] = useState(false);
  const spanRef = useRef<HTMLSpanElement>(null);
  const active = useActiveOnScreen(spanRef);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Al cambiar de idioma, reiniciar en vez de indexar fuera de rango.
  useEffect(() => {
    setPhraseIdx(0);
    setDisplay("");
    setPhase("typing");
  }, [phrases]);

  useEffect(() => {
    if (!phrases.length) return;

    if (reduced) {
      setDisplay(phrases[0] ?? "");
      return;
    }

    // Fuera de pantalla o pestaña oculta: no encadenar mas timers.
    if (!active) return;

    const phrase = phrases[phraseIdx] ?? "";
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (display.length < phrase.length) {
        timer = setTimeout(() => setDisplay(phrase.slice(0, display.length + 1)), TYPE_DELAY);
      } else {
        timer = setTimeout(() => setPhase("hold"), HOLD_DELAY);
      }
    } else if (phase === "hold") {
      timer = setTimeout(() => setPhase("erasing"), 200);
    } else if (display.length > 0) {
      timer = setTimeout(() => setDisplay(display.slice(0, -1)), ERASE_DELAY);
    } else {
      setPhraseIdx((i) => (i + 1) % phrases.length);
      setPhase("typing");
      return;
    }

    return () => clearTimeout(timer);
  }, [display, phase, phraseIdx, phrases, active, reduced]);

  return (
    <span ref={spanRef} className={className}>
      {/* El texto animado se re-anunciaria letra por letra: exponer la lista completa una sola vez. */}
      <span className="sr-only">{phrases.join(", ")}</span>
      <span aria-hidden>
        {display}
        <span className="ml-px inline-block w-[1ch] animate-pulse text-accent">|</span>
      </span>
    </span>
  );
}
