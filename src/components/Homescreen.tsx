"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import MovieCarousel from "./MovieCarousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
type Movie = {
  id: number;
  title: string;
  backdrop_path: string;
  vote_average: number;
  overview: string;
};

export default function Homescreen() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
            },
          },
        );
        setMovies(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };

    getMovies();
  }, []);

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {movies.map((movie) => (
          <CarouselItem key={movie.id}>
            <MovieCarousel movie={movie} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
