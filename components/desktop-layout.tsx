"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { useTranslation } from "./language-provider"
import { motion } from "framer-motion"
import { ThemeToggle } from "./theme-toggle"
import { LanguageSwitcher } from "./language-switcher"
import Logo from "./logo"
import Footer from "./footer"
import { ChevronDown } from "lucide-react"
import NotificationBar from "./notification-bar"

export default function DesktopLayout({ children }: { children: React.ReactNode }) {
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

  return (
    <div className="flex flex-col min-h-screen">
      {/* Desktop Header */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-200 ${
          isScrolled ? "bg-background/80 backdrop-blur-md shadow-sm" : "bg-background"
        }`}
      >
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
            {/* <span className="font-bold hidden sm:inline-block">Happy Hacking Space</span> */}
          </Link>

          <div className="flex-1 flex justify-center">
            <nav className="hidden md:flex items-center justify-center flex-wrap h-10">
              <NavItem href="/" label={t("nav.home")} isActive={pathname === "/"} />
              <NavSeparator />

              <NavItem href="/projects" label={t("nav.projects")} isActive={pathname === "/projects"} />
              <NavSeparator />

              <NavItem href="/events" label={t("nav.events")} isActive={pathname === "/events"} />
              <NavSeparator />

              <NavDropdown
                label={t("nav.competitions.title")}
                items={[
                  { href: "/events/happy-hacking-space-competitions-code-jam-181925-f02a63d8", label: t("nav.competitions.codeJam") },
                  { href: "/events/hackathon-cultural-heritage-and-digitalization-1c617d99", label: t("nav.competitions.hackathon") },
                ]}
              />
              <NavSeparator />

              <NavItem href="/live" label={t("nav.live")} isActive={pathname === "/live"} />
              <NavSeparator />

              <NavDropdown
                label="HHS"
                items={[
                  { href: "/philosophy", label: t("nav.hhs.philosophy") },
                  { href: "/manifesto", label: t("nav.hhs.manifesto") },
                  { href: "/team", label: t("nav.hhs.team") },
                  { href: "/history", label: t("nav.hhs.history") },
                  { href: "/contact", label: t("nav.hhs.contact") },
                  { href: "/brand", label: t("nav.hhs.brand") },
                  { href: "/stickers", label: t("nav.hhs.stickers") },
                ]}
              />
              <NavSeparator />

              <NavItem href="https://happyhackingspace.blog/" label={t("nav.blog")} isActive={false} />
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {isMounted && (
              <>
                <LanguageSwitcher />
                <ThemeToggle />
              </>
            )}
          </div>
        </div>
      </header>

      {/* Notification Bar */}
      <NotificationBar
        eventTitle="Hackathon: Cultural Heritage and Digitalization"
        eventDate="DEC 06, FRIDAY"
        eventLocation="Diyarbakir Chamber of Commerce and Industry"
        eventUrl="https://kommunity.com/diyarbakir-happy-hacking-space/events/hackathon-cultural-heritage-and-digitalization-1c617d99"
      />

      {/* Main Content */}
      <main className="flex-1">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}

function NavItem({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 capitalize relative text-base px-2"
    >
      {label}
      {isActive && (
        <div className="absolute inset-0 top-[calc(100%)] z-20 h-[1px] w-full bg-primary" style={{ opacity: 1 }} />
      )}
    </Link>
  )
}

function NavSeparator() {
  return <span className="mx-2 text-gray-500">|</span>
}

function NavDropdown({ label, items }: { label: string; items: { href: string; label: string }[] }) {
  return (
    <div className="group relative">
      <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 py-2 capitalize relative text-base px-2 group-hover:bg-accent z-20">
        {label}
        <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
      </button>
      <div className="invisible group-hover:visible absolute left-0 top-full z-50 min-w-[8rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="relative flex w-full select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
