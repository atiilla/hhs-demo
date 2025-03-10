'use client';

import React from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import LanguageSelector from '@/components/LanguageSelector';
import ThemeToggle from '@/components/ThemeToggle';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function SettingsPage() {
  const t = useTranslation();
  
  return (
    <div className="container mx-auto px-4 py-8 pb-20">
      <h1 className="text-2xl font-bold mb-6">{t.settings.title || 'Settings'}</h1>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>{t.settings.appearance || 'Appearance'}</CardTitle>
            <CardDescription>
              {t.settings.appearanceDescription || 'Customize how the application looks'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">{t.settings.theme || 'Theme'}</h3>
                <ThemeToggle />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>{t.settings.language || 'Language'}</CardTitle>
            <CardDescription>
              {t.settings.languageDescription || 'Choose your preferred language'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LanguageSelector />
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 