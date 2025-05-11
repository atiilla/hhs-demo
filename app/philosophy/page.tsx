"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function PhilosophyPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-6 text-center">Our Philosophy</h1>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="lead font-bold text-xl text-center mb-6 py-2 border-b-2 border-primary">
            WE'RE AT OUR BEST WHEN WE'RE HACKING, CRAFTING, EXPLORING.
          </p>

          <div className="my-10 relative aspect-video">
            <Image
              src="/stickers/pixelated.webp"
              alt="Happy Hacking Space community"
              fill
              className="rounded-lg object-cover"
            />
          </div>

          <div className="space-y-10">
            <section>
              <h2 className="font-bold border-l-4 border-primary pl-3">Hacking: Finding Joy in the Curious Path</h2>
              <p>
                Think about hacking like solving a puzzle, but no one told you what the picture on the box looks like. You're experimenting, flipping pieces, and trying combinations just to see what happens. That's hacking—a playful way of figuring out what's possible. It's not about breaking things for the sake of it; it's about breaking through limits with cleverness and curiosity. When you hack, you say, "What if?" and then you try it. Sometimes you fail. That's good! Failure teaches you more than success ever will.
              </p>
            </section>

            <section>
              <h2 className="font-bold border-l-4 border-secondary pl-3">Crafting: Turning Ideas into Reality</h2>
              <p>
                Crafting is the art of making something with your own hands—or your keyboard. It's taking an idea floating in your head and giving it shape. But it's not just slapping things together and calling it done. No, crafting is about care. It's like carving a sculpture: you take away what doesn't belong and leave behind something beautiful, something that works. Whether it's writing clean code, building a gadget, or stitching fabric, the magic is in doing it thoughtfully. You measure twice, cut once, and smile when it all comes together.
              </p>
            </section>

            <section>
              <h2 className="font-bold border-l-4 border-accent pl-3">Exploring: Asking "What's Out There?" and Finding Out</h2>
              <p>
                Exploring is about stepping into the unknown—not with fear, but with excitement. Imagine you're in a dark room. You don't sit in the corner and hope someone turns on the light. You feel your way around, looking for the switch. That's exploration. It's asking questions and being okay with not having answers right away. Maybe you try a new programming language, or you build something just to see if it'll work. The point isn't to know everything—the point is to keep learning, to keep uncovering the wonders around you.
              </p>
            </section>

            <hr className="my-8" />

            <section className="p-4 border-l-4 border-r-4 border-primary/30 bg-primary/5">
              <h3 className="font-bold text-center mb-4">WHAT WE BELIEVE</h3>
              <ul className="space-y-2">
                <li><strong>Hacking is curiosity in action.</strong> It's about solving problems with creativity, not waiting for someone to give you instructions.</li>
                <li><strong>Crafting is making something that matters.</strong> It's taking time to do it well because what you create reflects who you are.</li>
                <li><strong>Exploring is about adventure.</strong> It's the thrill of discovery, of finding something new that changes how you see the world.</li>
              </ul>
            </section>

            <hr className="my-8" />

            <p className="text-center italic">
              At Happy Hacking Space, we're all about experimenting, building, and learning together. You don't need to be an expert to start—you just need to be curious. Come hack, craft, and explore with us. The universe is full of possibilities, and we're here to uncover them, one project at a time.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
