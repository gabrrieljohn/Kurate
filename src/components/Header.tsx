"use client";

import Link from "next/link";
import BottomNav from "./BottomNav";

export default function Header() {
  return (
    <>
      <header
        className="animated"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "1.6vw 2.4vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mixBlendMode: "difference",
          pointerEvents: "none",
        }}
      >
        <Link
          href="/"
          aria-label="Kurate Music — Home"
          style={{ pointerEvents: "auto", display: "inline-flex" }}
        >
          <img
            src="/images/Preloader/logo-no-trademark.svg"
            alt="Kurate"
            className="reveal"
            style={{ width: "5vw", minWidth: 60, display: "block" }}
          />
        </Link>
      </header>

      <BottomNav />
    </>
  );
}
