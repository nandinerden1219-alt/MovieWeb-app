import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
let MovieCard = () => {
  return (
    <Card className="w-[230px] h-[439px] pt-0 ">
      <CardHeader className="p-0 h-[340px]">
        <Image
          src="/movieimage.png"
          width={230}
          height={100}
          alt="movie image"
        />
      </CardHeader>
      <CardContent className="flex flex-col  pb-2">
        <CardAction className="flex gap-1 items-center">
          <Star className="h-4 w-3 fill-[#f0c20b] stroke-[#f0c20b]" />
          <span className="text-sm font-bold flex items-center">
            6.9<p className="text-gray-500 text-xs font-medium">/10</p>
          </span>
        </CardAction>
        <CardTitle className="text-lg">
          <p>Little Miss Sunshine</p>
        </CardTitle>
      </CardContent>
    </Card>
  );
};
export default MovieCard;
