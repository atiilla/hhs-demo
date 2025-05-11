"use client"

import React, { useEffect, useMemo } from "react"
import { useTranslation } from "@/components/language-provider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, ArrowRight, Calendar, MapPin, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import SubscribeCalendar from "@/components/subscribe-calendar"
import { useAppStore } from "@/lib/store"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function EventsPage() {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = React.useState("")
  
  // Use Zustand store with the updated structure
  const { 
    events, 
    loading, 
    fetchEvents, 
    activeTab, 
    setActiveTab, 
    currentPage, 
    setCurrentPage,
    totalPages 
  } = useAppStore()

  useEffect(() => {
    // Fetch events when component mounts or when activeTab/page changes
    fetchEvents(activeTab, currentPage)
  }, [fetchEvents, activeTab, currentPage])

  // Safely access events arrays
  const upcomingEvents = events?.upcoming || []
  const pastEvents = events?.past || []

  // Use useMemo for filtered events to improve performance
  const filteredEvents = useMemo(() => {
    const currentEvents = activeTab === "upcoming" ? upcomingEvents : pastEvents;
    
    return currentEvents.filter(
      (event) =>
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.detail && event.detail.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (event.venue && event.venue.name && event.venue.name.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }, [upcomingEvents, pastEvents, activeTab, searchQuery])

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleTabChange = (tab: "upcoming" | "past") => {
    setActiveTab(tab)
    setCurrentPage(1) // Reset to first page when changing tabs
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

  if (loading && upcomingEvents.length === 0 && pastEvents.length === 0) {
    return (
      <div className="container mx-auto py-8 px-4 md:px-6 flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse">{t("events.loading")}</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">{t("events.title")}</h1>
          <p className="text-muted-foreground">{t("events.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t("events.search")}
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex">
                <Tabs defaultValue={activeTab} onValueChange={(value) => handleTabChange(value as "upcoming" | "past")}>
                  <TabsList>
                    <TabsTrigger value="upcoming">{t("events.upcoming")}</TabsTrigger>
                    <TabsTrigger value="past">{t("events.past")}</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <motion.div key={event.slug} variants={item}>
                    <EventCard event={event} />
                  </motion.div>
                ))
              ) : (
                <p>
                  {activeTab === "upcoming" 
                    ? t("events.noUpcoming") 
                    : t("events.noPast")}
                </p>
              )}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center mt-6">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  {t("events.pagination.previous")}
                </Button>
                
                <span className="text-sm">
                  {t("events.pagination.page")} {currentPage} {t("events.pagination.of")} {totalPages}
                </span>
                
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  {t("events.pagination.next")}
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t("events.calendarTitle")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {t("events.calendarSubtitle")}
                </p>
                <div className="space-y-4">
                  {upcomingEvents.slice(0, 3).map((event) => (
                    <div key={event.slug} className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-md">
                        <Calendar className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <Link href={`/events/${event.slug}`}>
                          <p className="text-sm font-medium">{event.name}</p>
                        </Link>
                        <p className="text-xs text-muted-foreground">{event.start_date_humanity?.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => setActiveTab("upcoming")}>
                  {t("events.viewAllEvents")}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <SubscribeCalendar />
          </div>
        </div>
      </div>
    </div>
  )
}

interface EventCardProps {
  event: {
    slug: string;
    name: string;
    detail?: string;
    highlight_photo?: string;
    start_date?: { date: string };
    start_date_humanity?: { date: string };
    venue?: { name?: string; address?: string };
    users_count?: number;
    is_online?: boolean;
    [key: string]: any;
  }
}

function EventCard({ event }: EventCardProps) {
  const { t } = useTranslation()
  
  if (!event) return null;
  
  const [imageSrc, setImageSrc] = React.useState(event.highlight_photo || "/stickers/pixelated.webp");
  
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="aspect-video relative">
        <Image 
          src={imageSrc} 
          alt={event.name} 
          fill 
          className="object-cover" 
          onError={() => {
            setImageSrc("/stickers/pixelated.webp");
          }}
        />
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
            {event.is_online ? t("events.online") : (event.venue?.name || t("events.inPerson"))}
          </Badge>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-2">{event.name}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground line-clamp-3 mb-4">
          {event.detail ? (
            <span dangerouslySetInnerHTML={{ __html: event.detail.replace(/<[^>]*>/g, ' ').slice(0, 150) + '...' }} />
          ) : (
            t("events.eventCard.join")
          )}
        </p>
        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <time dateTime={event.start_date?.date}>{event.start_date_humanity?.date || t("events.eventCard.dateTBA")}</time>
          </div>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{(event.venue?.name || event.venue?.address) || t("events.eventCard.locationTBA")}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Users className="h-4 w-4 mr-2" />
            <span>{event.users_count || 0} {t("events.attendees")}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" className="w-full" asChild>
          <Link href={`/events/${event.slug}`}>
            {t("events.viewDetails")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
