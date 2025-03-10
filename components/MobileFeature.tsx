'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

const MobileFeature = () => {
  return (
    <div className="mobile-feature space-y-4 pb-16">
      <Card>
        <CardHeader>
          <CardTitle>Mobile Experience</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            This component is specifically designed for the mobile layout.
          </p>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" className="w-full">
              <span className="material-icons mr-2 text-sm">photo_camera</span>
              Camera
            </Button>
            <Button variant="outline" className="w-full">
              <span className="material-icons mr-2 text-sm">photo_library</span>
              Gallery
            </Button>
            <Button variant="outline" className="w-full">
              <span className="material-icons mr-2 text-sm">location_on</span>
              Location
            </Button>
            <Button variant="outline" className="w-full">
              <span className="material-icons mr-2 text-sm">share</span>
              Share
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Commit Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">365 contributions in the last year</span>
              <span className="text-xs text-muted-foreground">More</span>
            </div>
            
            {/* GitHub-style contribution graph */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 35 }).map((_, i) => {
                // Generate random activity levels (0-4)
                const activityLevel = Math.floor(Math.random() * 5);
                // Map activity level to appropriate color class
                const colorClass = [
                  'bg-muted', // 0: No activity
                  'bg-emerald-100 animate-pulse', // 1: Low activity with pulse
                  'bg-emerald-300', // 2: Medium activity
                  'bg-emerald-500', // 3: High activity
                  'bg-emerald-700 animate-pulse', // 4: Very high activity with pulse
                ][activityLevel];
                
                return (
                  <div 
                    key={i} 
                    className={`h-4 w-4 rounded-sm ${colorClass} transition-colors duration-300`}
                    title={`${activityLevel} contributions`}
                  />
                );
              })}
            </div>
            
            {/* Activity summary */}
            <div className="flex justify-between items-center pt-2 border-t">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-sm bg-emerald-500 mr-1"></div>
                <span className="text-xs">Today: 5 commits</span>
              </div>
              <div className="text-xs font-medium text-emerald-600 animate-pulse">
                +12% from last week
              </div>
            </div>
            
            {/* Recent activity */}
            <div className="space-y-2 pt-2 border-t">
              <div className="text-sm font-medium">Recent Activity</div>
              <div className="flex items-start space-x-2">
                <div className="h-6 w-6 rounded-full bg-muted flex-shrink-0 mt-1"></div>
                <div>
                  <div className="text-xs font-medium">Fixed navigation bug</div>
                  <div className="text-xs text-muted-foreground">2 hours ago</div>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="h-6 w-6 rounded-full bg-muted flex-shrink-0 mt-1"></div>
                <div>
                  <div className="text-xs font-medium">Updated README.md</div>
                  <div className="text-xs text-muted-foreground">5 hours ago</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobileFeature; 