"use client";

import { useState } from "react";

const ARTISTS = [
  { name: "Øneheart", theme: "Ambient" },
  { name: "Gibran Alcocer", theme: "Piano" },
  { name: "Caleb Arredondo", theme: "Saxophone" },
  { name: "Flawed Mangoes", theme: "Electronic, Ambient" },
  { name: "Bonjr", theme: "Electronic, Ambient" },
  { name: "Ty's Music", theme: "Jazz" },
  { name: "Izzamuzzic", theme: "Electronic" },
  { name: "Julien Marchal", theme: "Electronic" },
  { name: "SUICIDAL-IDOL", theme: "Hyperpop" },
  { name: "Vague003", theme: "Experimental, Ambient" },
];

const INITIAL_COUNT = 4;

export default function AllArtists() {
  const [showAll, setShowAll] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [listenHover, setListenHover] = useState<number | null>(null);

  const visible = showAll ? ARTISTS : ARTISTS.slice(0, INITIAL_COUNT);

  return (
    <section id="all-artists" style={{ height: "fit-content" }}>
      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: "75%",
          paddingTop: "4.96vw",
          paddingBottom: "7.937vw",
          height: "fit-content",
        }}
      >
        {/* ALL ARTISTS heading */}
        <span
          style={{
            display: "block",
            fontSize: "0.85vw",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(250,250,250,0.35)",
            marginBottom: "0.5vw",
            fontFamily: "Plus Jakarta Sans, sans-serif",
          }}
        >
          ALL ARTISTS
        </span>

        {/* Artist list */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", width: "100%" }}>
          {visible.map((a, i) => (
            <div
              key={a.name}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                borderBottom: "1px solid rgba(250,250,250,0.1)",
                transition: "opacity 0.5s",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  paddingTop: "4.63vw",
                  paddingBottom: "4.63vw",
                  opacity: hovered === null ? 0.4 : hovered === i ? 1 : 0.25,
                  transition: "opacity 0.5s",
                }}
              >
                {/* Artist name */}
                <div
                  style={{
                    flex: "0 0 46.5%",
                    fontSize: "3.59vw",
                    fontWeight: 400,
                    lineHeight: "100%",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {a.name}
                </div>

                {/* Theme — centered */}
                <div
                  style={{
                    flex: 1,
                    fontSize: "0.95vw",
                    color: "rgba(250,250,250,0.6)",
                  }}
                >
                  {a.theme}
                </div>

                {/* Listen link */}
                <a
                  href="#"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4vw",
                    fontSize: "0.95vw",
                    color: "inherit",
                    textDecoration: "none",
                    borderBottom: "1px solid currentColor",
                    paddingBottom: "1px",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={() => setListenHover(i)}
                  onMouseLeave={() => setListenHover(null)}
                >
                  Listen
                  <svg
                    width="14"
                    height="10"
                    viewBox="0 0 20 14"
                    fill="none"
                    style={{
                      transform:
                        listenHover === i ? "translateX(3px)" : "translateX(0)",
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
          ))}
        </div>

        {/* Gradient fade + show more button — absolutely positioned inside list when not expanded */}
        {!showAll && (
          <div
            style={{
              position: "relative",
              height: "7vw",
              marginTop: "-7vw",
              pointerEvents: "none",
            }}
          >
            {/* Gradient overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(180deg, rgba(14,15,15,0) 0%, #0e0f0f 100%)",
              }}
            />
            {/* Show more button sits on top of gradient */}
            <button
              onClick={() => setShowAll(true)}
              style={{
                position: "absolute",
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                background: "none",
                border: "none",
                color: "rgba(250,250,250,0.7)",
                fontFamily: "inherit",
                fontSize: "0.95vw",
                padding: 0,
                borderBottom: "1px solid currentColor",
                paddingBottom: "2px",
                whiteSpace: "nowrap",
                cursor: "pointer",
                pointerEvents: "auto",
              }}
            >
              Show more
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
