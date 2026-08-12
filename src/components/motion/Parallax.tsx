"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { createContext, useContext, useRef, type ReactNode } from "react";

/**
 * Progreso de scroll de la seccion (0 al entrar por abajo, 1 al salir por arriba).
 * null = sin scope o movimiento reducido: los layers se renderizan estaticos.
 */
const ParallaxContext = createContext<MotionValue<number> | null>(null);

type ScopeProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Un unico useScroll para toda la seccion. Los hijos consumen el mismo
 * MotionValue con distintos multiplicadores, en vez de montar un listener cada uno.
 */
export function ParallaxScope({ children, className }: ScopeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Sin spring el movimiento va pegado al scroll y se siente rigido.
  const smooth = useSpring(scrollYProgress, { stiffness: 60, damping: 20, restDelta: 0.001 });

  return (
    <div ref={ref} className={className}>
      <ParallaxContext.Provider value={reduced ? null : smooth}>{children}</ParallaxContext.Provider>
    </div>
  );
}

type LayerProps = {
  children: ReactNode;
  className?: string;
  /** Desplazamiento total en px a lo largo de la seccion. Negativo = sube antes. */
  speed?: number;
};

export function ParallaxLayer({ children, className, speed = 24 }: LayerProps) {
  const progress = useContext(ParallaxContext);

  if (!progress) return <div className={className}>{children}</div>;

  return (
    <ParallaxLayerInner progress={progress} className={className} speed={speed}>
      {children}
    </ParallaxLayerInner>
  );
}

/** Separado porque useTransform no puede llamarse tras un early return. */
function ParallaxLayerInner({
  children,
  className,
  speed,
  progress,
}: LayerProps & { progress: MotionValue<number>; speed: number }) {
  const y = useTransform(progress, [0, 1], [speed, -speed]);
  return (
    <motion.div className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
