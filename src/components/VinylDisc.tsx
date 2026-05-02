"use client";

import { useEffect, useRef } from "react";

export default function VinylDisc() {
  const ref = useRef<HTMLDivElement>(null);
  const middleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let scrollY = 0;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    const tick = () => {
      if (ref.current) {
        const r = scrollY * 0.06;
        ref.current.style.transform = `translate(-50%, -15%) rotate(${r}deg)`;
      }
      if (middleRef.current) {
        middleRef.current.style.transform = `rotate(${(scrollY * 0.18) % 360}deg)`;
      }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: "fixed",
        top: "24.4vh",
        left: "50%",
        zIndex: 1,
        width: "80vmin",
        height: "80vmin",
        transform: "translate(-50%, -15%)",
        pointerEvents: "none",
        mixBlendMode: "lighten",
        opacity: 0.6,
      }}
    >
      <img
        src="/images/Disc/side.png"
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
      <img
        ref={middleRef as React.Ref<HTMLImageElement>}
        src="/images/Disc/middle.png"
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
          transformOrigin: "center",
          willChange: "transform",
        }}
      />
      <img
        src="/images/Disc/last-side.png"
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
      <img
        src="/images/Disc/hole.svg"
        alt=""
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "3%",
          height: "3%",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  );
}
