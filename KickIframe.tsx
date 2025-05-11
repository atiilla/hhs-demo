"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const KickIframe: React.FC = () => {
  const pathname = usePathname();
  const [isIframeVisible, setIframeVisibility] = React.useState(false);
  const [isIframeAvailable, setIframeAvailability] = React.useState(false);
  const [isMinimized, setIsMinimized] = React.useState(false);

  React.useEffect(() => {
    const checkIframeAvailability = async () => {
      try {
        const response = await fetch("https://kick.com/api/v2/channels/johnwhatsgoingon/livestream");
        const data = await response.json();
        if (data.data !== null) {
          setIframeAvailability(true);
        }
      } catch (error) {
        return error;
      }
    };

    checkIframeAvailability();
  }, []);

  const toggleIframeVisibility = React.useCallback(() => {
    setIframeVisibility((prev) => !prev);
    setIsMinimized(false);
  }, []);

  const toggleMinimized = React.useCallback(() => {
    setIsMinimized((prev) => !prev);
  }, []);

  if (pathname === "/live") return null;

  return (
    <div className="h-full w-full">
      {isIframeAvailable && isIframeVisible && (
        <div className={`fixed z-50 ${isMinimized ? "bottom-4 right-4 w-80 h-45" : "bottom-0 right-0 w-full md:w-[853px] h-[480px]"}`}>
          <div className="flex justify-end gap-2 bg-background p-1">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleMinimized}
              className="h-8 px-2"
            >
              {isMinimized ? "Expand" : "Minimize"}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={toggleIframeVisibility}
              className="h-8 px-2"
            >
              Close
            </Button>
          </div>
          <iframe
            src="https://player.kick.com/johnwhatsgoingon"
            className="w-full h-full"
            allowFullScreen
            title="Kick Player"
          />
        </div>
      )}
      {isIframeAvailable && !isIframeVisible && (
        <Button
          onClick={toggleIframeVisibility}
          className="fixed bottom-4 right-4 z-50 shadow-lg animate-pulse"
        >
          📺 Live Streaming Now
        </Button>
      )}
    </div>
  );
};

export default KickIframe; 