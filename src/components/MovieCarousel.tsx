import {
  Card,
  CardContent,
  CardAction,
  CardHeader,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import { CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { useRouter } from "next/navigation";
type MovieProps = {
  movie: {
    title: string;
    backdrop_path: string;
    vote_average: number;
    overview: string;
    id: number;
  };
};

export default function MovieCarousel({ movie }: MovieProps) {
  const router = useRouter();
  const pushToMovie = () => {
    router.push(`/${movie.id}`);
  };
  return (
    <Card
      className="w-full h-[800px] rounded-none border-none bg-cover bg-center relative overflow-hidden flex"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <CardContent className=" flex flex-col justify-center items-between h-full p-20 text-white max-w-full">
        <CardHeader className="bg-black flex flex-col bg-opacity-50 p-10 rounded-lg max-w-[700px]">
          <p className="text-4">Now Playing:</p>
          <h1 className="text-[36px] font-bold mb-4">{movie.title}</h1>

          <CardAction className="flex gap-2">
            <Star className="h-5.4 w-6 fill-[#f0c20b] stroke-[#f0c20b]" />
            <span className="text-xl font-bold flex gap-0.5  items-center">
              {Math.round(movie.vote_average)}
              <p className="text-gray-500 text-xl font-medium">/10</p>
            </span>
          </CardAction>

          <p className="text-lg text-gray-200 line-clamp-3 mt-4 w-[500px]">
            {movie.overview}
          </p>

          <button
            onClick={pushToMovie}
            className="mt-6 bg-white text-black px-6 py-3 rounded-md w-fit font-semibold hover:bg-gray-200 transition"
          >
            Watch Now
          </button>
        </CardHeader>
        <div className="flex justify-between">
          <CarouselPrevious className="relative " />
          <CarouselNext className="relative " />
        </div>
      </CardContent>
    </Card>
  );
}
