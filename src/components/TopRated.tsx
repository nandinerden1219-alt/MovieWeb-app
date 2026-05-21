"use client";
import MovieCard from "@/components/MovieCard";
import { useState, useEffect } from "react";
import axios from "axios";
export default function TopRated() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDAyYjY2NzQ0ZTY2ZTlmYTM2M2E4NzRkMTYzM2NlMiIsIm5iZiI6MTc3OTI0MzcyMi42NzIsInN1YiI6IjZhMGQxYWNhNWFiYWM5Zjg4YTBjMDhlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MwYe5N4PQeHkl8nM5Tz-kyEFxpCvRN5QA_zFSvjQZb4",
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
      <div>Top Rated</div>
      <div className="flex items-center gap-10 flex-wrap p-10">
        {movies.length > 0 &&
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              rating={movie.vote_average}
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            />
          ))}
      </div>
    </>
  );
}
