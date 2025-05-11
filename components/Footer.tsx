"use client"

import Link from "next/link"
import { useTranslation } from "./language-provider"
import { Github, Twitter, Youtube, Mail, Instagram, Linkedin } from "lucide-react"

export const SOCIAL_LINKS = [
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

export default function Footer() {
  const { t } = useTranslation()

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

  return (
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
  )
}
