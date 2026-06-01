"use client";

import { useEffect, useRef } from "react";

const AUTO_SPEED = 0.8; // px per frame
const FRICTION = 0.9;

export default function HeroTechCarousel({ children }: { children: React.ReactNode }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const xRef = useRef(0);
  const velRef = useRef(0);
  const isDragging = useRef(false);
  const isHovering = useRef(false);
  const lastPointerX = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const tick = () => {
      const halfWidth = track.scrollWidth / 2;

      if (!isDragging.current) {
        if (!isHovering.current) {
          xRef.current -= AUTO_SPEED;
        }
        // apply leftover drag inertia
        xRef.current -= velRef.current;
        velRef.current *= FRICTION;
        if (Math.abs(velRef.current) < 0.05) velRef.current = 0;
      }

      // seamless wrap
      if (xRef.current <= -halfWidth) xRef.current += halfWidth;
      if (xRef.current > 0) xRef.current -= halfWidth;

      track.style.transform = `translateX(${xRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    velRef.current = 0;
    lastPointerX.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const delta = e.clientX - lastPointerX.current;
    xRef.current += delta;
    velRef.current = -delta * 0.4;
    lastPointerX.current = e.clientX;
  };

  const onPointerUp = () => {
    isDragging.current = false;
  };

  return (
    <ul
      ref={trackRef}
      className="flex w-max items-stretch gap-3 sm:gap-4 cursor-grab active:cursor-grabbing select-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
      onMouseEnter={() => { isHovering.current = true; }}
      onMouseLeave={() => { isHovering.current = false; }}
    >
      {children}
    </ul>
  );
}
