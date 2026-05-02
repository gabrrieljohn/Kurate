"use client";

export default function Licenses() {
  return (
    <section id="licenses" data-start="top 50%">
      <div
        className="container"
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "3vh",
        }}
      >
        <div className="brand-text reveal" style={{ opacity: 0.55 }}>
          (Sync Licensing)
        </div>
        <h2 className="reveal" style={{ maxWidth: "65vw" }}>
          Sync Licensing for film, advertising and beyond.
        </h2>
        <p
          className="brand-text reveal"
          style={{ maxWidth: "40vw", opacity: 0.7 }}
        >
          Placeholder description about licensing the catalogue for use in film,
          TV, games and brand work — fully cleared, instant access.
        </p>
        <button
          className="reveal"
          style={{
            alignSelf: "start",
            border: "1px solid rgba(250,250,250,0.7)",
            background: "transparent",
            color: "inherit",
            borderRadius: 9999,
            padding: "0.8vw 2vw",
            fontFamily: "Plus Jakarta Sans, sans-serif",
          }}
        >
          Browse catalogue
        </button>
      </div>
    </section>
  );
}
