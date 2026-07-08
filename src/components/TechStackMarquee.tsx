"use client";

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
  SiVercel,
  SiPostman,
} from "react-icons/si";
import { GiArtificialIntelligence } from "react-icons/gi";
import { DiDatabase } from "react-icons/di";

const techItems = [
  { name: "Python", icon: <SiPython />, color: "#3776AB" },
  { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E" },
  { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
  { name: "React", icon: <SiReact />, color: "#61DAFB" },
  { name: "Next.js", icon: <SiNextdotjs />, color: "#ffffff" },
  { name: "Tailwind", icon: <SiTailwindcss />, color: "#06B6D4" },
  { name: "Node.js", icon: <SiNodedotjs />, color: "#339933" },
  { name: "Express", icon: <SiExpress />, color: "#ffffff" },
  { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
  { name: "MySQL", icon: <SiMysql />, color: "#4479A1" },
  { name: "LangChain", icon: <GiArtificialIntelligence />, color: "#6366f1" },
  { name: "Vector DB", icon: <DiDatabase />, color: "#6366f1" },
  { name: "Git", icon: <SiGit />, color: "#F05032" },
  { name: "Vercel", icon: <SiVercel />, color: "#ffffff" },
  { name: "Postman", icon: <SiPostman />, color: "#FF6C37" },
];

export default function TechStackMarquee() {
  const doubled = [...techItems, ...techItems];

  return (
    <section className="py-12 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-6">
        <p className="text-center text-xs font-mono text-muted tracking-widest uppercase">
          Tech Stack
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex animate-marquee">
          {doubled.map((tech, i) => (
            <div key={`${tech.name}-${i}`} className="flex-shrink-0 mx-2">
              <div className="dev-card px-4 py-2.5 flex items-center gap-2 cursor-default">
                <span className="text-base" style={{ color: tech.color }}>
                  {tech.icon}
                </span>
                <span className="text-sm text-muted whitespace-nowrap">{tech.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
