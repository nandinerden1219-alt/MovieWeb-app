"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Star } from "lucide-react";
import Image from "next/image";
import ReactPlayer from "react-player";
type genreType = {
  id: number;
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
  vote_average: undefined;
  vote_count: number;
  cast?: { name: string }[];
};

export default function Home() {
  const [movie, setMovie] = useState<MovieDetailType>();
  const [video, setVideo] = useState("");
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
  }, []);
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
        />
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
        <p>Director Name</p>
      </div>
      <div className="flex gap-10 mt-6 border border-t-0 pb-3 border-r-0 border-l-0 border-b-gray-300">
        <h2 className="font-bold">Writers</h2>
        <p>Writer Name</p>
      </div>
      <div className="flex gap-10 mt-6 border border-t-0 pb-3 border-r-0 border-l-0 border-b-gray-300">
        <h2 className="font-bold w-14">Cast</h2>
        <p>{movie?.cast?.map((actor) => actor.name).join(", ")}</p>
      </div>
      <h1></h1>
      {video && (
        <ReactPlayer
          src={`https://www.youtube.com/watch?v=${video}`}
          controls={true}
        />
      )}
    </div>
  );
}
