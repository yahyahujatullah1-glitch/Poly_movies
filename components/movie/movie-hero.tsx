'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Play, Bookmark } from 'lucide-react';

export interface MovieHeroProps {
  title: string;
  description?: string;
  backdrop?: string;
  poster?: string;
  rating?: number;
  link: string;
  provider: string;
}

export function MovieHero({
  title,
  description,
  backdrop,
  poster,
  rating,
  link,
  provider,
}: MovieHeroProps) {
  return (
    <div className="relative w-full h-screen max-h-96 bg-card-background overflow-hidden rounded-lg">
      {backdrop && (
        <Image
          src={backdrop || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />

      <div className="absolute inset-0 flex items-center gap-8 p-8">
        {poster && (
          <div className="hidden md:block w-48 h-72 relative rounded-lg overflow-hidden flex-shrink-0 shadow-2xl">
            <Image
              src={poster || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="flex flex-col justify-center flex-1 max-w-2xl space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white">{title}</h1>
          {rating && (
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-primary">★ {rating.toFixed(1)}</span>
              <span className="text-text-secondary">/10</span>
            </div>
          )}
          {description && (
            <p className="text-lg text-text-secondary line-clamp-3">{description}</p>
          )}
          <div className="flex gap-4 pt-4">
            <Button
              className="gap-2 bg-primary hover:bg-primary/90"
              size="lg"
              onClick={() => window.open(link, '_blank')}
            >
              <Play className="w-5 h-5" />
              Watch Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 border-text-secondary text-white hover:bg-text-secondary/10"
            >
              <Bookmark className="w-5 h-5" />
              Add to List
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
