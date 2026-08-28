"use client";

import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const base = `inline-flex items-center justify-center gap-1.5 rounded-full font-bold transition-colors ${focusRing}`;

const variants = {
  /** Accion principal: relleno turquesa sobre texto contrastante. */
  primary: "bg-accent text-accent-contrast transition-opacity hover:opacity-90 shadow-sm",
  /** Accion secundaria: contorno turquesa. */
  outline: "border border-accent bg-transparent text-accent hover:bg-accent/10",
  /** Superficie tenue, para links dentro de paneles. */
  subtle:
    "border border-line bg-accent/[0.06] text-accent hover:border-accent-2 hover:bg-accent-2/10 hover:text-accent-2",
  /** No interactivo: estados tipo "repo privado". */
  muted: "cursor-default border border-line/50 bg-transparent text-muted",
} as const;

const sizes = {
  sm: "min-h-8 px-3 text-mini",
  md: "min-h-10 px-4 text-sm",
  lg: "min-h-11 px-5 text-sm",
} as const;

export type ButtonVariant = keyof typeof variants;
export type ButtonSize = keyof typeof sizes;

type ButtonProps<T extends ElementType> = {
  as?: T;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export default function Button<T extends ElementType = "button">({
  as,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps<T>) {
  const Component = (as ?? "button") as ElementType;
  const typeProp = Component === "button" ? { type: "button" as const } : {};

  return (
    <Component
      {...typeProp}
      {...rest}
      suppressHydrationWarning
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {children}
    </Component>
  );
}

type IconButtonProps = {
  label: string;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<"button">, "className" | "children" | "aria-label">;

/** Boton circular de icono. Reemplaza 6 copias casi identicas del mismo string. */
export function IconButton({ label, className, children, ...rest }: IconButtonProps) {
  return (
    <button
      type="button"
      suppressHydrationWarning
      aria-label={label}
      {...rest}
      className={cn(
        "grid shrink-0 place-items-center rounded-full border border-line bg-panel-strong text-accent transition-colors hover:border-accent-2 hover:text-accent-2",
        focusRing,
        className,
      )}
    >
      {children}
    </button>
  );
}

/** Chip de tecnologia. */
export function TechChip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-line/60 bg-panel-strong/80 px-2.5 py-1 font-mono text-mini font-semibold text-ink/90 transition-colors hover:border-accent/40 hover:text-accent">
      {children}
    </span>
  );
}
