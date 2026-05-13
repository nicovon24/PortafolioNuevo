"use client";

import { useEffect, useRef, useState } from "react";

/** Cortas para el typewriter; reflejan CV + proyectos (IoT, dashboards, deporte/datos). */
const PHRASES = [
  "Full-stack developer",
  "React · Node · TypeScript · Angular",
  "+3 años de experiencia",
  "IoT, Dashboards y Deportes ",
];
const TYPE_DELAY = 68;
const HOLD_DELAY = 2400;
const ERASE_DELAY = 38;

export default function HeroRoleCycle({ className }: { className?: string }) {
  const [display, setDisplay] = useState("");
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [phase, setPhase] = useState<"typing" | "hold" | "erasing">("typing");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const phrase = PHRASES[phraseIdx]!;

    if (phase === "typing") {
      if (display.length < phrase.length) {
        timer.current = setTimeout(
          () => setDisplay(phrase.slice(0, display.length + 1)),
          TYPE_DELAY,
        );
      } else {
        timer.current = setTimeout(() => setPhase("hold"), HOLD_DELAY);
      }
    } else if (phase === "hold") {
      timer.current = setTimeout(() => setPhase("erasing"), 200);
    } else {
      if (display.length > 0) {
        timer.current = setTimeout(
          () => setDisplay(display.slice(0, -1)),
          ERASE_DELAY,
        );
      } else {
        setPhraseIdx((phraseIdx + 1) % PHRASES.length);
        setPhase("typing");
      }
    }

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [display, phase, phraseIdx]);

  return (
    <span className={className}>
      {display}
      <span
        className="ml-px inline-block w-[1ch] animate-pulse text-accent"
        aria-hidden
      >
        |
      </span>
    </span>
  );
}
