"use client"

import { useTranslation } from "@/components/language-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, Code, Cpu, FileText, Gauge, Lock, Wand2 } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const tools = [
  {
    id: "code-formatter",
    title: "Code Formatter",
    description: "Format your code with various language support",
    icon: <Code className="h-6 w-6" />,
    category: "development",
    url: "/tools/code-formatter",
  },
  {
    id: "password-generator",
    title: "Password Generator",
    description: "Generate secure passwords with custom settings",
    icon: <Lock className="h-6 w-6" />,
    category: "security",
    url: "/tools/password-generator",
  },
  {
    id: "unit-converter",
    title: "Unit Converter",
    description: "Convert between different units of measurement",
    icon: <Calculator className="h-6 w-6" />,
    category: "utility",
    url: "/tools/unit-converter",
  },
  {
    id: "markdown-editor",
    title: "Markdown Editor",
    description: "Write and preview markdown in real-time",
    icon: <FileText className="h-6 w-6" />,
    category: "development",
    url: "/tools/markdown-editor",
  },
  {
    id: "image-optimizer",
    title: "Image Optimizer",
    description: "Optimize images for web without quality loss",
    icon: <Wand2 className="h-6 w-6" />,
    category: "utility",
    url: "/tools/image-optimizer",
  },
  {
    id: "network-speed-test",
    title: "Network Speed Test",
    description: "Test your internet connection speed",
    icon: <Gauge className="h-6 w-6" />,
    category: "utility",
    url: "/tools/network-speed-test",
  },
  {
    id: "hardware-benchmark",
    title: "Hardware Benchmark",
    description: "Benchmark your device's hardware performance",
    icon: <Cpu className="h-6 w-6" />,
    category: "utility",
    url: "/tools/hardware-benchmark",
  },
]

export default function ToolsPage() {
  const { t } = useTranslation()

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
          <h1 className="text-3xl font-bold tracking-tight">{t("tools.title")}</h1>
          <p className="text-muted-foreground">{t("tools.subtitle")}</p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4 w-full sm:w-auto">
            <TabsTrigger value="all">{t("tools.tabs.all")}</TabsTrigger>
            <TabsTrigger value="development">{t("tools.tabs.development")}</TabsTrigger>
            <TabsTrigger value="utility">{t("tools.tabs.utility")}</TabsTrigger>
            <TabsTrigger value="security">{t("tools.tabs.security")}</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {tools.map((tool) => (
                <motion.div key={tool.id} variants={item}>
                  <ToolCard tool={tool} />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          {/* Other tab contents would filter by category */}
        </Tabs>
      </div>
    </div>
  )
}

function ToolCard({ tool }) {
  return (
    <Link href={tool.url}>
      <Card className="h-full transition-all hover:shadow-md hover:border-primary/50">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-primary/10 p-2 text-primary">{tool.icon}</div>
            <CardTitle>{tool.title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base">{tool.description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  )
}
