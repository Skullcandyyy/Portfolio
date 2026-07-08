"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-14"
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">{title}</h2>
      </div>
      {subtitle && (
        <p className="text-foreground-secondary text-sm sm:text-base ml-4">{subtitle}</p>
      )}
      <div className="mt-5 h-px bg-gradient-to-r from-primary/40 via-primary/10 to-transparent" />
    </motion.div>
  );
}
