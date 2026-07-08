"use client";

import { useEffect, useRef } from "react";

export default function SpotlightCursor() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spotlight = spotlightRef.current;
    if (!spotlight) return;

    const onMouseMove = (e: MouseEvent) => {
      spotlight.style.opacity = "1";
      spotlight.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(37, 99, 235, 0.06), transparent 40%)`;
    };

    const onMouseLeave = () => {
      spotlight.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      className="fixed inset-0 z-30 pointer-events-none opacity-0 transition-opacity duration-300"
      aria-hidden="true"
    />
  );
}
