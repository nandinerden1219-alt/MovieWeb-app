"use client";
import MovieCard from "@/components/MovieCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Skeleton } from "./ui/skeleton";
type Movie = {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
};
export default function NowPlaying() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        },
      )
      .then((response) => {
        console.log(response);
        setMovies(response.data.results);
        setLoading(false);
      });
  }, []);
  const router = useRouter();
  const pushToNowPlaying = () => {
    router.push("/now_playing");
  };
  return (
    <>
      <div className="pl-40 pr-40 pt-20 flex flex-col justify-center gap-10 ">
        <div className="text-[24px] flex justify-between items-between font-bold">
          <p>Now Playing</p>{" "}
          <Button variant="outline" onClick={pushToNowPlaying}>
            See more
          </Button>
        </div>
        <div className="flex items-center gap-10 flex-wrap justify-between">
          {loading
            ? Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="w-[230px] h-[439px] flex flex-col gap-2"
                >
                  <Skeleton className="w-full h-[340px] rounded-lg" />
                </div>
              ))
            : movies
                .slice(0, 14)
                .map((movie) => (
                  <MovieCard
                    key={movie.id}
                    title={movie.title}
                    rating={movie.vote_average}
                    id={movie.id}
                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  />
                ))}
        </div>
      </div>
    </>
  );
}
