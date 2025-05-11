"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useTranslation } from "./language-provider"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Layers, Wrench, FileText, Menu, X } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Logo from "./logo"
import MobileNavbar from "./mobile-navbar"
import { ThemeToggle } from "./theme-toggle"
import { LanguageSwitcher } from "./language-switcher"
import NotificationBar from "./notification-bar"

export default function MobileLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { t } = useTranslation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/", label: t("nav.home"), icon: <Home className="h-5 w-5" /> },
    { href: "/projects", label: t("nav.projects"), icon: <Layers className="h-5 w-5" /> },
    { href: "/tools", label: t("nav.tools"), icon: <Wrench className="h-5 w-5" /> },
    { href: "/blog", label: t("nav.blog"), icon: <FileText className="h-5 w-5" /> },
  ]

  return (
    <div className="flex flex-col min-h-screen mobile-container">
      {/* Mobile Header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-background"
        }`}
      >
        <div className="flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo size="lg" />
            {/* <span className="font-bold text-sm">HHS</span> */}
          </Link>

          <div className="flex items-center gap-2">
            {isMounted && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="flex flex-col">
                  <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                      {/* <Logo size="lg" /> */}
                      {/* <span className="font-bold">HHS</span> */}
                    </Link>
                    {/* <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                    </SheetTrigger> */}
                  </div>

                  <nav className="mt-8 flex flex-col gap-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center py-2 text-lg font-medium transition-colors hover:text-primary ${
                          pathname === item.href ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {item.icon}
                        <span className="ml-2">{item.label}</span>
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-auto flex flex-col gap-4 pt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{t("settings.language")}</span>
                      <LanguageSwitcher />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{t("settings.theme")}</span>
                      <ThemeToggle />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </header>

      {/* Notification Bar */}
      <NotificationBar
        eventTitle="Hackathon: Cultural Heritage"
        eventDate="DEC 06"
        eventLocation="Diyarbakir"
        eventUrl="https://kommunity.com/diyarbakir-happy-hacking-space/events/hackathon-cultural-heritage-and-digitalization-1c617d99"
      />

      {/* Main Content */}
      <main className="flex-1 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNavbar items={navItems} />
    </div>
  )
}
