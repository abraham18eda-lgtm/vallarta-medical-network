import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { Inter, Poppins } from 'next/font/google'

import "./globals.css";

export const metadata: Metadata = {
  title: "Vallarta Medical Center",
  description: "Encuentra personas especialidades",
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body'
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400','500','600','700'],
  variable: '--font-title'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html  lang="es">
      <body suppressHydrationWarning
        className="min-h-screen bg-background text-foreground font-body">
        {children}
      </body>
    </html>
  );
}
