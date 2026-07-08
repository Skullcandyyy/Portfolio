"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLines = [
  { text: "> initializing system...", delay: 0 },
  { text: "> loading rohit_kumarPortfolio v3.0.0", delay: 200 },
  { text: "> mounting react components .............. ok", delay: 400 },
  { text: "> connecting to 3d engine (three.js) .... ok", delay: 600 },
  { text: "> fetching skills & projects ............. ok", delay: 800 },
  { text: "> rendering ui ................. ok", delay: 1000 },
  { text: "", delay: 1200 },
  { text: "> SYSTEM READY", delay: 1300 },
];

export default function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [fadingOut, setFadingOut] = useState(false);

  const handleComplete = useCallback(() => {
    setFadingOut(true);
    setTimeout(onComplete, 600);
  }, [onComplete]);

  useEffect(() => {
    // Check if boot was already shown
    if (typeof window !== "undefined" && sessionStorage.getItem("boot-done")) {
      onComplete();
      return;
    }

    bootLines.forEach((line, i) => {
      setTimeout(() => setVisibleLines(i + 1), line.delay);
    });

    const timer = setTimeout(() => {
      sessionStorage.setItem("boot-done", "1");
      handleComplete();
    }, 2200);

    return () => clearTimeout(timer);
  }, [onComplete, handleComplete]);

  return (
    <AnimatePresence>
      {!fadingOut && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[9999] bg-background flex items-center justify-center"
        >
          <div className="max-w-lg w-full px-6">
            <div className="mb-6">
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-blue-500 via-emerald-400 to-violet-500 rounded-full"
                />
              </div>
            </div>
            <div className="space-y-1 font-mono text-xs sm:text-sm">
              {bootLines.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className={`${
                    line.text.includes("SYSTEM READY")
                      ? "text-emerald-400 font-bold"
                      : "text-gray-500"
                  }`}
                >
                  {line.text}
                </motion.div>
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="mt-4 text-blue-500 font-mono text-xs"
            >
              _
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
