"use client"

import { useTranslation } from "@/components/language-provider"

export default function Loading() {
  const { t } = useTranslation()
  
  return (
    <div className="container mx-auto py-8 px-4 md:px-6 flex justify-center items-center min-h-[50vh]">
      <div className="animate-pulse">{t("events.loading")}</div>
    </div>
  )
}
