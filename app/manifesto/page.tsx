"use client"

import { motion } from "framer-motion"

export default function ManifestoPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <h1 className="text-4xl font-bold mb-6">Manifesto</h1>

        <div className="prose prose-lg dark:prose-invert max-w-none">

          <div className="mt-12 p-6 border-t">
            <p className="italic">
              "Hacking means exploring the boundaries of what is possible with a playful spirit. Activities that demonstrate playful intelligence have hack value."
              – Richard M. Stallman (rms)
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
