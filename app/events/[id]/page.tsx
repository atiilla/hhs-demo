"use client"

import React, { useEffect, useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Clock, MapPin, Users, Share2, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useAppStore } from "@/lib/store"
import { getEvent, EventData as ApiEventData } from "@/lib/api"
import { useTranslation } from "@/components/language-provider"

interface DateObject {
  date: string;
  timezone?: {
    timezone_type: number;
    timezone: string;
  };
}

export default function EventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { t } = useTranslation()
  
  // Use Zustand store
  const { currentEvent, loading, fetchEvent } = useAppStore()
  
  // Add direct state as fallback
  const [directEvent, setDirectEvent] = useState<ApiEventData | null>(null)
  const [directLoading, setDirectLoading] = useState(false)
  const [imageSrc, setImageSrc] = useState("/stickers/pixelated.webp")
  
  // Use the event from either source
  const eventData = currentEvent || directEvent
  const isLoading = loading || directLoading

  useEffect(() => {
    if (params.id) {
      const eventSlug = params.id.toString()
      
      // Try fetching via store
      fetchEvent(eventSlug)
      
      // Also try direct fetch as fallback
      const fetchDirectly = async () => {
        setDirectLoading(true)
        try {
          const data = await getEvent(eventSlug)
          console.log("Direct fetch result:", data)
          if (data) {
            setDirectEvent(data)
          }
        } catch (error) {
          console.error("Error in direct fetch:", error)
        } finally {
          setDirectLoading(false)
        }
      }
      
      fetchDirectly()
    }
  }, [params.id, fetchEvent])

  // Use useMemo for formatting date to improve performance
  const formatDate = useMemo(() => {
    return (dateString: string | DateObject | undefined) => {
      if (!dateString) return t("events.eventCard.dateTBA")
      // Return the date as is if it's already formatted
      if (typeof dateString === 'string') return dateString
      
      if (typeof dateString === 'object' && dateString.date) {
        return dateString.date
      }
      
      const date = new Date(String(dateString))
      return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(date)
    }
  }, [t])

  const getTimeFromDate = (dateObj?: DateObject) => {
    if (!dateObj || !dateObj.date) return null;
    
    // Try to extract time from the date string
    const dateStr = dateObj.date;
    const timeMatch = dateStr.match(/\d{2}:\d{2}:\d{2}/);
    
    if (timeMatch) {
      const timePart = timeMatch[0];
      const [hours, minutes] = timePart.split(':');
      return `${hours}:${minutes}`;
    }
    
    return null;
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 md:px-6 flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse">{t("events.detail.loadingEvent")}</div>
      </div>
    )
  }

  if (!eventData) {
    return (
      <div className="container mx-auto py-8 px-4 md:px-6 flex justify-center items-center min-h-[50vh]">
        <div>
          <p>{t("events.detail.eventNotFound")}</p>
          <Button variant="ghost" className="mt-4" asChild>
            <Link href="/events">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("events.backToEvents")}
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  // Extract time information
  const startTime = getTimeFromDate(eventData.start_date as DateObject);
  const endTime = getTimeFromDate(eventData.end_date as DateObject);
  const timeDisplay = startTime && endTime ? `${startTime} - ${endTime}` : null;

  // For debugging
  console.log("event detail:", eventData);

  return (
    <article className="container mx-auto py-8 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" className="mb-4" asChild>
          <Link href="/events">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("events.backToEvents")}
          </Link>
        </Button>

        <div className="mb-6">
          <Badge variant="outline" className="mb-2">
            {eventData.is_online ? t("events.online") : (eventData.venue?.name || t("events.inPerson"))}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{eventData.name}</h1>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2" />
              <time dateTime={eventData.start_date?.date}>
                {eventData.start_date_humanity?.date}
                {eventData.end_date_humanity?.date && eventData.end_date_humanity.date !== eventData.start_date_humanity.date && 
                  ` - ${eventData.end_date_humanity.date}`}
              </time>
            </div>
            {timeDisplay && (
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-4 w-4 mr-2" />
                <span>{timeDisplay}</span>
              </div>
            )}
            {eventData.venue?.name && (
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{eventData.venue.name}</span>
              </div>
            )}
            {eventData.users_count > 0 && (
              <div className="flex items-center text-muted-foreground">
                <Users className="h-4 w-4 mr-2" />
                <span>{eventData.users_count} {t("events.attendees")}</span>
              </div>
            )}
          </div>
        </div>

        {eventData.highlight_photo && (
          <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
            <Image 
              src={imageSrc} 
              alt={eventData.name} 
              fill 
              className="object-cover" 
              priority 
              sizes="(max-width: 768px) 100vw, 768px" 
              onError={() => setImageSrc("/stickers/pixelated.webp")}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2">
            <div
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: eventData.detail || '' }}
            />
          </div>

          <div className="space-y-6">
            <div className="bg-card rounded-lg border p-4">
              <h3 className="text-lg font-semibold mb-4">{t("events.detail.eventDetails")}</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium">{t("events.detail.eventInfo.date")}</p>
                  <p className="text-sm text-muted-foreground">
                    {eventData.start_date_humanity?.date}
                    {eventData.end_date_humanity?.date && 
                      eventData.end_date_humanity.date !== eventData.start_date_humanity.date && 
                      ` - ${eventData.end_date_humanity.date}`}
                    {timeDisplay && (
                      <>
                        <br />
                        {timeDisplay}
                      </>
                    )}
                  </p>
                </div>
                {eventData.venue && (
                  <div>
                    <p className="text-sm font-medium">{t("events.location")}</p>
                    <p className="text-sm text-muted-foreground">
                      {eventData.venue.name}
                      {eventData.venue.address && (
                        <>
                          <br />
                          {eventData.venue.address}
                        </>
                      )}
                    </p>
                  </div>
                )}
                {eventData.community && (
                  <div>
                    <p className="text-sm font-medium">{t("events.organizer")}</p>
                    <p className="text-sm text-muted-foreground">{eventData.community.name}</p>
                  </div>
                )}
                {eventData.calendar_links && (
                  <div>
                    <p className="text-sm font-medium">{t("events.detail.addToCalendar")}</p>
                    <div className="flex gap-2 mt-1">
                      <a
                        href={eventData.calendar_links.google}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline flex items-center"
                      >
                        {t("events.detail.googleCalendar")}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                      <a
                        href={eventData.calendar_links.ics}
                        download={`${eventData.name}.ics`}
                        className="text-sm text-primary hover:underline flex items-center"
                      >
                        {t("events.detail.ical")}
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Button className="w-full">{t("events.detail.registerForEvent")}</Button>
          </div>
        </div>

        <div className="flex justify-between items-center border-t pt-6">
          <Button variant="outline" asChild>
            <Link href="/events">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("events.backToEvents")}
            </Link>
          </Button>

          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
            <span className="sr-only">{t("events.share")}</span>
          </Button>
        </div>
      </div>
    </article>
  )
}
