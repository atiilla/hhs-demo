"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useTranslation } from "./language-provider"
import { motion, AnimatePresence } from "framer-motion"
import { Home, Layers, Wrench, FileText, Menu, X, CalendarCheck, Youtube, Book, ChevronDown, ChevronUp } from "lucide-react"
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
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

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
    { href: "/events", label: t("nav.events"), icon: <CalendarCheck className="h-5 w-5" /> },
    { href: "/projects", label: t("nav.projects"), icon: <Layers className="h-5 w-5" /> },
    { href: "/blog", label: t("nav.blog"), icon: <FileText className="h-5 w-5" /> },
  ]

  const navItemsFull = [
    { href: "/", label: t("nav.home"), icon: <Home className="h-5 w-5" /> },
    { href: "/events", label: t("nav.events"), icon: <CalendarCheck className="h-5 w-5" /> },
    { href: "/projects", label: t("nav.projects"), icon: <Layers className="h-5 w-5" /> },
    { href: "/blog", label: t("nav.blog"), icon: <FileText className="h-5 w-5" /> },
    { href: "/live", label: t("nav.live"), icon: <Youtube className="h-5 w-5" /> },
    {
      subItems:[
        {
          label: t("nav.competitions.title"),
          icon: <Book className="h-5 w-5" />
        },
        {
          href: "/competitions/code-jam", label: t("nav.competitions.codeJam"), icon: <Book className="h-5 w-5" />
        },
        {
          href: "/competitions/hackathon", label: t("nav.competitions.hackathon"), icon: <Book className="h-5 w-5" />
        }
      ]
    },
    {
      subItems: [
        {
          label: t("nav.hhs.title"),
          icon: <Book className="h-5 w-5" />
        },
        {
          href: "/philosophy", label: t("nav.hhs.philosophy"), icon: <Book className="h-5 w-5" />
        },
        {
          href: "/manifesto", label: t("nav.hhs.manifesto"), icon: <Book className="h-5 w-5" />
        },
        {
          href: "/team", label: t("nav.hhs.team"), icon: <Book className="h-5 w-5" />
        },
        {
          href: "/history", label: t("nav.hhs.history"), icon: <Book className="h-5 w-5" />
        },
        {
          href: "/contact", label: t("nav.hhs.contact"), icon: <Book className="h-5 w-5" />
        },
        {
          href: "/brand", label: t("nav.hhs.brand"), icon: <Book className="h-5 w-5" />
        },
        {
          href: "/stickers", label: t("nav.hhs.stickers"), icon: <Book className="h-5 w-5" />
        }
      ]
    }
  ]

  const toggleSubmenu = (id: string) => {
    setOpenSubmenu(openSubmenu === id ? null : id)
  }

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
                    {navItemsFull.map((item) => (
                      item.href ? (
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
                      ) : (
                        <div key={item.subItems?.[0]?.label || "submenu"} className="flex flex-col">
                          <button 
                            onClick={() => toggleSubmenu(item.subItems?.[0]?.label || "unknown")}
                            className="flex items-center justify-between py-2 text-lg font-medium text-muted-foreground transition-colors hover:text-primary"
                          >
                            <div className="flex items-center">
                              {item.icon || <Book className="h-5 w-5" />}
                              <span className="ml-2">{item.label || item.subItems?.[0]?.label}</span>
                            </div>
                            {openSubmenu === (item.subItems?.[0]?.label || "unknown") ? 
                              <ChevronUp className="h-4 w-4" /> : 
                              <ChevronDown className="h-4 w-4" />
                            }
                          </button>
                          
                          <AnimatePresence>
                            {openSubmenu === (item.subItems?.[0]?.label || "unknown") && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden pl-6"
                              >
                                {item.subItems?.slice(1).map(subItem => (
                                  subItem.href ? (
                                    <Link
                                      key={subItem.href}
                                      href={subItem.href}
                                      className={`flex items-center py-2 text-base font-medium transition-colors hover:text-primary ${
                                        pathname === subItem.href ? "text-primary" : "text-muted-foreground"
                                      }`}
                                    >
                                      {subItem.icon}
                                      <span className="ml-2">{subItem.label}</span>
                                    </Link>
                                  ) : (
                                    <div 
                                      key={subItem.label}
                                      className="flex items-center py-2 text-base font-semibold text-foreground"
                                    >
                                      {subItem.icon}
                                      <span className="ml-2">{subItem.label}</span>
                                    </div>
                                  )
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )
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
