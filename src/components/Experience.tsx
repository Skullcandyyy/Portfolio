"use client";

import { motion } from "framer-motion";
import { experience } from "@/lib/data";
import SectionHeader from "@/components/SectionHeader";

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader title="Experience" subtitle="Work history and contributions" />

        <div className="space-y-6">
          {experience.map((exp, ei) => (
            <motion.div
              key={ei}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ei * 0.15, duration: 0.5 }}
              className="relative pl-10"
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-primary border-2 border-background shadow-sm shadow-primary/30" />
              {/* Timeline line */}
              {ei < experience.length - 1 && (
                <div className="absolute left-[5px] top-6 bottom-0 w-px bg-gradient-to-b from-primary/20 to-transparent" />
              )}

              <div className="dev-card p-6 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground tracking-tight">{exp.title}</h3>
                    <p className="text-sm text-foreground-secondary">{exp.type}</p>
                  </div>
                  <span className="text-xs font-mono text-primary px-3 py-1 bg-primary/10 rounded-full border border-primary/10 whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {exp.tech.map((t) => (
                    <span key={t} className="dev-tag">{t}</span>
                  ))}
                </div>

                <ul className="space-y-2.5">
                  {exp.points.map((point, pi) => (
                    <li key={pi} className="text-sm text-foreground-secondary leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-primary/30 before:rounded-full">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
