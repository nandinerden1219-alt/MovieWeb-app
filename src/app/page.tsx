import Homescreen from "@/components/Homescreen";
import MovieCard from "@/components/MovieCard";

export default function Home() {
  return (
    <div className="flex items-center flex-col">
      <MovieCard />
      <Homescreen />
    </div>
  );
}
