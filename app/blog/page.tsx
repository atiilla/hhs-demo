'use client';

import React from 'react';
import { useDeviceDetect } from '@/hooks/useDeviceDetect';
import MobileBlog from '@/components/blog/MobileBlog';
import DesktopBlog from '@/components/blog/DesktopBlog';

export default function BlogPage() {
  const { isMobile, isLoading } = useDeviceDetect();
  
  // Show a loading state while detecting the device
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // Render the appropriate layout based on the device
  return isMobile ? <MobileBlog /> : <DesktopBlog />;
} 