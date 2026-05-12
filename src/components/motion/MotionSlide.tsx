"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type MotionSlideProps = {
  children: ReactNode;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
};

const offset = {
  left: { x: -80, y: 0 },
  right: { x: 80, y: 0 },
  up: { x: 0, y: -60 },
  down: { x: 0, y: 60 },
};

export default function MotionSlide({ children, className, direction = "up", delay = 0 }: MotionSlideProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
