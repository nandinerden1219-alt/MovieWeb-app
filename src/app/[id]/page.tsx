"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Star } from "lucide-react";
import Image from "next/image";
import ReactPlayer from "react-player";
import MovieCard from "@/components/MovieCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
type genreType = {
  id: number;
  name: string;
};
type crewType = {
  job: string;
  name: string;
};
type MovieDetailType = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: genreType[];
  homepage: string;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: unknown[];
  production_countries: unknown[];
  release_date: string;
  revenue: number;
  runtime: number;
  softcore: boolean;
  spoken_languages: unknown[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  cast?: { name: string }[];
  id: number;
};

export default function Home() {
  const [movie, setMovie] = useState<MovieDetailType>();
  const [video, setVideo] = useState("");
  const [cast, setCast] = useState<{ name: string }[]>();
  const [director, setDirector] = useState<crewType>();
  const [writers, setWriters] = useState<crewType[]>();
  const [similarMovies, setSimilarMovies] = useState<MovieDetailType[]>([]);
  const [isTrailerShowed, setIsTrailerShowed] = useState(false);
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${params.id}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDAyYjY2NzQ0ZTY2ZTlmYTM2M2E4NzRkMTYzM2NlMiIsIm5iZiI6MTc3OTI0MzcyMi42NzIsInN1YiI6IjZhMGQxYWNhNWFiYWM5Zjg4YTBjMDhlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MwYe5N4PQeHkl8nM5Tz-kyEFxpCvRN5QA_zFSvjQZb4",
        },
      })
      .then((response) => {
        console.log(response);
        setMovie(response.data);
      });
    axios
      .get(`https://api.themoviedb.org/3/movie/${params.id}/videos?`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDAyYjY2NzQ0ZTY2ZTlmYTM2M2E4NzRkMTYzM2NlMiIsIm5iZiI6MTc3OTI0MzcyMi42NzIsInN1YiI6IjZhMGQxYWNhNWFiYWM5Zjg4YTBjMDhlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MwYe5N4PQeHkl8nM5Tz-kyEFxpCvRN5QA_zFSvjQZb4",
        },
      })
      .then((response) => {
        console.log(response, "video response");
        setVideo(response.data.results[0]?.key);
      });
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.id}/credits?language=en-US`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDAyYjY2NzQ0ZTY2ZTlmYTM2M2E4NzRkMTYzM2NlMiIsIm5iZiI6MTc3OTI0MzcyMi42NzIsInN1YiI6IjZhMGQxYWNhNWFiYWM5Zjg4YTBjMDhlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MwYe5N4PQeHkl8nM5Tz-kyEFxpCvRN5QA_zFSvjQZb4",
          },
        },
      )
      .then((response) => {
        console.log(response, "cast response");
        console.log(response.data.crew, "crew response");
        setCast(response.data.cast);
        setDirector(
          response.data.crew.filter(
            (member: crewType) => member.job === "Director",
          )[0],
        );
        setWriters(
          response.data.crew.filter(
            (member: crewType) => member.job === "Writer",
          ),
        );
      });

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.id}/similar?language=en-US&page=1`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDAyYjY2NzQ0ZTY2ZTlmYTM2M2E4NzRkMTYzM2NlMiIsIm5iZiI6MTc3OTI0MzcyMi42NzIsInN1YiI6IjZhMGQxYWNhNWFiYWM5Zjg4YTBjMDhlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MwYe5N4PQeHkl8nM5Tz-kyEFxpCvRN5QA_zFSvjQZb4",
          },
        },
      )
      .then((response) => {
        console.log(response, "similar movies response");
        setSimilarMovies(response.data.results);
      });
  }, []);
  const handleOnClick = () => setIsTrailerShowed(!isTrailerShowed);
  const params = useParams();
  console.log(params, "params");
  console.log(movie, "movie");
  return (
    <div className="pl-45 pr-45 pt-20">
      <div className="flex justify-between">
        <div>
          <h1 className="text-4xl font-bold">{movie?.title}</h1>
          <div className="flex items-center gap-2">
            <p>{movie?.release_date}</p>
            <p> · PG · </p>
            <p>{movie?.runtime} min</p>
          </div>
        </div>
        <div>
          <p>Rating</p>
          <div className="flex gap-1 items-center">
            <Star className="h-4 w-3 fill-[#f0c20b] stroke-[#f0c20b]" />
            <span className="text-sm font-bold flex items-center">
              {Math.round(movie?.vote_average || 0)}
              <p className="text-gray-500 text-xs font-medium">/10</p>
            </span>
          </div>
        </div>
      </div>
      <div className="flex gap-10 mt-6">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
          width={500}
          height={750}
          className="border rounded-sm"
          alt="movie poster"
        />

        <Image
          src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`}
          width={1200}
          height={428}
          className="border rounded-sm"
          alt="movie backdrop"
          onClick={handleOnClick}
        >
          {" "}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">watch trailer</Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false}>
              <DialogHeader>
                <DialogDescription>
                  {isTrailerShowed ? (
                    <ReactPlayer
                      src={`https://www.youtube.com/watch?v=${video}`}
                      controls={true}
                      width={1200}
                      height={428}
                      volume={1}
                    />
                  ) : (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie?.backdrop_path}`}
                      width={1200}
                      height={428}
                      className="border rounded-sm"
                      alt="movie backdrop"
                      onClick={handleOnClick}
                    />
                  )}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </Image>
      </div>
      <div className="flex flex-wrap gap-2 mt-6">
        {movie?.genres?.map((genre) => {
          return (
            <p
              key={genre.id}
              className="border border-gray-400 text-gray-800 py-1 px-3 rounded-full text-sm font-medium"
            >
              {genre.name}
            </p>
          );
        })}
      </div>
      <p className="text-lg mt-6">{movie?.overview}</p>
      <div className="flex gap-10 mt-6 border border-t-0 pb-3 border-r-0 border-l-0 border-b-gray-300">
        <h2 className="font-bold">Director</h2>
        <p>{director?.name}</p>
      </div>
      <div className="flex gap-10 mt-6 border border-t-0 pb-3 border-r-0 border-l-0 border-b-gray-300">
        <h2 className="font-bold">Writers</h2>
        <p>{writers?.map((writer) => writer.name).join(", ")}</p>
      </div>
      <div className="flex gap-10 mt-6 border border-t-0 pb-3 border-r-0 border-l-0 border-b-gray-300">
        <h2 className="font-bold w-14">Cast</h2>
        <p>
          {cast
            ?.slice(0, 3)
            .map((actor) => actor.name)
            .join(", ")}
        </p>
      </div>
      <h1 className="font-bold mt-5">More Like This</h1>
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
}
