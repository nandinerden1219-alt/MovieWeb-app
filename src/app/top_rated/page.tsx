"use client";
import MovieCard from "@/components/MovieCard";
import { useState, useEffect } from "react";
import axios from "axios";
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
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDAyYjY2NzQ0ZTY2ZTlmYTM2M2E4NzRkMTYzM2NlMiIsIm5iZiI6MTc3OTI0MzcyMi42NzIsInN1YiI6IjZhMGQxYWNhNWFiYWM5Zjg4YTBjMDhlZiIsInNjb3BlcyI6WyJhcGxfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MwYe5N4PQeHkl8nM5Tz-kyEFxpCvRN5QA_zFSvjQZb4",
          },
        },
      )
      .then((response) => {
        console.log(response);
        setMovies(response.data.results);
      });
  }, []);
  return (
    <>
      <div className="pl-30 pr-30 pt-20 flex flex-col justify-center gap-10 ">
        <div className="text-[24px] flex justify-between items-between font-bold">
          <p>Top Rated</p>
        </div>
        <div className="flex items-center gap-10 flex-wrap justify-between">
          {movies.length > 0 &&
            movies
              .slice(0, 20)
              .map((movie) => (
                <MovieCard
                  key={movie.id}
                  title={movie.title}
                  rating={movie.vote_average}
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                />
              ))}
        </div>
      </div>
    </>
  );
}
