import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Language } from "@/components/language-provider"
import { getAllEvents, getEvent } from "@/lib/api"

interface ThemeState {
  theme: string
  setTheme: (theme: string) => void
}

interface LanguageState {
  language: Language
  setLanguage: (language: Language) => void
}

// Define ProjectData type for internal use
interface ProjectData {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  author?: string
  likes?: number
  views?: number
}

interface ProjectsState {
  projects: ProjectData[]
  featuredProjects: ProjectData[]
  setProjects: (projects: ProjectData[]) => void
  setFeaturedProjects: (projects: ProjectData[]) => void
}

// Define our own EventData type for internal use
interface EventData {
  id: string
  slug: string
  name: string
  detail: string
  highlight_photo: string
  start_date: any
  end_date: any
  start_date_humanity: any
  venue: any
  users_count: number
  is_online: boolean
  community: any
  calendar_links?: any
  [key: string]: any
}

interface EventsState {
  events: {
    upcoming: EventData[]
    past: EventData[]
  }
  currentEvent: EventData | null
  loading: boolean
  totalPages: number
  currentPage: number
  activeTab: "upcoming" | "past"
  setEvents: (status: "upcoming" | "past", events: EventData[]) => void
  setCurrentEvent: (event: EventData) => void
  setLoading: (loading: boolean) => void
  setTotalPages: (total: number) => void
  setCurrentPage: (page: number) => void
  setActiveTab: (tab: "upcoming" | "past") => void
  fetchEvents: (status?: "upcoming" | "past", page?: number) => Promise<void>
  fetchEvent: (id: string) => Promise<void>
}

interface AppState extends ThemeState, LanguageState, EventsState, ProjectsState {}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Theme state
      theme: "system",
      setTheme: (theme) => set({ theme }),

      // Language state
      language: "en",
      setLanguage: (language) => set({ language }),
      
      // Projects state
      projects: [
        {
          id: 1,
          title: "Open Source Drone",
          description: "A fully autonomous drone built with open source hardware and software",
          image: "/projects/open-source-and-open.jpg",
          tags: ["hardware", "robotics", "3D printing"],
          author: "Happy Hacking Space",
          likes: 42,
          views: 1024,
        },
        {
          id: 2,
          title: "AI-Powered Plant Monitor",
          description: "Smart plant monitoring system using machine learning to optimize growth",
          image: "/projects/smart-farming-with-agriculture-iot.jpg",
          tags: ["IoT", "AI", "agriculture"],
          author: "Happy Hacking Space",
          likes: 38,
          views: 876,
        },
        {
          id: 3,
          title: "Cybersecurity Training Kit",
          description: "Educational toolkit for learning ethical hacking and network security",
          image: "/projects/futuristic-smart-city-with-5g-global-network-technology.jpg",
          tags: ["security", "education", "networking"],
          author: "Happy Hacking Space",
          likes: 56,
          views: 1532,
        },
        {
          id: 4,
          title: "Solar-Powered Weather Station",
          description: "Self-sufficient weather monitoring system with data visualization",
          image: "/projects/solar-powered-weather-station.webp",
          tags: ["renewable", "IoT", "data"],
          author: "Happy Hacking Space",
          likes: 29,
          views: 743,
        },
      ],
      featuredProjects: [
        {
          id: 1,
          title: "Open Source Drone",
          description: "A fully autonomous drone built with open source hardware and software",
          image: "/projects/open-source-and-open.jpg",
          tags: ["hardware", "robotics", "3D printing"],
        },
        {
          id: 2,
          title: "AI-Powered Plant Monitor",
          description: "Smart plant monitoring system using machine learning to optimize growth",
          image: "/projects/smart-farming-with-agriculture-iot.jpg",
          tags: ["IoT", "AI", "agriculture"],
        },
        {
          id: 3,
          title: "IoT Smart City",
          description: "IoT Smart City is a project that uses IoT devices to monitor and control the city",
          image: "/projects/futuristic-smart-city-with-5g-global-network-technology.jpg",
          tags: ["IoT", "smart city", "agriculture"],
        },
      ],
      setProjects: (projects) => set({ projects }),
      setFeaturedProjects: (projects) => set({ featuredProjects: projects }),
      
      // Events state
      events: {
        upcoming: [],
        past: []
      },
      currentEvent: null,
      loading: false,
      totalPages: 1,
      currentPage: 1,
      activeTab: "upcoming",
      setEvents: (status, events) => set((state) => ({
        events: {
          ...state.events,
          [status]: events
        }
      })),
      setCurrentEvent: (event) => set({ currentEvent: event }),
      setLoading: (loading) => set({ loading }),
      setTotalPages: (total) => set({ totalPages: total }),
      setCurrentPage: (page) => set({ currentPage: page }),
      setActiveTab: (tab) => set({ activeTab: tab }),
      fetchEvents: async (status = "upcoming", page = 1) => {
        set({ loading: true });
        try {
          const response = await getAllEvents(status, page);
          if (response && response.data) {
            set((state) => ({
              events: {
                ...state.events,
                [status]: response.data || []
              },
              totalPages: response.total ? Math.ceil(response.total / response.per_page) : 1,
            }));
          } else {
            // If the API returns null or an invalid response, set an empty array
            set((state) => ({
              events: {
                ...state.events,
                [status]: []
              }
            }));
          }
        } catch (error) {
          console.error("Error fetching events:", error);
          set((state) => ({
            events: {
              ...state.events,
              [status]: []
            }
          }));
        } finally {
          set({ loading: false });
        }
      },
      fetchEvent: async (id: string) => {
        set({ loading: true });
        try {
          console.log("Fetching event with ID:", id);
          const data = await getEvent(id);
          console.log("Raw event data received:", data);
          
          if (data) {
            // Make sure venue data is properly processed
            const processedData = {
              ...data,
              venue: data.venue || {},
            };
            console.log("Processed event data:", processedData);
            set({ currentEvent: processedData });
          } else {
            console.log("No event data found");
            set({ currentEvent: null });
          }
        } catch (error) {
          console.error("Error fetching event:", error);
          set({ currentEvent: null });
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "happy-hacking-space-storage",
    },
  ),
)
