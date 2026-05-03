"use client";

import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";

type Step = 1 | 2 | 3 | 4;

function WireBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // 6 flowing sine-wave lines across the mid-section
    const WAVES = [
      { y: 0.46, a: 0.065, f: 0.85, p: 0.0, s: 0.38, op: 0.11 },
      { y: 0.51, a: 0.090, f: 1.15, p: 1.3, s: 0.52, op: 0.15 },
      { y: 0.55, a: 0.070, f: 0.72, p: 2.6, s: 0.34, op: 0.13 },
      { y: 0.59, a: 0.100, f: 1.30, p: 0.9, s: 0.48, op: 0.17 },
      { y: 0.63, a: 0.080, f: 0.95, p: 3.2, s: 0.43, op: 0.14 },
      { y: 0.67, a: 0.060, f: 1.45, p: 1.9, s: 0.56, op: 0.11 },
    ];

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      WAVES.forEach((wave) => {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(255,255,255,${wave.op})`;
        ctx.lineWidth = 0.75;
        ctx.lineJoin = "round";

        const yCenter = wave.y * h;
        const STEPS = 300;
        for (let i = 0; i <= STEPS; i++) {
          const progress = i / STEPS;
          const x = progress * w;
          const y =
            yCenter +
            Math.sin(progress * Math.PI * 2 * wave.f + wave.p + t * wave.s) *
              wave.a *
              h;
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      t += 0.016;
      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

export default function SendDemos() {
  const isMobile = useIsMobile();
  const [step, setStep] = useState<Step>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [link, setLink] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [infoCount, setInfoCount] = useState<string>("1/3");
  const [nextHover, setNextHover] = useState(false);
  const [submitHover, setSubmitHover] = useState(false);
  const [contentVisible, setContentVisible] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [step]);

  const transitionTo = (next: Step) => {
    setContentVisible(false);
    setTimeout(() => {
      setStep(next);
      setContentVisible(true);
      if (next === 2) setInfoCount("1/3");
      else if (next === 3) setInfoCount("2/3");
      else if (next === 4) setInfoCount("3/3");
    }, 300);
  };

  const handleNext = () => {
    if (step === 1 && name.trim()) transitionTo(2);
    else if (step === 2 && email.trim()) transitionTo(3);
    else if (step === 3 && link.trim()) transitionTo(4);
  };

  const handleSubmit = () => {
    setContentVisible(false);
    setTimeout(() => {
      setSubmitted(true);
      setContentVisible(true);
    }, 300);
  };

  const currentValue = step === 1 ? name : step === 2 ? email : link;
  const canAdvance = currentValue.trim().length > 0;

  return (
    <section
      id="contact"
      data-grid="false"
      style={{
        position: "relative",
        minHeight: "100vh",
        height: isMobile ? "fit-content" : undefined,
        overflow: "hidden",
        background: "linear-gradient(to bottom, transparent 0%, #0e0f0f 12%) #0e0f0f",
      }}
    >
      <WireBackground />

      {/* Scrolling blurred ticker */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          pointerEvents: "none",
          transform: "translateY(-2%)",
          zIndex: 1,
        }}
      >
        <div
          aria-hidden
          style={{
            display: "flex",
            whiteSpace: "nowrap",
            fontSize: "13.228vw",
            lineHeight: "120%",
            fontWeight: 400,
            letterSpacing: "-0.03em",
            filter: "blur(14px)",
            color: "rgba(250,250,250,0.95)",
            animation: "demo-ticker 18s linear infinite",
            willChange: "transform",
          }}
        >
          <span>Submit your demos —&nbsp;</span>
          <span>Submit your demos —&nbsp;</span>
          <span>Submit your demos —&nbsp;</span>
          <span>Submit your demos —&nbsp;</span>
        </div>
      </div>

      {/* Main wrapper */}
      <div
        style={{
          display: "flex",
          height: isMobile ? "fit-content" : "100vh",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: isMobile ? "14vh" : "18vh",
          paddingBottom: isMobile ? "14vh" : undefined,
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            marginTop: "auto",
            marginBottom: "auto",
            height: "75%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: contentVisible ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          {!submitted ? (
            <>
              {/* Subtitle */}
              <p
                style={{
                  fontSize: isMobile ? "4.103vw" : "1.2vw",
                  color: "rgba(250,250,250,0.7)",
                  textAlign: "center",
                  margin: 0,
                  marginBottom: isMobile ? "6vw" : "2.5vw",
                  lineHeight: "1.6",
                  fontFamily: "inherit",
                }}
              >
                Send us your demos
                <br />
                to join our team
              </p>

              {step < 4 ? (
                <>
                  {/* Input + circle button row */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1.8vw",
                      width: "100%",
                      justifyContent: "center",
                    }}
                  >
                    {/* Pill input */}
                    <div
                      style={{
                        position: "relative",
                        width: "52%",
                        background: "rgba(255,255,255,0.035)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: "9999px",
                        padding: isMobile ? "3.5vw 5vw" : "1.6vw 2.4vw",
                      }}
                    >
                      <div
                        style={{
                          fontSize: isMobile ? "2.564vw" : "0.6vw",
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "rgba(250,250,250,0.3)",
                          marginBottom: isMobile ? "1.5vw" : "0.4vw",
                          fontFamily: "inherit",
                        }}
                      >
                        {step === 1
                          ? "Your Name"
                          : step === 2
                          ? "Your Email"
                          : "Link to Demos"}
                      </div>
                      <input
                        ref={inputRef}
                        type={step === 2 ? "email" : "text"}
                        placeholder={
                          step === 1
                            ? "Your name"
                            : step === 2
                            ? "Your email"
                            : "Link to demos"
                        }
                        value={step === 1 ? name : step === 2 ? email : link}
                        onChange={(e) => {
                          if (step === 1) setName(e.target.value);
                          else if (step === 2) setEmail(e.target.value);
                          else setLink(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && canAdvance) handleNext();
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          outline: "none",
                          fontSize: "3.5vw",
                          color: currentValue
                            ? "#fafafa"
                            : "rgba(250,250,250,0.2)",
                          width: "100%",
                          fontFamily: "inherit",
                          fontWeight: 400,
                          letterSpacing: "-0.02em",
                          lineHeight: 1,
                          padding: 0,
                        }}
                      />
                    </div>

                    {/* Circle next button */}
                    <button
                      onClick={handleNext}
                      style={{
                        width: isMobile ? "12vw" : "4.2vw",
                        height: isMobile ? "12vw" : "4.2vw",
                        borderRadius: "50%",
                        border: `1px solid ${
                          canAdvance
                            ? "rgba(250,250,250,0.6)"
                            : "rgba(250,250,250,0.2)"
                        }`,
                        background: "none",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: canAdvance ? "pointer" : "default",
                        color: canAdvance
                          ? "inherit"
                          : "rgba(250,250,250,0.3)",
                        flexShrink: 0,
                        transition: "border-color 0.3s, color 0.3s",
                      }}
                    >
                      <svg
                        width="14"
                        height="10"
                        viewBox="0 0 20 14"
                        fill="none"
                      >
                        <path
                          d="M1 7H19M19 7L13 1M19 7L13 13"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Step dots */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: isMobile ? "2vw" : "0.5vw",
                      marginTop: isMobile ? "6vw" : "2.2vw",
                      marginBottom: isMobile ? "5vw" : "1.8vw",
                    }}
                  >
                    {([1, 2, 3] as Step[]).map((dot) => (
                      <div
                        key={dot}
                        style={{
                          height: isMobile ? "1.2vw" : "0.3vw",
                          width: dot === step ? (isMobile ? "8vw" : "2vw") : (isMobile ? "1.2vw" : "0.3vw"),
                          borderRadius: "9999px",
                          background:
                            dot === step
                              ? "rgba(250,250,250,0.85)"
                              : "rgba(250,250,250,0.25)",
                          transition: "all 0.4s ease",
                        }}
                      />
                    ))}
                  </div>

                  {/* Next step pill button */}
                  <button
                    onClick={handleNext}
                    onMouseEnter={() => setNextHover(true)}
                    onMouseLeave={() => setNextHover(false)}
                    style={{
                      background: nextHover ? "#fafafa" : "rgba(255,255,255,0.1)",
                      border: "none",
                      color: nextHover ? "#0e0f0f" : "rgba(250,250,250,0.7)",
                      fontFamily: "inherit",
                      fontSize: isMobile ? "3.5vw" : "0.85vw",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: isMobile ? "2vw" : "0.4vw",
                      borderRadius: "9999px",
                      padding: isMobile ? "2.5vw 5vw" : "0.6vw 1.4vw",
                      transition: "background 0.25s ease, color 0.25s ease",
                    } as React.CSSProperties}
                  >
                    Next step
                    <svg
                      width="12"
                      height="9"
                      viewBox="0 0 20 14"
                      fill="none"
                      style={{
                        transform: nextHover
                          ? "translateX(3px)"
                          : "translateX(0)",
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
                  </button>
                </>
              ) : (
                /* Step 4: final submit */
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      fontSize: isMobile ? "2.564vw" : "0.65vw",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(250,250,250,0.35)",
                      margin: 0,
                      marginBottom: isMobile ? "5vw" : "2vw",
                      fontFamily: "inherit",
                    }}
                  >
                    And the last step...
                  </p>
                  <div
                    style={{
                      fontSize: "3.4vw",
                      fontWeight: 400,
                      textAlign: "center",
                      lineHeight: "1.15",
                      letterSpacing: "-0.02em",
                      marginBottom: "1.5vw",
                    }}
                  >
                    Proceed to submission by
                    <br />
                    pressing button down below
                  </div>

                  {/* Hand-drawn arrow */}
                  <svg
                    width="52"
                    height="52"
                    viewBox="0 0 52 52"
                    fill="none"
                    style={{ marginBottom: "1.2vw" }}
                  >
                    <path
                      d="M18 8 C 14 18, 28 22, 26 38 M 26 38 L 20 31 M 26 38 L 33 32"
                      stroke="rgba(250,250,250,0.65)"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  {/* Submit pill button */}
                  <button
                    onClick={handleSubmit}
                    onMouseEnter={() => setSubmitHover(true)}
                    onMouseLeave={() => setSubmitHover(false)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: isMobile ? "2vw" : "0.5vw",
                      padding: isMobile ? "3vw 6vw" : "0.75vw 2vw",
                      background: "#fafafa",
                      color: "#0e0f0f",
                      border: "none",
                      borderRadius: "9999px",
                      fontFamily: "inherit",
                      fontSize: isMobile ? "3.5vw" : "0.9vw",
                      cursor: "pointer",
                      fontWeight: 400,
                    }}
                  >
                    Send your demos
                    <svg
                      width="14"
                      height="10"
                      viewBox="0 0 20 14"
                      fill="none"
                      style={{
                        transform: submitHover
                          ? "translateX(3px)"
                          : "translateX(0)",
                        transition: "transform 0.3s ease",
                      }}
                    >
                      <path
                        d="M1 7H19M19 7L13 1M19 7L13 13"
                        stroke="#0e0f0f"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Submitted — full thank you */
            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  fontSize: isMobile ? "2.564vw" : "0.65vw",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(250,250,250,0.35)",
                  margin: 0,
                  marginBottom: isMobile ? "5vw" : "1.8vw",
                  fontFamily: "inherit",
                }}
              >
                Your demo has been submitted
              </p>
              <div
                style={{
                  fontSize: isMobile ? "8vw" : "4.2vw",
                  fontWeight: 400,
                  letterSpacing: "-0.02em",
                  lineHeight: "1.1",
                  marginBottom: isMobile ? "5vw" : "1.5vw",
                }}
              >
                Thank you{" "}
                <span style={{ fontStyle: "normal" }}>🎵</span> for your
                <br />
                interest in our label!
              </div>
              <p
                style={{
                  fontSize: isMobile ? "3.5vw" : "0.85vw",
                  color: "rgba(250,250,250,0.5)",
                  margin: 0,
                  fontFamily: "inherit",
                }}
              >
                Our team will be in touch with you soon
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Your info panel — floats bottom-right from step 2 onward (desktop only) */}
      {step >= 2 && !isMobile && (
        <div
          style={{
            position: "absolute",
            bottom: "3.5vw",
            right: "3vw",
            width: "17vw",
            zIndex: 2,
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "1.1vw",
            padding: "1vw",
            display: "flex",
            flexDirection: "column",
            gap: "0.5vw",
          }}
        >
          {/* Header inside the card */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.15vw",
            }}
          >
            <span
              style={{
                fontSize: "1.1vw",
                fontWeight: 500,
                color: "#fafafa",
              }}
            >
              Your info
            </span>
            <span
              style={{
                fontSize: "0.7vw",
                color: "rgba(250,250,250,0.4)",
              }}
            >
              {infoCount}
            </span>
          </div>

          {name && (
            <InfoRow
              label="Your Name"
              value={name}
              onEdit={() => transitionTo(1)}
            />
          )}
          {email && (
            <InfoRow
              label="Your Email"
              value={email}
              onEdit={() => transitionTo(2)}
            />
          )}
          {link && (
            <InfoRow
              label="Link to Demos"
              value={link}
              onEdit={() => transitionTo(3)}
              truncate
            />
          )}
        </div>
      )}

      <style>{`
        @keyframes demo-ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

function InfoRow({
  label,
  value,
  onEdit,
  truncate,
}: {
  label: string;
  value: string;
  onEdit: () => void;
  truncate?: boolean;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "0.75vw",
        padding: "0.7vw 0.8vw",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "0.5vw",
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: "0.5vw",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(250,250,250,0.28)",
              marginBottom: "0.2vw",
              fontFamily: "inherit",
            }}
          >
            {label}
          </div>
          <span
            style={{
              fontSize: "0.85vw",
              color: "#fafafa",
              display: "block",
              overflow: truncate ? "hidden" : undefined,
              textOverflow: truncate ? "ellipsis" : undefined,
              whiteSpace: truncate ? "nowrap" : undefined,
            }}
          >
            {value}
          </span>
        </div>
        <button
          onClick={onEdit}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            background: "none",
            border: "none",
            color: hover
              ? "rgba(250,250,250,0.8)"
              : "rgba(250,250,250,0.4)",
            fontFamily: "inherit",
            fontSize: "0.6vw",
            cursor: "pointer",
            padding: 0,
            flexShrink: 0,
            textDecoration: "underline",
            transition: "color 0.2s",
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
}
