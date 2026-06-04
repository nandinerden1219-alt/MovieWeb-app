"use client";
import MovieCard from "@/components/MovieCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchValues, setSearchValues] = useState<MovieDetailType[]>([]);
  const [genres, setGenres] = useState<genreType[]>([]);

  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get("query");
  const genreId = searchParams.get("genreId");

  useEffect(() => {
    // Genres names
    axios
      .get(`https://api.themoviedb.org/3/genre/movie/list`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
        },
      })
      .then((response) => setGenres(response.data.genres));

    // Movies by search query
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
        const results: MovieDetailType[] = response.data.results;

        if (genreId) {
          setSearchValues(
            results.filter((movie) =>
              movie.genre_ids.includes(Number(genreId)),
            ),
          );
        } else {
          setSearchValues(results);
        }

        setTotalPages(response.data.total_pages);
      });
  }, [currentPage, search, genreId]);

  const handleGenreClick = (id: number) => {
    router.push(`/search?query=${search}&genreId=${id}`);
  };

  const handleClearFilter = () => {
    router.push(`/search?query=${search}`);
  };

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
              searchValues.map((searchValue) => (
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
            <div
              className={`border rounded-lg px-2 flex items-center mt-2 cursor-pointer hover:bg-accent ${
                !genreId ? "bg-accent font-bold" : ""
              }`}
              onClick={handleClearFilter}
            >
              All <ChevronRight className="h-4 w-4" />
            </div>

            {genres.map((genre) => (
              <div
                key={genre.id}
                className={`border rounded-lg px-2 flex items-center mt-2 cursor-pointer hover:bg-accent ${
                  Number(genreId) === genre.id ? "bg-accent font-bold" : ""
                }`}
                onClick={() => handleGenreClick(genre.id)}
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
