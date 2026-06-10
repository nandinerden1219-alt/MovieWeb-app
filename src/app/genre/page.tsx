"use client";
import MovieCard from "@/components/MovieCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import type { MovieDetailType } from "../[id]/page";
import Header from "@/components/Header";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Footer from "@/components/Footer";

type genreType = {
  id: number;
  name: string;
};

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genreValues, setGenreValues] = useState<MovieDetailType[]>([]);
  const [genres, setGenres] = useState<genreType[]>([]);

  const searchParams = useSearchParams();
  const genreParam = searchParams.get("genreId"); // "16,35" гэх мэт
  const selectedGenres = genreParam ? genreParam.split(",").map(Number) : [];

  // Genres fetch
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/genre/movie/list`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
        },
      })
      .then((response) => setGenres(response.data.genres));
  }, []);

  // Movies fetch
  useEffect(() => {
    if (!genreParam) return;
    axios
      .get(
        `https://api.themoviedb.org/3/discover/movie?language=en&with_genres=${genreParam}&page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        },
      )
      .then((response) => {
        setGenreValues(response.data.results);
        setTotalPages(response.data.total_pages);
      });
  }, [genreParam, currentPage]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <>
      <Header />
      <h2 className="font-bold text-[32px] mx-25 mt-10">Search Filter</h2>
      <div className="mx-25 mt-8 flex gap-20">
        <div className="w-[30%]">
          <h2 className="text-[24px] font-bold">Genres</h2>
          <p>See lists of movies by genre</p>
          <div className="flex flex-wrap gap-2 mt-3">
            <Link
              href="/genre"
              className={`border rounded-lg px-2 flex items-center mt-2 hover:bg-accent ${
                selectedGenres.length === 0 ? "bg-accent font-bold" : ""
              }`}
            >
              All <ChevronRight className="h-4 w-4" />
            </Link>

            {genres.map((genre) => {
              const isSelected = selectedGenres.includes(genre.id);
              const updated = isSelected
                ? selectedGenres.filter((g) => g !== genre.id)
                : [...selectedGenres, genre.id];
              const href =
                updated.length === 0
                  ? "/genre"
                  : `/genre?genreId=${updated.join(",")}`;

              return (
                <Link
                  key={genre.id}
                  href={href}
                  className={`border rounded-lg px-2 flex items-center mt-2 hover:bg-accent ${
                    isSelected ? "bg-accent font-bold" : ""
                  }`}
                >
                  {genre.name}
                  {isSelected ? " ✕" : <ChevronRight className="h-4 w-4" />}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="w-[70%] gap-8 flex flex-col">
          <h3 className="font-bold text-[20px]">
            {genreParam ? (
              <>
                {genreValues.length} titles for{" "}
                {`"${selectedGenres
                  .map((id) => genres.find((g) => g.id === id)?.name)
                  .join(", ")}"`}
              </>
            ) : (
              "Select a genre"
            )}
          </h3>

          <div className="flex gap-10 flex-wrap">
            {genreValues.map((genreValue) => (
              <MovieCard
                key={genreValue.id}
                id={genreValue.id}
                title={genreValue.title}
                image={`https://image.tmdb.org/t/p/w500${genreValue.poster_path}`}
                rating={genreValue.vote_average}
              />
            ))}
          </div>

          {genreParam && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let page;
                  if (totalPages <= 5) page = i + 1;
                  else if (currentPage <= 3) page = i + 1;
                  else if (currentPage >= totalPages - 2)
                    page = totalPages - 4 + i;
                  else page = currentPage - 2 + i;

                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        isActive={page === currentPage}
                        onClick={(e) => {
                          e.preventDefault();
                          setCurrentPage(page);
                        }}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages)
                        setCurrentPage(currentPage + 1);
                    }}
                    className={
                      currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
