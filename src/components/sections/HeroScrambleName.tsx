"use client";

import { useEffect, useRef, useState } from "react";
import { useActiveOnScreen } from "@/hooks/useActiveOnScreen";

const CHARSET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/[]<>!@#$%&*+=?\\|_:-·•^~`";

function smoothstep(u: number): number {
  const x = Math.min(1, Math.max(0, u));
  return x * x * (3 - 2 * x);
}

const WINDOW = 2; // max chars scrambling at once

function buildScrambled(target: string, resolveProgress: number): string {
  const chars = target.split("");
  const nonSpaceIdx = chars.map((c, i) => (c === " " ? -1 : i)).filter((i) => i >= 0);
  const total = nonSpaceIdx.length;
  const lockCount =
    resolveProgress >= 1 ? total : Math.max(0, Math.floor(resolveProgress * total));
  const locked = new Set(nonSpaceIdx.slice(0, lockCount));
  // only scramble chars inside the narrow window just ahead of the lock front
  const scrambleSet = new Set(nonSpaceIdx.slice(lockCount, lockCount + WINDOW));

  return chars
    .map((c, i) => {
      if (c === " ") return " ";
      if (locked.has(i)) return c;
      if (scrambleSet.has(i)) return CHARSET[Math.floor(Math.random() * CHARSET.length)] ?? "?";
      return c; // chars not yet reached stay as real letter
    })
    .join("");
}

type HeroScrambleNameProps = {
  firstName: string;
  lastName: string;
  line1Class: string;
  line2Class: string;
  line2ScrambleClass?: string;
  onScrambleChange?: (active: boolean) => void;
};

const HOLD_MS = 8000;
const SCRAMBLE_OUT_MS = 300;
const SCRAMBLE_IN_MS = 400;
const CYCLE_MS = HOLD_MS + SCRAMBLE_OUT_MS + SCRAMBLE_IN_MS;

const OPACITY_DIP = 0.15;
const OPACITY_MIN = 1 - OPACITY_DIP;

/**
 * Ciclo suave: estable → glifo/símbolos con leve baja de opacidad → vuelve al nombre.
 */
export default function HeroScrambleName({ firstName, lastName, line1Class, line2Class, line2ScrambleClass, onScrambleChange }: HeroScrambleNameProps) {
  const [line1, setLine1] = useState(firstName);
  const [line2, setLine2] = useState(lastName);
  const [wrapOpacity, setWrapOpacity] = useState(1);
  const [isScrambling, setIsScrambling] = useState(false);
  const startRef = useRef<number | null>(null);
  const frameSkipRef = useRef(0);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const active = useActiveOnScreen(headingRef);

  useEffect(() => {
    startRef.current = null;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Fuera de pantalla o pestaña oculta: descansar en el nombre limpio, sin rAF.
    if (reduced.matches || !active) {
      setLine1(firstName);
      setLine2(lastName);
      setWrapOpacity(1);
      setIsScrambling(false);
      return;
    }

    let raf = 0;

    const frame = (now: number) => {
      if (startRef.current === null) startRef.current = now;
      const elapsed = now - startRef.current;
      const t = elapsed % CYCLE_MS;

      let resolveP = 1;
      let opacity = 1;
      let inGibberish = false;

      if (t < HOLD_MS) {
        resolveP = 1;
        opacity = 1;
      } else if (t < HOLD_MS + SCRAMBLE_OUT_MS) {
        const u = (t - HOLD_MS) / SCRAMBLE_OUT_MS;
        resolveP = 1 - u;
        opacity = 1 - OPACITY_DIP * smoothstep(u);
        inGibberish = true;
      } else {
        const u = (t - HOLD_MS - SCRAMBLE_OUT_MS) / SCRAMBLE_IN_MS;
        resolveP = u;
        opacity = OPACITY_MIN + OPACITY_DIP * smoothstep(u);
        inGibberish = u < 0.998;
      }

      frameSkipRef.current += 1;
      const refreshText =
        !inGibberish || resolveP >= 1 || frameSkipRef.current % 2 === 0;

      if (refreshText) {
        setLine1(buildScrambled(firstName, resolveP));
        setLine2(buildScrambled(lastName, resolveP));
      }
      setIsScrambling((prev) => {
        if (prev !== inGibberish) setTimeout(() => onScrambleChange?.(inGibberish), 0);
        return inGibberish;
      });
      setWrapOpacity(opacity);
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [firstName, lastName, active]);

  const label = `${firstName} ${lastName}`;

  return (
    <h1 ref={headingRef} className="m-0 font-sans font-extrabold tracking-tight" style={{ opacity: wrapOpacity }} aria-label={label}>
      <span className={`block max-w-none ${line1Class}`}>{line1}</span>
      <span className={`mt-1 block max-w-none transition-[filter] duration-300 ${isScrambling && line2ScrambleClass ? line2ScrambleClass : line2Class}`}>{line2}</span>
    </h1>
  );
}
