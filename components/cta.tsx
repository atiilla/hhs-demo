"use client"

import { useTranslation } from "./language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export default function CTA() {
  const { t } = useTranslation()

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
      <motion.div
        className="container px-4 md:px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("cta.title")}</h2>
            <p className="mx-auto max-w-[700px] md:text-xl">{t("cta.subtitle")}</p>
          </div>
          <div className="w-full max-w-sm space-y-2">
            <form className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="email"
                placeholder={t("cta.emailPlaceholder")}
                className="bg-primary-foreground text-primary placeholder:text-muted-foreground"
              />
              <Button type="submit" variant="secondary">
                {t("cta.subscribe")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
            <p className="text-xs text-primary-foreground/80">{t("cta.privacyNotice")}</p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
