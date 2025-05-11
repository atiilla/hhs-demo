"use client"
import GlitchedLogo from "./glitched-logo"

interface LogoProps {
  className?: string
  glitchEffect?: boolean
  size?: "sm" | "md" | "lg"
}

export default function Logo({ className = "", glitchEffect = true, size = "lg" }: LogoProps) {
  // Use the new GlitchedLogo component
  return <GlitchedLogo className={className} size={size} glitchIntensity={glitchEffect ? "medium" : "low"} />
}
