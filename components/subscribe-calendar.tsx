"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Calendar, Copy, Check, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

export default function SubscribeCalendar() {
  const [copied, setCopied] = useState(false)
  const calendarUrl = "https://happyhacking.space/api/events.ics"

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(calendarUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Subscribe to Our Calendar
          </CardTitle>
          <CardDescription>Add our events to your calendar by subscribing to our ICS feed.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>Follow these steps to subscribe:</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>Copy the calendar URL below</li>
            <li>Open your calendar application</li>
            <li>Look for an option to add calendar by URL</li>
            <li>Paste the URL and save</li>
          </ol>

          <div className="flex items-center space-x-2 mt-4">
            <Input value={calendarUrl} readOnly className="flex-1" />
            <Button variant="outline" size="icon" onClick={handleCopyUrl}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span className="sr-only">Copy URL</span>
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" asChild>
            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center"
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Download Calendar File
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
