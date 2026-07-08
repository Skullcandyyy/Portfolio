"use client";

import { useMemo } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

interface Crewmate {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  direction: number;
}

const crewmateColors = ["#C51111", "#1155CC", "#4CC700", "#FFCC00", "#FF6B9D", "#FF8C00", "#A855F7", "#FFFFFF"];

export default function SpaceBackground() {
  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: 150 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 3,
      })),
    []
  );

  const crewmates = useMemo<Crewmate[]>(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: Math.random() * 80 + 10,
        y: Math.random() * 80 + 10,
        size: Math.random() * 20 + 25,
        color: crewmateColors[Math.floor(Math.random() * crewmateColors.length)],
        duration: Math.random() * 10 + 15,
        delay: Math.random() * 5,
        direction: Math.random() > 0.5 ? 1 : -1,
      })),
    []
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D2B] via-[#151540] to-[#0D0D2B]" />

      {/* Nebula effect */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-900/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-900/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            "--duration": `${star.duration}s`,
            "--delay": `${star.delay}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* Planet */}
      <div className="absolute top-20 right-20 hidden lg:block">
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-orange-600 to-orange-900 shadow-lg shadow-orange-900/50" />
          <div className="absolute top-4 left-8 w-20 h-4 bg-orange-800/50 rounded-full rotate-12" />
          <div className="absolute top-12 left-4 w-24 h-3 bg-orange-700/40 rounded-full -rotate-6" />
        </div>
      </div>

      {/* Small planet */}
      <div className="absolute bottom-32 left-16 hidden lg:block">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-800 shadow-lg shadow-blue-900/50" />
      </div>

      {/* Floating crewmates */}
      {crewmates.map((mate) => (
        <div
          key={mate.id}
          className="absolute crewmate-float hidden md:block"
          style={{
            left: `${mate.x}%`,
            top: `${mate.y}%`,
            animationDuration: `${mate.duration}s`,
            animationDelay: `${mate.delay}s`,
          }}
        >
          <svg
            width={mate.size}
            height={mate.size}
            viewBox="0 0 100 100"
            fill="none"
            style={{ transform: `scaleX(${mate.direction})` }}
          >
            {/* Body */}
            <ellipse cx="50" cy="55" rx="30" ry="35" fill={mate.color} />
            {/* Visor */}
            <ellipse cx="65" cy="45" rx="15" ry="12" fill="#87CEEB" />
            <ellipse cx="65" cy="43" rx="12" ry="8" fill="#B0E0E6" />
            {/* Highlight */}
            <ellipse cx="45" cy="40" rx="8" ry="12" fill="white" opacity="0.2" />
            {/* Backpack */}
            <rect x="18" y="45" width="12" height="20" rx="4" fill={mate.color} />
          </svg>
        </div>
      ))}

      {/* Shooting stars */}
      {Array.from({ length: 3 }, (_, i) => (
        <div
          key={`shooting-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${20 + i * 30}%`,
            top: `${10 + i * 20}%`,
            boxShadow: "0 0 6px 2px rgba(255,255,255,0.6), -20px 0 10px rgba(255,255,255,0.4), -40px 0 8px rgba(255,255,255,0.2)",
            animation: `shooting-star ${8 + i * 2}s linear infinite`,
            animationDelay: `${i * 3}s`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes shooting-star {
          0% {
            transform: translateX(0) translateY(0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateX(300px) translateY(200px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
