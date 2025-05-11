"use client"

import { useTranslation } from "./language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Code, Lock, Calculator } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function ToolsPreview() {
  const { t } = useTranslation()

  const featuredTools = [
    {
      id: "code-formatter",
      title: "Code Formatter",
      description: "Format your code with various language support",
      icon: <Code className="h-6 w-6" />,
      url: "/tools/code-formatter",
    },
    {
      id: "password-generator",
      title: "Password Generator",
      description: "Generate secure passwords with custom settings",
      icon: <Lock className="h-6 w-6" />,
      url: "/tools/password-generator",
    },
    {
      id: "unit-converter",
      title: "Unit Converter",
      description: "Convert between different units of measurement",
      icon: <Calculator className="h-6 w-6" />,
      url: "/tools/unit-converter",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t("toolsPreview.title")}</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("toolsPreview.subtitle")}
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 mt-12">
          {featuredTools.map((tool, index) => (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Link href={tool.url} className="block h-full">
                <Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="rounded-md bg-primary/10 p-2 text-primary">{tool.icon}</div>
                      <CardTitle>{tool.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{tool.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button asChild size="lg">
            <Link href="/tools">
              {t("toolsPreview.viewAll")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
