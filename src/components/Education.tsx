"use client";

import { motion } from "framer-motion";
import { education } from "@/lib/data";
import SectionHeader from "@/components/SectionHeader";

export default function Education() {
  return (
    <section id="education" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader title="Education" subtitle="Academic background" />

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="dev-card p-6 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground tracking-tight">{education.degree}</h3>
                  <p className="text-sm text-foreground-secondary mt-1">{education.institution}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-primary px-3 py-1 bg-primary/10 border border-primary/10 rounded-full block mb-1">
                    {education.period}
                  </span>
                  <span className="text-sm font-semibold text-primary tracking-tight">CGPA: {education.cgpa}</span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">Relevant Coursework</h4>
                <div className="flex flex-wrap gap-2">
                  {education.coursework.map((course) => (
                    <span key={course} className="dev-tag">{course}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
