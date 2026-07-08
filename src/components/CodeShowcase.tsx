"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Highlight, themes } from "prism-react-renderer";
import { codeSnippets } from "@/lib/data";

export default function CodeShowcase() {
  const [active, setActive] = useState(0);
  const snippet = codeSnippets[active];

  return (
    <section id="code" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="gradient-text">Code</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-8" />

          <div className="flex flex-wrap gap-2 mb-6">
            {codeSnippets.map((s, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`px-4 py-2 text-sm rounded-full transition-all ${
                  active === i
                    ? "bg-primary text-white"
                    : "glass text-muted hover:text-white"
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>

          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="glass rounded-2xl overflow-hidden"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-primary/10 bg-black/20">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="text-xs text-muted ml-2 font-mono">
                {snippet.title}.{snippet.language === "python" ? "py" : "js"}
              </span>
            </div>

            <Highlight
              theme={themes.nightOwl}
              code={snippet.code.trim()}
              language={snippet.language as "python" | "javascript"}
            >
              {({ tokens, getLineProps, getTokenProps }) => (
                <pre className="p-4 sm:p-6 text-sm overflow-x-auto font-mono leading-relaxed">
                  {tokens.map((line, i) => {
                    const lineProps = getLineProps({ line });
                    return (
                      <div key={i} {...lineProps}>
                        <span className="text-muted select-none mr-4 inline-block w-8 text-right text-xs">
                          {i + 1}
                        </span>
                        {line.map((token, key) => (
                          <span key={key} {...getTokenProps({ token })} />
                        ))}
                      </div>
                    );
                  })}
                </pre>
              )}
            </Highlight>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
