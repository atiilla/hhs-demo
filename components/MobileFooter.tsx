'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import { Home, Calendar, BookOpen, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MobileFooter() {
  const pathname = usePathname();
  const t = useTranslation();
  
  const navItems = [
    {
      label: t.navigation.home || 'Home',
      href: '/',
      icon: Home
    },
    {
      label: t.navigation.events || 'Events',
      href: '/events',
      icon: Calendar
    },
    {
      label: t.navigation.blog || 'Blog',
      href: '/blog',
      icon: BookOpen
    },
    {
      label: t.navigation.settings || 'Settings',
      href: '/settings',
      icon: Settings
    }
  ];
  
  return (
    <div className="mobile-footer bg-background border-t fixed bottom-0 left-0 right-0 p-2 z-50">
      <div className="flex justify-around items-center">
        {navItems.map((item, index) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={index} 
              href={item.href}
              className={cn(
                "p-2 flex flex-col items-center text-xs",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <item.icon className="h-5 w-5 mb-1" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
} 