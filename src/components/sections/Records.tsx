"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import CrossBrackets from "@/components/CrossBrackets";
import { useIsMobile } from "@/hooks/useIsMobile";

const TRACKS = [
  { title: "Idea 10", artists: ["Gibran Alcocer"], genre: ["Neoclassical", "Solo Piano"], img: "/images/Records/idea 10.jpg" },
  { title: "School Rooftop", artists: [], genre: ["Lofi Hip-Hop"], img: "/images/Records/school-rooftop.jpg" },
  { title: "Shootout", artists: ["Izzamuzzic", "Julien Marchal"], genre: ["Collabarations", "Electronic"], img: "/images/Records/shootout.jpg" },
  { title: "Snowfall", artists: ["Øneheart"], genre: ["Collabarations", "Ambient"], img: "/images/Records/snowfall.jpg" },
  { title: "Ecstacy", artists: ["SUICIDAL-IDOL"], genre: ["Hyperpop"], img: "/images/Records/Ecstacy.jpg" },
  { title: "Drowning", artists: ["Vague003"], genre: ["Ambient", "Collabarations", "Experimental"], img: "/images/Records/Drowning.jpg" },
  { title: "Night Drive", artists: [], genre: ["Phonk"], img: "/images/Records/Night Drive.jpg" },
  { title: "Echo Sax End", artists: ["Caleb Arredondo"], genre: ["Saxophone"], img: "/images/Records/echo-sax-end.jpg" },
  { title: "Killswitch Lullaby", artists: ["Flawed Mangoes"], genre: ["Electronic"], img: "/images/Records/killswitch-lullaby.jpg" },
  { title: "It's Ok, You're Ok", artists: ["bonjr"], genre: ["Ambient", "Electronic"], img: "/images/Records/ioyo.jpg" },
];

const renderChars = (
  text: string,
  startDelay: number,
  charDelay: number,
  duration: number,
  visible: boolean,
  extraStyle?: React.CSSProperties,
  noLift?: boolean,
) =>
  text.split("").map((char, i) => (
    <span
      key={i}
      style={{
        display: "inline-block",
        opacity: visible ? 1 : 0,
        ...(noLift ? {} : { transform: visible ? "translateY(0)" : "translateY(110%)" }),
        transition: visible
          ? noLift
            ? `opacity ${duration}s ease ${startDelay + i * charDelay}s`
            : `opacity ${duration}s ease ${startDelay + i * charDelay}s, transform ${duration}s ease ${startDelay + i * charDelay}s`
          : "none",
        ...extraStyle,
      }}
    >
      {char}
    </span>
  ));

function ArrowCircle({ animated }: { animated: boolean }) {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animated) return;
    const el = lineRef.current;
    if (!el) return;
    setTimeout(() => el.classList.add("animated"), 400);
  }, [animated]);

  return (
    <div className="records-arrow">
      <div ref={lineRef} className="records-arrow-line drawable-line">
        {/* 119×119 viewBox, strokeWidth 6 matches original */}
        <svg width="119" height="119" viewBox="0 0 119 119" fill="none">
          <path
            d="M3,59.5a56.5,56.5 0 1,0 113,0a56.5,56.5 0 1,0 -113,0"
            stroke="white"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
      {/* translate(50%, -50%) matches original ._arrow_1tysq_27>img desktop rule */}
      <img
        src="/images/icons/arrow-tip.png"
        alt=""
        className="reveal"
        style={{
          height: "2.447vw",
          width: "2.447vw",
          objectFit: "contain",
          objectPosition: "center",
          flexShrink: 0,
          position: "relative",
          zIndex: 1,
          transform: "translate(50%, -50%)",
          opacity: 0,
          transitionDelay: "0.25s",
          transitionDuration: "1s",
        }}
      />
    </div>
  );
}

