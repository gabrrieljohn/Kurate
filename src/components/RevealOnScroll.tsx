"use client";

import { useEffect } from "react";

export default function RevealOnScroll() {
  useEffect(() => {
    const targets = Array.from(
      document.querySelectorAll<HTMLElement>(
        "section, header, footer, .reveal-container",
      ),
    );

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const reveals = Array.from(
            e.target.querySelectorAll<HTMLElement>(".reveal"),
          );
          reveals.forEach((el, i) => {
            if (!el.style.transitionDelay) {
              el.style.transitionDelay = `${i * 0.13}s`;
            }
          });
          e.target.classList.add("animated");
          io.unobserve(e.target);
        });
      },
      // rootMargin shrinks the bottom of the viewport by 75%, leaving only the
      // top 25% as the active root. Fires when an element's top edge enters that
      // zone — equivalent to GSAP ScrollTrigger's `start: "top 25%"`.
      { rootMargin: "0px 0px -75% 0px", threshold: 0 },
    );

    targets.forEach((t) => io.observe(t));
    document.body.classList.add("page-loaded");
    return () => io.disconnect();
  }, []);

  return null;
}
