"use client";
import MovieCard from "@/components/MovieCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
type Movie = {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
};
export default function TopRated() {
  const [movies, setMovies] = useState<Movie[]>([]);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        },
      )
      .then((response) => {
        console.log(response);
        setMovies(response.data.results);
      });
  }, []);
  const router = useRouter();
  const pushToTopRated = () => {
    router.push("/top_rated");
  };
  return (
    <>
      <div className="pl-30 pr-30 pt-20 flex flex-col justify-center gap-10 ">
        <div className="text-[24px] flex justify-between items-between font-bold">
          <p>Top Rated</p> <Button onClick={pushToTopRated}>See more</Button>
        </div>
        <div className="flex items-center gap-10 flex-wrap justify-between">
          {movies.length > 0 &&
            movies
              .slice(0, 10)
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
