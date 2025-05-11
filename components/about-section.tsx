"use client"

import { motion } from "framer-motion"

export default function AboutSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <motion.div
        className="container px-4 md:px-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col items-center justify-center space-y-8 text-center">
          <motion.h2 
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            The community you've been looking for
          </motion.h2>
          
          <div className="space-y-10 mx-auto max-w-[900px]">
            <motion.div 
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold">What is a Happy Hacking Space?</h3>
              <p className="text-lg text-muted-foreground">
                Happy Hacking Space is a community-driven, collaborative environment where individuals with shared interests in technology, science, and creative endeavors come together to experiment, learn, and innovate through playful exploration and clever problem-solving. It embraces the hacker spirit of curiosity, creativity, and often operates as a non-profit space for collaboration and skill-sharing, while also fostering a sense of fun in pushing the boundaries of what is possible.
              </p>
            </motion.div>
            
            <motion.div 
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-semibold">What is Hacking?</h3>
              <p className="text-lg text-muted-foreground">
                Defining hacking can be challenging due to its variable nature. However, a common trait among many hackers is their playful, intelligent, and exploratory mindset. Thus, hacking means exploring the boundaries of what is possible with a playful spirit. Activities that demonstrate playful intelligence have hack value.
              </p>
              <p className="italic text-md mt-2">– RMS, "On Hacking"</p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
} 