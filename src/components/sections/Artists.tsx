"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

const ALL_ARTISTS = [
  {
    no: 1,
    name: "Øneheart",
    img: "/images/Artists/oneheart.jpg",
    bio: "Dmitry Volynkin, aka Øneheart, embarked on his musical journey at 11. He's a visionary multi-genre artist crafting ambient, wave, and electronic landscapes.",
  },
  {
    no: 2,
    name: "Gibran Alcocer",
    img: "/images/Artists/2.jpg",
    bio: 'Gibran Alcocer, a pianist from Mexico, gaining 5 million monthly listeners on Spotify with his captivating melodies, including his viral hit "Idea 10".',
  },
  {
    no: 3,
    name: "Caleb Arredondo",
    img: "/images/Artists/Caleb-Arredondo.jpg",
    bio: 'Caleb started by posting his own saxophone compositions on social media. He experimented with playing in an empty parking lot, using the natural reverb to create a signature sound he called "Echo Sax." His first reel, showcasing this unique setting, quickly gained viral attention.',
  },
  {
    no: 4,
    name: "Flawed Mangoes",
    img: "/images/Artists/flawed_mangoes.jpg",
    bio: "Evan Lo, better known as Flawed Mangoes, is a musician from Massachusetts whose journey began in childhood with piano lessons before expanding to guitar in high school bands. His passion for recording his own guitar tracks eventually propelled him to global virality.",
  },
  {
    no: 5,
    name: "bonjr",
    img: "/images/Artists/bonjr.jpg",
    bio: "Daniel, better known as bonjr, is a music producer from Angola. He gained recognition with his viral YouTube hit \"It's ok, you're ok\"; a track that deeply resonated with listeners and continues to draw them back over time. Bonjr has also collaborated with artists like Thomas Reid on the indie sensation \"I want you to help me live\", further establishing himself as a versatile, multi-genre artist.",
  },
  {
    no: 6,
    name: "Ty's Music",
    img: "/images/Artists/ty.jpg",
    bio: "Ty's Music's solo saxophone performances have been making a huge impact on social media in recent months, with As Time Flies Special Version gaining widespread attention. The track has been featured in countless TikTok videos, racking up over 1.1 billion views and inspiring more than 315,000 user-created posts on the platform.",
  },
  {
    no: 7,
    name: "Izzamuzzic",
    img: "/images/Artists/1.jpg",
    bio: 'Vadim Pavlyuchenko, known professionally as "Izzamuzzic," is an electronic music artist and accomplished music producer originating from Kazakhstan.',
  },
  {
    no: 8,
    name: "Julien Marchal",
    img: "/images/Artists/Julien Marchal.jpg",
    bio: 'Julien Marchal, a Belgian composer and pianist, is known for producing classical music. Critics have described his pieces as "beautiful," "ethereal," and "hauntingly beautiful."',
  },
  {
    no: 9,
    name: "SUICIDAL-IDOL",
    img: "/images/Artists/SUICIDAL-IDOL.jpg",
    bio: 'Music artist also known as "gore.x.shawly" SUICIDAL-IDOL makes music inspired by 2000s scene & emo genres.',
  },
  {
    no: 10,
    name: "Vague003",
    img: "/images/Artists/VAGUE003.jpg",
    bio: 'VAGUE003, a member of the 003 Collective, is a multi-genre artist who rose to prominence on SoundCloud. Their breakout hit "drowning" went viral on TikTok, capturing widespread attention.',
  },
];

const renderChars = (
  text: string,
  startDelay: number,
  charDelay: number,
  duration: number,
  visible: boolean,
) =>
  text.split("").map((char, i) => (
    <span
      key={i}
      style={{
        display: "inline-block",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(110%)",
        transition: visible
          ? `opacity ${duration}s ease ${startDelay + i * charDelay}s, transform ${duration}s ease ${startDelay + i * charDelay}s`
          : "none",
      }}
    >
      {char}
    </span>
  ));

