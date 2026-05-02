import SelectedArtists from "@/components/sections/SelectedArtists";
import AllArtists from "@/components/sections/AllArtists";
import Footer from "@/components/Footer";

export default function ArtistsPage() {
  return (
    <>
      <style>{`
        @keyframes artists-fade-in { from { opacity: 0 } to { opacity: 1 } }
        .artists-root { animation: artists-fade-in 0.45s ease forwards; }
      `}</style>
      <div className="artists-root">
        <SelectedArtists />
        <AllArtists />
        <Footer />
      </div>
    </>
  );
}
