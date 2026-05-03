"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

const NAV_BY_ROUTE: Record<string, { title: string; href: string }[]> = {
  "/": [
    { title: "About", href: "#about" },
    { title: "Artists", href: "#artists" },
    { title: "Releases", href: "#releases" },
    { title: "Contact", href: "#contact" },
  ],
  "/artists": [
    { title: "Selected", href: "#selected" },
    { title: "All Artists", href: "#all-artists" },
    { title: "Contact", href: "#contact" },
  ],
  "/careers": [{ title: "Open vacancies", href: "#open-vacancies" }],
  "/licenses": [],
};

const EXPLORE_LINKS = [
  { label: "Home", href: "/" },
  { label: "Artists", href: "/artists" },
  { label: "Careers", href: "/careers" },
  { label: "Licenses", href: "/licenses" },
];

const FOLLOW_LINKS = [
  { label: "Twitter", href: "https://twitter.com/kuratemusic" },
  { label: "Instagram", href: "https://www.instagram.com/kuratemusic/" },
  { label: "Facebook", href: "https://www.facebook.com/kuratemusic" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [playerOpen, setPlayerOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const items = NAV_BY_ROUTE[pathname] ?? [];

  // Close on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  // Drive panel height: grows upward to reveal dropdown
  useEffect(() => {
    const panel = panelRef.current;
    const dropdown = dropdownRef.current;
    if (!panel || !dropdown) return;
    const baseH = isMobile ? "12vh" : "7.5vh";
    if (menuOpen) {
      const panelH = panel.offsetHeight;
      const dropdownH = dropdown.offsetHeight;
      panel.style.height = `${panelH + dropdownH}px`;
    } else {
      panel.style.height = baseH;
    }
  }, [menuOpen, isMobile]);

  const smoothScroll = (targetY: number) => {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 1600;
    const startTime = performance.now();
    const ease = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      window.scrollTo(0, startY + distance * ease(progress));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const onAnchor = (href: string) => {
    if (href.startsWith("#")) {
      const el = document.querySelector(href) as HTMLElement | null;
      if (el) smoothScroll(el.getBoundingClientRect().top + window.scrollY);
    } else {
      router.push(href);
    }
  };

  const borderRadius = isMobile ? "3.077vw" : "0.794vw";

  return (
    <menu
      ref={menuRef}
      style={{
        position: "fixed",
        ...(isMobile
          ? { top: "72.5vh", bottom: "auto" }
          : { bottom: "2.7778vh" }),
        left: "50%",
        width: isMobile ? (menuOpen ? "95vw" : "75vw") : "35%",
        transform: "translateX(-50%)",
        zIndex: 4,
        borderRadius,
        perspective: "1000px",
        fontFamily: "Plus Jakarta Sans, sans-serif",
        fontSize: isMobile ? "4.103vw" : "1.058vw",
        fontWeight: 500,
        color: "#fafafa",
        listStyle: "none",
        padding: 0,
        margin: 0,
        transition: isMobile ? "width 0.5s cubic-bezier(0.65,0,0.35,1)" : undefined,
      }}
    >
      {/* Panels container — overflow:hidden clips children to border-radius */}
      <div
        style={{
          overflow: "hidden",
          borderRadius: menuOpen ? `0 0 ${borderRadius} ${borderRadius}` : borderRadius,
          backdropFilter: isMobile ? "none" : "blur(59px)",
          transition: "border-radius 0.4s ease",
        }}
      >
        {/* Panel — grows upward when menu opens to reveal dropdown */}
        <div
          ref={panelRef}
          style={{
            position: "relative",
            display: "flex",
            alignItems: "flex-end",
            height: isMobile ? "12vh" : "7.5vh",
            width: "100%",
            padding: isMobile ? "2.051vw 1.538vw 1.538vw" : "0.397vw",
            background: isMobile ? "#171717" : "rgba(222,222,222,0.03)",
            borderRadius: menuOpen ? "0" : borderRadius,
            transition: "height 0.5s ease, border-radius 0.4s ease",
          }}
        >
          {/* Dropdown — absolutely at top of panel, fades in with delay */}
          <div
            ref={dropdownRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              padding: isMobile
                ? `1.538vw 1.538vw 0 1.538vw`
                : "0.397vw 0.397vw 0 0.397vw",
              borderRadius: isMobile
                ? `${borderRadius} ${borderRadius} 0 0`
                : `${borderRadius} ${borderRadius} 0 0`,
              opacity: menuOpen ? 1 : 0,
              pointerEvents: menuOpen ? "auto" : "none",
              transition: menuOpen
                ? "opacity 0.4s ease 0.25s"
                : "opacity 0.2s ease",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                borderRadius: isMobile ? borderRadius : "0.5vw",
                padding: isMobile ? "1.538vw" : "1.653vw",
                backdropFilter: isMobile ? "none" : "blur(88.5px)",
                background: isMobile ? "#171717" : "rgba(0,0,0,0.1)",
              }}
            >
              {/* Explore column */}
              <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "3vw" : "1.323vw" }}>
                <span
                  style={{
                    fontSize: isMobile ? "3.077vw" : "0.661vw",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    opacity: 0.55,
                    letterSpacing: "0.05em",
                  }}
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
                    gap: isMobile ? "2vw" : "0.661vw",
                  }}
                >
                  {EXPLORE_LINKS.map((l) => (
                    <li key={l.label} style={{ fontWeight: 500 }}>
                      <Link
                        href={l.href}
                        onClick={() => setMenuOpen(false)}
                        style={{
                          textDecoration: "none",
                          color: "#fafafa",
                          fontSize: isMobile ? "4.103vw" : "1vw",
                          opacity: 0.85,
                        }}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Follow column */}
              <div style={{ display: "flex", flexDirection: "column", gap: isMobile ? "3vw" : "1.323vw" }}>
                <span
                  style={{
                    fontSize: isMobile ? "3.077vw" : "0.661vw",
                    fontWeight: 500,
                    textTransform: "uppercase",
                    opacity: 0.55,
                    letterSpacing: "0.05em",
                  }}
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
                    gap: isMobile ? "2vw" : "0.661vw",
                  }}
                >
                  {FOLLOW_LINKS.map((l) => (
                    <li key={l.label} style={{ fontWeight: 500 }}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          textDecoration: "none",
                          color: "#fafafa",
                          fontSize: isMobile ? "4.103vw" : "1vw",
                          opacity: 0.85,
                        }}
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Spacer for right-side balance */}
              <div />
            </div>
          </div>

          {/* Nav bar — stays at bottom via align-items:flex-end on parent */}
          <nav
            style={{
              position: "relative",
              display: "flex",
              alignItems: "stretch",
              height: isMobile ? "8vh" : "5.75vh",
              width: "100%",
              borderRadius: isMobile ? "2.564vw" : undefined,
              background: isMobile ? "#171717" : undefined,
            }}
          >
            {/* Close × — absolute right, appears when menu open */}
            <div
              onClick={() => setMenuOpen(false)}
              style={{
                position: "absolute",
                top: "50%",
                right: isMobile ? "6.667vw" : "1.323vw",
                height: isMobile ? "3.077vw" : "0.794vw",
                width: isMobile ? "3.077vw" : "0.794vw",
                transform: "translateY(-50%)",
                opacity: menuOpen ? 1 : 0,
                pointerEvents: menuOpen ? "auto" : "none",
                transition: "opacity 0.3s ease",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1,
              }}
            >
              <img
                src="/images/icons/menu-close.svg"
                alt="Close"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>

            {/* Menu toggle */}
            <li
              onClick={() => setMenuOpen((v) => !v)}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: isMobile ? "flex-start" : "center",
                gap: isMobile ? "3.59vw" : "0.926vw",
                height: "100%",
                width: isMobile ? "48%" : undefined,
                minWidth: isMobile ? "48%" : undefined,
                flexShrink: isMobile ? 0 : undefined,
                borderRadius: isMobile ? "2.564vw" : "0.5vw",
                background: "rgba(201,201,201,0.051)",
                padding: isMobile ? "0 5.128vw" : "0 0.926vw",
                cursor: "pointer",
                listStyle: "none",
              }}
            >
              <div
                style={{
                  height: isMobile ? "2.308vw" : "0.529vw",
                  width: isMobile ? "2.821vw" : "0.728vw",
                  minHeight: isMobile ? "2.308vw" : undefined,
                  minWidth: isMobile ? "2.821vw" : undefined,
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src="/images/icons/burger.svg"
                  alt=""
                  style={{ height: "100%", width: "100%", objectFit: "contain" }}
                />
              </div>
              <span>Menu</span>
            </li>

            {/* Page-specific section links — hidden on mobile */}
            {!isMobile && items.map((item, i) => (
              <li
                key={item.title}
                onClick={() => {
                  setMenuOpen(false);
                  onAnchor(item.href);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  flex: "1 1 0",
                  borderRadius: menuOpen
                    ? i === 0
                      ? "0.5vw 0 0 0.5vw"
                      : i === items.length - 1
                        ? "0 0.5vw 0.5vw 0"
                        : "0"
                    : "0.5vw",
                  background: menuOpen ? "rgba(201,201,201,0.051)" : "transparent",
                  transition: "background-color 0.4s ease 0.125s, border-radius 0.4s ease 0.125s",
                  cursor: "pointer",
                  listStyle: "none",
                  pointerEvents: menuOpen ? "none" : "auto",
                }}
              >
                <a
                  href={item.href}
                  onClick={(e) => e.preventDefault()}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    width: "100%",
                    textDecoration: "none",
                    color: "#fafafa",
                    opacity: menuOpen ? 0 : 0.5,
                    transition: "opacity 0.4s ease",
                    fontSize: "inherit",
                    fontFamily: "inherit",
                    fontWeight: "inherit",
                  }}
                >
                  {item.title}
                </a>
              </li>
            ))}

            {/* Player switch */}
            <li
              style={{
                display: "flex",
                alignItems: "center",
                height: "100%",
                width: isMobile ? "48%" : undefined,
                minWidth: isMobile ? "48%" : undefined,
                flexShrink: isMobile ? 0 : undefined,
                marginLeft: isMobile ? "auto" : undefined,
                paddingRight: isMobile ? 0 : "0.529vw",
                justifyContent: isMobile ? "flex-start" : undefined,
                opacity: menuOpen ? 0 : 1,
                pointerEvents: menuOpen ? "none" : "auto",
                transition: "opacity 0.4s ease",
                listStyle: "none",
                borderRadius: isMobile ? "2.564vw" : undefined,
                background: isMobile ? "rgba(201,201,201,0.051)" : undefined,
                overflow: "hidden",
                position: "relative",
              }}
            >
              {!isMobile && (
                <div
                  style={{
                    height: 20,
                    width: 1,
                    background: "white",
                    opacity: 0.2,
                    marginLeft: "0.529vw",
                    marginRight: "0.529vw",
                    flexShrink: 0,
                  }}
                />
              )}

              {/* Mobile: label + play button + album art */}
              {isMobile ? (
                <>
                  {/* Inner wrapper centers content */}
                  <div style={{ display: "flex", alignItems: "center", gap: "2.5vw", width: "100%", padding: "0 4vw", position: "relative", zIndex: 1 }}>
                    <span style={{ fontSize: "2.308vw", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", opacity: 0.7, whiteSpace: "nowrap", flexShrink: 0 }}>
                      SC Play Music
                    </span>
                    <button
                      onClick={() => setPlayerOpen((v) => !v)}
                      aria-label={playerOpen ? "Pause" : "Play"}
                      style={{
                        width: "8vw",
                        height: "8vw",
                        borderRadius: 9999,
                        background: "#fafafa",
                        color: "#0e0f0f",
                        border: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        flexShrink: 0,
                        zIndex: 2,
                        position: "relative",
                      }}
                    >
                      {playerOpen ? (
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor">
                          <rect x="2" y="2" width="3" height="10" />
                          <rect x="9" y="2" width="3" height="10" />
                        </svg>
                      ) : (
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor">
                          <path d="M3 1.5v11l10-5.5z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {/* Album art — absolutely positioned on the right */}
                  <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "28vw", overflow: "hidden" }}>
                    <img
                      src="/images/Hero/card2.jpg"
                      alt=""
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
                    />
                  </div>
                </>
              ) : (
                <button
                  onClick={() => setPlayerOpen((v) => !v)}
                  aria-label={playerOpen ? "Pause" : "Play"}
                  style={{
                    width: "2.6vw",
                    height: "2.6vw",
                    minWidth: 32,
                    minHeight: 32,
                    borderRadius: 9999,
                    background: "#fafafa",
                    color: "#0e0f0f",
                    border: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  {playerOpen ? (
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor">
                      <rect x="2" y="2" width="3" height="10" />
                      <rect x="9" y="2" width="3" height="10" />
                    </svg>
                  ) : (
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor">
                      <path d="M3 1.5v11l10-5.5z" />
                    </svg>
                  )}
                </button>
              )}
            </li>
          </nav>
        </div>
      </div>
    </menu>
  );
}
