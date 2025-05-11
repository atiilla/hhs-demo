"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Github, Twitter, Linkedin, Globe } from "lucide-react"
import Link from "next/link"

const teamMembers = [
  {
    name: "Hikmet",
    role: "Founder & Director",
    bio: "Hikoooooooooo",
    image: "/placeholder.svg?height=300&width=300",
    social: {
      twitter: "https://twitter.com/hikoo",
      github: "https://github.com/hikoo",
      linkedin: "https://linkedin.com/in/hikoo",
      website: "https://hikoo.com",
    },
  },
  
]

export default function TeamPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-6">Our Team</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Meet the passionate individuals who make Happy Hacking Space possible. Our diverse team brings together
          expertise in technology, education, community building, and more.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* {teamMembers.map((member, index) => (
            <TeamMemberCard key={member.name} member={member} index={index} />
          ))} */}
        </div>

        <div className="mt-16 p-6 border rounded-lg bg-card">
          <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
          <p className="mb-4">
            We're always looking for passionate individuals to join our team. If you're interested in contributing to
            Happy Hacking Space, check out our current openings or reach out to discuss how you can get involved.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
          >
            Get in Touch
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

function TeamMemberCard({ member, index }: { member: any, index: number } ) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col rounded-lg border bg-card overflow-hidden"
    >
      <div className="relative aspect-square">
        <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
      </div>
      <div className="p-4 flex-1">
        <h3 className="text-xl font-bold">{member.name}</h3>
        <p className="text-sm text-primary mb-2">{member.role}</p>
        <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
        <div className="flex space-x-2 mt-auto">
          {member.social.github && (
            <a
              href={member.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
          )}
          {member.social.twitter && (
            <a
              href={member.social.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </a>
          )}
          {member.social.linkedin && (
            <a
              href={member.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
          )}
          {member.social.website && (
            <a
              href={member.social.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <Globe className="h-5 w-5" />
              <span className="sr-only">Website</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}
