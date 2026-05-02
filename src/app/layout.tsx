import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import BackgroundGrid from "@/components/BackgroundGrid";
import RevealOnScroll from "@/components/RevealOnScroll";

export const metadata: Metadata = {
  title: "Kurate Music",
  description:
    "An independent record label empowering artists and innovating in sound.",
  icons: { icon: "/Kurate_Favicon.png" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Preloader />
        <Cursor />
        <BackgroundGrid />
        <Header />
        <RevealOnScroll />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
