"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface NotificationBarProps {
  eventTitle: string
  eventDate: string
  eventLocation: string
  eventUrl: string
}

export default function NotificationBar({ eventTitle, eventDate, eventLocation, eventUrl }: NotificationBarProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Show notification after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-center h-10 font-semibold px-2 border border-input bg-primary text-primary-foreground"
    >
      <Link
        className="after:content-['_↗'] truncate space-x-2 hover:underline"
        rel="noopener noreferrer"
        target="_blank"
        href={eventUrl}
      >
        <span className="underline underline-offset-4">Last event:</span>
        <span>
          {eventTitle} - {eventDate} @ {eventLocation}
        </span>
      </Link>
    </motion.div>
  )
}
