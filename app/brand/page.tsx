"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download } from "lucide-react"
import Logo from "@/components/logo"
import Image from "next/image"
import { useTranslation } from "@/components/language-provider"

export default function BrandPage() {
  const { t } = useTranslation()
  
  // Fallback lists in case the translation structure isn't as expected
  const dosListFallback = [
    "Maintain clear space around the logo",
    "Use approved color variations",
    "Maintain aspect ratio when resizing",
    "Use the logo on appropriate backgrounds that provide sufficient contrast"
  ]
  
  const dontsListFallback = [
    "Distort or stretch the logo",
    "Apply effects like shadows or glows",
    "Use unapproved colors",
    "Place on backgrounds with low contrast",
    "Modify or rearrange logo elements"
  ]
  
  // Helper function to safely get arrays from translations
  const getTranslationArray = (key: string, fallback: string[]): string[] => {
    const value = t(key)
    return Array.isArray(value) ? value : fallback
  }
  
  const dosList = getTranslationArray("brand.usage.dosList", dosListFallback)
  const dontsList = getTranslationArray("brand.usage.dontsList", dontsListFallback)
  
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-6">{t("brand.title")}</h1>
        <p className="text-xl text-muted-foreground mb-12">
          {t("brand.subtitle")}
        </p>

        <Tabs defaultValue="logo" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="logo">{t("brand.tabs.logo")}</TabsTrigger>
            <TabsTrigger value="colors">{t("brand.tabs.colors")}</TabsTrigger>
            <TabsTrigger value="typography">{t("brand.tabs.typography")}</TabsTrigger>
            <TabsTrigger value="usage">{t("brand.tabs.usage")}</TabsTrigger>
          </TabsList>

          <TabsContent value="logo" className="mt-6">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">{t("brand.logo.primary")}</h2>
                <div className="bg-card border rounded-lg p-8 flex justify-center items-center">
                  <div className="">
                    <Logo size="lg" />
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    {t("brand.logo.download")}
                  </Button>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">{t("brand.logo.variations")}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-card border rounded-lg p-6 flex flex-col items-center">
                    <div className="w-32 h-32 relative mb-3">
                      <Image 
                        src="/assets/hhs.avif" 
                        alt="HHS Logo" 
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-sm text-center">{t("brand.logo.default")}</p>
                  </div>
                  <div className="bg-black border rounded-lg p-6 flex flex-col items-center">
                    <div className="w-32 h-32 relative mb-3">
                      <Image 
                        src="/assets/hhs-white.avif" 
                        alt="HHS White Logo" 
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-sm text-center text-white">{t("brand.logo.white")}</p>
                  </div>
                  <div className="bg-white border rounded-lg p-6 flex flex-col items-center">
                    <div className="w-32 h-32 relative mb-3">
                      <Image 
                        src="/assets/hhs-black.avif" 
                        alt="HHS Black Logo" 
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-sm text-center">{t("brand.logo.black")}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold mb-4">{t("brand.logo.icons")}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-card border rounded-lg p-6 flex flex-col items-center">
                    <div className="w-32 h-32 relative mb-3">
                      <Image 
                        src="/assets/icon-192x192.png" 
                        alt="Small Icon" 
                        width={192}
                        height={192}
                        className="object-contain"
                      />
                    </div>
                    <p className="text-sm text-center">192 x 192 px</p>
                  </div>
                  <div className="bg-card border rounded-lg p-6 flex flex-col items-center">
                    <div className="w-32 h-32 relative mb-3">
                      <Image 
                        src="/assets/icon-512x512.png" 
                        alt="Large Icon" 
                        width={512}
                        height={512}
                        className="object-contain"
                      />
                    </div>
                    <p className="text-sm text-center">512 x 512 px</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="colors" className="mt-6">
            <div className="space-y-8">
              <h2 className="text-2xl font-bold mb-4">{t("brand.colors.palette")}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-black p-6 rounded-lg h-32 flex flex-col justify-between">
                  <span className="text-white font-medium">{t("brand.colors.black")}</span>
                  <div className="text-white text-sm">
                    <p>#000000</p>
                    <p>RGB: 0, 0, 0</p>
                  </div>
                </div>
                <div className="bg-white border p-6 rounded-lg h-32 flex flex-col justify-between">
                  <span className="font-medium">{t("brand.colors.white")}</span>
                  <div className="text-sm">
                    <p>#FFFFFF</p>
                    <p>RGB: 255, 255, 255</p>
                  </div>
                </div>
                <div className="bg-[#3f51b5] p-6 rounded-lg h-32 flex flex-col justify-between">
                  <span className="text-white font-medium">{t("brand.colors.primary")}</span>
                  <div className="text-white text-sm">
                    <p>#3f51b5</p>
                    <p>RGB: 63, 81, 181</p>
                  </div>
                </div>
                <div className="bg-[#f44336] p-6 rounded-lg h-32 flex flex-col justify-between">
                  <span className="text-white font-medium">{t("brand.colors.accent")}</span>
                  <div className="text-white text-sm">
                    <p>#f44336</p>
                    <p>RGB: 244, 67, 54</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="typography" className="mt-6">
            <div className="space-y-8">
              <h2 className="text-2xl font-bold mb-4">{t("brand.typography.title")}</h2>
              <div className="space-y-6">
                <div className="border p-6 rounded-lg">
                  <h3 className="text-xl mb-3 font-bold">Inter</h3>
                  <p className="text-muted-foreground mb-4">{t("brand.typography.primaryFont")}</p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm text-muted-foreground mb-2">{t("brand.typography.heading1")}</h4>
                      <p className="text-4xl font-bold">{t("brand.typography.sample")}</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-muted-foreground mb-2">{t("brand.typography.heading2")}</h4>
                      <p className="text-2xl font-bold">{t("brand.typography.sample")}</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-muted-foreground mb-2">{t("brand.typography.body")}</h4>
                      <p>{t("brand.typography.sample")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="usage" className="mt-6">
            <div className="space-y-8">
              <h2 className="text-2xl font-bold mb-4">{t("brand.usage.guidelines")}</h2>
              <div className="space-y-6">
                <div className="border p-6 rounded-lg">
                  <h3 className="text-xl mb-3 font-bold">{t("brand.usage.dos")}</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {dosList.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="border p-6 rounded-lg">
                  <h3 className="text-xl mb-3 font-bold">{t("brand.usage.donts")}</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {dontsList.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}
