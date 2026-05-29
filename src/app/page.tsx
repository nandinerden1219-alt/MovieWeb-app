"use client";
import Homescreen from "@/components/Homescreen";
import Upcoming from "@/components/Upcoming";
import TopRated from "@/components/TopRated";
import NowPlaying from "@/components/Now Playing";
export default function Home() {
  return (
    <div className="flex items-center flex-col gap-10">
      <Homescreen />
      <NowPlaying />
      <Upcoming />
      <TopRated />
    </div>
  );
}
