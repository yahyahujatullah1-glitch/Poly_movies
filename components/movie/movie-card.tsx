'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, Play } from 'lucide-react';

export interface MovieCardProps {
  title: string;
  poster: string;
  rating?: number;
  link: string;
  provider: string;
  type?: 'movie' | 'tv';
}

export function MovieCard({
  title,
  poster,
  rating,
  link,
  provider,
  type = 'movie',
}: MovieCardProps) {
  const encodedLink = encodeURIComponent(link);
  const href = `/movies/${provider}-${encodedLink}?link=${encodedLink}&provider=${provider}&type=${type}`;

  return (
    <Link href={href}>
      <div className="group relative overflow-hidden rounded-lg bg-card-background transition-transform duration-300 hover:scale-105 cursor-pointer">
        <div className="aspect-video relative overflow-hidden bg-black">
          <Image
            src={poster || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-opacity duration-300 group-hover:opacity-75"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Play className="w-12 h-12 text-primary fill-primary" />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-semibold text-white line-clamp-2">{title}</h3>
          {rating && (
            <div className="flex items-center gap-1 mt-2">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="text-sm text-text-secondary">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
