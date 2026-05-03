"use client";

import { useEffect, useRef, useState } from "react";
import CrossBrackets from "@/components/CrossBrackets";
import { useIsMobile } from "@/hooks/useIsMobile";

const DYNAMIC_DELAYS = [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.85];

const BAR_CONFIG = [
  { anim: 1, dur: 1.7, delay: 0.05  },
  { anim: 3, dur: 1.8, delay: 0.1   },
  { anim: 3, dur: 1.7, delay: 0.15  },
  { anim: 2, dur: 1.8, delay: 0.2   },
  { anim: 1, dur: 1.6, delay: 0.25  },
  { anim: 2, dur: 1.8, delay: 0.3   },
  { anim: 3, dur: 1.7, delay: 0.35  },
  { anim: 1, dur: 1.7, delay: 0.4   },
  { anim: 3, dur: 1.7, delay: 0.45  },
  { anim: 1, dur: 1.6, delay: 0.5   },
  { anim: 1, dur: 1.8, delay: 0.55  },
  { anim: 1, dur: 1.6, delay: 0.6   },
  { anim: 2, dur: 1.6, delay: 0.65  },
  { anim: 2, dur: 1.8, delay: 0.7   },
  { anim: 1, dur: 1.7, delay: 0.75  },
  { anim: 2, dur: 1.8, delay: 0.8   },
];

function Spectrograph({ visible, isMobile }: { visible: boolean; isMobile: boolean }) {
  return (
    <span
      aria-hidden
      style={{
        display: "inline-flex",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: "1px",
        height: isMobile ? "9.231vw" : "4.63vw",
        width: isMobile ? "20vw" : "9.921vw",
        borderRadius: isMobile ? "22.308vw" : "9999px",
        padding: "0 1vw",
        verticalAlign: "middle",
        margin: "0 1.323vw",
        overflow: "hidden",
        position: "relative",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(25%)",
        transition: visible
          ? "opacity 1s ease 0.5s, transform 1s ease 0.5s"
          : "none",
      }}
    >
      <img
        src="/images/About/rect.jpg"
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />
      <span
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          right: 0,
          zIndex: 1,
          display: "flex",
          alignItems: "flex-end",
          gap: "3px",
          height: "100%",
          width: "100%",
          justifyContent: "center",
          overflow: "hidden",
          padding: "0 0.8vw",
          boxSizing: "border-box",
        }}
      >
        {BAR_CONFIG.map((bar, i) => (
          <span
            key={i}
            style={{
              flex: isMobile ? "0 0 2px" : "0 0 8px",
              background: "#fafafa",
              borderRadius: isMobile ? "1px" : "6px",
              height: "50%",
              transformOrigin: "center bottom",
              transform: "translateY(100%)",
              willChange: "transform",
              animation: `specto-${bar.anim} ${bar.dur}s ease-in-out ${bar.delay}s infinite alternate`,
            }}
          />
        ))}
      </span>
      <style>{`
        @keyframes specto-1 { 0%, 5% { transform: translateY(100%) } to { transform: translateY(0) } }
        @keyframes specto-2 { 0%, 66% { transform: translateY(100%) } 33%, to { transform: translateY(0) } }
        @keyframes specto-3 { 33%, 66% { transform: translateY(100%) } 0%, 45%, to { transform: translateY(0) } }
      `}</style>
    </span>
  );
}

const H3_STYLE: React.CSSProperties = {
  lineHeight: "112.8%",
  textTransform: "none",
  fontWeight: 400,
  textAlign: "center",
};

const h3Delay = (i: number): React.CSSProperties => ({
  ...H3_STYLE,
  transitionDelay: `${i * 0.15}s`,
});

export default function About() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const [sectionVisible, setSectionVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -75% 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className={sectionVisible ? "section animated" : "section"}
      style={{ height: "auto", minHeight: "100vh" }}
    >
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "90px",
          padding: "12vh 2vw",
          position: "relative",
          width: "100%",
          overflow: "hidden",
        }}
      >
        {/* About text block */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Line 1: "(About) Empowering artists," — section-span is absolute in left margin */}
          <h3 className="reveal" style={{ ...h3Delay(0), position: "relative" }}>
            <span
              className="section-span"
              style={{ position: "absolute", top: 0, left: 0, transform: "translateX(-200%)" }}
            >
              <div className="reveal">(About)</div>
            </span>
            Empowering artists,
          </h3>

          {/* Line 2: "captivating global [spec] audiences," — flexWrap so spec+audiences wraps on mobile */}
          <h3
            className="reveal"
            style={{ ...h3Delay(1), display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}
          >
            captivating global
            <Spectrograph visible={sectionVisible} isMobile={isMobile} />
            audiences,
          </h3>

          {/* Line 3: "and redefining the future of music" — underline on "redefining" */}
          <h3 className="reveal" style={h3Delay(2)}>
            and{" "}
            <span style={{ position: "relative" }}>
              redefining
              <div
                style={{
                  position: "absolute",
                  bottom: "0.18em",
                  left: 0,
                  width: sectionVisible ? "85%" : "0",
                  height: "2px",
                  backgroundColor: "rgba(250,250,250,0.302)",
                  transition: sectionVisible ? "width 1.5s ease 0.5s" : "none",
                }}
              />
            </span>
            {" "}the future of music
          </h3>

          {/* Line 4: "as a dynamic record label" — shine animation on "dynamic" */}
          <h3
            className={sectionVisible ? "reveal about-shine-active" : "reveal"}
            style={h3Delay(3)}
          >
            as a{" "}
            {"dynamic".split("").map((char, i) => (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  animationDelay: `${DYNAMIC_DELAYS[i]}s`,
                }}
              >
                {char}
              </span>
            ))}
            {" "}record label
          </h3>
        </div>

        {/* RIAA awards row */}
        <div
          style={{
            position: "relative",
            marginLeft: "auto",
            display: "flex",
            width: "fit-content",
            alignItems: "flex-start",
            gap: isMobile ? "10.256vw" : "4.299vw",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              transform: isMobile ? "translateX(-150%) translateY(-15%)" : "translate(-80%, -40%)",
            }}
          >
            <CrossBrackets />
          </div>
          <p className="brand-text">
            <div className="reveal">
              Proud recipients of 6 x RIAA Gold® awards!{" "}
            </div>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes about-shine { 50% { opacity: 0 } to { opacity: 1 } }
        .about-shine-active span {
          animation: about-shine 2.5s forwards ease;
          animation-iteration-count: 2;
        }
      `}</style>
    </section>
  );
}
