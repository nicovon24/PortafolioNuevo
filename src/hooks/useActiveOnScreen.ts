"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * true solo mientras el nodo esta en pantalla Y la pestaña esta visible.
 * Permite que los loops de rAF/setTimeout queden en reposo en vez de correr para siempre.
 */
export function useActiveOnScreen<T extends Element>(ref: RefObject<T | null>): boolean {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let onScreen = false;
    const sync = () => setActive(onScreen && !document.hidden);

    const observer = new IntersectionObserver((entries) => {
      onScreen = entries[0]?.isIntersecting ?? false;
      sync();
    });
    observer.observe(node);
    document.addEventListener("visibilitychange", sync);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [ref]);

  return active;
}
