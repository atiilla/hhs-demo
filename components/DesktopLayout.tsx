import React from 'react';
import Header from './Header';
import Footer from './Footer';
import HeroCarousel from './HeroCarousel';
import { usePathname } from 'next/navigation';

interface DesktopLayoutProps {
  children: React.ReactNode;
}

const DesktopLayout = ({ children }: DesktopLayoutProps) => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {isHomePage && <HeroCarousel />}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="desktop-specific-container">
         
          
          <div className="desktop-content">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DesktopLayout; 