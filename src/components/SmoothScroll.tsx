"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let smoother: ScrollSmoother | null = null;
    try {
      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
      smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.5,
        effects: true,
      });
    } catch {
      // ScrollSmoother is a Club plugin; fall back gracefully if unavailable.
    }

    document.body.classList.add("page-loaded");

    return () => {
      smoother?.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div id="smooth-wrapper" ref={wrapperRef}>
      <div id="smooth-content" style={{ position: "relative" }}>{children}</div>
    </div>
  );
}
