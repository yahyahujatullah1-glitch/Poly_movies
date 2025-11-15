import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Play, Plus } from 'lucide-react';

interface FeaturedSectionProps {
  movie: {
    title: string;
    image: string;
    poster: string;
    link: string;
    provider: string;
    description: string;
  };
}

export function FeaturedSection({ movie }: FeaturedSectionProps) {
  const encodedLink = encodeURIComponent(movie.link);
  const href = `/movies/${encodeURIComponent(movie.provider)}-${encodedLink}?link=${encodedLink}`;

  return (
    <div className="relative w-full h-[500px] bg-card overflow-hidden rounded-lg">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${movie.image}')`,
          filter: "brightness(0.4)",
        }}
      />

      <div className="relative h-full flex flex-col justify-end p-8 text-white">
        <h1 className="text-5xl font-bold mb-4 text-balance">{movie.title}</h1>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl line-clamp-3">
          {movie.description}
        </p>

        <div className="flex gap-4">
          <Link href={href}>
            <Button className="bg-primary hover:bg-primary/90 text-white">
              <Play className="w-5 h-5 mr-2" />
              Watch Now
            </Button>
          </Link>
          <Button variant="outline" className="border-white text-white hover:bg-white/10">
            <Plus className="w-5 h-5 mr-2" />
            My List
          </Button>
        </div>
      </div>
    </div>
  );
}
