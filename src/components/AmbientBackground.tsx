"use client";

import { useMemo } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
  shape: "square" | "diamond";
}

const particles: Particle[] = [
  { x: 10, y: 15, size: 8, duration: 15, delay: 0, color: "rgba(74,222,128,", shape: "square" },
  { x: 25, y: 30, size: 6, duration: 18, delay: -3, color: "rgba(34,197,94,", shape: "diamond" },
  { x: 45, y: 20, size: 10, duration: 20, delay: -5, color: "rgba(74,222,128,", shape: "square" },
  { x: 65, y: 45, size: 5, duration: 16, delay: -2, color: "rgba(167,139,250,", shape: "diamond" },
  { x: 80, y: 25, size: 7, duration: 22, delay: -7, color: "rgba(74,222,128,", shape: "square" },
  { x: 15, y: 60, size: 6, duration: 19, delay: -4, color: "rgba(245,158,11,", shape: "diamond" },
  { x: 55, y: 70, size: 8, duration: 17, delay: -6, color: "rgba(74,222,128,", shape: "square" },
  { x: 75, y: 65, size: 5, duration: 21, delay: -1, color: "rgba(34,197,94,", shape: "diamond" },
  { x: 35, y: 80, size: 7, duration: 14, delay: -8, color: "rgba(74,222,128,", shape: "square" },
  { x: 90, y: 50, size: 6, duration: 23, delay: -3, color: "rgba(167,139,250,", shape: "diamond" },
];

export default function AmbientBackground() {
  const renderedParticles = useMemo(
    () =>
      particles.map((p, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: `${p.color}0.15)`,
            borderRadius: p.shape === "diamond" ? "0" : "0",
            transform: p.shape === "diamond" ? "rotate(45deg)" : "none",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            willChange: "transform",
            imageRendering: "pixelated",
          }}
        />
      )),
    []
  );

  const starField = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 5,
      })),
    []
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-20" aria-hidden>
      {renderedParticles}
      {starField.map((star, i) => (
        <div
          key={`star-${i}`}
          className="absolute bg-primary/20 animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            animationDelay: `${star.delay}s`,
            animationDuration: "3s",
          }}
        />
      ))}
    </div>
  );
}
