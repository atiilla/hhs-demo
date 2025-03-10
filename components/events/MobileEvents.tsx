'use client';

import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin } from 'lucide-react';

// Sample events data - in a real app, this would come from an API or store
const events = [
  {
    id: 1,
    title: 'Code Jam 2023',
    description: 'Join us for a day of coding challenges and fun!',
    date: '2023-12-15',
    time: '10:00 AM - 6:00 PM',
    location: 'Happy Hacking Space, Istanbul',
    image: '/images/events/code-jam.jpg'
  },
  {
    id: 2,
    title: 'Hackathon: Cultural Heritage',
    description: 'A weekend-long hackathon focused on preserving cultural heritage through technology',
    date: '2024-01-20',
    time: 'All weekend',
    location: 'Online',
    image: '/images/events/hackathon.jpg'
  },
  {
    id: 3,
    title: 'Tech Talk: AI and Ethics',
    description: 'A discussion about the ethical implications of artificial intelligence',
    date: '2024-02-05',
    time: '7:00 PM - 9:00 PM',
    location: 'Happy Hacking Space, Istanbul',
    image: '/images/events/tech-talk.jpg'
  }
];

export default function MobileEvents() {
  const t = useTranslation();
  
  return (
    <div className="px-4 py-6 pb-20">
      <h1 className="text-2xl font-bold mb-6">{t.events.title || 'Events'}</h1>
      
      <div className="space-y-4">
        {events.map(event => (
          <Card key={event.id} className="overflow-hidden">
            <div className="bg-muted h-32 relative">
              {/* Placeholder for event image */}
              <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground text-4xl font-bold">
                {event.title[0]}
              </div>
            </div>
            <CardHeader className="p-3">
              <CardTitle className="text-lg">{event.title}</CardTitle>
              <CardDescription className="text-xs line-clamp-2">{event.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="space-y-1 text-xs">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-3 w-3" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-3 w-3" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-3 w-3" />
                  <span className="truncate">{event.location}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-3 pt-0">
              <Button variant="outline" size="sm" className="w-full text-xs">
                {t.events.viewDetails || 'View Details'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 