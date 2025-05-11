import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import MobileLayout from "@/components/mobile-layout"
import DesktopLayout from "@/components/desktop-layout"
import GameOfLife from "@/components/game-of-life"
import KickIframe from "@/components/KickIframe"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Happy Hacking Space",
  description: "A community-driven, collaborative environment for technology enthusiasts",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <LanguageProvider>
            <GameOfLife />
            <div className="relative z-10">
              {/* Desktop layout (hidden on mobile) */}
              <div className="hidden md:block">
                <DesktopLayout>{children}</DesktopLayout>
              </div>

              {/* Mobile layout (hidden on desktop) */}
              <div className="block md:hidden">
                <MobileLayout>{children}</MobileLayout>
              </div>
              
              {/* Livestream component */}
              <KickIframe />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
