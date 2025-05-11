import Hero from "@/components/hero"
import Features from "@/components/features"
import ProjectsPreview from "@/components/projects-preview"
import ToolsPreview from "@/components/tools-preview"
import CTA from "@/components/cta"
import AboutSection from "@/components/about-section"

export default function Home() {
  return (
    <div className="flex flex-col pb-16">
      
      <Hero />
      <Features />
      <ProjectsPreview />
      {/* <ToolsPreview /> */}
      <CTA />
    </div>
  )
}
