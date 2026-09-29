import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Match the custom font sizes in globals.css so they never replace text colors.
const twMerge = extendTailwindMerge({
  extend: { theme: { text: ["micro", "mini", "section"] } },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
