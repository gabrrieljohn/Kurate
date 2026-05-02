import Hero from "@/components/sections/Hero";
import ThreeDCards from "@/components/ThreeDCards";
import PreAbout from "@/components/sections/PreAbout";
import About from "@/components/sections/About";
import Disc from "@/components/sections/Disc";
import Artists from "@/components/sections/Artists";
import Records from "@/components/sections/Records";
import SendDemos from "@/components/sections/SendDemos";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <ThreeDCards />
      <PreAbout />
      <About />
      <Disc />
      <Artists />
      <Records />
      <SendDemos />
      <Footer />
    </>
  );
}
