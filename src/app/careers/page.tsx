"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Footer from "@/components/Footer";
import CrossBrackets from "@/components/CrossBrackets";

/* ─── vacancy data ─────────────────────────────────────────────── */
type Vacancy = {
  id: string;
  title: string;
  location: string;
  type: string;
  description: string;
};

const VACANCIES: Vacancy[] = [
  // Add vacancies here — empty array shows "no positions open"
];

const ALL_LOCATIONS = ["All", ...Array.from(new Set(VACANCIES.map((v) => v.location)))];
const ALL_TYPES     = ["All", ...Array.from(new Set(VACANCIES.map((v) => v.type)))];

/* ─── filter dropdown portal ───────────────────────────────────── */
type DropdownPortalProps = {
  open: boolean;
  pos: { top: number; left: number; width: number };
  options: string[];
  value: string;
  search: string;
  onSearch: (v: string) => void;
  onSelect: (v: string) => void;
};

function FilterDropdownPortal({
  open, pos, options, value, search, onSearch, onSelect,
}: DropdownPortalProps) {
  return createPortal(
    <div
      style={{
        position: "fixed",
        top: pos.top,
        left: pos.left,
        width: pos.width || "12vw",
        background: "#121313",
        borderRadius: "16px",
        padding: "1.058vw",
        display: "flex",
        flexDirection: "column",
        gap: "14.5px",
        zIndex: 9999,
        transformOrigin: "top center",
        transform: open ? "scaleY(1)" : "scaleY(0)",
        opacity: open ? 1 : 0,
        transition: "transform 0.35s ease, opacity 0.25s ease",
        pointerEvents: open ? "auto" : "none",
        fontFamily: "Plus Jakarta Sans, sans-serif",
      }}
    >
      {/* search */}
      <div
        style={{
          position: "relative",
          height: "2.778vw",
          minHeight: "2.778vw",
          display: "flex",
          alignItems: "center",
          borderRadius: "8px",
          background: "#181a1a",
          flexShrink: 0,
        }}
      >
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#fafafa",
            fontSize: "0.926vw",
            fontWeight: 500,
            fontFamily: "inherit",
            padding: "0 2.2vw 0 0.926vw",
            cursor: "none",
          }}
        />
        <svg
          viewBox="0 0 20 20"
          fill="none"
          style={{
            position: "absolute",
            right: "0.926vw",
            top: "50%",
            transform: "translateY(-50%)",
            width: "1.19vw",
            height: "1.19vw",
            pointerEvents: "none",
          }}
        >
          <circle cx="9" cy="9" r="6" stroke="#6E6F6F" strokeWidth="1.5" />
          <path d="M13.5 13.5L17 17" stroke="#6E6F6F" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* list */}
      <div style={{ position: "relative", maxHeight: "20vh", overflow: "hidden" }}>
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            flexDirection: "column",
            maxHeight: "20vh",
            overflowY: "scroll",
          }}
        >
          {options
            .filter((o) => o.toLowerCase().includes(search.toLowerCase()))
            .map((o) => (
              <li
                key={o}
                onMouseDown={(e) => { e.stopPropagation(); onSelect(o); }}
                style={{
                  fontSize: "1vw",
                  fontWeight: 500,
                  padding: "1.5vh",
                  borderRadius: "8px",
                  color: "#fafafa",
                  cursor: "none",
                  flexShrink: 0,
                  background: value === o ? "rgba(255,255,255,0.08)" : "transparent",
                  transition: "background-color 0.3s ease",
                }}
              >
                {o}
              </li>
            ))}
        </ul>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "45%",
            background: "linear-gradient(180deg, rgba(18,19,19,0) 0%, #121313 100%)",
            pointerEvents: "none",
          }}
        />
      </div>
    </div>,
    document.body,
  );
}

