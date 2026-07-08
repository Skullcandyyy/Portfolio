"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { projects, projectCategories } from "@/lib/data";
import SectionHeader from "@/components/SectionHeader";
import { useRecruiterMode } from "@/components/RecruiterMode";

export default function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const [search, setSearch] = useState("");
  const { recruiterMode } = useRecruiterMode();

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchCategory = filter === "All" || p.category === filter;
      const matchSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.tech.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [filter, search]);

  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader title="Projects" subtitle="Selected work and side projects" />

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <div className="relative flex-1">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search projects or tech..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-card text-sm text-foreground placeholder-muted border border-border rounded-lg focus:outline-none focus:border-primary/50 transition-all font-mono"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2.5 text-xs font-medium rounded-lg border transition-all ${
                  filter === cat
                    ? "text-white bg-primary border-primary shadow-sm"
                    : "text-muted bg-card border-border hover:border-primary/30 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid */}
        {filtered.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted py-16 font-mono text-sm"
          >
            No projects found.
          </motion.p>
        ) : (
          <div className={`grid gap-5 ${
            recruiterMode
              ? "grid-cols-1 md:grid-cols-2"
              : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}>
            {filtered.map((project, pi) => {
              const isFeatured = pi === 0 && filtered.length > 1;
              const isTall = pi === 1 && filtered.length > 2;

              return (
                <motion.div
                  key={pi}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: pi * 0.08, duration: 0.5 }}
                  whileHover={{ y: -4 }}
                  className={`dev-card p-6 flex flex-col group cursor-default ${
                    isFeatured ? "md:col-span-2 lg:row-span-2" : ""
                  } ${isTall ? "lg:row-span-2" : ""}`}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-muted font-mono">{project.period}</span>
                    <span className="text-[10px] font-medium px-2.5 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/10">
                      {project.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`font-semibold text-foreground mb-3 group-hover:text-primary transition-colors ${
                    isFeatured ? "text-xl sm:text-2xl tracking-tight" : "text-base"
                  }`}>
                    {project.title}
                  </h3>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tech.map((t) => (
                      <span key={t} className={`dev-tag ${isFeatured ? "text-xs" : "text-[10px]"}`}>{t}</span>
                    ))}
                  </div>

                  {/* Points */}
                  <ul className="space-y-2 flex-1 mb-4">
                    {(recruiterMode ? project.points : project.points.slice(0, isFeatured ? 4 : 3)).map((point, i) => (
                      <li key={i} className="text-xs sm:text-sm text-foreground-secondary leading-relaxed pl-4 relative before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:bg-primary/40 before:rounded-full">
                        {isFeatured ? point : (point.length > 75 ? point.slice(0, 75) + "..." : point)}
                      </li>
                    ))}
                  </ul>

                  {/* Link */}
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary-light transition-colors mt-auto group/link"
                  >
                    View Project
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover/link:translate-x-0.5">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
