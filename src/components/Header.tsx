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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
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
  const [value, setValue] = useState("");
  const { setTheme } = useTheme();
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setValue(value);
  };
  const handleOnClick = () => {
    if (value.trim() !== "") {
      router.push(`/search?query=${value}`);
    }
  };
  const handleGenre = () => {
    router.push(`/genre`);
  };
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
  }, []);

  return (
    <div className="w-full flex items-center justify-between mt-5.25 px px-5">
      <div className="flex items-center gap-2">
        <Film size={50} className="text-[#303F9F]" />
        <h1 className="text-3xl font-bold text-[#303F9F]">Movie Z</h1>
      </div>
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
                    onClick={() => router.push(`/genre?query=${genre.id}`)}
                  >
                    {genre.name}
                  </NavigationMenuLink>
                ))}
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Input
          type="search"
          placeholder="Search"
          className="w-[380px] h-9 border rounded-md"
          onChange={handleSearch}
        />
        <Button onClick={handleOnClick} className="h-9 px-4 py-1.5">
          Search
        </Button>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default Header;
