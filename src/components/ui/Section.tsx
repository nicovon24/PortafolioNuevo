import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
};

export default function Section({ id, eyebrow, title, children, className = "" }: SectionProps) {
  return (
    // scroll-mt evita que el navbar fijo tape el titulo al navegar por anchor.
    <section id={id} className={cn("w-full scroll-mt-24 px-page py-14 md:py-16 lg:py-17", className)}>
      <div className="mx-auto w-full max-w-shell">
        {(eyebrow || title) && (
          <div className="mb-8 grid gap-2.5 md:mb-9 lg:mb-10">
            {eyebrow && <p className="m-0 font-mono text-sm text-accent">{eyebrow}</p>}
            {title && (
              <h2 className="m-0 font-mono text-section tracking-normal text-ink">{title}</h2>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
