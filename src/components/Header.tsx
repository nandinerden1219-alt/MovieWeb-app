"use client";
import { Film, Sun, Moon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./ui/input";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
type genreType = {
  id: number;
  name: string;
};
const Header = () => {
  const [genres, setGenres] = useState<genreType[]>([]);
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/genre/movie/list`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
        },
      })
      .then((response) => setGenres(response.data.genres));
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setOpen(false);
      return;
    }
    axios
      .get(`https://api.themoviedb.org/3/search/movie?query=${query}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_TOKEN}`,
        },
      })
      .then((res) => {
        setResults(res.data.results.slice(0, 5));
        setOpen(true);
      });
  }, [query]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleOnClick = () => {
    if (query.trim() !== "") {
      router.push(`/search?query=${query}`);
      setOpen(false);
    }
  };

  const handleGenre = () => {
    router.push(`/genre`);
  };

  return (
    <div className="w-full flex items-center justify-between mt-5.25 px px-5">
      <Link href="/">
        <div className="flex items-center gap-2">
          <Film size={50} className="text-[#303F9F]" />
          <h1 className="text-3xl font-bold text-[#303F9F]">Movie Z</h1>
        </div>
      </Link>

      <div className="flex items-center gap-2">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className="flex items-center gap-1 ml-5 border rounded-md px-3 py-1.5"
                onClick={handleGenre}
              >
                Genre
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                {genres.map((genre) => (
                  <NavigationMenuLink
                    key={genre.id}
                    onClick={() => router.push(`/genre?genreId=${genre.id}`)}
                  >
                    {genre.name}
                  </NavigationMenuLink>
                ))}
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Input
              type="search"
              className="w-[380px] h-9 border rounded-md"
              placeholder="Search..."
              value={query}
              onChange={handleSearch}
            />
          </PopoverTrigger>
          <PopoverContent
            className="p-0 w-[400px]"
            onOpenAutoFocus={(e) => e.preventDefault()}
            onInteractOutside={() => setOpen(false)}
          >
            {results.map((movie) => (
              <div
                key={movie.id}
                className="flex items-center gap-3 p-3 hover:bg-accent cursor-pointer"
                onClick={() => {
                  router.push(`/${movie.id}`);
                  setOpen(false);
                  setQuery("");
                }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                  className="w-10 h-14 object-cover rounded"
                />
                <div>
                  <p className="font-bold">{movie.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {movie.release_date?.slice(0, 4)}
                  </p>
                </div>
              </div>
            ))}
            {query && (
              <div
                className="p-3 text-sm text-center text-muted-foreground hover:bg-accent cursor-pointer border-t"
                onClick={() => {
                  router.push(`/search?query=${query}`);
                  setOpen(false);
                  setQuery("");
                }}
              >
                See all results for "{query}"
              </div>
            )}
          </PopoverContent>
        </Popover>
        <Button
          onClick={handleOnClick}
          variant={"outline"}
          className="h-9 px-4 py-1.5"
        >
          Search
        </Button>
      </div>
      <Button variant="outline" size="icon" onClick={toggleTheme}>
        <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      </Button>
    </div>
  );
};
export default Header;
