import type { Metadata } from "next";
import { ReactNode } from "react";
// import { Geist, Geist_Mono } from "next/font/google";
import { Inter, Poppins } from 'next/font/google'

import "./globals.css";

import Navbarpro from '@/components/layout/Navbar';
import BottomBar from '@/components/layout/Bottombar';

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

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html  lang="es">
      <body suppressHydrationWarning
        className="min-h-screen bg-background text-foreground font-body">
      
        {/* <div className="sticky top-0 z-50 bg-background">
          <div className="md:hidden">
            <Navbarpro />     
          </div>     
        </div> */}
    
        {children}

        {/* <div className="block md:hidden">
          <BottomBar />
        </div> */}
      </body>
    </html>
  );
}
