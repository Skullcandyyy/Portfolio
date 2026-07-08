"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionHeader from "@/components/SectionHeader";
import { skillLevels } from "@/lib/data";

const chartSkills = skillLevels.slice(0, 8);
const centerX = 200;
const centerY = 200;
const maxRadius = 150;

function getPoint(index: number, value: number, radius: number) {
  const angle = (Math.PI * 2 * index) / chartSkills.length - Math.PI / 2;
  return {
    x: centerX + Math.cos(angle) * radius * (value / 100),
    y: centerY + Math.sin(angle) * radius * (value / 100),
  };
}

function getLabelPoint(index: number, radius: number) {
  const angle = (Math.PI * 2 * index) / chartSkills.length - Math.PI / 2;
  return {
    x: centerX + Math.cos(angle) * radius,
    y: centerY + Math.sin(angle) * radius,
  };
}

export default function SkillRadar() {
  const [animatedValues, setAnimatedValues] = useState(chartSkills.map(() => 0));
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 1200;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setAnimatedValues(
        chartSkills.map((skill) => skill.level * eased)
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible]);

  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <section ref={sectionRef} className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader title="Skill Overview" subtitle="Interactive proficiency radar — hover to explore" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="dev-card p-6 sm:p-8"
        >
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Radar Chart */}
            <div className="flex-1 w-full max-w-[400px]">
              <svg viewBox="0 0 400 400" className="w-full h-auto">
                {/* Grid rings */}
                {rings.map((ring) => (
                  <polygon
                    key={ring}
                    points={chartSkills
                      .map((_, i) => {
                        const p = getLabelPoint(i, maxRadius * ring);
                        return `${p.x},${p.y}`;
                      })
                      .join(" ")}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.5"
                    className="text-white/10"
                  />
                ))}

                {/* Axis lines */}
                {chartSkills.map((_, i) => {
                  const p = getLabelPoint(i, maxRadius);
                  return (
                    <line
                      key={i}
                      x1={centerX}
                      y1={centerY}
                      x2={p.x}
                      y2={p.y}
                      stroke="currentColor"
                      strokeWidth="0.5"
                      className="text-white/10"
                    />
                  );
                })}

                {/* Data polygon */}
                <polygon
                  points={animatedValues
                    .map((val, i) => {
                      const p = getPoint(i, val, maxRadius);
                      return `${p.x},${p.y}`;
                    })
                    .join(" ")}
                  fill="rgba(6, 182, 212, 0.15)"
                  stroke="#06B6D4"
                  strokeWidth="2"
                  className="transition-all duration-100"
                />

                {/* Data points */}
                {animatedValues.map((val, i) => {
                  const p = getPoint(i, val, maxRadius);
                  return (
                    <g key={i}>
                      <circle cx={p.x} cy={p.y} r="4" fill="#06B6D4" className="drop-shadow-lg" />
                      <circle cx={p.x} cy={p.y} r="2" fill="white" />
                    </g>
                  );
                })}

                {/* Labels */}
                {chartSkills.map((skill, i) => {
                  const p = getLabelPoint(i, maxRadius + 28);
                  const anchor =
                    p.x < centerX - 10 ? "end" : p.x > centerX + 10 ? "start" : "middle";
                  return (
                    <text
                      key={i}
                      x={p.x}
                      y={p.y}
                      textAnchor={anchor}
                      dominantBaseline="middle"
                      className="fill-muted text-[11px]"
                      style={{ fontFamily: "var(--font-mono)" }}
                    >
                      {skill.name}
                    </text>
                  );
                })}

                {/* Center dot */}
                <circle cx={centerX} cy={centerY} r="3" fill="#06B6D4" opacity="0.5" />
              </svg>
            </div>

            {/* Skill List */}
            <div className="flex-1 w-full max-w-md">
              <div className="grid grid-cols-2 gap-3">
                {chartSkills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 p-2.5 rounded-lg bg-black/3 dark:bg-white/3 hover:bg-black/5 dark:hover:bg-white/5 transition-all group cursor-default"
                  >
                    <div className="relative w-8 h-8 flex items-center justify-center">
                      <svg width="32" height="32" viewBox="0 0 36 36">
                        <circle
                          cx="18"
                          cy="18"
                          r="15"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                    className="text-black/10 dark:text-white/10"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="15"
                          fill="none"
                          stroke="#06B6D4"
                          strokeWidth="2.5"
                          strokeDasharray={`${(animatedValues[i] / 100) * 94.25} 94.25`}
                          strokeLinecap="round"
                          transform="rotate(-90 18 18)"
                          className="transition-all duration-100"
                        />
                      </svg>
                      <span className="absolute text-[8px] font-mono text-foreground font-semibold">
                        {Math.round(animatedValues[i])}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-medium text-foreground truncate">{skill.name}</div>
                      <div className="text-[10px] text-muted">{skill.level}%</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
