"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme, type ThemePalette } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

const PALETTES: Array<{ key: ThemePalette; label: string; swatch: string }> = [
  { key: "ocean", label: "Ocean", swatch: "#2dd4bf" },
  { key: "blue", label: "Blue", swatch: "#57c7ff" },
  { key: "lime", label: "Lime", swatch: "#bef264" },
  { key: "red", label: "Red", swatch: "#d63a3a" },
];

export default function ThemeControls() {
  const { palette, mode, setPalette, toggleMode } = useTheme();

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-1 rounded-full border border-line p-1">
        {PALETTES.map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => setPalette(p.key)}
            aria-label={`Paleta ${p.label}`}
            title={p.label}
            className={cn(
              "size-4.5 rounded-full transition-transform",
              palette === p.key ? "ring-2 ring-ink ring-offset-1 ring-offset-panel-strong" : "opacity-70 hover:opacity-100",
            )}
            style={{ backgroundColor: p.swatch }}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={toggleMode}
        aria-label={mode === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        title={mode === "dark" ? "Modo claro" : "Modo oscuro"}
        className="grid size-9 place-items-center rounded-full border border-line bg-accent/4 text-accent transition-colors hover:border-accent-2 hover:bg-accent-2/12 hover:text-accent-2"
      >
        {mode === "dark" ? <Sun size={16} /> : <Moon size={16} />}
      </button>
    </div>
  );
}
