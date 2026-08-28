"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { useLoaderReady } from "@/components/providers/LoaderProvider";

type MotionFadeProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function MotionFade({ children, className, delay = 0 }: MotionFadeProps) {
  const reduced = useReducedMotion();
  // Mientras el loader tapa la pantalla, `whileInView` ya se cumple para todo
  // lo que esta en viewport y la animacion se gastaria detras del overlay.
  const ready = useLoaderReady();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      whileInView={reduced || !ready ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
