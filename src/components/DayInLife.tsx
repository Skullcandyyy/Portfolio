"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { dayInLife } from "@/lib/data";

const typeColors: Record<string, string> = {
  code: "border-l-primary",
  ai: "border-l-secondary",
  break: "border-l-accent",
  other: "border-l-muted",
};

export default function DayInLife() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="py-24 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="gradient-text">Day in the Life</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-8" />

          <p className="text-sm text-muted mb-8">
            A typical day for Rohit as an AI & Full Stack Developer
          </p>

          <div className="relative">
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-accent opacity-30" />

            <div className="space-y-6">
              {dayInLife.map((item, i) => {
                const isHovered = hovered === i;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    onMouseEnter={() => setHovered(i)}
                    onMouseLeave={() => setHovered(null)}
                    className={`relative pl-14 transition-all duration-300 ${isHovered ? "scale-[1.02]" : ""}`}
                  >
                    <div
                      className={`absolute left-3 top-1 w-[34px] h-[34px] rounded-xl glass flex items-center justify-center text-sm z-10 border transition-all duration-300 ${
                        isHovered ? "border-primary/40 shadow-lg shadow-primary/10" : "border-transparent"
                      }`}
                    >
                      {item.emoji}
                    </div>

                    <div className={`glass rounded-xl p-4 border-l-2 transition-all duration-300 ${typeColors[item.type]}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-primary-light">{item.time}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase tracking-wider ${
                          item.type === "code" ? "bg-primary/10 text-primary-light" :
                          item.type === "ai" ? "bg-secondary/10 text-secondary" :
                          item.type === "break" ? "bg-accent/10 text-accent" :
                          "bg-muted/10 text-muted"
                        }`}>
                          {item.type === "code" ? "Development" : item.type === "ai" ? "AI/ML" : item.type === "break" ? "Break" : "Other"}
                        </span>
                      </div>
                      <h4 className="text-sm text-white">{item.activity}</h4>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
