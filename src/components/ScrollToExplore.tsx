"use client";

const OUTER_RING =
  "M6.67578 95.6708C6.67578 46.5199 46.5204 6.67529 95.6713 6.67529V6.67529C144.822 6.67529 184.667 46.5199 184.667 95.6708V95.6708C184.667 144.822 144.822 184.666 95.6713 184.666V184.666C46.5204 184.666 6.67578 144.822 6.67578 95.6708V95.6708Z";

const INNER_RING =
  "M47.5518 94.6641C47.5518 67.5328 69.546 45.5386 96.6773 45.5386V45.5386C123.809 45.5386 145.803 67.5328 145.803 94.6641V94.6641C145.803 121.795 123.809 143.79 96.6773 143.79V143.79C69.546 143.79 47.5518 121.795 47.5518 94.6641V94.6641Z";

// Clockwise circle at radius 64, starting from 12 o'clock.
// r=64 centres the cap-height midpoint on the ring band midpoint (r=69).
const TEXT_PATH = "M 96,32 A 64,64 0 0,1 96,160 A 64,64 0 0,1 96,32.001";

const FONT_PROPS = {
  fill: "#FAFAFA",
  fontSize: "13",
  fontFamily: "Helvetica Now Display, Helvetica Neue, Helvetica, Arial, sans-serif",
  fontWeight: "400",
} as const;

const LABEL = "SCROLL TO EXPLORE";

export default function ScrollToExplore() {
  return (
    <div
      aria-hidden
      style={{
        position: "relative",
        width: "12.566vw",
        height: "12.566vw",
      }}
    >
      <svg
        viewBox="0 0 192 192"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          animation: "scroll-explore-spin 30s infinite linear",
        }}
      >
        <defs>
          <path id="ste-circle" d={TEXT_PATH} />
        </defs>

        {/* 3 instances at 0°, 120°, 240° — natural spacing, ~30° gap between each */}
        <text {...FONT_PROPS}>
          <textPath href="#ste-circle" startOffset="0%">{LABEL}</textPath>
        </text>
        <text {...FONT_PROPS}>
          <textPath href="#ste-circle" startOffset="33.33%">{LABEL}</textPath>
        </text>
        <text {...FONT_PROPS}>
          <textPath href="#ste-circle" startOffset="66.67%">{LABEL}</textPath>
        </text>

        {/* Rings — drawn on top of text to match original layer order */}
        <path
          d={OUTER_RING}
          stroke="white"
          strokeOpacity="0.3"
          strokeWidth="0.816508"
          strokeMiterlimit="10"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
        <path
          d={INNER_RING}
          stroke="white"
          strokeOpacity="0.3"
          strokeWidth="0.816508"
          strokeMiterlimit="10"
          strokeLinecap="square"
          strokeLinejoin="round"
        />
      </svg>

      {/* Static down arrow — does NOT spin */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/icons/scroll-label-arrow.svg"
        alt=""
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          height: "2.116vw",
          width: "0.893vw",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      <style>{`
        @keyframes scroll-explore-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
