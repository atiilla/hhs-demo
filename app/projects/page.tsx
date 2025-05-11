"use client"

import { useState } from "react"
import { useTranslation } from "@/components/language-provider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, ArrowUpRight, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const projects = [
  {
    id: 1,
    title: "Open Source Drone",
    description: "A fully autonomous drone built with open source hardware and software",
    image: "/projects/open-source-and-open.jpg",
    tags: ["hardware", "robotics", "3D printing"],
    author: "Happy Hacking Space",
    likes: 42,
    views: 1024,
  },
  {
    id: 2,
    title: "AI-Powered Plant Monitor",
    description: "Smart plant monitoring system using machine learning to optimize growth",
    image: "/projects/smart-farming-with-agriculture-iot.jpg",
    tags: ["IoT", "AI", "agriculture"],
    author: "Happy Hacking Space",
    likes: 38,
    views: 876,
  },
  {
    id: 3,
    title: "Cybersecurity Training Kit",
    description: "Educational toolkit for learning ethical hacking and network security",
    image: "/projects/futuristic-smart-city-with-5g-global-network-technology.jpg",
    tags: ["security", "education", "networking"],
    author: "Happy Hacking Space",
    likes: 56,
    views: 1532,
  },
  {
    id: 4,
    title: "Solar-Powered Weather Station",
    description: "Self-sufficient weather monitoring system with data visualization",
    image: "/projects/solar-powered-weather-station.webp",
    tags: ["renewable", "IoT", "data"],
    author: "Happy Hacking Space",
    likes: 29,
    views: 743,
  },
]

export default function ProjectsPage() {
  const { t, language } = useTranslation()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("all")
  
  // Extract all unique tags from projects
  const allTags = Array.from(
    new Set(projects.flatMap(project => project.tags))
  ).sort()

  const filteredProjects = projects.filter(
    (project) => {
      // Search query filter
      const matchesSearch = 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Tag filters
      const matchesTags = 
        selectedFilters.length === 0 || 
        project.tags.some(tag => selectedFilters.includes(tag));
      
      // Tab filter
      const matchesTab = 
        activeTab === "all" || 
        project.tags.some(tag => tag.toLowerCase() === activeTab.toLowerCase());
      
      return matchesSearch && matchesTags && matchesTab;
    }
  )

  const toggleFilter = (tag: string) => {
    setSelectedFilters(prev => 
      prev.includes(tag) 
        ? prev.filter(item => item !== tag)
        : [...prev, tag]
    )
  }

  const clearFilters = () => {
    setSelectedFilters([])
  }

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
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">{t("projects.title")}</h1>
          <p className="text-muted-foreground">{t("projects.subtitle")}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t("projects.search")}
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="sm:w-auto w-full">
                <Filter className="mr-2 h-4 w-4" />
                {t("projects.filter")}
                {selectedFilters.length > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {selectedFilters.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">Filter by tags</h4>
                {selectedFilters.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2">
                    <X className="h-4 w-4 mr-1" />
                    Clear
                  </Button>
                )}
              </div>
              <div className="space-y-4">
                {allTags.map(tag => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`filter-${tag}`} 
                      checked={selectedFilters.includes(tag)}
                      onCheckedChange={() => toggleFilter(tag)}
                    />
                    <Label htmlFor={`filter-${tag}`} className="text-sm cursor-pointer">
                      {tag}
                    </Label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-4 w-full sm:w-auto">
            <TabsTrigger value="all">{t("projects.tabs.all")}</TabsTrigger>
            <TabsTrigger value="hardware">{t("projects.tabs.hardware")}</TabsTrigger>
            <TabsTrigger value="software">{t("projects.tabs.software")}</TabsTrigger>
            <TabsTrigger value="education">{t("projects.tabs.education")}</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {filteredProjects.map((project) => (
                <motion.div key={project.id} variants={item}>
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="hardware">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {filteredProjects.map((project) => (
                <motion.div key={project.id} variants={item}>
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="software">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {filteredProjects.map((project) => (
                <motion.div key={project.id} variants={item}>
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="education">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {filteredProjects.map((project) => (
                <motion.div key={project.id} variants={item}>
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: any }) {
  const { t } = useTranslation()

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1">{project.title}</CardTitle>
        <CardDescription className="line-clamp-2">{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="text-sm text-muted-foreground">
          {t("projects.by")} {project.author}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          {project.likes} {t("projects.likes")} • {project.views} {t("projects.views")}
        </div>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/projects/${project.id}`}>
            <ArrowUpRight className="h-4 w-4 mr-1" />
            {t("projects.view")}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
