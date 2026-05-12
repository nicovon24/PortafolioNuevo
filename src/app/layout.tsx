import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Nicolas Von Muhlinen | Full-stack IoT Developer",
  description:
    "Portfolio de Nicolas Von Muhlinen, desarrollador Full-stack IoT basado en Cordoba, Argentina.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
