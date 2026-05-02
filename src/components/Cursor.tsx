"use client";

import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const hoveringRef = useRef(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    let mx = -100,
      my = -100;
    let rx = -100,
      ry = -100;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) setVisible(true);
      // Recheck hover on every move so state recovers when buttons unmount
      const t = e.target as HTMLElement | null;
      const isHovering = !!t?.closest("a, button, [data-cursor='hover']");
      if (isHovering !== hoveringRef.current) {
        hoveringRef.current = isHovering;
        setHovering(isHovering);
      }
    };

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`;
        ringRef.current.style.top = `${ry}px`;
      }
      if (dotRef.current) {
        dotRef.current.style.left = `${rx}px`;
        dotRef.current.style.top = `${ry}px`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [visible]);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: "fixed",
          top: -100,
          left: -100,
          width: 8,
          height: 8,
          borderRadius: 9999,
          background: "#fafafa",
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
          transform: "translate(-50%, -50%)",
          opacity: visible ? 1 : 0,
        }}
      />
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: "fixed",
          top: -100,
          left: -100,
          width: hovering ? 56 : 36,
          height: hovering ? 56 : 36,
          borderRadius: 9999,
          border: `1px solid ${hovering ? "rgba(250,250,250,0.9)" : "rgba(250,250,250,0.6)"}`,
          pointerEvents: "none",
          zIndex: 9999,
          mixBlendMode: "difference",
          transform: "translate(-50%, -50%)",
          transition: "width 0.25s ease, height 0.25s ease, border-color 0.25s ease",
          opacity: visible ? 1 : 0,
        }}
      />
    </>
  );
}
