"use client"

import { useTranslation } from "./language-provider"
import { motion } from "framer-motion"
import Image from "next/image"

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section className="w-full py-12 md:py-12 lg:py-12 xl:py-12">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <motion.h1
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {t("hero.title")}
              </motion.h1>
              <motion.p
                className="max-w-[600px] text-muted-foreground md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {t("hero.subtitle")}
              </motion.p>
              <motion.p
                className="max-w-[600px] text-muted-foreground md:text-xl font-semibold mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {t("hero.whatIsHhs")}
              </motion.p>
              <motion.p
                className="max-w-[600px] text-muted-foreground md:text-lg mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {t("hero.hhsDescription")}
              </motion.p>
              
              <motion.p
                className="max-w-[600px] text-muted-foreground md:text-xl font-semibold mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {t("hero.whatIsHacking")}
              </motion.p>
              <motion.p
                className="max-w-[600px] text-muted-foreground md:text-lg mt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {t("hero.hackingDescription")}
              </motion.p>
              
              <motion.p
                className="max-w-[600px] text-muted-foreground md:text-lg italic mt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {t("hero.rmsQuote")}
              </motion.p>
            </div>
            {/* <motion.div
              className="flex flex-col gap-2 min-[400px]:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button asChild size="lg">
                <Link href="/projects">
                  {t("hero.cta.primary")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/about">{t("hero.cta.secondary")}</Link>
              </Button>
            </motion.div> */}
          </div>
          <motion.div
            className="flex items-start justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative w-full max-w-[900px] flex items-start justify-center">
              <Image
                src="/stickers/BELIEVEIT-01.webp"
                alt="Happy Hacking Space"
                width={900}
                height={900}
                className="w-full h-auto"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
