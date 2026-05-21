import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MovieCarousel from "./MovieCarousel";
let Homescreen = () => {
  const movies = [
    { imageUrl: "/Feature.png", title: "Wicked", rating: 6.9 },
    { imageUrl: "/dune.jpeg", title: "Gladiator II", rating: 7.5 },
  ];
  return (
    <Carousel className="w-full ">
      <CarouselContent>
        {Array.from({ length: 8 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <div>
                <MovieCarousel />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};
export default Homescreen;
