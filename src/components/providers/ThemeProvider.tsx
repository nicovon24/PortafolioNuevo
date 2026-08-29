"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

export type ThemePalette = "blue" | "ocean" | "lime" | "red";
export type ThemeMode = "dark" | "light";

const PALETTE_STORAGE_KEY = "theme_palette";
const MODE_STORAGE_KEY = "theme_mode";
const DEFAULT_PALETTE: ThemePalette = "red";
const DEFAULT_MODE: ThemeMode = "dark";

type ThemeContextValue = {
  palette: ThemePalette;
  mode: ThemeMode;
  setPalette: (palette: ThemePalette) => void;
  toggleMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(palette: ThemePalette, mode: ThemeMode) {
  const root = document.documentElement;
  root.dataset.palette = palette;
  root.dataset.mode = mode;
}

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [palette, setPaletteState] = useState<ThemePalette>(DEFAULT_PALETTE);
  const [mode, setModeState] = useState<ThemeMode>(DEFAULT_MODE);

  useEffect(() => {
    const savedPalette = localStorage.getItem(PALETTE_STORAGE_KEY) as ThemePalette | null;
    const savedMode = localStorage.getItem(MODE_STORAGE_KEY) as ThemeMode | null;
    const nextPalette = savedPalette ?? DEFAULT_PALETTE;
    const nextMode = savedMode ?? DEFAULT_MODE;
    setPaletteState(nextPalette);
    setModeState(nextMode);
    applyTheme(nextPalette, nextMode);
  }, []);

  const setPalette = useCallback((next: ThemePalette) => {
    setPaletteState(next);
    localStorage.setItem(PALETTE_STORAGE_KEY, next);
    applyTheme(next, mode);
  }, [mode]);

  const toggleMode = useCallback(() => {
    setModeState((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem(MODE_STORAGE_KEY, next);
      applyTheme(palette, next);
      return next;
    });
  }, [palette]);

  return (
    <ThemeContext.Provider value={{ palette, mode, setPalette, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
