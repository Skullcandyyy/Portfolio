"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { terminalCommands } from "@/lib/data";
import SectionHeader from "@/components/SectionHeader";

export default function InteractiveTerminal() {
  const [history, setHistory] = useState<{ type: "input" | "output"; text: string }[]>([
    { type: "output", text: "Welcome! Type 'help' to see available commands." },
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const processCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory = [...history, { type: "input" as const, text: `$ ${cmd}` }];
    setCommandHistory((prev) => [...prev, cmd]);
    setHistoryIndex(-1);

    if (trimmed === "clear") {
      setHistory([]);
      return;
    }

    const response =
      terminalCommands[trimmed] || `Command not found: ${trimmed}\nType 'help' for available commands.`;

    setHistory([...newHistory, { type: "output", text: response }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    processCommand(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
      }
    }
  };

  return (
    <section className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader title="Terminal" subtitle="Interactive CLI — try some commands" />

          <div
            onClick={() => inputRef.current?.focus()}
            className="cursor-text"
          >
            <div className="code-block overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs text-muted font-mono ml-2">terminal</span>
              </div>

              {/* Terminal body */}
              <div className="p-4 sm:p-5 font-mono text-[13px] max-h-[350px] overflow-y-auto">
                {history.map((entry, i) => (
                  <div key={i} className="mb-1 whitespace-pre-wrap leading-relaxed">
                    {entry.type === "input" ? (
                      <span className="text-primary">{entry.text}</span>
                    ) : (
                      <span className="text-muted">{entry.text}</span>
                    )}
                  </div>
                ))}

                <form onSubmit={handleSubmit} className="flex mt-1">
                  <span className="text-primary mr-2 shrink-0">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none text-foreground caret-primary font-mono"
                    autoComplete="off"
                    spellCheck={false}
                  />
                </form>

                <div ref={bottomRef} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
