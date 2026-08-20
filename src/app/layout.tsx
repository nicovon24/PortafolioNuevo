import type { Metadata } from "next";
import { JetBrains_Mono, Nunito_Sans, Space_Grotesk } from "next/font/google";
import dynamic from "next/dynamic";
import GrainOverlay from "@/components/ui/GrainOverlay";
import Loader from "@/components/ui/Loader";
import I18nProvider from "@/components/providers/I18nProvider";
import "@/styles/globals.css";

// Decorativo y sin efecto en mobile (se autodesactiva en pointer:coarse): fuera del bundle inicial.
const TrailingCursor = dynamic(() => import("@/components/TrailingCursor"));

const nunitoSans = Nunito_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-nunito-sans",
  display: "swap",
});

// font-mono se usa en navbar, titulos, badges y botones. Sin esto caia a
// Cascadia Code/Consolas, que solo existen en Windows.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// Display: nombre del hero y titulos H1. Weight 700 unicamente.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nicolas Von Muhlinen | Full-stack Developer",
  description:
    "Portfolio de Nicolas Von Muhlinen, desarrollador Full-stack (frontend y backend) basado en Córdoba, Argentina. Proyectos en industrias diversas: software a medida, plataformas de datos, dashboards e IoT.",
  // Dark Reader looks for meta[name=darkreader-lock]; Next skips `other` values that are "", so content must be non-empty.
  other: {
    "darkreader-lock": "on",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`scroll-smooth ${nunitoSans.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body className={`antialiased ${nunitoSans.className}`} suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only rounded-card border border-accent bg-background-deep px-4 py-2 font-mono text-sm text-accent focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-400"
        >
          Saltar al contenido
        </a>
        <Loader />
        <GrainOverlay />
        <I18nProvider>
          <TrailingCursor />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
