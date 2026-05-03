"use client";

import Link from "next/link";
import BottomNav from "./BottomNav";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function Header() {
  const isMobile = useIsMobile();

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
          padding: isMobile ? "1.5vh 5.128vw 0" : "1.6vw 2.4vw",
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
            style={{
              height: isMobile ? "2.1vh" : undefined,
              width: isMobile ? "17.692vw" : "5vw",
              minWidth: isMobile ? undefined : 60,
              display: "block",
            }}
          />
        </Link>
      </header>

      <BottomNav />
    </>
  );
}
