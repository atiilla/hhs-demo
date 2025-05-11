import { cache } from "react";

const API_URL =
  "https://api.kommunity.com/api/v1/diyarbakir-happy-hacking-space/events";

const options = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
};

// Define types to match the Kommunity API response
export interface EventVenue {
  id: string;
  name: string;
  address: string;
  lat: number | null;
  lng: number | null;
  is_zoom_active: boolean;
}

export interface EventDate {
  date: string;
  timezone: {
    timezone_type: number;
    timezone: string;
  };
}

export interface Community {
  id: string;
  name: string;
  slug: string;
  profile_photo: string;
  [key: string]: any;
}

export interface EventData {
  id: string;
  slug: string;
  name: string;
  detail: string;
  community_id: string;
  start_date: EventDate;
  end_date: EventDate;
  start_date_humanity: EventDate;
  venue: EventVenue;
  highlight_photo: string;
  is_online: boolean;
  users_count: number;
  community: Community;
  calendar_links?: {
    google: string;
    ics: string;
  };
  [key: string]: any;
}

export interface EventsResponse {
  data: EventData[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

export const getAllEvents = cache(async (status = "upcoming", page = 1): Promise<EventsResponse | null> => {
  try {
    const response = await fetch(
      `${API_URL}?status=${status}&page=${page}`,
      options
    );
    return await response.json();
  } catch (error) {
    console.info(error);
    return null;
  }
});

export const getEvent = async (slug: string): Promise<EventData | null> => {
  try {
    const response = await fetch(`${API_URL}/${slug}`, options);
    const data = await response.json();
    
    // Ensure we're returning the data property which contains the event details
    // This handles the case where the API returns { data: { ...eventData } }
    return data?.data ? data.data : data;
  } catch (error) {
    console.info(error);
    return null;
  }
}; 