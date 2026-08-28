import type { SVGProps } from "react";

/**
 * Pelota de futbol vectorial (icosaedro truncado) con trazos finos.
 * Geometria: pentagono central + 5 hexagonos que lo rodean + 5 pentagonos
 * parciales recortados por el contorno esferico.
 */
export function SoccerBallIcon({ className = "size-4", ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} {...props}>
      <BallGeometry />
    </svg>
  );
}

/** Path del pentagono central, reutilizado para el relleno animado del loader */
export const CENTER_PENTAGON_D =
  "M16 9.1 L21.55 13.13 L19.43 19.66 L12.57 19.66 L10.45 13.13 Z";

/**
 * Aristas de la pelota en orden de dibujo (centro hacia afuera).
 * `soft` marca los radios cortos del borde, que van a menor opacidad.
 */
export const BALL_PATHS: ReadonlyArray<{ d: string; soft?: boolean }> = [
  // Pentagono central
  { d: CENTER_PENTAGON_D },

  // Aristas que conectan el pentagono con el anillo exterior de vertices
  { d: "M16 9.1 L16 3.2" },
  { d: "M21.55 13.13 L27.16 11.31" },
  { d: "M19.43 19.66 L22.9 24.43" },
  { d: "M12.57 19.66 L9.1 24.43" },
  { d: "M10.45 13.13 L4.84 11.31" },

  // Anillo exterior: cierra cada hexagono
  { d: "M16 3.2 L23.1 5.5 L27.16 11.31" },
  { d: "M27.16 11.31 L28.4 18.35 L22.9 24.43" },
  { d: "M22.9 24.43 L16 27.1 L9.1 24.43" },
  { d: "M9.1 24.43 L3.6 18.35 L4.84 11.31" },
  { d: "M4.84 11.31 L8.9 5.5 L16 3.2" },

  // Radios cortos: insinuan los pentagonos del ecuador
  { d: "M23.1 5.5 L25.5 2.9", soft: true },
  { d: "M28.4 18.35 L31.3 19.1", soft: true },
  { d: "M16 27.1 L16 30.6", soft: true },
  { d: "M3.6 18.35 L0.7 19.1", soft: true },
  { d: "M8.9 5.5 L6.5 2.9", soft: true },
];

/** Contorno esferico exterior */
export const BALL_OUTLINE = { cx: 16, cy: 16, r: 14.6 };

/**
 * Geometria estatica compartida entre el icono y la capa guia del loader.
 * Usa `currentColor` para heredar el color del contenedor.
 */
export function BallGeometry({
  strokeWidth = 1.1,
  fillPentagon = true,
}: {
  strokeWidth?: number;
  fillPentagon?: boolean;
}) {
  return (
    <g
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      <circle {...BALL_OUTLINE} />
      {BALL_PATHS.map(({ d, soft }) => (
        <path
          key={d}
          d={d}
          opacity={soft ? 0.55 : 1}
          fill={fillPentagon && d === CENTER_PENTAGON_D ? "currentColor" : "none"}
          fillOpacity={fillPentagon && d === CENTER_PENTAGON_D ? 0.22 : 0}
        />
      ))}
    </g>
  );
}
