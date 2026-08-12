"use client";

import { useEffect, useRef, useState } from "react";

const HTML_CLASS = "with-hud-cursor";
const BURST_DURATION_MS = 2000;

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  '[role="button"]',
  '[role="link"]',
  "label[for]",
  "summary",
  'input[type="button"]',
  'input[type="submit"]',
  'input[type="reset"]',
  "select",
].join(", ");

function isInteractiveUnderPointer(node: EventTarget | null): boolean {
  if (!node || !(node instanceof Element)) return false;
  const el = node.closest(INTERACTIVE_SELECTOR);
  if (!el) return false;
  if (el.matches(":disabled, [aria-disabled=\"true\"]")) return false;
  if (el.closest("fieldset:disabled")) return false;
  return true;
}

function spawnClickBurst(clientX: number, clientY: number) {
  const root = document.createElement("div");
  root.className = "click-hud-burst";
  root.setAttribute("aria-hidden", "true");
  root.style.left = `${clientX}px`;
  root.style.top = `${clientY}px`;

  const ring = document.createElement("div");
  ring.className = "click-hud-burst__ring";

  root.appendChild(ring);
  document.body.appendChild(root);

  window.setTimeout(() => root.remove(), BURST_DURATION_MS + 80);
}

/** HUD: retícula por defecto; sobre enlaces/botones: círculo gris + punto celeste. */
export default function TrailingCursor() {
  const [enabled, setEnabled] = useState(false);
  const [pointerMode, setPointerMode] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");

    if (reduced.matches || coarsePointer.matches) {
      return;
    }

    html.classList.add(HTML_CLASS);
    setEnabled(true);

    return () => {
      html.classList.remove(HTML_CLASS);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let x = 0;
    let y = 0;
    let frame = 0;

    // Coalesce every pointermove into one transform write per frame.
    const flush = () => {
      frame = 0;
      const root = rootRef.current;
      if (root) root.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(flush);
    };

    // Delegation beats elementFromPoint(): the browser already knows the hit target.
    const onOver = (e: PointerEvent) => setPointerMode(isInteractiveUnderPointer(e.target));

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0 || e.pointerType === "touch") return;
      spawnClickBurst(e.clientX, e.clientY);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onPointerDown);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={rootRef}
      className={`hud-cursor-root${pointerMode ? " hud-cursor-root--pointer" : ""}`}
      aria-hidden
    >
      <span className="hud-cursor__ring" />
      <span className="hud-cursor__tick hud-cursor__tick--n" />
      <span className="hud-cursor__tick hud-cursor__tick--e" />
      <span className="hud-cursor__tick hud-cursor__tick--s" />
      <span className="hud-cursor__tick hud-cursor__tick--w" />
      <span className="hud-cursor__dot" />
    </div>
  );
}
