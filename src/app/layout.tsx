import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import TrailingCursor from "@/components/TrailingCursor";
import "@/styles/globals.css";

const nunitoSans = Nunito_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-nunito-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nicolas Von Muhlinen | Full-stack IoT Developer",
  description:
    "Portfolio de Nicolas Von Muhlinen, desarrollador Full-stack IoT basado en Cordoba, Argentina.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`scroll-smooth ${nunitoSans.variable}`}>
      <body className={`antialiased ${nunitoSans.className}`} suppressHydrationWarning>
        <TrailingCursor />
        {children}
      </body>
    </html>
  );
}
