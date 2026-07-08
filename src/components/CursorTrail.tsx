"use client";

import { useEffect, useRef } from "react";

export default function CursorTrail() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
      }
    };

    const raf = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x - 15}px, ${ringPos.current.y - 15}px)`;
      }
      requestAnimationFrame(raf);
    };

    const handleHoverIn = () => {
      if (ringRef.current) {
        ringRef.current.style.width = "44px";
        ringRef.current.style.height = "44px";
        ringRef.current.style.borderColor = "rgba(6, 182, 212, 0.5)";
        ringRef.current.style.backgroundColor = "rgba(6, 182, 212, 0.04)";
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 3}px, ${pos.current.y - 3}px) scale(1.5)`;
      }
    };

    const handleHoverOut = () => {
      if (ringRef.current) {
        ringRef.current.style.width = "30px";
        ringRef.current.style.height = "30px";
        ringRef.current.style.borderColor = "rgba(6, 182, 212, 0.3)";
        ringRef.current.style.backgroundColor = "transparent";
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 3}px, ${pos.current.y - 3}px) scale(1)`;
      }
    };

    const selector = 'a, button, input, textarea, select, [role="button"], label';
    const elements = document.querySelectorAll(selector);

    elements.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverIn);
      el.addEventListener("mouseleave", handleHoverOut);
    });

    window.addEventListener("mousemove", onMouse);
    raf();

    return () => {
      window.removeEventListener("mousemove", onMouse);
      elements.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverIn);
        el.removeEventListener("mouseleave", handleHoverOut);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot max-md:hidden" />
      <div ref={ringRef} className="cursor-ring max-md:hidden" />
    </>
  );
}
