"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const lines = [
  "> rohit@portfolio:~$ whoami",
  "Rohit Kumar — AI & Full Stack Developer",
  "",
  "> rohit@portfolio:~$ cat skills.txt",
  "Python  |  JavaScript  |  TypeScript  |  SQL  |  C",
  "React  |  Next.js  |  Node.js  |  Express  |  FastAPI",
  "LangChain  |  RAG  |  LLMs  |  Vector DB  |  Pinecone",
  "MongoDB  |  MySQL  |  Git  |  Docker  |  Streamlit",
  "",
  "> rohit@portfolio:~$ echo $STATUS",
  "Open for SDE / AI Engineering opportunities 🚀",
  "",
  "> rohit@portfolio:~$",
];

export default function Terminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [typing, setTyping] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visibleLines >= lines.length) {
      setTyping(false);
      return;
    }

    const currentLine = lines[visibleLines];
    if (!currentLine) {
      const t = setTimeout(() => setVisibleLines((v) => v + 1), 150);
      return () => clearTimeout(t);
    }

    if (currentChar < currentLine.length) {
      const t = setTimeout(() => setCurrentChar((c) => c + 1), 25);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setVisibleLines((v) => v + 1);
        setCurrentChar(0);
      }, 300);
      return () => clearTimeout(t);
    }
  }, [visibleLines, currentChar]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [visibleLines, currentChar]);

  return (
    <section id="terminal" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="gradient-text">Terminal</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-8" />

          <div
            ref={containerRef}
            className="glass rounded-2xl overflow-hidden max-h-[500px] overflow-y-auto"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-primary/10 bg-black/20">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-xs text-muted ml-2 font-mono">
                rohit@portfolio — bash
              </span>
            </div>

            <div className="p-4 sm:p-6 font-mono text-sm leading-relaxed">
              {lines.slice(0, visibleLines).map((line, i) => (
                <div key={i} className="mb-1">
                  {i === visibleLines - 1 && typing && line ? (
                    <span>
                      <span className="text-green-400">{line.slice(0, currentChar)}</span>
                      <span className="animate-pulse text-primary-light">▊</span>
                    </span>
                  ) : (
                    <span
                      className={
                        line.startsWith(">")
                          ? "text-green-400"
                          : "text-muted"
                      }
                    >
                      {line}
                    </span>
                  )}
                </div>
              ))}
              {!typing && (
                <span className="text-green-400 animate-pulse">▊</span>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