/* ─── vacancy row ──────────────────────────────────────────────── */
function VacancyRow({ vacancy, visible }: { vacancy: Vacancy; visible: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: "4.63vw 0",
        borderBottom: "0.75px solid rgba(255,255,255,0.2)",
        cursor: "none",
      }}
      onClick={() => setOpen((v) => !v)}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-between",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(15%)",
          transition: "opacity 1s ease, transform 1s ease",
          fontFamily: "Plus Jakarta Sans, sans-serif",
        }}
      >
        <div style={{ flex: 0.45 }}>
          <h6 style={{ margin: 0, fontSize: "1.587vw", fontWeight: 500, color: "#fafafa", letterSpacing: "-0.01em" }}>
            {vacancy.title}
          </h6>
        </div>
        <div style={{ display: "flex", flex: 0.55, alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.926vw", flex: 1 }}>{vacancy.location}</span>
          <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.926vw", flex: 1 }}>{vacancy.type}</span>
          <div style={{ height: "1.2vw", width: "1.2vw", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", rotate: open ? "-90deg" : "90deg", transition: "rotate 0.4s ease" }}>
            <svg viewBox="0 0 14 14" fill="none" style={{ width: "100%", height: "100%" }}>
              <path d="M5 2l5 5-5 5" stroke="#fafafa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
      {open && (
        <div style={{ paddingTop: "3.968vw", fontSize: "1.19vw", color: "rgba(255,255,255,0.8)", fontFamily: "Plus Jakarta Sans, sans-serif", lineHeight: "160%" }}>
          {vacancy.description}
        </div>
      )}
    </div>
  );
}

/* ─── main page ────────────────────────────────────────────────── */
export default function CareersPage() {
  const [titleAnimated, setTitleAnimated]   = useState(false);
  const [headerAnimated, setHeaderAnimated] = useState(false);
  const [locationFilter, setLocationFilter] = useState("All");
  const [typeFilter, setTypeFilter]         = useState("All");
  const [locationOpen, setLocationOpen]     = useState(false);
  const [typeOpen, setTypeOpen]             = useState(false);
  const [locSearch, setLocSearch]           = useState("");
  const [typeSearch, setTypeSearch]         = useState("");
  const [locPos, setLocPos]   = useState({ top: 0, left: 0, width: 0 });
  const [typePos, setTypePos] = useState({ top: 0, left: 0, width: 0 });
  const [mounted, setMounted] = useState(false);

  const locationRef  = useRef<HTMLDivElement>(null);
  const typeRef      = useRef<HTMLDivElement>(null);
  const vacanciesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const t = setTimeout(() => setTitleAnimated(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = vacanciesRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setHeaderAnimated(true); obs.disconnect(); } },
      { threshold: 0.05 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const filtered = VACANCIES.filter(
    (v) =>
      (locationFilter === "All" || v.location === locationFilter) &&
      (typeFilter === "All" || v.type === typeFilter),
  );

  const openLoc = () => {
    if (locationRef.current) {
      const r = locationRef.current.getBoundingClientRect();
      setLocPos({ top: r.bottom + 6, left: r.left, width: Math.max(r.width, 200) });
    }
    setLocationOpen((v) => !v);
    setTypeOpen(false);
  };

  const openType = () => {
    if (typeRef.current) {
      const r = typeRef.current.getBoundingClientRect();
      setTypePos({ top: r.bottom + 6, left: r.left, width: Math.max(r.width, 200) });
    }
    setTypeOpen((v) => !v);
    setLocationOpen(false);
  };

  const filterIconSvg = (active: boolean) => (
    <svg viewBox="0 0 20 20" fill="none" style={{ height: "100%", width: "100%" }}>
      <path d="M5 7h10M7 10h6M9 13h2" stroke={active ? "#fafafa" : "#6E6F6F"} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );

  const closeIconSvg = (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <path d="M1.5 9.5L9.5 1.5" stroke="#6E6F6F" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M9.5 9.5L1.5 1.5" stroke="#6E6F6F" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );

  const labelStyle: React.CSSProperties = {
    fontSize: "0.794vw",
    fontWeight: 500,
    textTransform: "uppercase",
    opacity: 0.4,
    letterSpacing: "0.6px",
    color: "#fff",
  };

  const TITLE = "Careers";

  return (
    <>
      <style>{`
        @keyframes careers-fade-in { from { opacity: 0 } to { opacity: 1 } }
        .careers-root { animation: careers-fade-in 0.45s ease forwards; }
      `}</style>

      <div className="careers-root">

        {/* ── Hero ─────────────────────────────────────── */}
        <section style={{ height: "100vh", position: "relative" }}>
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderBottomRightRadius: "1.984vw",
              borderBottomLeftRadius: "1.984vw",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundImage: "url(/images/Careers/hero-bg.png)",
              backgroundColor: "#111312",
              padding: "9vh 9.744vw",
            }}
          >
            {/* Large heading with per-char lift animation */}
            <div
              style={{
                overflow: "hidden",
                display: "block",
                fontSize: "13vw",
                lineHeight: "88%",
                fontWeight: 400,
                letterSpacing: "-0.03em",
                color: "#fafafa",
                fontFamily: "Plus Jakarta Sans, sans-serif",
              }}
            >
              {TITLE.split("").map((char, i) => (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    opacity: titleAnimated ? 1 : 0,
                    transform: titleAnimated
                      ? "translateY(0) rotate(0deg)"
                      : "translateY(110%) rotate(5deg)",
                    transition: titleAnimated
                      ? `opacity 0.8s ease ${0.15 + i * 0.07}s, transform 0.8s ease ${0.15 + i * 0.07}s`
                      : "none",
                  }}
                >
                  {char}
                </span>
              ))}
            </div>

            {/* Caption block with cross icon */}
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: "5.291vw",
                marginTop: "2.5vw",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  transform: "translate(-75%, -40%)",
                  pointerEvents: "none",
                }}
              >
                <CrossBrackets />
              </div>
              <p
                style={{
                  opacity: 0.9,
                  fontSize: "1.19vw",
                  color: "#fafafa",
                  fontFamily: "Plus Jakarta Sans, sans-serif",
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                There are currently no positions open.
              </p>
            </div>
          </div>
        </section>

        {/* ── Vacancies ────────────────────────────────── */}
        <section id="open-vacancies" style={{ backgroundColor: "#0e0f0f", minHeight: "60vh" }}>
          <div
            ref={vacanciesRef}
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              maxWidth: "75%",
              width: "100%",
              paddingTop: "4.96vw",
              paddingBottom: "7.937vw",
            }}
          >
            {/* column header row */}
            <div
              style={{
                display: "flex",
                width: "100%",
                opacity: headerAnimated ? 1 : 0,
                transform: headerAnimated ? "translateY(0)" : "translateY(20%)",
                transition: headerAnimated
                  ? "opacity 1s ease 0.125s, transform 1s ease 0.125s"
                  : "none",
                fontFamily: "Plus Jakarta Sans, sans-serif",
              }}
            >
              {/* POSITION label */}
              <div style={{ flex: 0.45 }}>
                <span style={labelStyle}>Position</span>
              </div>

              {/* LOCATION + TYPE filters */}
              <div style={{ display: "flex", flex: 0.55, alignItems: "center", justifyContent: "space-between" }}>

                {/* Location */}
                <div ref={locationRef}>
                  <div
                    onMouseDown={openLoc}
                    style={{ display: "flex", alignItems: "center", gap: "0.397vw", cursor: "none" }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: "2.5px" }}>
                      <span style={labelStyle}>Location:&nbsp;</span>
                      <span style={{ fontSize: "0.794vw", fontWeight: 700, color: "#fff" }}>{locationFilter}</span>
                    </span>
                    <div style={{ height: "0.926vw", width: "0.926vw", flexShrink: 0 }}>
                      {filterIconSvg(locationFilter !== "All")}
                    </div>
                    <div
                      style={{
                        height: "0.8vw",
                        width: "0.8vw",
                        marginLeft: "0.2vw",
                        flexShrink: 0,
                        opacity: locationFilter !== "All" ? 1 : 0,
                        transition: "opacity 0.3s ease",
                        pointerEvents: locationFilter !== "All" ? "auto" : "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onMouseDown={(e) => { e.stopPropagation(); setLocationFilter("All"); setLocationOpen(false); }}
                    >
                      {closeIconSvg}
                    </div>
                  </div>
                </div>

                {/* Type */}
                <div ref={typeRef}>
                  <div
                    onMouseDown={openType}
                    style={{ display: "flex", alignItems: "center", gap: "0.397vw", cursor: "none" }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: "2.5px" }}>
                      <span style={labelStyle}>Type:&nbsp;</span>
                      <span style={{ fontSize: "0.794vw", fontWeight: 700, color: "#fff" }}>{typeFilter}</span>
                    </span>
                    <div style={{ height: "0.926vw", width: "0.926vw", flexShrink: 0 }}>
                      {filterIconSvg(typeFilter !== "All")}
                    </div>
                    <div
                      style={{
                        height: "0.8vw",
                        width: "0.8vw",
                        marginLeft: "0.2vw",
                        flexShrink: 0,
                        opacity: typeFilter !== "All" ? 1 : 0,
                        transition: "opacity 0.3s ease",
                        pointerEvents: typeFilter !== "All" ? "auto" : "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      onMouseDown={(e) => { e.stopPropagation(); setTypeFilter("All"); setTypeOpen(false); }}
                    >
                      {closeIconSvg}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* vacancy list */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                borderTop: "0.75px solid rgba(255,255,255,0.2)",
                marginTop: "1.587vw",
              }}
            >
              {filtered.length === 0 ? (
                <p
                  style={{
                    textAlign: "center",
                    opacity: 0.3,
                    fontSize: "1vw",
                    color: "#fafafa",
                    fontFamily: "Plus Jakarta Sans, sans-serif",
                    marginTop: "8vh",
                  }}
                >
                  There are currently no positions open.
                </p>
              ) : (
                filtered.map((v) => (
                  <VacancyRow key={v.id} vacancy={v} visible={headerAnimated} />
                ))
              )}
            </div>
          </div>
        </section>

        <Footer />
      </div>

      {/* portals */}
      {mounted && (
        <FilterDropdownPortal
          open={locationOpen}
          pos={locPos}
          options={ALL_LOCATIONS}
          value={locationFilter}
          search={locSearch}
          onSearch={setLocSearch}
          onSelect={(v) => { setLocationFilter(v); setLocationOpen(false); setLocSearch(""); }}
        />
      )}
      {mounted && (
        <FilterDropdownPortal
          open={typeOpen}
          pos={typePos}
          options={ALL_TYPES}
          value={typeFilter}
          search={typeSearch}
          onSearch={setTypeSearch}
          onSelect={(v) => { setTypeFilter(v); setTypeOpen(false); setTypeSearch(""); }}
        />
      )}
    </>
  );
}
