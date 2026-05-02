"use client";

import { useEffect, useRef, useState } from "react";

export default function CrossBrackets({ interactive = true }: { interactive?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), 300);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .cross-brackets {
          position: relative;
          display: flex;
          height: 10vw;
          width: 10vw;
          transform: scale(2);
          flex-direction: column-reverse;
          align-items: center;
          justify-content: center;
        }
        .cross-brackets > svg {
          pointer-events: none;
          height: 1.058vw;
          width: 1.058vw;
          opacity: 0;
          transition: translate 0.4s ease;
        }
        .cross-brackets > svg:nth-child(1) {
          transform: scale(0.5) translate(-200%, 100%);
          transform-origin: top right;
        }
        .cross-brackets > svg:nth-child(2) {
          transform: scale(0.5) translate(100%, -100%);
          transform-origin: bottom right;
        }
        .cross-brackets.visible > svg:nth-child(1) {
          animation: cb-initFirst 2s forwards ease 0.5s;
        }
        .cross-brackets.visible > svg:nth-child(2) {
          animation: cb-initSecond 2s forwards ease 0.5s;
        }
        @keyframes cb-initFirst {
          to { opacity: 1; transform: scale(0.5) translate(-100%) translateY(0); }
        }
        @keyframes cb-initSecond {
          to { opacity: 1; transform: scale(0.5) translate(0) translateY(0); }
        }
        ${interactive ? `
        .cross-brackets:hover > svg:nth-child(1) {
          translate: -75% 50%;
        }
        .cross-brackets:hover > svg:nth-child(2) {
          translate: 50% -50%;
        }` : ""}
      `}</style>
      <div ref={ref} className={`cross-brackets${visible ? " visible" : ""}`} style={interactive ? undefined : { pointerEvents: "none" }}>
        {/* top-right bracket: ⌐ */}
        <svg width="18" height="19" viewBox="0 0 18 19" fill="none">
          <path
            d="M16.8018 18.1299V8.67879C16.8018 4.61903 13.5107 1.32794 9.45091 1.32794H-0.000183105"
            stroke="white"
            strokeWidth="1.57518"
          />
        </svg>
        {/* bottom-left bracket: L */}
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path
            d="M0.801758 0V9.45109C0.801758 13.5109 4.09284 16.8019 8.15261 16.8019H17.6037"
            stroke="white"
            strokeWidth="1.57518"
          />
        </svg>
      </div>
    </>
  );
}
