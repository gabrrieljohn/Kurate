"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroLogoCanvas from "@/components/HeroLogoCanvas";
import { useIsMobile } from "@/hooks/useIsMobile";

const CARD1_FLOURISH_D =
  "M79.8252 10.0149C81.9781 10.0149 84.1768 9.88847 86.3269 10.0149C87.5136 10.0848 87.3996 11.288 86.8429 12.079C84.3382 15.6383 79.005 17.0768 75.0263 17.8583C57.2131 21.3573 35.8275 22.241 19.0392 14.4526C17.9109 13.9292 -0.146546 4.9881 2.01081 3.10041C4.86251 0.605172 15.6668 5.03694 18.4715 5.93847C26.5415 8.53238 34.2572 12.5322 41.692 16.5683C53.7631 23.1212 67.9457 34.0764 69.4018 48.8189C70.4067 58.9935 63.6029 68.5919 54.6439 73.0714C48.3069 76.2399 41.0103 76.1444 34.3131 77.8187";

export default function Hero() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const logoInnerRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card1LineRef = useRef<HTMLDivElement>(null);
  const card1ImgRef = useRef<HTMLImageElement>(null);
  const card2ImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const animate = (el: HTMLElement | null, delay = 0) => {
      if (!el) return;
      const t = setTimeout(() => el.classList.add("animated"), delay);
      return () => clearTimeout(t);
    };
    const c1 = animate(card1LineRef.current, 1200);
    return () => { c1?.(); };
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (logoRef.current) {
        gsap.to(logoRef.current, {
          opacity: 0,
          yPercent: -130,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom 30%",
            scrub: 0.2,
          },
        });
      }
      if (card1Ref.current) {
        gsap.to(card1Ref.current, {
          yPercent: -60,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom 30%",
            scrub: 0.2,
          },
        });
      }
      if (card2Ref.current) {
        gsap.to(card2Ref.current, {
          yPercent: 60,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom 30%",
            scrub: 0.2,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const zoomIn = (img: HTMLImageElement | null) => {
    if (!img) return;
    gsap.to(img, { scale: 1.15, duration: 0.75, ease: "power2.out" });
  };

  const zoomOut = (img: HTMLImageElement | null) => {
    if (!img) return;
    gsap.to(img, { scale: 1, duration: 0.75, ease: "power2.out" });
  };

  return (
    <section
      ref={sectionRef}
      id="home-hero"
      style={{
        position: "relative",
        height: "100vh",
      }}
    >
      {/* Full-section canvas — desktop only (original doesn't use canvas on mobile) */}
      {!isMobile && (
        <HeroLogoCanvas
          logoSrc="/images/Preloader/logo.svg"
          logoAreaRef={logoInnerRef}
        />
      )}

      {/* Big center wordmark */}
      <div
        ref={logoRef}
        style={{
          position: "absolute",
          left: "50%",
          top: isMobile ? "62%" : "50%",
          maxHeight: isMobile ? "9.5972vh" : "25%",
          maxWidth: isMobile ? "100%" : "50%",
          height: "100%",
          width: isMobile ? "75.641vw" : "100%",
          transform: "translate(-50%, -100%)",
          pointerEvents: "none",
          zIndex: 2,
          textAlign: "center",
        }}
      >
        <div ref={logoInnerRef} style={{ position: "relative", display: "inline-block", height: "100%" }}>
          {/* On mobile: show the real logo. On desktop: invisible placeholder for canvas reference */}
          <img
            src="/images/Preloader/logo.svg"
            alt="Kurate"
            style={{
              height: "100%",
              width: "auto",
              display: "block",
              visibility: isMobile ? "visible" : "hidden",
            }}
          />
          <img
            src="/images/icons/trademark-symbol.svg"
            alt="®"
            className="reveal"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              height: isMobile ? "2.436vw" : "1.4vw",
              width: isMobile ? "2.436vw" : "1.4vw",
              transform: "translate(120%, 30%)",
              visibility: isMobile ? "visible" : "hidden",
            }}
          />
        </div>
      </div>

      {/* Top-left card — Empowering Artists */}
      <div
        ref={card1Ref}
        style={{
          position: "absolute",
          left: "10.256vw",
          top: 0,
          zIndex: 3,
          userSelect: "none",
        }}
        className="reveal"
        onMouseEnter={() => zoomIn(card1ImgRef.current)}
        onMouseLeave={() => zoomOut(card1ImgRef.current)}
      >
        <div
          style={{
            display: "flex",
            gap: "12px",
            alignItems: "stretch",
            fontSize: isMobile ? "3.077vw" : "0.926vw",
          }}
        >
          <div
            style={{
              writingMode: "vertical-lr",
              transform: "scale(-1, -1)",
              alignSelf: "stretch",
              display: "flex",
              alignItems: "flex-start",
              pointerEvents: "none",
              color: "#fafafa",
              opacity: 1,
            }}
          >
            <span className="reveal">Empowering Artists</span>
          </div>
          <div
            style={{
              position: "relative",
              width: isMobile ? "23.59vw" : "11.574vw",
              height: isMobile ? "30.769vw" : "14.881vw",
              borderRadius: "0.4vw",
              overflow: "hidden",
              boxShadow: "0 25px 60px -10px rgba(0,0,0,0.6)",
            }}
          >
            <img
              ref={card1ImgRef}
              src="/images/Hero/card1.jpg"
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            <div
              ref={card1LineRef}
              className="drawable-line"
              style={{
                position: "absolute",
                right: 0,
                bottom: 0,
                width: isMobile ? "11.538vw" : "5.622vw",
                height: isMobile ? "10.256vw" : "4.96vw",
                zIndex: 2,
              }}
            >
              <svg viewBox="0 0 89 80" fill="none">
                <path
                  d={CARD1_FLOURISH_D}
                  stroke="#fafafa"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Top-right card — Captivating Global Audiences */}
      <div
        ref={card2Ref}
        style={{
          position: "absolute",
          right: 0,
          top: "15.4028vh",
          zIndex: 3,
          userSelect: "none",
        }}
        className="reveal"
        onMouseEnter={() => zoomIn(card2ImgRef.current)}
        onMouseLeave={() => zoomOut(card2ImgRef.current)}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column-reverse",
            alignItems: "flex-start",
            gap: "0.6vw",
            fontSize: isMobile ? "3.077vw" : "0.926vw",
          }}
        >
          <div
            style={{
              textAlign: "left",
              pointerEvents: "none",
              color: "#fafafa",
              opacity: 1,
            }}
          >
            <span className="reveal">Captivating Global Audiences</span>
          </div>
          <div
            style={{
              width: isMobile ? "36.41vw" : "16.204vw",
              height: isMobile ? "26.41vw" : "20vh",
              borderRadius: "0.4vw",
              overflow: "hidden",
              position: "relative",
              boxShadow: "0 25px 60px -10px rgba(0,0,0,0.6)",
            }}
          >
            <img
              ref={card2ImgRef}
              src="/images/Hero/card2.jpg"
              alt=""
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
