"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card} from "@/components/ui/card"
import { useTranslation } from "@/components/language-provider"

export default function LivePage() {
  const { t } = useTranslation()
 
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold mb-6">{t("live.title")}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3">
            <Card className="overflow-hidden">
              <div className="relative aspect-video bg-black">
                <div className="absolute inset-0 flex items-center justify-center">
                  <iframe
                    src="https://player.kick.com/xqc"
                    className="w-full h-full"
                    allowFullScreen
                    title="Kick Player"
                  />
                </div>
              </div>

            </Card>

          </div>


        </div>
      </motion.div>
    </div>
  )
}
