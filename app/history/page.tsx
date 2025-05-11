"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const timeline = [
  {
    year: "2018",
    title: "The Beginning",
    description:
      "Happy Hacking Space was founded by a small group of tech enthusiasts who wanted to create a collaborative environment for learning and innovation.",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    year: "2019",
    title: "First Physical Space",
    description:
      "We opened our first physical location in Istanbul, providing a dedicated space for workshops, hackathons, and community gatherings.",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    year: "2020",
    title: "Going Virtual",
    description:
      "In response to the global pandemic, we pivoted to virtual events and expanded our reach to tech enthusiasts around the world.",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    year: "2021",
    title: "Launch of Educational Programs",
    description:
      "We introduced structured educational programs covering topics from web development to AI, making technology education more accessible.",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    year: "2022",
    title: "Community Expansion",
    description:
      "Our community grew to over 5,000 members, with regular events in multiple cities and a thriving online presence.",
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    year: "2023",
    title: "Innovation Lab",
    description:
      "We established our Innovation Lab, providing resources and mentorship for members to develop their own tech projects and startups.",
    image: "/placeholder.svg?height=300&width=500",
  },
]

export default function HistoryPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-6">History</h1>
        <p className="text-xl text-muted-foreground mb-12">
        between two rivers, hackers roams libre...
        </p>

        <div className="space-y-16">
          {/* {timeline.map((item, index) => (
            <TimelineItem key={item.year} item={item} index={index} />
          ))} */}
        </div>
{/* 
        <div className="mt-16 p-6 border rounded-lg bg-card">
          <h2 className="text-2xl font-bold mb-4">Looking Forward</h2>
          <p>
            As we continue to grow, our mission remains the same: to create an inclusive, collaborative environment
            where technology enthusiasts can learn, create, and innovate together. We're excited for what the future
            holds and invite you to be part of our ongoing story.
          </p>
        </div> */}
      </motion.div>
    </div>
  )
}

function TimelineItem({ item, index }: { item: any, index: number }) {
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, x: isEven ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} gap-8 items-center`}
    >
      <div className="w-full md:w-1/2">
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <span className="text-white text-3xl font-bold p-4">{item.year}</span>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
        <p className="text-muted-foreground">{item.description}</p>
      </div>
    </motion.div>
  )
}
