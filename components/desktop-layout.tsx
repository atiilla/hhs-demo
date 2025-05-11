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
import { ChevronDown, Github, Instagram, Linkedin, Mail, Twitter, Youtube } from "lucide-react"
import NotificationBar from "./notification-bar"
// import Footer from "./footer"

export default function DesktopLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { t } = useTranslation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const SOCIAL_LINKS = [
    {
      icon: "X",
      tooltip: "X/Twitter",
      href: "https://x.com/happyhackings",
    },
    {
      icon: "I",
      tooltip: "Instagram",
      href: "https://instagram.com/happyhackingspace",
    },
    {
      icon: "L",
      tooltip: "LinkedIn",
      href: "https://linkedin.com/company/happy-hacking-space",
    },
    {
      icon: "G",
      tooltip: "GitHub",
      href: "https://github.com/HappyHackingSpace",
    },
    {
      icon: "M",
      tooltip: "Medium",
      href: "https://medium.com/happy-hacking-space",
    },
    {
      icon: "Y",
      tooltip: "YouTube",
      href: "https://www.youtube.com/@HappyHackingSpace",
    }
  ];

  const currentYear = new Date().getFullYear()

  const renderSocialIcon = (icon: string) => {
    switch (icon) {
      case "X": return <Twitter className="h-5 w-5" />;
      case "I": return <Instagram className="h-5 w-5" />;
      case "L": return <Linkedin className="h-5 w-5" />;
      case "G": return <Github className="h-5 w-5" />;
      case "M": return <Mail className="h-5 w-5" />; // Using Mail for Medium as there's no direct Medium icon
      case "Y": return <Youtube className="h-5 w-5" />;
      default: return null;
    }
  };

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
      <footer className="w-full border-t bg-background">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Happy Hacking Space</h3>
            <p className="text-sm text-muted-foreground max-w-xs">{t("footer.description")}</p>
            <div className="flex gap-4 mt-4">
              {SOCIAL_LINKS.map((social, index) => (
                <Link 
                  key={index}
                  href={social.href} 
                  className="text-muted-foreground hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {renderSocialIcon(social.icon)}
                  <span className="sr-only">{social.tooltip}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.links")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-sm text-muted-foreground hover:text-primary">
                  {t("nav.projects")}
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-sm text-muted-foreground hover:text-primary">
                  {t("nav.tools")}
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-sm text-muted-foreground hover:text-primary">
                  {t("nav.events")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.resources")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">
                  {t("footer.blog")}
                </Link>
              </li>
              <li>
                <Link href="/tutorials" className="text-sm text-muted-foreground hover:text-primary">
                  {t("footer.tutorials")}
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary">
                  {t("footer.faq")}
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-sm text-muted-foreground hover:text-primary">
                  {t("footer.community")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{t("footer.legal")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                  {t("footer.terms")}
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-muted-foreground hover:text-primary">
                  {t("footer.cookies")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} Happy Hacking Space. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
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
