import React from 'react';
import MobileNav from './MobileNav';
import Footer from './Footer';
import HeroCarousel from './HeroCarousel';
import MobileFooter from './MobileFooter';

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout = ({ children }: MobileLayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Mobile-specific header/nav */}
      <div className="mobile-header bg-background border-b p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">HHS Mobile</h1>
        <MobileNav />
      </div>
      
      <HeroCarousel />
      
      <main className="flex-1 px-4 py-6">
        <div className="mobile-specific-container">
          {/* Mobile-specific UI elements */}
          <div className="mobile-content">
            {children}
          </div>
        </div>
      </main>
      
      {/* Mobile-specific footer with navigation */}
      <MobileFooter />
      
      {/* Add padding at the bottom to prevent content from being hidden behind the fixed footer */}
      <div className="h-16"></div>
      
      {/* Regular footer is hidden on mobile */}
      <div className="hidden">
        <Footer />
      </div>
    </div>
  );
};

export default MobileLayout; 