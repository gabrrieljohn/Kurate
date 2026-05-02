"use client";

import { useState } from "react";

const TRACKS = [
  {
    title: "Drowning",
    artist: "VAGUE003 & Sadistik",
    genre: "Experimental",
    theme: "Melancholy",
    img: "/images/Records/Drowning.jpg",
    artistImg: "/images/Artists/VAGUE003.jpg",
    description: "A haunting collaboration that blurs the line between ambient soundscapes and raw emotion.",
    number: "01",
  },
  {
    title: "Night Drive",
    artist: "Wilee",
    genre: "Phonk",
    theme: "Late Night",
    img: "/images/Records/Night Drive.jpg",
    artistImg: "/images/Artists/oneheart.jpg",
    description: "A cinematic phonk journey through empty streets and neon-lit highways.",
    number: "02",
  },
  {
    title: "Snowfall",
    artist: "Øneheart & Reidenshi",
    genre: "Ambient",
    theme: "Solitude",
    img: "/images/Records/snowfall.jpg",
    artistImg: "/images/Artists/oneheart.jpg",
    description: "Delicate ambient textures that capture the stillness of a winter's first snowfall.",
    number: "03",
  },
];

export default function Selected() {
  const [active, setActive] = useState(0);
  const track = TRACKS[active];

  return (
    <>
      <style>{`
        .selected-section {
          position: relative;
          height: 100vh;
        }
        .selected-wrapper {
          margin-left: auto;
          margin-right: auto;
          display: flex;
          height: 100%;
          width: 100%;
          max-width: 70%;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.5vw;
          padding: 4.96vw 0;
        }
        .selected-top {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.116vw;
        }
        .selected-icon {
          height: 1.124vw;
          width: 1.323vw;
          transform: translateY(50%);
          opacity: 0;
          transition: opacity 0.5s ease 0.5s, transform 0.5s ease 0.5s;
          object-fit: contain;
          object-position: center;
        }
        .selected-section.animated .selected-icon {
          opacity: 1;
          transform: translateY(0);
        }
        .selected-tabs {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 2.116vw;
          transform: translateY(50%);
          opacity: 0;
          transition: opacity 1s ease 0.125s, transform 1s ease 0.125s;
        }
        .selected-section.animated .selected-tabs {
          opacity: 1;
          transform: translateY(0);
        }
        .selected-tab {
          display: flex;
          flex: 1 1 0;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.257vw;
          white-space: nowrap;
          font-size: 1.455vw;
          opacity: 0.5;
          transition: opacity 0.7s ease;
          cursor: none;
          background: none;
          border: none;
          color: #fafafa;
          padding: 0;
          font-family: inherit;
        }
        .selected-tab::after {
          content: "";
          height: 1.5px;
          width: 100%;
          background-color: #fafafa;
        }
        .selected-tab.active {
          opacity: 1;
        }
        .selected-tab:hover {
          opacity: 1;
        }

        /* info area */
        .selected-info {
          position: relative;
          width: 100%;
          flex: 1;
        }

        /* center album cover */
        .selected-covers {
          position: absolute;
          left: 50%;
          width: 35%;
          transform: translateX(-50%);
          top: 0;
        }
        .selected-cover-wrap {
          position: relative;
          padding-top: 100%;
          transform: translateY(50%);
          opacity: 0;
          transition: opacity 1.25s ease 0.25s, transform 1.25s ease 0.25s;
        }
        .selected-section.animated .selected-cover-wrap {
          opacity: 1;
          transform: translateY(0);
        }
        .selected-cover-inner {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          height: 100%; width: 100%;
        }
        .selected-cover-inner img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          object-position: center;
          transition: opacity 0.5s ease;
        }

        /* right block */
        .selected-right {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }
        .selected-right-title {
          font-size: 2.91vw;
          overflow: hidden;
          white-space: nowrap;
          font-weight: 400;
          position: absolute;
          left: 0;
          top: 0;
          transform: translateY(-100%);
        }
        .selected-right-title span {
          display: block;
          transform: translateY(50%);
          opacity: 0;
          transition: opacity 1s ease, transform 1s ease;
        }
        .selected-section.animated .selected-right-title span {
          opacity: 1;
          transform: translateY(0);
        }
        .selected-right-author {
          margin-top: 2.381vw;
          margin-bottom: 4.762vw;
          transform: translateX(50%);
          opacity: 0;
          transition: opacity 1s ease 0.6s, transform 1s ease 0.6s;
          font-size: 1.19vw;
          color: rgba(255,255,255,0.5);
        }
        .selected-section.animated .selected-right-author {
          opacity: 1;
          transform: translateX(0);
        }
        .selected-right-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5vw;
        }
        .selected-right-content p {
          font-size: 1.19vw;
          color: rgba(255,255,255,0.5);
          max-width: 16vw;
          line-height: 1.5;
        }

        /* bottom-left block */
        .selected-bottomleft {
          pointer-events: none;
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          max-width: 45%;
          transform: translateY(-50%);
        }
        .selected-bl-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2.976vw;
        }
        .selected-bl-theme {
          transform: translateX(-50%);
          opacity: 0;
          transition: opacity 1s ease 0.6s, transform 1s ease 0.6s;
          font-size: 1.058vw;
          color: rgba(255,255,255,0.5);
          align-self: flex-start;
        }
        .selected-section.animated .selected-bl-theme {
          opacity: 1;
          transform: translateX(0);
        }
        .selected-bl-title {
          position: relative;
          white-space: nowrap;
          display: flex;
          align-items: flex-start;
        }
        .selected-bl-circles {
          display: flex;
          margin-right: 5.291vw;
        }
        .selected-bl-circle {
          width: 4.299vw;
          height: 4.299vw;
          overflow: hidden;
          border-radius: 50%;
        }
        .selected-bl-circle:nth-child(2) {
          transform: translateX(-50%);
          overflow: auto;
          border: 1.5px solid #fff;
        }
        .selected-bl-circle img {
          height: 100%;
          width: 100%;
          object-fit: cover;
          object-position: center;
        }
        .selected-bl-h2 {
          display: flex;
          align-items: flex-start;
          font-size: 4.995vw !important;
          font-weight: 400;
          line-height: 0.84;
          margin: 0;
        }
        .selected-bl-h2 span {
          display: block;
          transform: translateY(100%);
          opacity: 0;
          transition: opacity 1s ease, transform 1s ease;
        }
        .selected-section.animated .selected-bl-h2 span {
          opacity: 1;
          transform: translateY(0);
        }
        .selected-bl-desc p {
          font-size: 1.19vw;
          color: rgba(255,255,255,0.5);
          max-width: 22vw;
          line-height: 1.5;
        }
      `}</style>

      <section id="selected" className="selected-section">
        <div className="selected-wrapper">
          {/* Top: heading + icon + tabs */}
          <div className="selected-top">
            <h5 style={{ overflow: "hidden", margin: 0 }}>
              <span className="reveal" style={{ textTransform: "none" }}>
                Selected Works
              </span>
            </h5>
            <img
              src="/images/Artists/soundWaves.svg"
              alt=""
              className="selected-icon"
            />
            <div className="selected-tabs">
              {TRACKS.map((t, i) => (
                <button
                  key={t.title}
                  className={`selected-tab${i === active ? " active" : ""}`}
                  onClick={() => setActive(i)}
                >
                  {t.genre}
                </button>
              ))}
            </div>
          </div>

          {/* Info: covers + right block + bottom-left block */}
          <div className="selected-info">
            {/* Center album cover */}
            <div className="selected-covers">
              <div className="selected-cover-wrap">
                <div className="selected-cover-inner">
                  <img
                    key={track.img}
                    src={track.img}
                    alt={track.title}
                    style={{ borderRadius: "0.5vw" }}
                  />
                </div>
              </div>
            </div>

            {/* Right block: track number title + author + description */}
            <div className="selected-right">
              <div className="selected-right-title">
                <span>{track.number}</span>
              </div>
              <div className="selected-right-content">
                <p>{track.description}</p>
                <p style={{ color: "rgba(255,255,255,0.3)" }}>{track.genre}</p>
              </div>
              <div className="selected-right-author">{track.artist}</div>
            </div>

            {/* Bottom-left: circle photos + big title */}
            <div className="selected-bottomleft">
              <div className="selected-bl-content">
                <div className="selected-bl-theme">{track.theme}</div>
                <div className="selected-bl-title">
                  <div className="selected-bl-circles">
                    <div className="selected-bl-circle">
                      <img src={track.artistImg} alt="" />
                    </div>
                    <div className="selected-bl-circle">
                      <img src={track.img} alt="" />
                    </div>
                  </div>
                  <h2 className="selected-bl-h2">
                    <span>{track.title}</span>
                  </h2>
                </div>
                <div className="selected-bl-desc">
                  <p>{track.artist}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
