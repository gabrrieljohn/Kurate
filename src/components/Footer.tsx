"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

const underlineSpan = (active: boolean) => (
  <span
    aria-hidden
    style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      height: "1px",
      width: active ? "100%" : "0%",
      background: "currentColor",
      transition: "width 0.4s ease",
      display: "block",
      pointerEvents: "none",
    }}
  />
);

export default function Footer() {
  const isMobile = useIsMobile();
  const [hovered, setHovered] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    // "top 65%" = fire when footer's top edge crosses 65% from top of viewport.
    // rootMargin "-35% bottom" shrinks the effective root so intersection fires at that point.
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "0px 0px -35% 0px", threshold: 0 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Stagger delays matching the original:
  // logo: 0s | tagline: 0.1s | col headers: 0.2s | list items: 0.35s + n*0.1s | bottom logo: 0.55s
  const d = (s: number): React.CSSProperties => ({ transitionDelay: `${s}s` });

  return (
    <footer
      ref={footerRef}
      className={visible ? "animated" : ""}
      style={{ height: "fit-content", position: "relative" }}
    >
      <div style={{ display: "flex", flexDirection: isMobile ? "column-reverse" : undefined, borderTop: "1px solid rgba(252,252,252,0.25)" }}>
        {/* Left section — logo + tagline */}
        <div
          style={{
            flex: isMobile ? undefined : "0 0 40%",
            padding: isMobile ? "6.3vh 5.128vw 25vh" : "5.291vw 10.582vw 10.913vw",
            borderRight: isMobile ? undefined : "1px solid rgba(252,252,252,0.25)",
            borderTop: isMobile ? "1px solid rgba(252,252,252,0.25)" : undefined,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "3.3vh" : "2.315vw", alignItems: isMobile ? "center" : undefined, justifyContent: isMobile ? "center" : undefined }}>
            <img
              src="/images/Preloader/logo-no-trademark.svg"
              alt="Kurate"
              className="reveal"
              style={{ height: isMobile ? "5vh" : "5.622vw", minHeight: isMobile ? "5vh" : undefined, width: isMobile ? "38.462vw" : "100%", minWidth: isMobile ? "38.462vw" : undefined, ...d(0) }}
            />
            <div
              className="reveal"
              style={{ display: "flex", alignItems: "center", gap: isMobile ? "2.564vw" : "1.157vw", opacity: 0.4, ...d(0.1) }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: isMobile ? "5.128vw" : "1.5vw",
                  height: 1,
                  background: "currentColor",
                  flexShrink: 0,
                }}
              />
              <p style={{ fontSize: isMobile ? "3.59vw" : "0.95vw" }}>Dynamic Record Label</p>
            </div>
          </div>
        </div>

        {/* Right section — nav columns + brand logo */}
        <div
          style={{
            flex: 1,
            padding: isMobile ? "7.7vh 5.128vw" : "2.646vw 3.968vw 9.259vw",
            display: "flex",
            alignItems: isMobile ? "center" : "flex-start",
            justifyContent: isMobile ? "center" : "flex-start",
            flexWrap: isMobile ? "wrap" : undefined,
            rowGap: isMobile ? "6vh" : undefined,
            gap: isMobile ? "12vw" : "16vw",
          }}
        >
          {/* Explore column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.852vw", alignItems: isMobile ? "center" : undefined }}>
            <span
              className="reveal"
              style={{ color: "#979797", fontWeight: 500, fontSize: isMobile ? "3.077vw" : "0.95vw", ...d(0.2) }}
            >
              Explore
            </span>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: isMobile ? "1vh" : "1.587vw",
              }}
            >
              {[
                { to: "/", label: "Home" },
                { to: "/artists", label: "Artists" },
                { to: "/careers", label: "Careers" },
              ].map((l, i) => (
                <li key={l.to} style={{ width: isMobile ? "100%" : undefined, textAlign: isMobile ? "center" : undefined }}>
                  <Link
                    href={l.to}
                    className="reveal"
                    onMouseEnter={() => setHovered(l.label)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      position: "relative",
                      display: isMobile ? "block" : "inline-block",
                      fontSize: isMobile ? "6.154vw" : "1.587vw",
                      color: "#fafafa",
                      lineHeight: "180%",
                      letterSpacing: "-0.48px",
                      ...d(0.35 + i * 0.1),
                    }}
                  >
                    {l.label}
                    {!isMobile && underlineSpan(hovered === l.label)}
                  </Link>
                </li>
              ))}
            </ul>
            <img
              src="/images/Preloader/logo-no-trademark.svg"
              alt=""
              className="reveal"
              style={{ height: isMobile ? "3vh" : "5vh", width: isMobile ? "18vw" : "8vw", margin: isMobile ? "auto" : undefined, marginTop: "1vw", ...d(0.55) }}
            />
          </div>

          {/* Follow column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.852vw", alignItems: isMobile ? "center" : undefined }}>
            <span
              className="reveal"
              style={{ color: "#979797", fontWeight: 500, fontSize: isMobile ? "3.077vw" : "0.95vw", ...d(0.2) }}
            >
              Follow
            </span>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: isMobile ? "1vh" : "1.587vw",
              }}
            >
              {[
                { href: "https://twitter.com/kuratemusic", label: "Twitter" },
                { href: "https://www.instagram.com/kuratemusic/", label: "Instagram" },
                { href: "https://www.facebook.com/kuratemusic", label: "Facebook" },
              ].map((l, i) => (
                <li key={l.label} style={{ width: isMobile ? "100%" : undefined, textAlign: isMobile ? "center" : undefined }}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="reveal"
                    onMouseEnter={() => setHovered(l.label)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      position: "relative",
                      display: isMobile ? "block" : "inline-block",
                      fontSize: isMobile ? "6.154vw" : "1.587vw",
                      color: "#fafafa",
                      lineHeight: "180%",
                      letterSpacing: "-0.48px",
                      ...d(0.35 + i * 0.1),
                    }}
                  >
                    {l.label}
                    {!isMobile && underlineSpan(hovered === l.label)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
