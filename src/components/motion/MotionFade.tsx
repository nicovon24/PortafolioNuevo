"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type MotionFadeProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export default function MotionFade({ children, className, delay = 0 }: MotionFadeProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
