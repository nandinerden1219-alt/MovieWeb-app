"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Star } from "lucide-react";
import Image from "next/image";
import ReactPlayer from "react-player";
import MovieCard from "@/components/MovieCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MovieDetailType } from "../[id]/page";

const Home = () => {
  const [similarMovies, setSimilarMovies] = useState<MovieDetailType[]>([]);
  const [isTrailerShowed, setIsTrailerShowed] = useState(false);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.id}/similar?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        },
      )
      .then((response) => {
        console.log(response, "similar movies response");
        setSimilarMovies(response.data.results);
      });
  }, []);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {" "}
      <div className="flex  justify-between">
        {similarMovies.length > 0 &&
          similarMovies
            .slice(0, 5)
            .map((similarMovie) => (
              <MovieCard
                key={similarMovie.id}
                id={similarMovie.id}
                title={similarMovie.title}
                image={`https://image.tmdb.org/t/p/w500${similarMovie.poster_path}`}
                rating={similarMovie.vote_average}
              />
            ))}
      </div>
    </div>
  );
};
export default Home;
