import type { Metadata } from "next";
import { JetBrains_Mono, Manrope, Sora } from "next/font/google";
import dynamic from "next/dynamic";
import GrainOverlay from "@/components/ui/GrainOverlay";
import Loader from "@/components/ui/Loader";
import SideRails from "@/components/ui/SideRails";
import I18nProvider from "@/components/providers/I18nProvider";
import { LoaderProvider } from "@/components/providers/LoaderProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";
import "@/styles/globals.css";

// Decorativo y sin efecto en mobile (se autodesactiva en pointer:coarse): fuera del bundle inicial.
const TrailingCursor = dynamic(() => import("@/components/TrailingCursor"));

// Body text.
const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
});

// font-mono se usa en navbar, titulos, badges y botones. Sin esto caia a
// Cascadia Code/Consolas, que solo existen en Windows.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

// Display: nombre del hero y titulos H1.
const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

// Setea data-palette/data-mode antes de hidratar: evita flash de paleta/modo por defecto
// mientras ThemeProvider lee localStorage (mismo motivo que darkreader-lock mas abajo).
// Setea data-palette/data-mode antes de hidratar y, en la misma pasada, marca
// data-loader="pending" si el loader va a mostrarse: el CSS oculta #main/nav/footer
// desde el primer frame, para que el contenido no se vea antes que el loader.
const themeInitScript = `(function(){try{var d=document.documentElement;var p=localStorage.getItem("theme_palette")||"red";var m=localStorage.getItem("theme_mode")||"dark";d.dataset.palette=p;d.dataset.mode=m;if(sessionStorage.getItem("loader-seen")!=="1"){d.dataset.loader="pending";}}catch(e){}})();`;

export const metadata: Metadata = {
  title: "Nicolas Von Muhlinen | Full-stack Developer",
  description:
    "Portfolio de Nicolas Von Muhlinen, desarrollador Full-stack (frontend y backend) basado en Córdoba, Argentina. Proyectos en industrias diversas: software a medida, plataformas de datos, dashboards e IoT.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`scroll-smooth ${manrope.variable} ${jetbrainsMono.variable} ${sora.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={`antialiased ${manrope.className}`} suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only rounded-card border border-accent bg-background-deep px-4 py-2 font-mono text-sm text-accent focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-400"
        >
          Saltar al contenido
        </a>
        {/* LoaderProvider envuelve al Loader y al contenido: es el canal por el
            que el loader avisa que termino y las secciones destraban su entrada. */}
        <LoaderProvider>
          <Loader />
          <GrainOverlay />
          <ThemeProvider>
            <I18nProvider>
              <TrailingCursor />
              <SideRails />
              {children}
            </I18nProvider>
          </ThemeProvider>
        </LoaderProvider>
      </body>
    </html>
  );
}
