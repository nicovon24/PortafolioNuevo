import type { ReactNode } from "react";
import { ParallaxLayer, ParallaxScope } from "@/components/motion/Parallax";
import { cn } from "@/lib/utils";

type SectionProps = {
  id?: string;
  /** Numero de seccion: "01 —— SOBRE MI". */
  index?: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
  /** Activa el parallax de scroll para el header y habilita <ParallaxLayer> en los children. */
  parallax?: boolean;
};

export default function Section({
  id,
  index,
  eyebrow,
  title,
  children,
  className = "",
  parallax = false,
}: SectionProps) {
  const header = (eyebrow || title) && (
    <div className="mb-8 grid gap-2.5 md:mb-9 lg:mb-10">
      {eyebrow && (
        <p className="m-0 flex items-center gap-3 font-mono text-sm text-accent">
          {index && (
            <>
              <span className="tabular-nums">{index}</span>
              <span className="h-px w-8 bg-accent/50" aria-hidden />
            </>
          )}
          <span className={cn(index && "text-muted uppercase tracking-[0.14em]")}>{eyebrow}</span>
        </p>
      )}
      {title && <h2 className="m-0 font-mono text-section tracking-normal text-ink">{title}</h2>}
    </div>
  );

  const body = (
    <>
      {/* El header viaja un poco mas lento que el contenido: eso genera la profundidad. */}
      {parallax ? <ParallaxLayer speed={18}>{header}</ParallaxLayer> : header}
      {children}
    </>
  );

  return (
    // scroll-mt evita que el navbar fijo tape el titulo al navegar por anchor.
    // overflow-hidden es necesario con parallax: sin el, las capas desbordan sobre la seccion vecina.
    <section
      id={id}
      className={cn(
        "w-full scroll-mt-24 px-page py-14 md:py-16 lg:py-17",
        parallax && "overflow-hidden",
        className,
      )}
    >
      {parallax ? (
        <ParallaxScope className="mx-auto w-full max-w-shell">{body}</ParallaxScope>
      ) : (
        <div className="mx-auto w-full max-w-shell">{body}</div>
      )}
    </section>
  );
}
