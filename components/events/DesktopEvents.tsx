'use client';

import React, { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Filter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample events data - in a real app, this would come from an API or store
const events = [
  {
    id: 1,
    title: 'Code Jam 2023',
    description: 'Join us for a day of coding challenges and fun!',
    date: '2023-12-15',
    time: '10:00 AM - 6:00 PM',
    location: 'Happy Hacking Space, Istanbul',
    category: 'competition',
    image: '/images/events/code-jam.jpg'
  },
  {
    id: 2,
    title: 'Hackathon: Cultural Heritage',
    description: 'A weekend-long hackathon focused on preserving cultural heritage through technology',
    date: '2024-01-20',
    time: 'All weekend',
    location: 'Online',
    category: 'competition',
    image: '/images/events/hackathon.jpg'
  },
  {
    id: 3,
    title: 'Tech Talk: AI and Ethics',
    description: 'A discussion about the ethical implications of artificial intelligence',
    date: '2024-02-05',
    time: '7:00 PM - 9:00 PM',
    location: 'Happy Hacking Space, Istanbul',
    category: 'talk',
    image: '/images/events/tech-talk.jpg'
  },
  {
    id: 4,
    title: 'Workshop: Introduction to React',
    description: 'Learn the basics of React in this hands-on workshop',
    date: '2024-02-15',
    time: '10:00 AM - 4:00 PM',
    location: 'Happy Hacking Space, Istanbul',
    category: 'workshop',
    image: '/images/events/react-workshop.jpg'
  },
  {
    id: 5,
    title: 'Networking Event: Tech Professionals',
    description: 'Connect with other tech professionals in a casual setting',
    date: '2024-02-20',
    time: '6:00 PM - 9:00 PM',
    location: 'Cafe Tech, Istanbul',
    category: 'networking',
    image: '/images/events/networking.jpg'
  }
];

export default function DesktopEvents() {
  const t = useTranslation();
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredEvents = activeTab === 'all' 
    ? events 
    : events.filter(event => event.category === activeTab);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t.events.title || 'Events'}</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button variant="outline" size="sm">This Month</Button>
          <Button variant="outline" size="sm">Next Month</Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="competition">Competitions</TabsTrigger>
          <TabsTrigger value="talk">Talks</TabsTrigger>
          <TabsTrigger value="workshop">Workshops</TabsTrigger>
          <TabsTrigger value="networking">Networking</TabsTrigger>
        </TabsList>
      </Tabs>
      
      {/* Featured event */}
      {filteredEvents.length > 0 && (
        <div className="mb-12">
          <Card className="overflow-hidden">
            <div className="grid grid-cols-2">
              <div className="bg-muted h-80 relative">
                {/* Placeholder for featured event image */}
                <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground text-6xl font-bold">
                  {filteredEvents[0].title[0]}
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">FEATURED EVENT</p>
                  <h2 className="text-2xl font-bold mb-2">{filteredEvents[0].title}</h2>
                  <p className="mb-6">{filteredEvents[0].description}</p>
                  <div className="space-y-2 text-sm mb-6">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>{filteredEvents[0].date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4" />
                      <span>{filteredEvents[0].time}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4" />
                      <span>{filteredEvents[0].location}</span>
                    </div>
                  </div>
                  <Button>
                    {t.events.viewDetails || 'View Details'}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
      
      {/* Events grid */}
      <div className="grid grid-cols-3 gap-6">
        {filteredEvents.slice(1).map(event => (
          <Card key={event.id} className="overflow-hidden">
            <div className="bg-muted h-48 relative">
              {/* Placeholder for event image */}
              <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground text-4xl font-bold">
                {event.title[0]}
              </div>
            </div>
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
              <CardDescription>{event.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  <span>{event.location}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                {t.events.viewDetails || 'View Details'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 