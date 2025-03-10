'use client';

import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays, User } from 'lucide-react';

// Sample blog posts data - in a real app, this would come from an API or store
const blogPosts = [
  {
    id: 1,
    title: 'Getting Started with Next.js 15',
    excerpt: 'Learn how to set up a new project with Next.js 15 and explore its new features',
    date: '2023-11-10',
    author: 'Jane Doe',
    readTime: '5 min read',
    image: '/images/blog/nextjs.jpg'
  },
  {
    id: 2,
    title: 'The Power of Zustand for State Management',
    excerpt: 'Discover why Zustand is becoming a popular choice for React state management',
    date: '2023-11-15',
    author: 'John Smith',
    readTime: '7 min read',
    image: '/images/blog/zustand.jpg'
  },
  {
    id: 3,
    title: 'Building Responsive UIs with Tailwind CSS',
    excerpt: 'Tips and tricks for creating beautiful, responsive user interfaces with Tailwind CSS',
    date: '2023-11-20',
    author: 'Alex Johnson',
    readTime: '6 min read',
    image: '/images/blog/tailwind.jpg'
  }
];

export default function MobileBlog() {
  const t = useTranslation();
  
  return (
    <div className="px-4 py-6 pb-20">
      <h1 className="text-2xl font-bold mb-6">{t.blog.title || 'Blog'}</h1>
      
      <div className="space-y-6">
        {blogPosts.map(post => (
          <Card key={post.id} className="overflow-hidden">
            <div className="bg-muted h-40 relative">
              {/* Placeholder for blog post image */}
              <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground text-4xl font-bold">
                {post.title[0]}
              </div>
            </div>
            <CardHeader className="p-3">
              <CardTitle className="text-lg">{post.title}</CardTitle>
              <CardDescription className="flex flex-wrap items-center gap-1 text-xs">
                <CalendarDays className="h-3 w-3" />
                <span>{post.date}</span>
                <span>•</span>
                <User className="h-3 w-3" />
                <span>{post.author}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <p className="text-sm line-clamp-2">{post.excerpt}</p>
            </CardContent>
            <CardFooter className="p-3 pt-0">
              <Button variant="outline" size="sm" className="w-full text-xs">
                {t.blog.readMore || 'Read More'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 