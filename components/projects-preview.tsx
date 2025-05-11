"use client"

import { useTranslation } from "./language-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useAppStore } from "@/lib/store"

export default function ProjectsPreview() {
  const { t, language } = useTranslation()
  const { featuredProjects } = useAppStore()

  // Map project IDs to their translation keys
  const projectTranslationKeys: Record<number, string> = {
    1: "openSourceDrone",
    2: "plantMonitor",
    3: "iotSmartCity",
    4: "securityKit",
    5: "weatherStation"
  }

  // Get translated project title and description based on the current language
  const getProjectTranslation = (project: any) => {
    const key = projectTranslationKeys[project.id]
    if (!key) {
      return {
        title: project.title,
        description: project.description
      }
    }

    return {
      title: t(`projectsPreview.projects.${key}.title`),
      description: t(`projectsPreview.projects.${key}.description`)
    }
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{t("projectsPreview.title")}</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("projectsPreview.subtitle")}
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {featuredProjects.map((project, index) => {
            const translatedProject = getProjectTranslation(project);
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Card className="overflow-hidden h-full flex flex-col">
                  <div className="aspect-video relative">
                    <Image src={project.image || "/placeholder.svg"} alt={translatedProject.title} fill className="object-cover" />
                  </div>
                  <CardContent className="flex-1 p-6">
                    <div className="space-y-2">
                      <h3 className="font-bold text-xl">{translatedProject.title}</h3>
                      <p className="text-muted-foreground">{translatedProject.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Button variant="ghost" asChild className="w-full">
                      <Link href={`/projects/${project.id}`}>
                        {t("projectsPreview.viewProject")}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-center mt-12">
          <Button asChild size="lg">
            <Link href="/projects">
              {t("projectsPreview.viewAll")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
