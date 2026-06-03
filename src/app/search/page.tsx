"use client";
import MovieCard from "@/components/MovieCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import type { MovieDetailType } from "../[id]/page";
import Header from "@/components/Header";
import { ChevronRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
type genreType = {
  id: number;
  name: string;
};
const Home = () => {
  const [allSearchValues, setAllSearchValues] = useState<MovieDetailType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const searchParams = useSearchParams();
  const search = searchParams.get("query");
  const [searchValues, setSearchValues] = useState<MovieDetailType[]>([]);
  const [genres, setGenres] = useState<genreType[]>([]);
  const genreId = searchParams.get("genre");
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/genre/movie/list`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
        },
      })
      .then((response) => {
        console.log(response, "genres response");
        setGenres(response.data.genres);
      });
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${search}&language=en-US&page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        },
      )
      .then((response) => {
        console.log(response, "search response");
        setSearchValues(response.data.results);
        setTotalPages(response.data.total_pages);
      });
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?query=${search}&${genreId}&language=en-US&page=${currentPage}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
          },
        },
      )
      .then((response) => {
        console.log(response, "search response");
        setAllSearchValues(response.data.results);
      });
  }, [currentPage, search]);

  return (
    <>
      <Header />
      <h2 className="font-bold text-[32px] mx-25 mt-10">Search Result</h2>
      <div className="mx-25 mt-8 flex">
        <div className="w-[70%] gap-8 flex flex-col">
          <h3 className="font-bold text-[20px]">
            {searchValues.length} results for {`"${search}"`}
          </h3>
          <div className="flex gap-10 flex-wrap">
            {searchValues.length > 0 &&
              searchValues
                .slice(0, 4)
                .map((searchValue) => (
                  <MovieCard
                    key={searchValue.id}
                    id={searchValue.id}
                    title={searchValue.title}
                    image={`https://image.tmdb.org/t/p/w500${searchValue.poster_path}`}
                    rating={searchValue.vote_average}
                  />
                ))}
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
        </div>
        <div className="w-[30%]">
          <h2 className="text-[24px] font-bold">Search by genre</h2>
          <p>See lists of movies by genre</p>
          <div className="flex flex-wrap gap-3 mt-3">
            {genres.length > 0 &&
              genres.map((genre) => (
                <div
                  className="border rounded-lg px-2 flex items-center mt-2"
                  key={genre.id}
                  onClick={handleFilterGenre}
                >
                  {genre.name} <ChevronRight className="h-4 w-4" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
