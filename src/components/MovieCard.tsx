"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export type MovieProps = {
  title: string;
  image: string;
  rating: number;
  id: number;
};

let MovieCard = ({ image, rating, title, id }: MovieProps) => {
  return (
    <Link href={`/${id}`}>
      <Card className="w-[230px] h-[439px] pt-0 ">
        <CardHeader className="p-0 h-[340px]">
          <Image
            src={image}
            width={500}
            height={750}
            className="w-full h-auto rounded-lg rounded-b-none"
            alt="movie image"
          />
        </CardHeader>
        <CardContent className="flex flex-col  pb-2">
          <CardAction className="flex gap-1 items-center">
            <Star className="h-4 w-3 fill-[#f0c20b] stroke-[#f0c20b]" />
            <span className="text-sm font-bold flex items-center">
              {Math.round(rating)}
              <p className="text-gray-500 text-xs font-medium">/10</p>
            </span>
          </CardAction>
          <CardTitle className="text-lg">
            <p>{title}</p>
          </CardTitle>
        </CardContent>
      </Card>
    </Link>
  );
};
export default MovieCard;
