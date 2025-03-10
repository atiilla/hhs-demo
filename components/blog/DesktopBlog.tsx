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

export default function DesktopBlog() {
  const t = useTranslation();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">{t.blog.title || 'Blog'}</h1>
        <div className="flex gap-4">
          <Button variant="outline">Latest</Button>
          <Button variant="outline">Popular</Button>
          <Button variant="outline">Categories</Button>
        </div>
      </div>
      
      {/* Featured post */}
      <div className="mb-12">
        <Card className="overflow-hidden">
          <div className="grid grid-cols-2">
            <div className="bg-muted h-80 relative">
              {/* Placeholder for featured blog post image */}
              <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground text-6xl font-bold">
                {blogPosts[0].title[0]}
              </div>
            </div>
            <div className="p-8 flex flex-col justify-center">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground mb-2">FEATURED POST</p>
                <h2 className="text-2xl font-bold mb-2">{blogPosts[0].title}</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                  <CalendarDays className="h-4 w-4" />
                  <span>{blogPosts[0].date}</span>
                  <span>•</span>
                  <User className="h-4 w-4" />
                  <span>{blogPosts[0].author}</span>
                  <span>•</span>
                  <span>{blogPosts[0].readTime}</span>
                </div>
                <p className="mb-6">{blogPosts[0].excerpt}</p>
                <Button>
                  {t.blog.readMore || 'Read More'}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Blog post grid */}
      <div className="grid grid-cols-3 gap-6">
        {blogPosts.slice(1).map(post => (
          <Card key={post.id} className="overflow-hidden">
            <div className="bg-muted h-48 relative">
              {/* Placeholder for blog post image */}
              <div className="absolute inset-0 flex items-center justify-center bg-muted text-muted-foreground text-4xl font-bold">
                {post.title[0]}
              </div>
            </div>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription className="flex items-center gap-2 text-sm">
                <CalendarDays className="h-4 w-4" />
                <span>{post.date}</span>
                <span>•</span>
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{post.excerpt}</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                {t.blog.readMore || 'Read More'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 