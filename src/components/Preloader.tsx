"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
  const [closing, setClosing] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setClosing(true), 1800);
    const t2 = setTimeout(() => setDone(true), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (done) return null;

  return (
    <div
      id="preloader"
      className={`reveal-container animated ${closing ? "closing" : ""}`}
      style={{
        position: "fixed",
        inset: 0,
        background: "#0e0f0f",
        zIndex: 9000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.7s ease, transform 0.8s ease",
        opacity: closing ? 0 : 1,
        pointerEvents: closing ? "none" : "auto",
      }}
    >
      <div style={{ textAlign: "center", position: "relative" }}>
        <img
          src="/images/Preloader/logo-shadow.svg"
          alt=""
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(18vw, 260px)",
            opacity: 0.4,
          }}
        />
        <img
          src="/images/Preloader/logo-no-trademark.svg"
          alt="Kurate"
          style={{
            position: "relative",
            width: "min(18vw, 260px)",
            margin: "0 auto",
          }}
        />
        <div
          className="brand-text"
          style={{
            marginTop: "1rem",
            opacity: 0.5,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontSize: "0.85rem",
          }}
        >
          Loading experience
        </div>
      </div>
    </div>
  );
}
