"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The direction of the marquee.
   * @default "left"
   */
  direction?: "left" | "right";
  /**
   * The speed of the marquee.
   * @default "normal"
   */
  speed?: "slow" | "normal" | "fast";
  /**
   * Pause the marquee on hover.
   * @default false
   */
  pauseOnHover?: boolean;
  /**
   * The gap between each child.
   * @default "1rem"
   */
  gap?: string;
  /**
   * The number of times to repeat the children to ensure the marquee is filled.
   * @default 2
   */
  repeat?: number;
  /**
   * Enable manual scrolling with touch/mouse.
   * @default false
   */
  scrollable?: boolean;
}

export function Marquee({
  children,
  direction = "left",
  speed = "normal",
  pauseOnHover = false,
  gap = "1rem",
  repeat = 2,
  scrollable = false,
  className,
  ...props
}: MarqueeProps) {
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [startX, setStartX] = useState(0);

  useEffect(() => {
    const currentContainer = containerRef.current;
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === currentContainer) {
          setContainerWidth(entry.contentRect.width);
        }
      }
    });

    if (currentContainer) {
      resizeObserver.observe(currentContainer);
    }
    
    return () => {
      if (currentContainer) {
        resizeObserver.unobserve(currentContainer);
      }
    };
  }, []);

  // Calculate animation duration based on speed
  const getDuration = () => {
    const speedMap = {
      slow: 40,
      normal: 20,
      fast: 10,
    };
    return `${speedMap[speed]}s`;
  };

  // Create repeated children
  const repeatedChildren = Array(repeat)
    .fill(0)
    .map((_, i) => (
      <div
        key={i}
        className="flex shrink-0 items-center"
        style={{ gap }}
      >
        {children}
      </div>
    ));

  // Handle touch and mouse events for scrollable marquee
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollable) return;
    
    setIsGrabbing(true);
    setIsPaused(true);
    setStartX(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollable) return;
    
    setIsGrabbing(true);
    setIsPaused(true);
    setStartX(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!scrollable || !isGrabbing) return;
    
    const deltaX = e.clientX - startX;
    setScrollPosition(prev => prev + deltaX);
    setStartX(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!scrollable || !isGrabbing) return;
    
    const deltaX = e.touches[0].clientX - startX;
    setScrollPosition(prev => prev + deltaX);
    setStartX(e.touches[0].clientX);
  };

  const handleEnd = () => {
    if (!scrollable) return;
    
    setIsGrabbing(false);
    setIsPaused(false);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden", 
        scrollable && "cursor-grab", 
        isGrabbing && "cursor-grabbing",
        className
      )}
      {...props}
    >
      <div
        ref={scrollerRef}
        className={cn(
          "flex whitespace-nowrap",
          !isPaused && "animate-marquee",
          pauseOnHover && "hover:[animation-play-state:paused]",
          scrollable && "select-none"
        )}
        style={{
          animationDirection: direction === "right" ? "reverse" : "normal",
          animationDuration: getDuration(),
          transform: isPaused ? `translateX(${scrollPosition}px)` : undefined,
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleEnd}
      >
        {repeatedChildren}
      </div>
    </div>
  );
} 