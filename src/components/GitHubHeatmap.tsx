"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GITHUB_USERNAME = "Skullcandyyy";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const sampleData: Record<string, number> = {};
for (let d = 0; d < 365; d++) {
  const date = new Date();
  date.setDate(date.getDate() - d);
  const key = date.toISOString().slice(0, 10);
  sampleData[key] = Math.floor(Math.random() * 5);
}

export default function GitHubHeatmap() {
  const [tooltip, setTooltip] = useState<{ date: string; count: number; x: number; y: number } | null>(null);

  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const startDate = new Date(startOfWeek);
  startDate.setDate(startDate.getDate() - 364);

  const weeks: { date: Date; count: number }[][] = [];
  for (let w = 0; w < 53; w++) {
    const week: { date: Date; count: number }[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + w * 7 + d);
      const key = date.toISOString().slice(0, 10);
      week.push({ date, count: sampleData[key] || 0 });
    }
    weeks.push(week);
  }

  const getColor = (count: number) => {
    if (count === 0) return "bg-primary/5";
    if (count <= 1) return "bg-primary/20";
    if (count <= 2) return "bg-primary/40";
    if (count <= 3) return "bg-primary/60";
    return "bg-primary/80";
  };

  const todayStr = today.toISOString().slice(0, 10);

  return (
    <section className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="gradient-text">Contribution Map</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-8" />

          <div className="glass rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-sm font-mono text-white">
                {today.getFullYear() - 1} – {today.getFullYear()}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-muted">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((c) => (
                  <div key={c} className={`w-3 h-3 rounded-sm ${getColor(c)}`} />
                ))}
                <span>More</span>
              </div>
            </div>

            <div className="overflow-x-auto pb-2">
              <div className="flex gap-0.5 min-w-[750px]">
                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-0.5">
                    {week.map((day, di) => {
                      const key = day.date.toISOString().slice(0, 10);
                      return (
                        <div
                          key={di}
                          className={`w-3 h-3 rounded-sm ${getColor(day.count)} cursor-pointer relative ${
                            key === todayStr ? "ring-1 ring-primary-light" : ""
                          }`}
                          onMouseEnter={(e) => {
                            const rect = (e.target as HTMLElement).getBoundingClientRect();
                            setTooltip({
                              date: `${months[day.date.getMonth()]} ${day.date.getDate()}, ${day.date.getFullYear()}`,
                              count: day.count,
                              x: rect.left + rect.width / 2,
                              y: rect.top - 8,
                            });
                          }}
                          onMouseLeave={() => setTooltip(null)}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <AnimatePresence>
              {tooltip && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="fixed z-50 pointer-events-none"
                  style={{ left: tooltip.x, top: tooltip.y, transform: "translate(-50%, -100%)" }}
                >
                  <div className="glass px-3 py-1.5 rounded-lg text-xs whitespace-nowrap">
                    <span className="text-white">{tooltip.count} contribution{tooltip.count !== 1 ? "s" : ""}</span>
                    <span className="text-muted ml-1">on {tooltip.date}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="mt-6 text-center">
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary-light hover:text-white transition-colors"
              >
                View full profile on GitHub →
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
