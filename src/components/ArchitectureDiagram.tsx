"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import SectionHeader from "@/components/SectionHeader";

const nodeColors: Record<string, string> = {
  "React.js": "#61dafb",
  "Node.js": "#339933",
  "Express.js": "#fff",
  MongoDB: "#47a248",
  Python: "#3776AB",
  LangChain: "#1C3C3C",
  Streamlit: "#FF4B4B",
  "Vector DB": "#6366f1",
  "Hugging Face": "#FFD21E",
  "Mistral AI": "#FF6A00",
  "OpenWeatherMap API": "#EB6E4B",
  "Tavily API": "#1a1a2e",
  Cheerio: "#E8860C",
  "Vosk STT": "#4FC08D",
  default: "#6366f1",
};

const projectFlows = projects.map((p) => ({
  title: p.title,
  nodes: p.tech.map((t, i) => ({
    name: t,
    color: nodeColors[t] || nodeColors.default,
    x: 10 + (i % 3) * 28,
    y: 8 + Math.floor(i / 3) * 22,
  })),
}));

export default function ArchitectureDiagram() {
  const [active, setActive] = useState(0);
  const [animStep, setAnimStep] = useState(0);
  const flow = projectFlows[active];

  useEffect(() => {
    setAnimStep(0);
    if (flow.nodes.length === 0) return;
    const timer = setInterval(() => {
      setAnimStep((prev) => {
        if (prev >= flow.nodes.length - 1) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 600);
    return () => clearInterval(timer);
  }, [active, flow.nodes.length]);

  return (
    <section id="architecture" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <SectionHeader title="Architecture" subtitle="Tech stack flow visualization" />
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {projects.map((p, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`px-4 py-2 text-sm rounded-full transition-all ${
                  active === i ? "bg-primary text-white" : "glass text-muted hover:text-foreground"
                }`}
              >
                {p.title.split(" — ")[0]}
              </button>
            ))}
          </div>

          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass rounded-2xl p-6 sm:p-8"
          >
            <h3 className="text-sm font-mono text-primary-light mb-6">
              Tech Stack Flow — {flow.title}
            </h3>

            <div className="relative w-full aspect-[3/1] max-h-[300px]">
              <svg viewBox="0 0 100 50" className="w-full h-full">
                {flow.nodes.slice(0, animStep + 1).map((node, i) => (
                  <g key={i}>
                    {i > 0 && (
                      <motion.line
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.5 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        x1={flow.nodes[i - 1].x + 11}
                        y1={flow.nodes[i - 1].y + 8}
                        x2={node.x}
                        y2={node.y + 8}
                        stroke={node.color}
                        strokeWidth="0.5"
                        strokeDasharray="1 1"
                      />
                    )}
                    {i > 0 && (
                      <motion.circle
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4 }}
                        cx={(flow.nodes[i - 1].x + 11 + node.x) / 2}
                        cy={(flow.nodes[i - 1].y + 8 + node.y + 8) / 2}
                        r="1"
                        fill={node.color}
                        className="animate-ping"
                        style={{ animationDuration: "1.5s" }}
                      />
                    )}
                    <motion.rect
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 200, delay: i * 0.15 }}
                      x={node.x}
                      y={node.y}
                      width="22"
                      height="16"
                      rx="3"
                      fill={`${node.color}20`}
                      stroke={node.color}
                      strokeWidth="0.4"
                    />
                    <motion.text
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.15 + 0.2 }}
                      x={node.x + 11}
                      y={node.y + 10}
                      textAnchor="middle"
                      fill={node.color}
                      fontSize="2.5"
                      fontWeight="600"
                    >
                      {node.name.length > 10 ? node.name.slice(0, 8) + ".." : node.name}
                    </motion.text>
                  </g>
                ))}
              </svg>

              <AnimatePresence>
                {animStep < flow.nodes.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-2 left-1/2 -translate-x-1/2"
                  >
                    <span className="text-xs font-mono text-muted animate-pulse">
                      Animating flow...
                    </span>
                  </motion.div>
                )}
                {animStep >= flow.nodes.length - 1 && flow.nodes.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-2 right-3"
                  >
                    <span className="text-xs font-mono text-green-400">✓ Complete</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
