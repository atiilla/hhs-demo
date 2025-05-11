"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { en } from "@/translations/en"
import { tr } from "@/translations/tr"
import { useAppStore } from "@/lib/store"

export type Language = "en" | "tr"

type TranslationContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { language, setLanguage: setStoreLanguage } = useAppStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // If no language is set in store, check browser language
    if (!language) {
      const browserLang = navigator.language.split("-")[0]
      if (browserLang === "tr") {
        changeLanguage("tr")
      } else {
        changeLanguage("en")
      }
    }
  }, [])

  const changeLanguage = (lang: Language) => {
    setStoreLanguage(lang)
  }

  const translations = {
    en,
    tr,
  }

  const t = (key: string) => {
    const keys = key.split(".")
    let value = translations[language]

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k]
      } else {
        return key // Return the key if translation not found
      }
    }

    return value as string
  }

  return (
    <TranslationContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {mounted ? children : null}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a LanguageProvider")
  }
  return context
}
