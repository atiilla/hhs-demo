import { NextResponse } from "next/server"
import ical from "ical-generator"

interface Venue {
  id: string
  name: string
  address: string
  lat: string
  lng: string
  is_zoom_active: boolean | null
}

interface EventData {
  id: string
  name: string
  detail: string
  start_date: { date: string }
  end_date: { date: string }
  venue: Venue
}

// Mock data for events
const events = [
  {
    id: "happy-hacking-space-competitions-code-jam-181925-f02a63d8",
    name: "Happy Hacking Space Competitions: Code Jam",
    detail: "A 48-hour coding competition to solve algorithmic challenges and win prizes.",
    start_date: { date: "2023-06-15T10:00:00Z" },
    end_date: { date: "2023-06-17T10:00:00Z" },
    venue: {
      id: "online",
      name: "Online Event",
      address: "",
      lat: "",
      lng: "",
      is_zoom_active: true,
    },
  },
  {
    id: "hackathon-cultural-heritage-and-digitalization-1c617d99",
    name: "Hackathon: Cultural Heritage and Digitalization",
    detail: "Develop innovative solutions to preserve and promote cultural heritage through technology.",
    start_date: { date: "2023-07-22T09:00:00Z" },
    end_date: { date: "2023-07-23T19:00:00Z" },
    venue: {
      id: "istanbul-tech-hub",
      name: "Istanbul Tech Hub",
      address: "Maslak Mah. Büyükdere Cad. No:255, 34398 Sarıyer/İstanbul",
      lat: "41.1123",
      lng: "29.0199",
      is_zoom_active: false,
    },
  },
  {
    id: "workshop-introduction-to-machine-learning-3a4b5c6d",
    name: "Workshop: Introduction to Machine Learning",
    detail: "Learn the basics of machine learning and build your first ML model.",
    start_date: { date: "2023-08-10T10:00:00Z" },
    end_date: { date: "2023-08-10T16:00:00Z" },
    venue: {
      id: "hhs-hq",
      name: "Happy Hacking Space HQ",
      address: "Levent Mah. Büyükdere Cad. No:123, 34394 Şişli/İstanbul",
      lat: "41.0802",
      lng: "29.0072",
      is_zoom_active: false,
    },
  },
  {
    id: "tech-talk-future-of-web-development-7e8f9g0h",
    name: "Tech Talk: The Future of Web Development",
    detail: "Industry experts discuss emerging trends and technologies in web development.",
    start_date: { date: "2023-09-05T18:00:00Z" },
    end_date: { date: "2023-09-05T21:00:00Z" },
    venue: {
      id: "virtual",
      name: "Virtual Event",
      address: "",
      lat: "",
      lng: "",
      is_zoom_active: true,
    },
  },
  {
    id: "networking-mixer-tech-professionals-1j2k3l4m",
    name: "Networking Mixer for Tech Professionals",
    detail: "Connect with fellow tech enthusiasts and industry professionals in a casual setting.",
    start_date: { date: "2023-10-18T18:00:00Z" },
    end_date: { date: "2023-10-18T21:00:00Z" },
    venue: {
      id: "rooftop-lounge",
      name: "Rooftop Lounge",
      address: "Meydan Mah. İstiklal Cad. No:45, 34435 Beyoğlu/İstanbul",
      lat: "41.0352",
      lng: "28.9768",
      is_zoom_active: false,
    },
  },
]

export async function GET(): Promise<Response> {
  try {
    const calendar = ical({
      prodId: { company: "space.happyhacking", product: "HHS", language: "EN" },
      timezone: "Europe/Istanbul",
      name: "HHS Events",
    })

    // Add all events to calendar
    events.forEach((event) => {
      const location = event.venue
        ? `${event.venue.name || ""}${event.venue.address ? `, ${event.venue.address}` : ""}`.trim()
        : "Online"

      calendar.createEvent({
        start: new Date(event.start_date.date),
        end: new Date(event.end_date.date),
        summary: event.name,
        description: event.detail.replace(/<[^>]*>?/gm, ""), // Strip HTML tags
        location: location,
        url: `https://happyhacking.space/events/${event.id}`,
        status: "CONFIRMED",
        alarms: [
          {
            type: "display",
            trigger: 10 * 60, // 10 minutes before
            description: "Reminder",
          },
        ],
      })
    })

    return new Response(calendar.toString(), {
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": 'attachment; filename="events.ics"',
      },
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "Failed to generate calendar" },
      {
        status: 500,
      },
    )
  }
}
