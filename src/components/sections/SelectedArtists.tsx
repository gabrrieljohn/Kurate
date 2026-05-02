"use client";

import { useState } from "react";

const SELECTED = [
  {
    name: "Øneheart",
    displayName: "ØNEHEART",
    theme: "Ambient",
    img: "/images/Artists/oneheart.jpg",
    cover: "/images/Records/snowfall.jpg",
    song: "Snowfall",
  },
  {
    name: "Gibran Alcocer",
    displayName: "GIBRAN\nALCOCER",
    theme: "Piano",
    img: "/images/Artists/2.jpg",
    cover: "/images/Records/idea 10.jpg",
    song: "Idea 10",
  },
  {
    name: "Caleb Arredondo",
    displayName: "CALEB\nARREDONDO",
    theme: "Saxophone",
    img: "/images/Artists/Caleb-Arredondo.jpg",
    cover: "/images/Records/echo-sax-end.jpg",
    song: "Echo Sax End",
  },
];

export default function SelectedArtists() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(true);
  const [listenHover, setListenHover] = useState(false);

  const switchTo = (i: number) => {
    if (i === active) return;
    setVisible(false);
    setTimeout(() => {
      setActive(i);
      setVisible(true);
    }, 350);
  };

  const artist = SELECTED[active];

  return (
    <section
      id="selected"
      style={{ height: "100vh", position: "relative", overflow: "hidden" }}
    >
      {/* Wrapper: centered, max-width 70%, flex column */}
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "70%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.5vw",
          paddingTop: "4.96vw",
          paddingBottom: "4.96vw",
        }}
      >
        {/* Top: icon + title + tabs */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.116vw",
          }}
        >
          {/* Sound wave icon */}
          <img
            src="/images/Artists/soundWaves.svg"
            alt=""
            style={{ height: "1.124vw", width: "1.323vw", display: "block" }}
          />

          {/* OUR ARTISTS heading — h5 in original, 3.968vw from globals.css */}
          <h5
            style={{
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            Our Artists
          </h5>

          {/* Tabs */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "2.116vw",
            }}
          >
            {SELECTED.map((a, i) => (
              <button
                key={a.name}
                onClick={() => switchTo(i)}
                style={{
                  flex: "1 1 0%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1.257vw",
                  whiteSpace: "nowrap",
                  fontSize: "1.455vw",
                  opacity: i === active ? 1 : 0.5,
                  transition: "opacity 0.7s",
                  background: "none",
                  border: "none",
                  color: "inherit",
                  fontFamily: "inherit",
                  padding: 0,
                  paddingBottom: "0.5vw",
                }}
              >
                {a.name}
                {/* Tab underline */}
                <span
                  style={{
                    display: "block",
                    width: "100%",
                    height: "1px",
                    background: i === active ? "#fafafa" : "rgba(250,250,250,0.3)",
                    transition: "background 0.7s",
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Info area: fills remaining height */}
        <div
          style={{
            position: "relative",
            width: "100%",
            flex: "1 1 0%",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.35s ease",
          }}
        >
          {/* Album art: centered, max-width 35% */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: "100%",
              maxWidth: "35%",
              transform: "translateX(-50%)",
              pointerEvents: "none",
            }}
          >
            <div style={{ position: "relative", paddingTop: "100%" }}>
              <img
                src={artist.cover}
                alt=""
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>

          {/* Bottom-left: circle photo + artist name + theme */}
          <div
            style={{
              position: "absolute",
              left: 0,
              bottom: 0,
              maxWidth: "45%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
          >
            {/* Circle photo row — two circles, second overlaps behind first */}
            <div style={{ display: "flex", marginRight: "5.291vw", marginBottom: "0.5vw" }}>
              {/* First circle: artist photo, z-index 2 */}
              <div style={{ position: "relative", zIndex: 2, flexShrink: 0 }}>
                <div
                  style={{
                    width: "4.299vw",
                    height: "4.299vw",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "1.5px solid rgba(250,250,250,0.6)",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={artist.img}
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>
              </div>
              {/* Second circle: empty outline, shifted left to overlap first circle */}
              <div style={{ position: "relative", zIndex: 1, marginLeft: "-2.15vw", flexShrink: 0 }}>
                <div
                  style={{
                    width: "4.299vw",
                    height: "4.299vw",
                    borderRadius: "50%",
                    border: "1.5px solid rgba(250,250,250,0.3)",
                    flexShrink: 0,
                  }}
                />
              </div>
            </div>

            {/* Artist name — 4.995vw desktop; use div to avoid global h2 !important override */}
            <div style={{ whiteSpace: "nowrap", overflow: "visible" }}>
              {artist.displayName.split("\n").map((line, li) => (
                <div
                  key={li}
                  style={{
                    fontSize: "4.995vw",
                    fontWeight: 400,
                    lineHeight: "84%",
                    letterSpacing: "-0.02em",
                    textTransform: "uppercase",
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  {line}
                </div>
              ))}
            </div>

            {/* Theme */}
            <p
              style={{
                fontSize: "0.95vw",
                marginTop: "1.5vh",
                opacity: 1,
                color: "inherit",
              }}
            >
              Theme:{" "}
              <strong style={{ fontWeight: 500 }}>{artist.theme}</strong>
            </p>
          </div>

          {/* Right panel: song info — vertically centered */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2.976vw",
            }}
          >
            {/* Song title — desktop 2.91vw (6.15vw is mobile-only) */}
            <div
              style={{
                fontSize: "2.91vw",
                fontWeight: 400,
                whiteSpace: "nowrap",
              }}
            >
              {artist.song}
            </div>

            {/* By artist — desktop has margin-top/bottom from original CSS */}
            <p style={{ fontSize: "1vw", margin: 0, marginTop: "2.381vw", marginBottom: "4.762vw" }}>
              By{" "}
              <strong style={{ fontWeight: 500 }}>{artist.name}</strong>
            </p>

            {/* Listen button */}
            <a
              href="#"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5vw",
                fontSize: "0.95vw",
                color: "inherit",
                textDecoration: "none",
                borderBottom: "1px solid currentColor",
                paddingBottom: "2px",
                width: "fit-content",
              }}
              onMouseEnter={() => setListenHover(true)}
              onMouseLeave={() => setListenHover(false)}
            >
              Listen
              <svg
                width="16"
                height="12"
                viewBox="0 0 20 14"
                fill="none"
                style={{
                  transform: listenHover ? "translateX(4px)" : "translateX(0)",
                  transition: "transform 0.3s ease",
                }}
              >
                <path
                  d="M1 7H19M19 7L13 1M19 7L13 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
