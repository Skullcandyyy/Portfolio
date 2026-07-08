"use client";

import { motion } from "framer-motion";
import { certifications } from "@/lib/data";
import SectionHeader from "@/components/SectionHeader";

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader title="Certifications" subtitle="Professional certifications and credentials" />

        <div className="grid md:grid-cols-3 gap-5">
          {certifications.map((cert, ci) => (
            <motion.div
              key={ci}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.1, duration: 0.4 }}
              className="dev-card p-5 flex flex-col"
            >
              <div className="flex-1">
                <h4 className="text-sm font-medium text-foreground">{cert.title}</h4>
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  {"year" in cert && (
                    <>
                      <span className="text-xs font-mono text-primary px-2 py-0.5 bg-primary/10 border border-primary/10 rounded-md">{cert.year}</span>
                    </>
                  )}
                  {"detail" in cert && (
                    <span className="text-xs text-foreground-secondary">{cert.detail}</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
