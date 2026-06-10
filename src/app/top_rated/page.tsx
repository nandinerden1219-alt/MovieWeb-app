"use client";
import MovieCard from "@/components/MovieCard";
import { useState, useEffect } from "react";
import axios from "axios";
import type MovieProps from "@/components/MovieCard";
import Footer from "@/components/Footer";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Header from "@/components/Header";
type Movie = {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
};
export default function TopRated() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        },
      )
      .then((response) => {
        console.log(response);
        setMovies(response.data.results);

        setTotalPages(response.data.total_pages);
      });
  }, [currentPage]);
  return (
    <>
      <Header />
      <div className="pl-50 pr-50 pt-20 flex flex-col justify-center gap-10">
        <div className="text-[24px] flex justify-between items-between font-bold">
          <p>Top Rated</p>
        </div>
        <div className="grid grid-cols-6 gap-10 ">
          {movies.length > 0 &&
            movies
              .slice(0, 20)
              .map((movie) => (
                <MovieCard
                  key={movie.id}
                  title={movie.title}
                  rating={movie.vote_average}
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  id={movie.id}
                />
              ))}
        </div>
      </div>
      <Pagination>
        <PaginationContent>
          {/* Previous */}
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

          {/* Page numbers */}
          {[...Array(3)].map((_, i) => {
            const page = currentPage <= 2 ? i + 1 : currentPage + i - 1;
            if (page > totalPages) return null;
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

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) setCurrentPage(currentPage + 1);
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
      <Footer />
    </>
  );
}
