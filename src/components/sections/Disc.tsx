"use client";

import { useEffect, useRef, useState } from "react";

/* ── crescent SVG path (same as original: viewBox 132×263) ── */
const CRESCENT_D =
  "M106.206 223.631L128.451 260.705C58.0961 259.286 1.5 201.81 1.5 131.116C1.5 60.4216 58.0961 2.94604 128.451 1.52686L106.206 38.6005C72.0393 95.5456 72.0393 166.686 106.206 223.631Z";

/* ── white circle outline path (same as original: viewBox 263×263) ── */
const CIRCLE_D =
  "M260.933 131.116C260.933 202.701 202.902 260.732 131.317 260.732C59.7322 260.732 1.70117 202.701 1.70117 131.116C1.70117 59.531 59.7322 1.5 131.317 1.5C202.902 1.5 260.933 59.531 260.933 131.116Z";

/* shared base styles for every piece */
const PIECE_BASE: React.CSSProperties = {
  position: "absolute",
  left: "50%",
  transition: "3s cubic-bezier(0.22, 1, 0.36, 1)",
  transitionProperty: "translate, opacity, rotate",
};

const IMG_FILL: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "center",
};

export default function Disc() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [deployed, setDeployed] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDeployed(true);
          io.disconnect();
        }
      },
      // -30% bottom margin → fires when div top ≤ 70% of viewport,
      // which places the disc visual (behind ~26% top padding) at the viewport bottom.
      { rootMargin: "0px 0px -30% 0px", threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "17.196vw",
        padding: "9.259vw 0",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 0,
      }}
    >
      {/* ── MIDDLE (spinning disc + outline + hole) ── */}
      <div
        style={{
          ...PIECE_BASE,
          translate: "-50% 0",
          width: "17.196vw",
          height: "17.196vw",
          zIndex: 3,
        }}
      >
        {/* Hole overlay */}
        <img
          src="/images/Disc/hole.svg"
          alt=""
          style={{
            width: "3.638vw",
            height: "3.638vw",
            borderRadius: "50%",
            position: "absolute",
            top: "50%",
            left: "50%",
            translate: "-50% -50%",
            zIndex: 2,
          }}
        />

        {/* White circle outline — offset 10% right like original */}
        <svg
          viewBox="0 0 263 263"
          fill="none"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 2,
            translate: "10% 0",
          }}
        >
          <g style={{ mixBlendMode: "color-dodge" }}>
            <path d={CIRCLE_D} stroke="white" strokeWidth="3" />
          </g>
        </svg>

        {/* Blue disc image — spins continuously */}
        <img
          src="/images/Disc/middle.png"
          alt=""
          style={{
            ...IMG_FILL,
            animation: deployed ? "spin 2s infinite linear" : "none",
          }}
        />
      </div>

      {/* ── SIDE 2 (left inner half-disc) ── */}
      <div
        style={{
          ...PIECE_BASE,
          width: "8.598vw",
          height: "17.196vw",
          zIndex: 2,
          opacity: deployed ? 1 : 0,
          translate: deployed ? "-250% 0" : "-50% 0",
        }}
      >
        <img src="/images/Disc/side.png" alt="" style={IMG_FILL} />
      </div>

      {/* ── SIDE 3 (right inner half-disc) — mirrored ── */}
      <div
        style={{
          ...PIECE_BASE,
          width: "8.598vw",
          height: "17.196vw",
          zIndex: 2,
          opacity: deployed ? 1 : 0,
          translate: deployed ? "150% 0" : "-50% 0",
          scale: "-1",
        }}
      >
        <img src="/images/Disc/side.png" alt="" style={IMG_FILL} />
      </div>

      {/* ── LAST SIDE 4 (left outer crescent) ── */}
      <div
        style={{
          ...PIECE_BASE,
          width: "8.598vw",
          height: "17.196vw",
          zIndex: 1,
          opacity: deployed ? 1 : 0,
          translate: deployed ? "-400% 0" : "-50% 0",
        }}
      >
        <div
          className={deployed ? "drawable-line animated" : "drawable-line"}
          style={{ ...IMG_FILL, zIndex: 2, translate: "15% 0" }}
          aria-hidden
        >
          <svg viewBox="0 0 132 263" fill="none">
            <g style={{ mixBlendMode: "color-dodge" }}>
              <path d={CRESCENT_D} stroke="white" strokeWidth="3" />
            </g>
          </svg>
        </div>
        <img src="/images/Disc/last-side.png" alt="" style={IMG_FILL} />
      </div>

      {/* ── LAST SIDE 5 (right outer crescent) — mirrored ── */}
      <div
        style={{
          ...PIECE_BASE,
          width: "8.598vw",
          height: "17.196vw",
          zIndex: 1,
          opacity: deployed ? 1 : 0,
          translate: deployed ? "300% 0" : "-50% 0",
          scale: "-1",
        }}
      >
        <div
          className={deployed ? "drawable-line animated" : "drawable-line"}
          style={{ ...IMG_FILL, zIndex: 2, translate: "-15% 0" }}
          aria-hidden
        >
          <svg viewBox="0 0 132 263" fill="none">
            <g style={{ mixBlendMode: "color-dodge" }}>
              <path d={CRESCENT_D} stroke="white" strokeWidth="3" />
            </g>
          </svg>
        </div>
        <img src="/images/Disc/last-side.png" alt="" style={IMG_FILL} />
      </div>
    </div>
  );
}
