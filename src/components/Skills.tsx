"use client";

import { motion } from "framer-motion";
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiGit,
} from "react-icons/si";
import { GiArtificialIntelligence } from "react-icons/gi";
import { DiDatabase } from "react-icons/di";
import SectionHeader from "@/components/SectionHeader";
import { skills, skillLevels } from "@/lib/data";

const iconMap: Record<string, React.ReactNode> = {
  Python: <SiPython />,
  JavaScript: <SiJavascript />,
  TypeScript: <SiTypescript />,
  "React.js": <SiReact />,
  "Next.js": <SiNextdotjs />,
  "Tailwind CSS": <SiTailwindcss />,
  "Node.js": <SiNodedotjs />,
  "Express.js": <SiExpress />,
  MongoDB: <SiMongodb />,
  MySQL: <SiMysql />,
  Git: <SiGit />,
  LangChain: <GiArtificialIntelligence />,
  "OpenAI API": <GiArtificialIntelligence />,
  "Gemini API": <GiArtificialIntelligence />,
  "Vector DB": <DiDatabase />,
  Pinecone: <DiDatabase />,
};

const categoryColors: Record<string, string> = {
  ai: "#06B6D4",
  frontend: "#22D3EE",
  backend: "#F59E0B",
  databases: "#EF4444",
  languages: "#D946EF",
  tools: "#6366F1",
  concepts: "#EC4899",
};

const skillCategories = [
  { key: "ai", label: "AI & ML" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "databases", label: "Databases" },
  { key: "languages", label: "Languages" },
  { key: "tools", label: "Tools" },
  { key: "concepts", label: "Concepts" },
] as const;

type SkillCategory = keyof typeof skills;

export default function Skills() {
  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader title="Skills" subtitle="Technologies and tools I work with" />

        {/* Skill Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {skillCategories.map((cat, ci) => {
            const items = skills[cat.key as SkillCategory];
            const color = categoryColors[cat.key];
            return (
              <motion.div
                key={cat.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: ci * 0.05, duration: 0.4 }}
                whileHover={{ y: -2 }}
                className="dev-card p-5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                  <h3 className="text-sm font-semibold text-foreground">{cat.label}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((skill) => (
                    <span key={skill} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs bg-black/5 dark:bg-white/5 text-muted border border-black/5 dark:border-white/5 hover:border-primary/30 hover:text-primary transition-all cursor-default">
                      {iconMap[skill] && <span className="text-sm opacity-70">{iconMap[skill]}</span>}
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Proficiency Bars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="dev-card p-6"
        >
          <h3 className="text-sm font-semibold text-foreground mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Core Proficiency
          </h3>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
            {skillLevels.map((skill, i) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-foreground font-medium">{skill.name}</span>
                  <span className="text-xs text-muted font-mono">{skill.level}%</span>
                </div>
                <div className="progress-bar">
                  <motion.div
                    className="progress-bar-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.8, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
