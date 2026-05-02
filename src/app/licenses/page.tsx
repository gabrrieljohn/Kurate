import Licenses from "@/components/sections/Licenses";
import Footer from "@/components/Footer";

export default function LicensesPage() {
  return (
    <>
      <section
        id="hero"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <div className="brand-text" style={{ opacity: 0.5 }}>
            <span className="reveal">(Sync)</span>
          </div>
          <h1 className="reveal" style={{ marginTop: "1vw" }}>
            Licensing.
          </h1>
        </div>
      </section>
      <Licenses />
      <Footer />
    </>
  );
}
