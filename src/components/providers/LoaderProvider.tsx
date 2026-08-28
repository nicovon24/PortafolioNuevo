"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type LoaderContextValue = {
  /** true cuando el loader ya termino y el contenido puede animar su entrada */
  ready: boolean;
  /** Lo llama el Loader al completar su salida */
  markReady: () => void;
};

const LoaderContext = createContext<LoaderContextValue>({
  ready: true,
  markReady: () => {},
});

/**
 * Coordina el loader con la entrada del contenido.
 *
 * El contenido no debe animar mientras el loader tapa la pantalla: si lo hace,
 * las animaciones se consumen detras del overlay y al levantarse el loader
 * la pagina ya esta quieta. `ready` es la senal que destraba esas entradas.
 *
 * Arranca en `false` solo si el loader va a mostrarse (primera visita de la
 * sesion). En visitas repetidas arranca en `true` para no retrasar nada.
 */
export function LoaderProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(() => {
    // SSR: asumimos que el loader se muestra, para no emitir markup con el
    // contenido ya visible y que despues parpadee al ocultarse.
    if (typeof window === "undefined") return false;
    return sessionStorage.getItem("loader-seen") === "1";
  });

  const markReady = useCallback(() => setReady(true), []);

  const value = useMemo(() => ({ ready, markReady }), [ready, markReady]);

  return <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>;
}

/** Lee el estado del loader. `ready` destraba las animaciones de entrada. */
export function useLoaderReady() {
  return useContext(LoaderContext).ready;
}

/** Handle que usa el Loader para avisar que termino. */
export function useLoaderControls() {
  const { markReady } = useContext(LoaderContext);
  return markReady;
}
