import { Film } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Input } from "./ui/input";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToggleTheme } from "@/components/lightswind/toggle-theme";
import { useRouter } from "next/navigation";
type genreType = {
  id: number;
  name: string;
};
const Header = () => {
  const [genres, setGenres] = useState<genreType[]>([]);
  const router = useRouter();
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
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 ml-5 border rounded-md px-3 py-1.5">
            <ChevronDown className="h-4 w-4 " />
            <DropdownMenuLabel className="text-black">Genre</DropdownMenuLabel>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="max-h-60 overflow-y-auto">
            {genres.length > 0 &&
              genres.map((genre) => (
                <DropdownMenuItem
                  key={genre.id}
                  onClick={() => router.push(`/genre`)}
                >
                  {genre.name}
                </DropdownMenuItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <Input
          type="search"
          placeholder="Search"
          className="w-[380px] h-9 border rounded-md"
        />
      </div>

      <ToggleTheme />
    </div>
  );
};
export default Header;
