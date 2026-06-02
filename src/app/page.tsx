"use client";
import Homescreen from "@/components/Homescreen";
import Upcoming from "@/components/Upcoming";
import TopRated from "@/components/TopRated";
import NowPlaying from "@/components/Now Playing";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="flex items-center flex-col gap-10">
      <Header />
      <Homescreen />
      <NowPlaying />
      <Upcoming />
      <TopRated />
      <Footer />
    </div>
  );
}
