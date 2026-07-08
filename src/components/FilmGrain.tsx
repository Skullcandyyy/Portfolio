"use client";

import { useEffect, useState } from "react";

export default function FilmGrain() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Defer rendering to avoid blocking first paint
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-40 pointer-events-none opacity-[0.015]"
      aria-hidden="true"
    >
      <svg width="100%" height="100%">
        <filter id="film-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#film-grain)" />
      </svg>
    </div>
  );
}
