import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
let MovieCarousel = () => {
  return (
    <Card
      style={{
        background: "url(/Feature.png)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className="min-w-[1440px] h-[600px]"
    >
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
    </Card>
  );
};
export default MovieCarousel;
