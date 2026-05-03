"use client";

import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

const SCRIBBLE_D =
  "M2 19.3123C63.7255 19.3123 125.55 13.9353 186.907 13.9353C201.249 13.9353 199.943 3.66424 186.907 3.18145C166.129 2.41188 139.648 -0.462263 120.293 7.0648C116.022 8.72585 33.5983 27.4268 66.5234 46.7945C74.0917 51.2464 87.0611 62.3279 96.0966 62.3279C100.354 62.3279 79.5924 54.2624 73.2445 54.2624C63.6952 54.2624 53.8413 59.6505 65.3285 69.049C88.2425 87.7969 105.24 110 121.338 134.767C131.569 150.506 138.634 175.038 136.274 193.914C135.268 201.962 123.342 209.961 117.455 214.376C105.449 223.381 93.8389 235.154 83.2516 245.741C48.3967 280.596 27.7675 323.169 34.411 372.996C35.2306 379.143 36.3731 385.227 37.6155 391.291C42.9319 417.241 64.336 438.493 76.5455 462V462";

export default function PreAbout() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [textVisible, setTextVisible] = useState(false);

  // Trigger text clip animation when the text enters the bottom of the viewport.
  // threshold=0.6 on a 100vh section means 60vh is visible — the text at top:60vh
  // is exactly at the viewport bottom edge, so the reveal starts the moment it enters view.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTextVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.6 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Trigger scribble draw
  useEffect(() => {
    const el = lineRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setTimeout(() => el.classList.add("animated"), 200);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const renderChars = (
    text: string,
    startDelay: number,
    charDelay: number,
    duration: number,
    style: React.CSSProperties,
  ) =>
    text.split("").map((char, i) =>
      char === " " ? (
        <span key={i} style={{ display: "inline-block", width: "0.28em" }} />
      ) : (
        <span
          key={i}
          style={{
            display: "inline-block",
            opacity: textVisible ? 1 : 0,
            transition: textVisible
              ? `opacity ${duration}s ease ${startDelay + i * charDelay}s`
              : "none",
            ...style,
          }}
        >
          {char}
        </span>
      ),
    );

  return (
    <section
      ref={sectionRef}
      id="pre-about"
      style={{
        position: "relative",
        height: "100vh",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: isMobile ? "50%" : "60vh",
          left: "50%",
          transform: isMobile ? "translate(-50%, -50%)" : "translateX(-50%)",
          width: "100%",
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            textTransform: "uppercase",
            fontSize: isMobile ? "4.103vw" : "1.19vw",
            lineHeight: 1.6,
            position: "relative",
            color: "#fff",
            textAlign: "center",
          }}
        >
          {/* Line 1 — "Empowering artists and": duration 0.5s, stagger 0.025s */}
          <div>
            {renderChars("Empowering artists and", 0, 0.025, 0.5, { color: "rgba(255,255,255,0.6)" })}
          </div>

          {/* Line 2 — "redefining" starts 0.25s after line 1, "the future of music" at 0.5s */}
          <div>
            {renderChars("redefining", 0.25, 0.025, 0.5, { color: "rgba(255,255,255,0.6)" })}
            <span style={{ display: "inline-block", width: "0.28em" }} />
            {renderChars("the future of music", 0.5, 0.05, 0.5, { color: "#fafafa", fontWeight: 500 })}
          </div>

          {/* Scribble — anchored below text block */}
          <div
            ref={lineRef}
            className="drawable-line"
            style={{
              position: "absolute",
              left: "50%",
              bottom: 0,
              height: isMobile ? "40.9953vh" : "40vh",
              width: isMobile ? "37.692vw" : undefined,
              transform: "translate(-50%, 110%)",
              pointerEvents: "none",
              zIndex: 3,
            }}
            aria-hidden
          >
            <svg width="199" height="464" viewBox="0 0 199 464" fill="none">
              <path
                d={SCRIBBLE_D}
                stroke="#fafafa"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
