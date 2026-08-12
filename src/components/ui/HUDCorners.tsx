import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type HUDCornersProps = {
  children: ReactNode;
  className?: string;
  /** Lado del corchete en px. */
  size?: number;
};

// Cada esquina pinta solo dos de sus cuatro bordes: eso da la forma de corchete.
const CORNERS = [
  { pos: "left-0 top-0", border: "1px 0 0 1px" },
  { pos: "right-0 top-0", border: "1px 1px 0 0" },
  { pos: "right-0 bottom-0", border: "0 1px 1px 0" },
  { pos: "left-0 bottom-0", border: "0 0 1px 1px" },
];

/** Marco HUD: cuatro corchetes de esquina en vez de un borde cerrado. */
export default function HUDCorners({ children, className, size = 14 }: HUDCornersProps) {
  return (
    <div className={cn("relative", className)}>
      {CORNERS.map((corner) => (
        <span
          key={corner.pos}
          aria-hidden
          className={cn("pointer-events-none absolute z-10 border-accent opacity-70", corner.pos)}
          style={{ width: size, height: size, borderStyle: "solid", borderWidth: corner.border }}
        />
      ))}
      {children}
    </div>
  );
}
