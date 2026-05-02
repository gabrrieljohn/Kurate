"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ScrollToExplore from "@/components/ScrollToExplore";

const HERO_SCRIBBLE_D =
  "M2.69582 130.546C1.36584 130.546 2.20758 130.45 3.02641 129.888C10.4343 124.797 17.5774 119.412 25.1761 114.569C75.9755 82.1899 133.571 57.3954 189.398 35.0939C219.856 22.9265 249.706 12.0494 281.468 4.53914C290.818 2.32826 303.397 -2.26048 295.518 11.5396C274.87 47.7026 235.577 77.0991 203.035 101.968C176.929 121.919 148.922 139.556 122.04 158.466C111.922 165.582 101.857 172.503 92.121 180.126C90.5713 181.339 87.3987 183.914 91.2119 183.914C96.6337 183.914 104.189 178.602 108.981 176.173C115.874 172.678 124.291 168.525 129.974 163.16C134.036 159.325 125.448 164.972 124.684 165.631C114.42 174.482 106.339 187.914 101.212 200.221C96.4585 211.633 86.7715 238.553 105.345 241.4C111.04 242.273 117.447 242.016 123.197 241.729C125.2 241.63 128.88 240.247 124.684 240.247";

export default function ThreeDCards() {
  const movementCardRef = useRef<HTMLDivElement>(null);
  const heroLineRef = useRef<HTMLDivElement>(null);

  const [cardLoaded, setCardLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setCardLoaded(true), 800);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = heroLineRef.current;
    if (!el) return;
    const onScroll = () => {
      if (window.scrollY > 50) {
        el.classList.add("animated");
        window.removeEventListener("scroll", onScroll);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!movementCardRef.current) return;
    const rotY = (window.innerWidth / 2 - e.pageX) / 100;
    const rotX = (window.innerHeight / 2 - e.pageY) / 100;
    movementCardRef.current.style.transition = "all 0.1s ease";
    movementCardRef.current.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg)`;
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (!movementCardRef.current) return;
    movementCardRef.current.style.transition = "all 1s ease";
    movementCardRef.current.style.transform = "rotateY(0deg) rotateX(0deg)";
  }, []);

  const backCardStyle = (which: 1 | 2): React.CSSProperties => {
    const baseTranslate = "translate(-50%, 0)";
    const initRotate = which === 1 ? "rotate(-6.15deg)" : "rotate(6.15deg)";
    const hoverTranslate = which === 1 ? "translate(0%, 0)" : "translate(-100%, 0)";
    const hoverRotate = which === 1 ? "rotate(6deg)" : "rotate(-6deg)";

    return {
      position: "absolute",
      left: "50%",
      top: 0,
      height: "100%",
      width: "auto",
      maxWidth: "33vw",
      objectFit: "cover",
      objectPosition: "center",
      transform: cardLoaded
        ? isHovered
          ? `${hoverTranslate} ${hoverRotate}`
          : `${baseTranslate} ${initRotate}`
        : baseTranslate,
      transition: "transform 1s ease",
      borderRadius: "0.4vw",
      boxShadow: "0 25px 60px -10px rgba(0,0,0,0.6)",
      zIndex: which === 1 ? 2 : 1,
    };
  };

  const cardRevealStyle: React.CSSProperties = {
    position: "absolute",
    height: "100%",
    width: "100%",
    transform: cardLoaded ? "translateY(0)" : "translateY(25%)",
    opacity: cardLoaded ? 1 : 0,
    transition: "opacity 1s ease 0.25s, transform 1s ease 0.25s",
  };

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "100vh",
        height: "85vh",
        width: "50vw",
        transform: "translate(-50%, -42.5%)",
        zIndex: 3,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Back cards — fan on hover */}
      <div style={{ position: "absolute", left: "50%", top: "50%", height: "100%", width: "100%", transform: "translate(-50%, -50%)" }}>
        <div style={cardRevealStyle}>
          <img src="/images/Hero/card3_2.jpg" alt="" style={backCardStyle(1)} />
          <img src="/images/Hero/card3_3.jpg" alt="" style={backCardStyle(2)} />
        </div>
      </div>

      {/* Front card — 3D mouse-tracking tilt */}
      <div style={{ ...cardRevealStyle, perspective: "1000px" }}>
        <div ref={movementCardRef} style={{ height: "100%", width: "100%" }}>
          <img
            src="/images/Hero/card3_1.jpg"
            alt=""
            style={{
              display: "block",
              margin: "auto",
              height: "100%",
              width: "auto",
              maxWidth: "33vw",
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: "0.4vw",
              boxShadow: "0 25px 60px -10px rgba(0,0,0,0.6)",
            }}
          />
        </div>
      </div>

      {/* Content — Dynamic Record Label text, scribble, scroll label */}
      <div
        style={{
          pointerEvents: "none",
          position: "relative",
          margin: "auto",
          height: "100%",
          width: "100%",
          maxWidth: "33vw",
        }}
      >
        {/* Dynamic Record Label */}
        <p
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
            transform: "translateY(-300%)",
            fontSize: "1.455vw",
            lineHeight: "84%",
            fontWeight: 400,
            margin: 0,
            overflow: "hidden",
            whiteSpace: "nowrap",
            fontFamily: "Helvetica Now Display, Helvetica Neue, Helvetica, Arial, sans-serif",
          }}
        >
          <div
            style={{
              transform: cardLoaded ? "translateY(0)" : "translateY(1000%)",
              opacity: cardLoaded ? 1 : 0,
              transition: "transform 1.25s ease 0.5s, opacity 1.25s ease 0.5s",
            }}
          >
            Dynamic Record Label
          </div>
        </p>

        {/* Hero scribble */}
        <div
          ref={heroLineRef}
          className="drawable-line"
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: "295px",
            height: "240px",
            transform: "translateX(50%)",
            zIndex: 5,
            pointerEvents: "none",
          }}
          aria-hidden
        >
          <svg viewBox="0 0 300 244" fill="none">
            <path
              d={HERO_SCRIBBLE_D}
              stroke="#fafafa"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </div>

        {/* Circle scroll label */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            zIndex: 5,
            transform: "translate(-50%, 25%)",
            pointerEvents: "auto",
            opacity: cardLoaded ? 1 : 0,
            transition: "opacity 1s ease 0.5s",
          }}
        >
          <ScrollToExplore />
        </div>
      </div>
    </div>
  );
}
