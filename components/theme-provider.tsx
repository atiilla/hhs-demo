"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { useEffect } from "react"
import { useAppStore } from "@/lib/store"

export function ThemeProvider({ children }) {
  const { theme, setTheme } = useAppStore()

  // Sync theme from store to next-themes
  useEffect(() => {
    // Only set the theme from the store on client-side
    if (typeof window !== "undefined") {
      setTheme(theme)
    }
  }, [])

  return (
    <NextThemesProvider
      enableSystem
      enableColorScheme
      attribute="class"
      defaultTheme={theme}
      value={{
        light: "light",
        dark: "dark",
        system: "system",
        cyberwave: "cyberwave",
        hacker: "hacker",
      }}
      onValueChange={(newTheme) => setTheme(newTheme)}
    >
      {children}
    </NextThemesProvider>
  )
}
