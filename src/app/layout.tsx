import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import TrailingCursor from "@/components/TrailingCursor";
import I18nProvider from "@/components/providers/I18nProvider";
import "@/styles/globals.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-nunito-sans",
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
    <html lang="es" className={`scroll-smooth ${nunitoSans.variable}`} suppressHydrationWarning>
      <body className={`antialiased ${nunitoSans.className}`} suppressHydrationWarning>
        <I18nProvider>
          <TrailingCursor />
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
