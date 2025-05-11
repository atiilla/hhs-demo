"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Moon, Sun, Laptop, Sparkles, Terminal } from "lucide-react"
import { useTranslation } from "./language-provider"
import { useAppStore } from "@/lib/store"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme: setStoreTheme } = useAppStore()
  const { setTheme } = useTheme()
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted before accessing theme
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    setStoreTheme(newTheme)
  }

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" disabled>
        <Sun className="h-5 w-5" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">{t("settings.theme")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleThemeChange("light")} className={theme === "light" ? "bg-accent" : ""}>
          <Sun className="mr-2 h-4 w-4" />
          <span>{t("settings.themes.light")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("dark")} className={theme === "dark" ? "bg-accent" : ""}>
          <Moon className="mr-2 h-4 w-4" />
          <span>{t("settings.themes.dark")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("system")} className={theme === "system" ? "bg-accent" : ""}>
          <Laptop className="mr-2 h-4 w-4" />
          <span>{t("settings.themes.system")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange("cyberwave")}
          className={theme === "cyberwave" ? "bg-accent" : ""}
        >
          <Sparkles className="mr-2 h-4 w-4" />
          <span>{t("settings.themes.cyberwave")}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeChange("hacker")} className={theme === "hacker" ? "bg-accent" : ""}>
          <Terminal className="mr-2 h-4 w-4" />
          <span>{t("settings.themes.hacker")}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
