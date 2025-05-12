"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

interface DebugInfo {
  pathname: string;
  error: unknown | null;
  apiResponse: any;
}

const KickIframe: React.FC = () => {
  const pathname = usePathname();
  const [isIframeVisible, setIframeVisibility] = React.useState(false);
  const [isIframeAvailable, setIframeAvailability] = React.useState(false);
  const [isMinimized, setIsMinimized] = React.useState(false);
  const [debugInfo, setDebugInfo] = React.useState<DebugInfo>({ pathname: "", error: null, apiResponse: null });
  
  // Force enable for testing purposes (remove in production)
  const [forceEnable, setForceEnable] = React.useState(false);

  React.useEffect(() => {
    const checkIframeAvailability = async () => {
      try {
        console.log("Checking livestream availability...");
        setDebugInfo(prev => ({ ...prev, pathname }));
        
        // Try fetching from Kick API
        try {
          const response = await fetch("https://kick.com/api/v2/channels/pgl/livestream", {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            cache: 'no-store'
          });
          
          if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
          }
          
          const data = await response.json();
          console.log("Livestream API response:", data);
          setDebugInfo(prev => ({ ...prev, apiResponse: data }));
          
          if (data.data !== null) {
            console.log("Livestream is available!");
            setIframeAvailability(true);
          } else {
            console.log("No livestream available");
            setIframeAvailability(false);
          }
        } catch (fetchError) {
          console.error("Error fetching from Kick API:", fetchError);
          setDebugInfo(prev => ({ ...prev, error: fetchError }));
          
          // As a fallback, try to see if the Kick player loads directly
          // This is a workaround for the API being blocked by Cloudflare
          const testImg = new Image();
          testImg.onload = () => {
            console.log("Channel thumbnail loaded, stream might be available");
            setIframeAvailability(true);
          };
          testImg.onerror = () => {
            console.log("Channel thumbnail not available, likely no stream");
            setIframeAvailability(false);
          };
          testImg.src = `https://thumb.kick.com/thumbnails/pgl/720x400.jpg?${Date.now()}`;
        }
      } catch (error) {
        console.error("Error in livestream check:", error);
        setDebugInfo(prev => ({ ...prev, error }));
      }
    };

    checkIframeAvailability();
    
    // Set up an interval to check every 5 minutes
    const intervalId = setInterval(checkIframeAvailability, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [pathname]);

  const toggleIframeVisibility = React.useCallback(() => {
    setIframeVisibility((prev) => !prev);
    setIsMinimized(false);
  }, []);

  const toggleMinimized = React.useCallback(() => {
    setIsMinimized((prev) => !prev);
  }, []);

  const toggleForceEnable = React.useCallback(() => {
    setForceEnable((prev) => !prev);
  }, []);

  // Skip rendering on the live page
  if (pathname === "/live") return null;

  // Use either the API result or forced state for availability
  const showStream = isIframeAvailable || forceEnable;

  return (
    <>
      {showStream && isIframeVisible && (
        <div 
          className={`fixed z-50 ${
            isMinimized 
              ? "bottom-4 right-4 w-72 h-40 shadow-lg rounded overflow-hidden" 
              : "bottom-0 right-0 w-full md:w-[640px] h-[300px] md:h-[360px]"
          }`}
          style={{ 
            maxWidth: isMinimized ? '300px' : '100%',
            maxHeight: isMinimized ? '200px' : '100%' 
          }}
        >
          <div className="flex justify-end items-center gap-1 bg-background p-1 h-7">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleMinimized}
              className="h-5 px-1.5 py-0 text-xs"
            >
              {isMinimized ? "Expand" : "Mini"}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleIframeVisibility}
              className="h-5 px-1.5 py-0 text-xs"
            >
              Close
            </Button>
          </div>
          <div 
            className="w-full overflow-hidden" 
            style={{ height: 'calc(100% - 28px)' }}
          >
            <iframe
              src="https://player.kick.com/pgl"
              width="100%"
              height="100%"
              style={{ 
                border: 'none', 
                margin: 0, 
                padding: 0,
                display: 'block'
              }}
              allowFullScreen
              title="Kick Player"
              allow="autoplay"
              scrolling="no"
            />
          </div>
        </div>
      )}
      
      {showStream && !isIframeVisible && (
        <div className="fixed bottom-24 right-4 z-50">
          <Button
            onClick={toggleIframeVisibility}
            className="shadow-lg animate-pulse bg-red-500 hover:bg-red-600 text-white"
          >
            📺 Live Streaming Now
          </Button>
        </div>
      )}
    </>
  );
};

export default KickIframe; 