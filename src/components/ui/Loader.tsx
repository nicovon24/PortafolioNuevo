"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type CSSProperties } from "react";

import { useLoaderControls } from "@/components/providers/LoaderProvider";
import {
  BALL_OUTLINE,
  BALL_PATHS,
  BallGeometry,
  CENTER_PENTAGON_D,
} from "@/components/ui/SoccerBallIcon";
import { profile } from "@/data/portfolio";

type LoaderVariables = CSSProperties & {
  "--accent": string;
};

/** Duracion total visible del loader antes de iniciar la salida */
const LOADER_TOTAL_TIME = 2400;
/** Duracion de la animacion de salida */
const LOADER_EXIT_TIME = 550;

const NAME_LETTERS = profile.name.split("");

/**
 * Loader de entrada: la pelota se dibuja trazo a trazo (stroke-dashoffset),
 * gira lento sobre su eje y el nombre completo aparece letra por letra debajo.
 * Sin barra, sin porcentaje, sin texto "cargando".
 */
export default function Loader() {
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const markReady = useLoaderControls();

  useEffect(() => {
    // Se ejecuta una sola vez por sesion de usuario
    if (sessionStorage.getItem("loader-seen") === "1") {
      delete document.documentElement.dataset.loader;
      setDone(true);
      markReady();
      return;
    }

    document.body.style.overflow = "hidden";

    const exitTimer = setTimeout(() => {
      setLeaving(true);
      // El contenido arranca su entrada mientras el loader hace fade out:
      // los dos se solapan y la transicion no queda con un hueco muerto.
      // Quitar data-loader devuelve visibilidad a #main/nav/footer justo aqui.
      delete document.documentElement.dataset.loader;
      markReady();
      document.body.style.overflow = "";
    }, LOADER_TOTAL_TIME);

    const cleanupTimer = setTimeout(() => {
      sessionStorage.setItem("loader-seen", "1");
      setDone(true);
    }, LOADER_TOTAL_TIME + LOADER_EXIT_TIME);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(cleanupTimer);
      // Si el Loader desmonta antes de tiempo, el contenido no puede quedar
      // oculto por un atributo que ya nadie va a limpiar.
      delete document.documentElement.dataset.loader;
      document.body.style.overflow = "";
    };
  }, [markReady]);

  if (done) return null;

  const themeVariables: LoaderVariables = {
    "--accent": "var(--color-accent)",
  };

  return (
    <motion.div
      className={`portfolio-loader fixed inset-0 z-200 flex flex-col items-center justify-center gap-7 bg-background ${
        leaving ? "pointer-events-none" : ""
      }`}
      style={themeVariables}
      initial={{ opacity: 1 }}
      animate={{ opacity: leaving ? 0 : 1 }}
      transition={{ duration: LOADER_EXIT_TIME / 1000, ease: [0.22, 1, 0.36, 1] }}
      role="status"
      aria-live="polite"
      aria-label="Cargando"
    >
      {/* Halo suave detras de la pelota */}
      <div className="relative flex items-center justify-center">
        <motion.div
          aria-hidden
          className="absolute size-40 rounded-full bg-accent/12 blur-3xl"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: leaving ? 0 : 1, scale: 1 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />

        {/* Rotacion lenta continua, solo una vez que la pelota
            termino de dibujarse (delay = duracion del trazado) */}
        <motion.div
          className="relative text-accent"
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{
            rotate: prefersReducedMotion ? 0 : 360,
            scale: leaving ? 1.08 : 1,
            opacity: 1,
          }}
          transition={{
            rotate: {
              duration: 14,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
              delay: 1.4,
            },
            scale: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.4 },
          }}
        >
          <svg width="104" height="104" viewBox="0 0 32 32" aria-hidden fill="none">
            {/* Capa fantasma: la geometria completa en muy baja opacidad,
                para que el trazo se "revele" sobre una guia y no sobre vacio */}
            <g opacity="0.1">
              <BallGeometry strokeWidth={1} fillPentagon={false} />
            </g>

            {/* Capa dibujada: cada arista se traza con pathLength
                (stroke-dashoffset) escalonada de centro hacia afuera */}
            <g
              stroke="currentColor"
              strokeWidth={1}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            >
              {/* Contorno exterior: se dibuja primero, de un tiron */}
              <motion.circle
                {...BALL_OUTLINE}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.85, ease: [0.4, 0, 0.2, 1] }}
              />

              {BALL_PATHS.map(({ d, soft }, index) => (
                <motion.path
                  key={d}
                  d={d}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: soft ? 0.55 : 1 }}
                  transition={{
                    pathLength: {
                      duration: 0.5,
                      delay: 0.35 + index * 0.055,
                      ease: [0.4, 0, 0.2, 1],
                    },
                    opacity: { duration: 0.15, delay: 0.35 + index * 0.055 },
                  }}
                />
              ))}
            </g>

            {/* Relleno del pentagono central: entra al final, cuando
                el contorno ya termino de dibujarse */}
            <motion.path
              d={CENTER_PENTAGON_D}
              fill="currentColor"
              stroke="none"
              initial={{ fillOpacity: 0 }}
              animate={{ fillOpacity: 0.22 }}
              transition={{ duration: 0.5, delay: 1.35, ease: "easeOut" }}
            />
          </svg>
        </motion.div>
      </div>

      {/* Nombre completo apareciendo letra por letra */}
      <h1 className="flex flex-wrap justify-center px-6 font-mono text-[0.72rem] font-medium uppercase tracking-[0.42em] text-muted sm:text-sm">
        {NAME_LETTERS.map((letter, index) => (
          <motion.span
            key={`${letter}-${index}`}
            aria-hidden
            initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.35,
              delay: 0.95 + index * 0.032,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={letter === " " ? "w-[0.42em]" : undefined}
          >
            {letter === " " ? " " : letter}
          </motion.span>
        ))}
        <span className="sr-only">{profile.name}</span>
      </h1>

      {/* Linea de progreso minima bajo el nombre: se llena en el tiempo
          exacto del loader, sin porcentaje ni texto */}
      <motion.div
        aria-hidden
        className="h-px w-28 origin-left bg-accent/50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: LOADER_TOTAL_TIME / 1000, ease: [0.35, 0, 0.2, 1] }}
      />
    </motion.div>
  );
}
