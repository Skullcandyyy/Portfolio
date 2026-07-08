"use client";

import { motion } from "framer-motion";
import { currentlyBuilding } from "@/lib/data";

export default function StatusBar() {
  return (
    <section id="building" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="gradient-text">Currently Building</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-8" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-6 sm:p-8 glow relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-secondary" />

            <div className="flex items-start gap-4">
              <div className="relative mt-1">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-ping absolute" />
                <div className="w-3 h-3 rounded-full bg-green-500 relative" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="text-lg font-semibold text-white">
                    {currentlyBuilding.title}
                  </h3>
                  <span className="text-xs font-mono px-2 py-1 bg-green-500/10 text-green-400 rounded-full">
                    {currentlyBuilding.status}
                  </span>
                </div>

                <p className="text-sm text-muted leading-relaxed mb-4">
                  {currentlyBuilding.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {currentlyBuilding.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2.5 py-1 bg-primary/5 text-primary-light rounded-md"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
