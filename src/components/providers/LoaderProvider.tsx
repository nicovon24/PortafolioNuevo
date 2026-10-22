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
 * Arranca en `false` tanto en servidor como en cliente para evitar diferencias
 * de hidratacion. Loader lo cambia a `true` al montar si ya se vio la entrada.
 */
export function LoaderProvider({ children }: { children: ReactNode }) {
  // El primer render debe coincidir en servidor y cliente. Loader marca ready
  // despues del montaje cuando la sesion ya vio la introduccion.
  const [ready, setReady] = useState(false);

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