export default function Artists() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const [sectionVisible, setSectionVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startTranslate = useRef(0);
  const currentTranslate = useRef(0);
  const hasMoved = useRef(false);
  const [dragging, setDragging] = useState(false);
  const [learnHover, setLearnHover] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true;
    hasMoved.current = false;
    startX.current = e.clientX;
    startTranslate.current = currentTranslate.current;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    setDragging(true);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 3) hasMoved.current = true;

    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    const minTranslate = -(track.scrollWidth - container.clientWidth);
    let t = startTranslate.current + dx;
    t = Math.min(0, Math.max(minTranslate, t));
    currentTranslate.current = t;
    track.style.transform = `translateX(${t}px)`;
  }, []);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
    setDragging(false);
  }, []);

  return (
    <section ref={sectionRef} id="artists" style={{ height: "fit-content" }}>
      <div
        style={{
          display: "flex",
          height: isMobile ? "fit-content" : "150vh",
          minHeight: isMobile ? "unset" : "150vh",
          width: "100%",
          flexDirection: "column",
          gap: "3vh",
          justifyContent: isMobile ? "space-between" : undefined,
          paddingBottom: isMobile ? "10vh" : undefined,
        }}
      >
        {/* Header row */}
        <div className="container" style={{ flex: isMobile ? undefined : 0.3, paddingTop: isMobile ? "8vh" : "4.96vw", height: isMobile ? "fit-content" : undefined }}>
          <div
            style={{
              display: "flex",
              height: "100%",
              width: "100%",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: isMobile ? 0 : "20vw",
            }}
          >
            {/* Left: Our / Artists with (Meet our Artists) label */}
            <div style={{ position: "relative" }}>
              {/* section-span already sets color to rgba(250,250,250,0.3) — no extra opacity needed */}
              <span
                className="section-span"
                style={{
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  fontSize: isMobile ? "3.077vw" : "1.323vw",
                  lineHeight: "150%",
                }}
              >
                <div style={{ overflow: "hidden" }}>
                  <span style={{
                    display: "inline-block",
                    opacity: sectionVisible ? 1 : 0,
                    transform: sectionVisible ? "translateY(0)" : "translateY(110%)",
                    transition: sectionVisible ? "opacity 1s ease 0.1s, transform 1.4s cubic-bezier(0.16,1,0.3,1) 0.1s" : "none",
                  }}>(Meet</span>
                </div>
                <div style={{ overflow: "hidden" }}>
                  <span style={{
                    display: "inline-block",
                    opacity: sectionVisible ? 1 : 0,
                    transform: sectionVisible ? "translateY(0)" : "translateY(110%)",
                    transition: sectionVisible ? "opacity 1s ease 0.23s, transform 1.4s cubic-bezier(0.16,1,0.3,1) 0.23s" : "none",
                  }}>our Artists)</span>
                </div>
              </span>
              <h1
                style={{
                  fontSize: isMobile ? "16.41vw" : "10.582vw",
                  fontWeight: 400,
                  margin: 0,
                  overflow: "hidden",
                  lineHeight: "84%",
                }}
              >
                {renderChars("Our", 0, 0.115, 1, sectionVisible)}
              </h1>
              <h1
                style={{
                  fontSize: isMobile ? "16.41vw" : "10.582vw",
                  fontWeight: 400,
                  margin: 0,
                  overflow: "hidden",
                  lineHeight: "84%",
                  transform: isMobile ? "translateX(15vw)" : "translateX(50%)",
                }}
              >
                {renderChars("Artists", 0.5, 0.115, 1, sectionVisible)}
              </h1>
            </div>

            {/* Right: sound waves + description + learn more — desktop only */}
            {!isMobile && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                gap: "4.6296vh",
                height: "100%",
              }}
            >
              <img
                src="/images/Artists/soundWaves.svg"
                alt=""
                style={{
                  height: "1.852vw",
                  width: "2.116vw",
                  objectFit: "cover",
                  opacity: sectionVisible ? 1 : 0,
                  transform: sectionVisible ? "translateY(0)" : "translateY(100%)",
                  transition: sectionVisible ? "opacity 1s ease 0.5s, transform 1.4s cubic-bezier(0.16,1,0.3,1) 0.5s" : "none",
                }}
              />
              <p className="brand-text" style={{ margin: 0 }}>
                {[
                  "Kurate Music has had the privilege of collaborating with ",
                  "a diverse array of independent acts, covering genres ",
                  "ranging from ambient to pop, and everything in between.",
                ].map((line, i) => {
                  const delays = [0.3, 0.55, 0.8];
                  return (
                    <div
                      key={i}
                      style={{
                        opacity: sectionVisible ? 1 : 0,
                        transform: sectionVisible ? "translateY(0)" : "translateY(100%)",
                        transition: sectionVisible
                          ? `opacity 1.4s cubic-bezier(0.16,1,0.3,1) ${delays[i]}s, transform 1.4s cubic-bezier(0.16,1,0.3,1) ${delays[i]}s`
                          : "none",
                      }}
                    >
                      {line}
                    </div>
                  );
                })}
              </p>
              <a
                href="/artists"
                style={{
                  opacity: sectionVisible ? 1 : 0,
                  transform: sectionVisible ? "translateY(0)" : "translateY(100%)",
                  transition: sectionVisible ? "opacity 1s ease 0.5s, transform 1.4s cubic-bezier(0.16,1,0.3,1) 0.5s" : "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6vw",
                  fontSize: "1vw",
                  color: "inherit",
                  textDecoration: "none",
                }}
                onMouseEnter={() => setLearnHover(true)}
                onMouseLeave={() => setLearnHover(false)}
              >
                <span style={{ borderBottom: "1px solid currentColor" }}>
                  Learn more
                </span>
                <span
                  style={{
                    display: "flex",
                    overflow: "hidden",
                    width: "1.2vw",
                    height: "0.9vw",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="20"
                    height="14"
                    viewBox="0 0 20 14"
                    fill="none"
                    style={{
                      minWidth: "100%",
                      height: "100%",
                      transform: learnHover ? "translateX(100%)" : "translateX(0)",
                      transition: "transform 0.45s ease",
                    }}
                  >
                    <path
                      d="M1 7H19M19 7L13 1M19 7L13 13"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </a>
            </div>
            )}
          </div>
        </div>

        {/* Horizontal drag slider */}
        <div
          ref={containerRef}
          style={{
            flex: isMobile ? "none" : 0.7,
            height: isMobile ? "44vh" : undefined,
            overflow: "hidden",
            display: "flex",
            width: "100%",
            cursor: dragging ? "grabbing" : "grab",
            userSelect: "none",
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div
            ref={trackRef}
            style={{
              display: "flex",
              height: "100%",
              willChange: "transform",
            }}
          >
            {ALL_ARTISTS.map((a) => {

              const isEven = a.no % 2 === 0;

              const imgBlock = (
                <div
                  style={{
                    flex: 1,
                    overflow: "hidden",
                    position: "relative",
                    minHeight: 0,
                  }}
                >
                  <img
                    src={a.img}
                    alt={a.name}
                    draggable={false}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      filter: "grayscale(100%)",
                      transition: "filter 0.3s ease",
                      pointerEvents: "none",
                      userSelect: "none",
                    }}
                  />
                </div>
              );

              const nameBlock = (
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "1.852vw",
                    lineHeight: "84%",
                  }}
                >
                  <sup
                    style={{
                      fontSize: isMobile ? "3.077vw" : "1.058vw",
                      fontWeight: 400,
                      opacity: 0.4,
                      verticalAlign: "top",
                      lineHeight: 1,
                    }}
                  >
                    ({a.no})
                  </sup>
                  <h6
                    style={{
                      fontSize: isMobile ? "6.154vw" : "2.91vw",
                      color: "#fff",
                      margin: 0,
                      fontWeight: 400,
                      textTransform: "none",
                      lineHeight: "84%",
                    }}
                  >
                    {a.name}
                  </h6>
                </div>
              );

              const bioBlock = (
                <p
                  style={{
                    fontSize: isMobile ? "3.077vw" : "1.058vw",
                    opacity: 0.6,
                    lineHeight: "148%",
                    margin: 0,
                    textTransform: "none",
                    fontWeight: 400,
                  }}
                >
                  {a.bio}
                </p>
              );

              return (
                <div
                  key={a.name}
                  className="artist-card"
                  style={{
                    flexShrink: 0,
                    width: isMobile ? undefined : "calc(100vw / 3)",
                    minWidth: isMobile ? "77vw" : undefined,
                    height: "100%",
                    border: "1px solid rgba(255,255,255,0.3)",
                    borderLeft: a.no > 1 ? "none" : undefined,
                    overflow: "hidden",
                    boxSizing: "border-box",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      gap: isMobile ? "3vw" : "1.984vw",
                      padding: isMobile ? "6.667vw 5.128vw" : "3.307vw 2.315vw",
                      height: "100%",
                      boxSizing: "border-box",
                      opacity: sectionVisible ? 1 : 0,
                      transform: sectionVisible ? "translateY(0)" : "translateY(25%)",
                      transition: sectionVisible
                        ? `opacity 1s ease ${(a.no - 1) * 0.15 + 0.25}s, transform 1s ease ${(a.no - 1) * 0.15 + 0.25}s`
                        : "none",
                    }}
                  >
                    {isEven ? (
                      <>
                        {imgBlock}
                        {bioBlock}
                        {nameBlock}
                      </>
                    ) : (
                      <>
                        {nameBlock}
                        {bioBlock}
                        {imgBlock}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: sound waves + description + learn more — below slider */}
        {isMobile && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "5vw",
              padding: "8vw 5.128vw",
              textAlign: "center",
            }}
          >
            <img
              src="/images/Artists/soundWaves.svg"
              alt=""
              style={{ height: "7vw", width: "8vw", objectFit: "cover" }}
            />
            <p
              style={{
                fontSize: "3.59vw",
                opacity: 0.6,
                lineHeight: "148%",
                margin: 0,
              }}
            >
              Empowering artists, captivating global audiences, and redefining
              the future of musicas a dynamic record label
            </p>
            <a
              href="/artists"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "2vw",
                fontSize: "3.59vw",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <span style={{ borderBottom: "1px solid currentColor" }}>
                Learn more
              </span>
              <span>→</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
