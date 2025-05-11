"use client"

import { useTranslation } from "./language-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Users, Lightbulb, Rocket } from "lucide-react"
import { motion } from "framer-motion"

export default function Features() {
  const { t } = useTranslation()

  const features = [
    {
      icon: <Users className="h-10 w-10" />,
      title: t("features.community.title"),
      description: t("features.community.description"),
    },
    {
      icon: <Code className="h-10 w-10" />,
      title: t("features.technology.title"),
      description: t("features.technology.description"),
    },
    {
      icon: <Lightbulb className="h-10 w-10" />,
      title: t("features.innovation.title"),
      description: t("features.innovation.description"),
    },
    {
      icon: <Rocket className="h-10 w-10" />,
      title: t("features.collaboration.title"),
      description: t("features.collaboration.description"),
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
              {t("features.badge")}
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t("features.title")}</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("features.subtitle")}
            </p>
          </div>
        </div>

        <motion.div
          className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full">
                <CardHeader>
                  <div className="p-2 rounded-md bg-primary/10 w-fit text-primary">{feature.icon}</div>
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
