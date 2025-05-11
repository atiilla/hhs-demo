"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useAppStore } from "@/lib/store"
import { format } from "date-fns"

export default function NotificationBar() {
  const [isVisible, setIsVisible] = useState(false)
  const { events, fetchEvents } = useAppStore()
  const [lastEvent, setLastEvent] = useState<{
    title: string
    date: string
    location: string
    url: string
  } | null>(null)

  useEffect(() => {
    // Show notification after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 500)

    // Fetch past events if they don't exist
    if (events.past.length === 0) {
      fetchEvents("past", 1)
    }

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Get the most recent past event
    if (events.past.length > 0) {
      const event = events.past[0]
      
      // Format the date (e.g., DEC 06, FRIDAY)
      const eventDate = new Date(event.start_date.date)
      const formattedDate = format(eventDate, "MMM dd, EEEE").toUpperCase()
      
      setLastEvent({
        title: event.name,
        date: formattedDate,
        location: event.venue?.name || "Online Event",
        url: `https://happyhackingspace.vercel.app/events/${event.slug}`
      })
    }
  }, [events.past])

  if (!isVisible || !lastEvent) return null

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
        href={lastEvent.url}
      >
        <span className="underline underline-offset-4">Last event:</span>
        <span>
          {lastEvent.title} - {lastEvent.date} @ {lastEvent.location}
        </span>
      </Link>
    </motion.div>
  )
}