export default function Records() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const [sectionAnimated, setSectionAnimated] = useState(false);
  const [scrollable, setScrollable] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [genreSearch, setGenreSearch] = useState("");
  const genreFilterRef = useRef<HTMLDivElement>(null);
  const filterHeaderRef = useRef<HTMLDivElement>(null);
  const dropdownBodyRef = useRef<HTMLDivElement>(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const ALL_GENRES = [...new Set(TRACKS.flatMap(t => t.genre))].sort();
  const visibleGenres = genreSearch
    ? ALL_GENRES.filter(g => g.toLowerCase().includes(genreSearch.toLowerCase()))
    : ALL_GENRES;
  const filteredTracks = selectedGenre
    ? TRACKS.filter(t => t.genre.some(g => g.toLowerCase() === selectedGenre.toLowerCase()))
    : TRACKS;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("animated");
          setSectionAnimated(true);
          obs.disconnect();
        }
      },
      { threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Dropdown only closes via X button or filter icon toggle — no outside-click close.

  useEffect(() => {
    setScrollable(false);
  }, [selectedGenre]);

  return (
    <>
      <style>{`
        /* Arrow — no rotation on desktop (rotate:-90deg is mobile only) */
        .records-arrow {
          position: relative;
          display: flex;
          height: 7.937vw;
          width: 7.937vw;
          align-items: center;
          justify-content: center;
          transition: rotate 0.4s ease;
          flex-shrink: 0;
          cursor: none;
        }
        @media (max-width: 768px) {
          .records-arrow {
            margin-left: auto;
            margin-right: 20vw;
            rotate: -90deg;
            height: 15vw;
            width: 15vw;
          }
          .track-row {
            height: 80px;
            min-height: 80px;
            align-items: flex-start;
            border: none;
            padding: 4.615vw 4.103vw;
          }
          .track-row + .track-row {
            border-top: 1px solid rgba(255,255,255,0.11);
          }
          .records-col-headers {
            display: none;
          }
          .records-track-list {
            height: 100%;
            gap: 0;
          }
          .records-show-more .sm-text {
            font-size: 3.59vw;
          }
        }
        .records-arrow:hover {
          rotate: 180deg !important;
        }
        .records-arrow-line {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
        }

        /* Track rows */
        .track-row {
          position: relative;
          display: flex;
          width: 100%;
          align-items: center;
          gap: 1.058vw;
          padding: 0.8vw 0;
          border-top: 1px solid rgba(255, 255, 255, 0.11);
          opacity: 0;
          transform: translateY(100%);
          transition: opacity 1s ease, transform 1s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .track-row::before {
          content: "";
          pointer-events: none;
          position: absolute;
          inset: 0;
          transition: background-color 0.35s ease;
          background-color: transparent;
        }
        .track-row:hover::before {
          background-color: rgba(255, 255, 255, 0.15);
        }
        .track-row .t-genre span,
        .track-row .t-title {
          position: relative;
        }
        .track-row .t-genre span::before,
        .track-row .t-title::before {
          content: "";
          position: absolute;
          bottom: -3px;
          left: 0;
          width: 0;
          height: 1px;
          background-color: #fff;
          transition: width 0.5s ease;
        }
        .track-row:hover .t-genre span::before,
        .track-row:hover .t-title::before {
          width: 100%;
        }
        section.animated .track-row {
          opacity: 1 !important;
          transform: translate(0) !important;
        }

        /* Records inner container (position:relative for shadow + showMore anchors) */
        .records-inner {
          position: relative;
          flex: 1;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        /* Column headers */
        .records-col-headers {
          display: flex;
          align-items: center;
          gap: 1.058vw;
          padding-bottom: 1.224vw;
          padding-right: 0.926vw;
          font-weight: 500;
          flex-shrink: 0;
        }
        .records-col-headers > span {
          font-size: 0.926vw;
          opacity: 0.4;
        }

        /* Track list — 80% height by default, 100% + scrollable when active */
        .records-track-list {
          position: relative;
          height: 80%;
          width: 100%;
          display: flex;
          flex-direction: column;
          padding-right: 0.926vw;
          overflow: hidden;
        }
        .records-track-list.scrollable {
          height: 100%;
          overflow-y: scroll;
          padding-bottom: 10vh;
        }
        .records-track-list::-webkit-scrollbar {
          width: 0.397vw;
        }
        .records-track-list::-webkit-scrollbar-thumb {
          width: 0.397vw;
          border-radius: 3px;
          background-color: #fff;
        }

        /* Genre filter — dropdown is position:fixed rendered in a portal */
        .genre-filter-body {
          position: fixed;
          min-width: 12vw;
          background: #121313;
          z-index: 20;
          transform-origin: top center;
          display: flex;
          flex-direction: column;
          gap: 14.5px;
          padding: 1.058vw;
          border-radius: 16px;
        }
        .genre-filter-search {
          position: relative;
          height: 2.778vw;
          min-height: 2.778vw;
          display: flex;
          align-items: center;
          border-radius: 8px;
          background: #181a1a;
          flex-shrink: 0;
        }
        .genre-filter-search input {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          width: 100%;
          height: 100%;
          background: transparent;
          border: none;
          outline: none;
          color: #fafafa;
          font-size: 0.926vw;
          font-weight: 500;
          font-family: inherit;
          cursor: none;
          padding: 0 2.2vw 0 0.926vw;
        }
        .genre-filter-search input::placeholder { opacity: 0.4; color: #fafafa; }
        .genre-filter-search .search-icon {
          position: absolute;
          right: 0.926vw;
          top: 50%;
          transform: translateY(-50%);
          width: 1.19vw;
          height: 1.19vw;
          pointer-events: none;
          flex-shrink: 0;
        }
        .genre-filter-list {
          position: relative;
          height: 20vh;
          max-height: 20vh;
          overflow: hidden;
        }
        .genre-filter-list::after {
          content: "";
          display: block;
          pointer-events: none;
          position: absolute;
          bottom: 0; left: 0; right: 0;
          z-index: 1;
          height: 45%;
          background: linear-gradient(180deg, rgba(18,19,19,0) 0%, #121313 100%);
          border-radius: 0 0 16px 16px;
        }
        .genre-filter-list ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow-y: scroll;
        }
        .genre-filter-list ul::-webkit-scrollbar { width: 3px; }
        .genre-filter-list ul::-webkit-scrollbar-thumb { background: rgb(89,89,89); border-radius: 1.5px; }
        .genre-filter-list li {
          font-size: 1vw;
          font-weight: 500;
          padding: 1.5vh;
          border-radius: 8px;
          opacity: 1;
          color: #fafafa;
          transition: background-color 0.3s ease;
          cursor: none;
          flex-shrink: 0;
        }
        .genre-filter-list li:hover { background-color: rgba(255,255,255,0.05); }
        .genre-filter-list li.active { background-color: rgba(255,255,255,0.08); }

        /* Show more button */
        .records-show-more {
          position: absolute;
          left: 50%;
          bottom: 0;
          z-index: 3;
          transform: translate(-50%, -50%);
          background: none;
          border: none;
          color: #fafafa;
          cursor: none;
          padding: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .records-show-more .sm-text {
          font-size: 0.926vw;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .records-show-more .sm-line {
          height: 1px;
          width: 0;
          background-color: #ffffff;
          transition: width 0.4s ease;
          margin-top: 3px;
          align-self: flex-start;
        }
        .records-show-more:hover .sm-line {
          width: 100%;
        }
      `}</style>

      <section
        ref={sectionRef}
        id="releases"
        style={{ overflow: "hidden" }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            height: "100%",
            gap: isMobile ? 0 : "7.275vw",
            paddingTop: isMobile ? "8vh" : "4.96vw",
            paddingBottom: isMobile ? "10vh" : "1.984vw",
            flexDirection: isMobile ? "column-reverse" : undefined,
            overflow: isMobile ? "hidden" : undefined,
            position: isMobile ? "relative" : undefined,
          }}
        >
          {/* Left text column */}
          <div
            style={{
              flex: isMobile ? "none" : 0.3,
              height: isMobile ? "auto" : "100%",
              display: "flex",
              flexDirection: isMobile ? "column-reverse" : "column",
              justifyContent: isMobile ? "center" : "space-between",
              alignItems: isMobile ? "center" : undefined,
              gap: isMobile ? "5vw" : undefined,
            }}
          >
            {/* Group 1: 0-height; titleGroup absolutely positioned within */}
            <div style={{ position: isMobile ? "absolute" : "relative", left: isMobile ? "5.128vw" : undefined, top: isMobile ? "8vh" : undefined }}>
              <div
                style={{
                  position: isMobile ? "static" : "absolute",
                  left: 0,
                  top: 0,
                  textAlign: "left",
                }}
              >
                {/* "Let’s" — stroke layer fades in at 0.5s, filled layer at 1.0s (opacity only, no lift) */}
                <h2 style={{ margin: 0, position: "relative", textTransform: "none" }}>
                  <span style={{ display: "block", WebkitTextStroke: "1px #fafafa", WebkitTextFillColor: "transparent" } as React.CSSProperties}>
                    {renderChars("Let’s", 0.5, 0.075, 1, sectionAnimated, undefined, true)}
                  </span>
                  <span style={{ display: "block", position: "absolute", top: 0, left: 0 }}>
                    {renderChars("Let’s", 1, 0.075, 1, sectionAnimated, undefined, true)}
                  </span>
                </h2>

                {/* "Explore" — stroke layer at 1.0s, filled layer at 1.5s (opacity only, no lift) */}
                <h2 style={{ margin: 0, position: "relative", textTransform: "none" }}>
                  <span style={{ display: "block", WebkitTextStroke: "1px #fafafa", WebkitTextFillColor: "transparent" } as React.CSSProperties}>
                    {renderChars("Explore", 1, 0.075, 1, sectionAnimated, undefined, true)}
                  </span>
                  <span style={{ display: "block", position: "absolute", top: 0, left: 0 }}>
                    {renderChars("Explore", 1.5, 0.075, 1, sectionAnimated, undefined, true)}
                  </span>
                </h2>
              </div>
            </div>

            {/* Group 2: CrossBrackets + brand text — pushed to bottom by space-between */}
            <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "3.307vw", alignItems: isMobile ? "center" : undefined, justifyContent: isMobile ? "center" : undefined, textAlign: isMobile ? "center" : undefined }}>
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  transform: isMobile ? "translateX(0) translateY(-15%)" : "translate(-35%, -80%)",
                }}
              >
                <CrossBrackets />
              </div>
              <p className="brand-text" style={{ fontSize: isMobile ? "3.59vw" : "0.926vw" }}>
                <div>
                  <span className="reveal">To date, Kurate has collaborated with over 1,000</span>
                </div>
                <div>
                  <span className="reveal">artists and has garnered a global audience of millions.</span>
                </div>
              </p>
            </div>
          </div>

          {/* Right column: records list (flex:0.7, height:90%) */}
          <div
            style={{
              flex: isMobile ? "none" : 0.7,
              height: isMobile ? "68.7vh" : "90%",
              maxHeight: isMobile ? "68.7vh" : undefined,
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? "4.7vh" : "2.646vw",
            }}
          >
            {/* Top row: "Our Records" heading + arrow circle */}
            <div
              style={{
                display: "flex",
                width: "100%",
                alignItems: "flex-end",
                justifyContent: "space-between",
                flexDirection: isMobile ? "row-reverse" : undefined,
              }}
            >
              <div>
                <h2 style={{ margin: 0, overflow: "hidden", textTransform: "none" }}>
                  {renderChars("Our", 0.5, 0.075, 1, sectionAnimated)}
                </h2>
                <h2 style={{ margin: 0, overflow: "hidden", textTransform: "none" }}>
                  {renderChars("Records", 1, 0.075, 1, sectionAnimated)}
                </h2>
              </div>
              <ArrowCircle animated={sectionAnimated} />
            </div>

            {/* Records inner: position:relative for absolute children */}
            <div className="records-inner">
              {/* Fade gradient (desktop bottom:0, not -2px) */}
              {!scrollable && (
                <div
                  aria-hidden
                  style={{
                    pointerEvents: "none",
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 2,
                    height: "25%",
                    background: "linear-gradient(180deg, rgba(14,15,15,0) 0%, #0e0f0f 72.57%)",
                  }}
                />
              )}

              {/* Column headers */}
              <div className="records-col-headers">
                <div style={{ width: "1.984vw", minWidth: 28, flexShrink: 0 }} />
                <div style={{ flex: 1.5, minWidth: 0 }}>
                  <span>Track</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span>Artist(s)</span>
                </div>
                {/* Genre filter — interactive dropdown */}
                <div
                  ref={genreFilterRef}
                  style={{ flex: 1, minWidth: 0, position: "relative", zIndex: 20 }}
                >
                  {/* Header row */}
                  <div ref={filterHeaderRef} style={{ display: "flex", alignItems: "center", gap: "0.397vw" }}>
                    <span style={{
                      fontSize: "0.926vw",
                      opacity: selectedGenre ? 1 : 0.4,
                      transition: "opacity 0.3s ease",
                    }}>Genre:</span>
                    {selectedGenre && (
                      <span style={{ fontSize: "0.926vw", opacity: 1 }}>{selectedGenre}</span>
                    )}
                    {/* Filter icon — rotates when open, toggles dropdown */}
                    <div
                      onMouseDown={e => {
                        e.stopPropagation();
                        if (!filterOpen && filterHeaderRef.current) {
                          const r = filterHeaderRef.current.getBoundingClientRect();
                          setDropdownPos({ top: r.bottom + 4, left: r.left, width: r.width });
                        }
                        setFilterOpen(v => !v);
                      }}
                      style={{
                        height: "0.926vw",
                        width: "0.926vw",
                        flexShrink: 0,
                        cursor: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transform: filterOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.45s cubic-bezier(0.4,0,0.2,1)",
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M12.833 3.79199H9.33301" stroke="#6E6F6F" strokeWidth="0.875" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M3.50033 3.79199H1.16699" stroke="#6E6F6F" strokeWidth="0.875" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5.83366 5.83333C6.96124 5.83333 7.87533 4.91925 7.87533 3.79167C7.87533 2.66409 6.96124 1.75 5.83366 1.75C4.70608 1.75 3.79199 2.66409 3.79199 3.79167C3.79199 4.91925 4.70608 5.83333 5.83366 5.83333Z" stroke="#6E6F6F" strokeWidth="0.875" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12.8333 10.2083H10.5" stroke="#6E6F6F" strokeWidth="0.875" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M4.66699 10.208H1.16699" stroke="#6E6F6F" strokeWidth="0.875" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8.16667 12.2501C9.29425 12.2501 10.2083 11.336 10.2083 10.2084C10.2083 9.08083 9.29425 8.16675 8.16667 8.16675C7.03909 8.16675 6.125 9.08083 6.125 10.2084C6.125 11.336 7.03909 12.2501 8.16667 12.2501Z" stroke="#6E6F6F" strokeWidth="0.875" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    {/* Close X — closes dropdown; also clears selected genre if one is active */}
                    <div
                      onMouseDown={e => { e.stopPropagation(); setFilterOpen(false); setGenreSearch(""); setSelectedGenre(""); }}
                      style={{
                        marginLeft: "auto",
                        height: "0.8vw",
                        width: "0.8vw",
                        flexShrink: 0,
                        cursor: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transform: filterOpen ? "translateX(0)" : "translateX(-30%)",
                        opacity: filterOpen ? 1 : 0,
                        transition: "transform 0.45s ease, opacity 0.45s ease",
                        pointerEvents: filterOpen ? "auto" : "none",
                      }}
                    >
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M1.51465 9.38086L9.99993 0.895577" stroke="#6E6F6F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9.99993 9.38079L1.51465 0.895508" stroke="#6E6F6F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>

                  {/* Dropdown body — rendered in a portal to escape overflow:hidden ancestors */}
                </div>
              </div>

              {/* Track list (height:80% default → 100%+scroll when active) */}
              <div className={`records-track-list${scrollable ? " scrollable" : ""}`}>
                {filteredTracks.map((t, i) => (
                  <div
                    key={t.title}
                    className="track-row"
                    style={{ transitionDelay: `${i === 0 ? 0 : i * 0.125 + 0.25}s` }}
                  >
                    {/* Play button */}
                    <button
                      aria-label={`Play ${t.title}`}
                      style={{
                        width: "1.984vw",
                        height: "1.984vw",
                        minWidth: 28,
                        minHeight: 28,
                        borderRadius: 9999,
                        border: "none",
                        background: "transparent",
                        color: "inherit",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        cursor: "none",
                        padding: 0,
                      }}
                    >
                      <svg width="31" height="31" viewBox="0 0 31 31" fill="none">
                        <g opacity="0.6">
                          <circle cx="15.051" cy="15.458" r="14.301" stroke="white" strokeWidth="1.5" />
                          <path
                            d="M12 12.785V17.62C12 18.611 13.076 19.233 13.935 18.737L16.032 17.53L18.129 16.317C18.988 15.822 18.988 14.584 18.129 14.089L16.032 12.876L13.935 11.668C13.076 11.173 12 11.79 12 12.785Z"
                            fill="white"
                          />
                        </g>
                      </svg>
                    </button>

                    {/* Cover + title */}
                    <div style={{ display: "flex", alignItems: "center", gap: isMobile ? "3.59vw" : "1.058vw", flex: 1.5, minWidth: 0 }}>
                      <div
                        style={{
                          width: isMobile ? "11.538vw" : "3.307vw",
                          height: isMobile ? "11.538vw" : "3.307vw",
                          minWidth: isMobile ? undefined : 36,
                          minHeight: isMobile ? undefined : 36,
                          borderRadius: "0.3vw",
                          overflow: "hidden",
                          background: "#1a1b1c",
                          flexShrink: 0,
                        }}
                      >
                        <img src={t.img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <span className="t-title" style={{ fontSize: isMobile ? "3.59vw" : "1.058vw", fontWeight: 500 }}>
                        {t.title}
                      </span>
                    </div>

                    {/* Artists — hidden on mobile */}
                    {!isMobile && (
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ fontSize: "1.058vw", fontWeight: 500 }}>
                          {t.artists.join(", ")}
                        </span>
                      </div>
                    )}

                    {/* Genre — hidden on mobile */}
                    {!isMobile && (
                      <div className="t-genre" style={{ flex: 1, minWidth: 0 }}>
                        <span style={{ fontSize: "1.058vw", fontWeight: 500 }}>
                          {t.genre.join(", ")}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Show more button */}
              {!scrollable && (
                <button
                  className="records-show-more"
                  onClick={() => setScrollable(true)}
                >
                  <span className="sm-text">Show more</span>
                  <div className="sm-line" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Genre filter dropdown — portal so it escapes overflow:hidden in records-inner */}
      {mounted && createPortal(
        <div
          ref={dropdownBodyRef}
          className="genre-filter-body"
          style={{
            top: dropdownPos.top,
            left: dropdownPos.left,
            width: dropdownPos.width || "12vw",
            transform: filterOpen ? "scaleY(1)" : "scaleY(0)",
            opacity: filterOpen ? 1 : 0,
            transition: "transform 0.35s ease, opacity 0.25s ease",
            pointerEvents: filterOpen ? "auto" : "none",
          }}
        >
          <div className="genre-filter-search">
            <input
              value={genreSearch}
              onChange={e => setGenreSearch(e.target.value)}
              placeholder="Search"
              type="text"
            />
            <svg className="search-icon" viewBox="0 0 20 20" fill="none">
              <circle cx="9" cy="9" r="6" stroke="#6E6F6F" strokeWidth="1.5"/>
              <path d="M13.5 13.5L17 17" stroke="#6E6F6F" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="genre-filter-list">
            <ul>
              {visibleGenres.map(g => (
                <li
                  key={g}
                  className={selectedGenre === g ? "active" : ""}
                  onMouseDown={e => {
                    e.stopPropagation();
                    setSelectedGenre(selectedGenre === g ? "" : g);
                    setFilterOpen(false);
                    setGenreSearch("");
                  }}
                >
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
