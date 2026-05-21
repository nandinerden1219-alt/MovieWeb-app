"use client";
import Homescreen from "@/components/Homescreen";
import MovieCard from "@/components/MovieCard";
import axios from "axios";
import Upcoming from "@/components/Upcoming";
import { useState, useEffect } from "react";
import TopRated from "@/components/TopRated";

export default function Home() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    axios
      .get("https://api.themoviedb.org/3/movie/popular?page=1", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDAyYjY2NzQ0ZTY2ZTlmYTM2M2E4NzRkMTYzM2NlMiIsIm5iZiI6MTc3OTI0MzcyMi42NzIsInN1YiI6IjZhMGQxYWNhNWFiYWM5Zjg4YTBjMDhlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MwYe5N4PQeHkl8nM5Tz-kyEFxpCvRN5QA_zFSvjQZb4",
        },
      })
      .then((response) => {
        console.log(response);
        setMovies(response.data.results);
      });
  }, []);

  return (
    <div className="flex items-center gap-10 flex-wrap p-10">
      <Upcoming />
      <TopRated />
      <Homescreen />
    </div>
  );
}
